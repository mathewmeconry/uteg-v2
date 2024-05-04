import {
  EgtDeviceAggregationMode,
  EgtStarterLink,
  GradeInput,
  useAdvanceEgtDivisionsDeviceMutation,
  useEgtAddGradesMutation,
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
import { graphql } from "../../../../__new_generated__/gql";
import useEGTStarterLinks from "../../hooks/useEGTStarterLinks/useEGTStarterLinks";
import usePrevious from "../../../../hooks/usePrev/usePrev";

type RoundGradingProps = {
  device: number;
  ground: number;
  round: number;
  divisionIds: string[];
};

const EGTStarterLinkFragment = graphql(`
  fragment RoundGradingTable on EGTStarterLink {
    id
    isDeleted
    starterlink {
      id
      starter {
        id
        firstname
        lastname
        sex
      }
      club {
        id
        name
      }
    }
    category
  }
`);

export function RoundGradingTable(props: RoundGradingProps) {
  const { t } = useTranslation(["egt", "common"]);

  const [
    deviceQuery,
    { loading: deviceDataLoading, data: deviceData, refetch: refetchDevice },
  ] = useEgtDeviceGradingLazyQuery();
  const {
    data: starterLinks,
    loading: starterLinksLoading,
  } = useEGTStarterLinks(EGTStarterLinkFragment, {
    ids:
      deviceData?.egtJudgingDevice?.starterslist.map(
        (starterLink) => starterLink.id
      ) ?? [],
    withDeleted: true,
  });
  const [
    gradesQuery,
    { loading: gradesLoading, data: gradesData },
  ] = useEgtStarterGradesLazyQuery({
    variables: {
      device: props.device,
      starterlinkIds:
        starterLinks
          .filter((starterLink) => !starterLink.isDeleted)
          .map((starterlink) => starterlink.starterlink.id) ?? [],
    },
    fetchPolicy: "network-only",
  });
  const [addGradesMutation] = useEgtAddGradesMutation();
  const [advanceDivisionsDevice] = useAdvanceEgtDivisionsDeviceMutation();
  const previousStarterLinks = usePrevious(starterLinks);

  const form = useForm();
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    if (!previousStarterLinks || previousStarterLinks.length === 0) {
      return () => {};
    }

    for (const starter of starterLinks) {
      const previousValue = previousStarterLinks.find(
        (prevStarter) => prevStarter.id === starter.id
      );

      if (!previousValue?.isDeleted && !!starter.isDeleted) {
        enqueueSnackbar(
          t("has_been_deleted", {
            ns: "common",
            name: `${starter.starterlink.starter.firstname} ${starter.starterlink.starter.lastname}`,
          }),
          {
            variant: "warning",
            key: starter.id,
          }
        );
      }
    }

    refetchDevice();
  }, [starterLinks]);

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
      for (const starter of starterLinks) {
        if (starter.isDeleted) {
          continue;
        }
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
    for (const starter of starterLinks) {
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
        const starter = starterLinks.find(
          (starter) => starter.starterlink.id === starterId
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

  if (deviceDataLoading || starterLinksLoading) {
    return [...Array(5).keys()].map((key) => <Skeleton key={key} />);
  }

  if (!props.divisionIds || !deviceData?.egtJudgingDevice) {
    return null;
  }

  async function onFormSubmit(values: FieldValues) {
    const grades: GradeInput[] = [];
    for (const starter of Object.keys(values)) {
      // skip deleted starters
      if (
        starterLinks.find((link) => link.starterlink.id === starter)?.isDeleted
      ) {
        continue;
      }

      let finalGrade = values[starter];
      if (maxInputs > 1) {
        finalGrade = finalGrade["final"];
      }

      grades.push({
        deviceNumber: props.device,
        module: "egt",
        starterlinkId: starter,
        value: parseFloat(finalGrade.replace(",", ".")),
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

    advanceDivisionsDevice({
      variables: {
        device: props.device,
        divisions: props.divisionIds,
        round: props.round + 1,
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
          <TableCell key={key}>{t("final_grade", { ns: "common" })}</TableCell>
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
      if (starter.isDeleted) {
        return <TableCell />;
      }

      return (
        <TableCell>
          <FormTextInput
            name={`${starter.starterlink.id}`}
            label="grade"
            inputMode="decimal"
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
      if (starter.isDeleted) {
        return <TableCell key={`${starter.id}_${key}`} />;
      }

      if (key === maxInputs) {
        return (
          <TableCell key={`${starter.id}_${key}`}>
            <FormTextInput
              name={`${starter.starterlink.id}.final`}
              label="grade_labled"
              inputMode="decimal"
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
            inputMode="decimal"
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
              <TableCell>{t("club", { ns: "common" })}</TableCell>
              <TableCell>{t("category", { ns: "egt" })}</TableCell>
              {renderInputHeaders()}
            </TableRow>
          </TableHead>
          <TableBody>
            {starterLinks.map((starter) => (
              <TableRow
                key={starter.id}
                sx={{
                  textDecoration: starter.isDeleted
                    ? "line-through"
                    : undefined,
                }}
              >
                <TableCell>{starter.starterlink?.starter?.firstname}</TableCell>
                <TableCell>{starter.starterlink?.starter?.lastname}</TableCell>
                <TableCell>{starter.starterlink?.club.name}</TableCell>
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
                colSpan={4 + (maxInputs > 1 ? maxInputs + 1 : maxInputs)}
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
