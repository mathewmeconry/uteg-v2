import {
  Button,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, FieldValues, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  useEgtDivisionsIdsQuery,
  useEgtDeviceGradingLazyQuery,
  useEgtStarterGradesLazyQuery,
  useEgtAddGradesMutation,
  useEgtAdvanceLineupsMutation,
  EgtDeviceAggregationMode,
  GradeInput,
  EgtStarterLink,
} from "../../../../__generated__/graphql";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import ListIcon from "@mui/icons-material/List";
import GradingListDialog from "../../dialogs/gradingListDialog/gradingListDialog";

export type RoundGradingSingleProps = {
  device: number;
  ground: number;
  round: number;
  maxRounds: number;
};

export default function RoundGradingSingle(props: RoundGradingSingleProps) {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const [starterIndex, setStarterIndex] = useState(0);
  const [inReview, setInReview] = useState(false);
  const [openGradingList, setOpenGradingList] = useState(false);
  const {
    data: divisionsData,
    loading: divisionsDataLoading,
  } = useEgtDivisionsIdsQuery({
    variables: {
      filter: {
        competitionID: id!,
        ground: props.ground,
        state: "RUNNING",
      },
    },
  });
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

  const form = useForm({
    mode: "all",
  });
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    deviceQuery({
      variables: {
        device: props.device,
        round: props.round,
        ids: divisionsData?.egtDivisions?.map((division) => division.id) ?? [],
      },
    });
    gradesQuery();
  }, [divisionsData, props.round]);

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

  function renderGradeInputs(starter: EgtStarterLink) {
    const categorySettings = getCategorySettings(starter.category || 1);

    if (categorySettings?.inputs === 1) {
      return (
        <FormTextInput
          key={starter.id}
          name={`${starter.starterlink.id}`}
          label="grade"
          fieldProps={{
            variant: "outlined",
          }}
          fullWidth={true}
          rules={{
            required: true,
            min: 0,
            max: 10,
          }}
          loading={gradesLoading}
        />
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
          <FormTextInput
            key={starter.id}
            name={`${starter.starterlink.id}.final`}
            label="grade_labled"
            fieldProps={{
              variant: "outlined",
            }}
            fullWidth={true}
            disabled={previousSet}
            labelVariables={{
              label: t(`aggregationMode_${categorySettings?.aggregationMode}`, {
                ns: "egt",
              }),
            }}
            rules={{
              required: true,
              min: 0,
              max: 10,
            }}
            loading={gradesLoading}
          />
        );
      }

      return (
        <FormTextInput
          key={starter.id}
          name={`${starter.starterlink.id}.${key}`}
          label="grade_labled"
          labelVariables={{ label: `${key + 1}.` }}
          fieldProps={{
            variant: "outlined",
          }}
          fullWidth={true}
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
      );
    });
  }

  function onPrevious() {
    if (starterIndex > 0) {
      setStarterIndex(starterIndex - 1);
    }
  }

  function onNext() {
    if (
      starterIndex <
      (deviceData?.egtJudgingDevice?.starterslist?.length ?? 0) - 1
    ) {
      setStarterIndex(starterIndex + 1);
    }
  }

  function renderContent(starter: EgtStarterLink) {
    if (inReview) {
    }

    return (
      <>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {t("round", { ns: "egt", number: props.round + 1 })}
        </Typography>
        <LinearProgress
          value={
            (100 / (deviceData?.egtJudgingDevice?.starterslist?.length ?? 1)) *
            (starterIndex + 1)
          }
          variant="determinate"
        />
        <Grid
          key={starter.id}
          container
          spacing={2}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{ mt: 2 }}
        >
          <Grid item xs={12} md={6} lg={3} sx={{ textAlign: "center" }}>
            <Typography variant="h5" sx={{ pt: 2, textAlign: "center" }}>
              {starter.starterlink.starter.firstname}
            </Typography>
            <Typography variant="h5" sx={{ pt: 2, textAlign: "center" }}>
              {starter.starterlink.starter.lastname}
            </Typography>
            <Typography variant="h5" sx={{ pt: 2, textAlign: "center" }}>
              {t(
                `category_${
                  starter.category
                }_${starter.starterlink.starter.sex.toLowerCase()}`
              )}
            </Typography>
            {renderGradeInputs(starter as EgtStarterLink)}
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Grid item xs={4}>
            <Button
              variant="outlined"
              color="info"
              onClick={onPrevious}
              disabled={starterIndex === 0}
            >
              {t("back", { ns: "common" })}
            </Button>
          </Grid>
          <Grid item xs={2} sx={{ textAlign: "center" }}>
            <IconButton onClick={() => setOpenGradingList(true)}>
              <ListIcon />
            </IconButton>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            {starterIndex <
              (deviceData?.egtJudgingDevice?.starterslist?.length ?? 0) - 1 && (
              <Button variant="contained" color="info" onClick={onNext}>
                {t("next", { ns: "common" })}
              </Button>
            )}
            {starterIndex ===
              (deviceData?.egtJudgingDevice?.starterslist?.length ?? 0) - 1 && (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={() => setInReview(true)}
                disabled={!form.formState.isValid}
              >
                {t("review", { ns: "common" })}
              </Button>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  const starter = useMemo(
    () => deviceData?.egtJudgingDevice.starterslist[starterIndex],
    [deviceData, starterIndex]
  );

  if (divisionsDataLoading || deviceDataLoading || gradesLoading) {
    return <LinearProgress />;
  }

  if (!divisionsData?.egtDivisions || !deviceData?.egtJudgingDevice) {
    return null;
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onFormSubmit)}>
        <FormProvider {...form}>
          {renderContent(starter as EgtStarterLink)}
        </FormProvider>
      </form>
      <GradingListDialog
        open={openGradingList}
        onClose={() => setOpenGradingList(false)}
        maxRounds={props.maxRounds}
        device={props.device}
        divisionIds={
          divisionsData?.egtDivisions?.map((division) => division.id) ?? []
        }
        currentStarter={starter?.id}
      />
    </>
  );
}
