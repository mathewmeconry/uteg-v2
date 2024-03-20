import {
  EgtDeviceAggregationMode,
  EgtStarterLink,
  GradeInput,
  useEgtAddGradesMutation,
  useEgtAdvanceLineupsMutation,
  useEgtDeviceGradingLazyQuery,
  useEgtStarterGradesLazyQuery,
} from "../../../../__generated__/graphql";
import {
  Button,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { FieldValues, FormProvider, useForm, useWatch } from "react-hook-form";
import { enqueueSnackbar } from "notistack";

type RoundGradingProps = {
  device: number;
  ground: number;
  round: number;
  divisionIds: string[]
};

export function RoundGradingTable(props: RoundGradingProps) {
  const { t } = useTranslation(["egt", "common"]);
  
  const [
    deviceQuery,
    { loading: deviceDataLoading, data: deviceData },
  ] = useEgtDeviceGradingLazyQuery();
  const [
    gradesQuery,
    { loading: gradesLoading, data: gradesData },
  ] = useEgtStarterGradesLazyQuery({
    variables: {
      device: props.device,
      starterlinkIds:
        deviceData?.egtJudgingDevice?.starterslist.map(
          (starterlink) => starterlink.starterlink.id
        ) ?? [],
    },
    fetchPolicy: "network-only",
  });
  const [addGradesMutation] = useEgtAddGradesMutation();
  const [advanceLineupsMutation] = useEgtAdvanceLineupsMutation();

  const form = useForm();
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    deviceQuery({
      variables: {
        device: props.device,
        round: props.round,
        ids: props.divisionIds,
      },
    });
    gradesQuery();
  }, [props.divisionIds, props.round]);

  useEffect(() => {
    if (gradesData?.starterGrades) {
      const values: { [index: string]: string | Object } = {};
      for (const starter of deviceData?.egtJudgingDevice.starterslist ?? []) {
        if (formValues[starter.starterlink.id]) {
          values[starter.starterlink.id] = formValues[starter.starterlink.id];
          continue;
        }

        const grade = gradesData.starterGrades.find(
          (grade) => grade.starterlink.id === starter.starterlink.id
        );
        if (maxInputs > 1) {
          values[starter.starterlink.id] = {
            final: grade?.value.toString() ?? "",
          };
        } else {
          values[starter.starterlink.id] = grade?.value.toString() ?? "";
        }
      }
      form.reset(values);
    }
  }, [gradesData]);

  const maxInputs = useMemo(() => {
    let inputs = 1;
    if (!deviceData?.egtJudgingDevice) {
      return inputs;
    }

    inputs = deviceData.egtJudgingDevice.device.inputs;
    for (const starter of deviceData.egtJudgingDevice.starterslist) {
      if (
        deviceData.egtJudgingDevice.device.overrides.find(
          (override) => override.category === starter.category
        )
      ) {
        inputs = Math.max(
          inputs,
          deviceData.egtJudgingDevice.device.overrides.find(
            (override) => override.category === starter.category
          )?.inputs ?? 1
        );
      }
    }
    return inputs;
  }, [deviceData]);

  useEffect(() => {
    if (maxInputs > 1) {
      for (const starterId of Object.keys(formValues)) {
        const starter = deviceData?.egtJudgingDevice.starterslist.find(
          (starter) => starter.id === starterId
        );
        const categorySettings = getCategorySettings(starter?.category || 1);
        if (!categorySettings) {
          continue;
        }

        const grades: number[] = Object.keys(formValues[starterId])
          .filter((key) => key !== "final")
          .map((key) => parseFloat(formValues[starterId][key]))
          .filter((grade) => grade);
        if (categorySettings?.inputs > 1 && Object.keys(grades).length > 0) {
          form.setValue(
            `${starterId}.final`,
            calcGrade(grades, categorySettings.aggregationMode),
            { shouldDirty: true }
          );
        }
      }
    }
  }, [formValues, maxInputs]);

  if (deviceDataLoading) {
    return [...Array(5).keys()].map((key) => <Skeleton key={key} />);
  }

  if (!props.divisionIds || !deviceData?.egtJudgingDevice) {
    return null;
  }

  async function onFormSubmit(values: FieldValues) {
    const grades: GradeInput[] = [];
    for (const starter of Object.keys(values)) {
      let finalGrade = values[starter];
      if (maxInputs > 1) {
        finalGrade = finalGrade["final"];
      }

      grades.push({
        deviceNumber: props.device,
        module: "egt",
        starterlinkId: starter,
        value: parseFloat(finalGrade),
      });
    }

    const result = await addGradesMutation({
      variables: {
        grades,
      },
    });
    if (result.errors) {
      enqueueSnackbar(t("error", { ns: "common" }));
      return;
    }
    enqueueSnackbar(t("saved", { ns: "common" }), { variant: "success" });

    advanceLineupsMutation({
      variables: {
        round: props.round + 1,
        ids:
          deviceData?.egtJudgingDevice.lineups.map((lineup) => lineup.id) ?? [],
      },
    });
  }

  function renderInputHeaders() {
    if (maxInputs === 1) {
      return <TableCell>{t("grade", { ns: "common" })}</TableCell>;
    }

    return [...Array(maxInputs + 1).keys()].map((key) => {
      if (key === maxInputs) {
        return (
          <TableCell key={key}>
            {t("grade_labled", {
              ns: "common",
              label: t("final_grade", { ns: "common" }),
            })}
          </TableCell>
        );
      }

      return (
        <TableCell key={key}>
          {t("grade_labled", { ns: "common", label: `${key + 1}.` })}
        </TableCell>
      );
    });
  }

  function renderGradeInputs(starter: EgtStarterLink) {
    const categorySettings = getCategorySettings(starter.category || 1);

    if (categorySettings?.inputs === 1) {
      return (
        <TableCell>
          <FormTextInput
            name={`${starter.starterlink.id}`}
            label="grade"
            fieldProps={{
              size: "small",
            }}
            fullWidth={false}
            rules={{
              required: true,
              min: 0,
              max: 10,
            }}
            loading={gradesLoading}
          />
        </TableCell>
      );
    }

    const previousValues: { [index: number | string]: number } =
      formValues[starter.starterlink.id] ?? {};
    let previousSet =
      Object.keys(previousValues).filter(
        (key) => key !== "final" && previousValues[key]
      ).length > 0;
    return [...Array(maxInputs + 1).keys()].map((key) => {
      if (key === maxInputs) {
        return (
          <TableCell key={`${starter.id}_${key}`}>
            <FormTextInput
              name={`${starter.starterlink.id}.final`}
              label="grade_labled"
              fieldProps={{
                size: "small",
              }}
              fullWidth={false}
              disabled={previousSet}
              labelVariables={{
                label: t(
                  `aggregationMode_${categorySettings?.aggregationMode}`,
                  { ns: "egt" }
                ),
              }}
              rules={{
                required: true,
                min: 0,
                max: 10,
              }}
              loading={gradesLoading}
            />
          </TableCell>
        );
      }

      return (
        <TableCell key={key}>
          <FormTextInput
            name={`${starter.starterlink.id}.${key}`}
            label="grade_labled"
            labelVariables={{ label: `${key + 1}.` }}
            fieldProps={{
              size: "small",
            }}
            fullWidth={false}
            disabled={
              !!previousValues["final"] &&
              !previousSet &&
              key < (categorySettings?.inputs ?? maxInputs)
            }
            rules={{
              required: false,
              min: 0,
              max: 10,
            }}
          />
        </TableCell>
      );
    });
  }

  function calcGrade(
    grades: number[],
    aggregationMode: EgtDeviceAggregationMode
  ) {
    switch (aggregationMode) {
      case "AVG":
        return (grades.reduce((a, b) => a + b, 0) / grades.length).toFixed(3);
      case "MAX":
        return Math.max(...grades);
      case "MIN":
        return Math.min(...grades);
      default:
        return 0;
    }
  }

  function getCategorySettings(category: number) {
    const device = deviceData?.egtJudgingDevice.device;
    return (
      device?.overrides.find((override) => override.category === category) ??
      device
    );
  }

  return (
    <form onSubmit={form.handleSubmit(onFormSubmit)}>
      <FormProvider {...form}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("firstname", { ns: "common" })}</TableCell>
              <TableCell>{t("lastname", { ns: "common" })}</TableCell>
              <TableCell>{t("category", { ns: "egt" })}</TableCell>
              {renderInputHeaders()}
            </TableRow>
          </TableHead>
          <TableBody>
            {deviceData.egtJudgingDevice.starterslist.map((starter) => (
              <TableRow key={starter.id}>
                <TableCell>{starter.starterlink?.starter?.firstname}</TableCell>
                <TableCell>{starter.starterlink?.starter?.lastname}</TableCell>
                <TableCell>
                  {t(`category_${starter.category}`, {
                    context: starter.starterlink.starter.sex,
                  })}
                </TableCell>
                {renderGradeInputs(starter as EgtStarterLink)}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell
                colSpan={3 + (maxInputs > 1 ? maxInputs + 1 : maxInputs)}
                align="right"
              >
                <Button
                  variant="outlined"
                  onClick={() => form.reset()}
                  sx={{ mr: 2 }}
                >
                  {t("clear", { ns: "common" })}
                </Button>
                <Button variant="contained" color="success" type="submit">
                  {t("save", { ns: "common" })}
                </Button>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </FormProvider>
    </form>
  );
}
