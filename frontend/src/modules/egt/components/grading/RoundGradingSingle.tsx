import {
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm, useWatch, FieldValues, FormProvider } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  useEgtDeviceGradingLazyQuery,
  useEgtStarterGradesLazyQuery,
  useEgtAddGradesMutation,
  EgtDeviceAggregationMode,
  GradeInput,
  EgtStarterLink,
  useAdvanceEgtDivisionsDeviceMutation,
} from "../../../../__generated__/graphql";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import ListIcon from "@mui/icons-material/List";
import GradingListDialog from "../../dialogs/gradingListDialog/gradingListDialog";
import useEGTStarterLinks from "../../hooks/useEGTStarterLinks/useEGTStarterLinks";
import { graphql } from "../../../../__new_generated__/gql";
import usePrevious from "../../../../hooks/usePrev/usePrev";
import DoneIcon from "@mui/icons-material/Done";

export type RoundGradingSingleProps = {
  device: number;
  ground: number;
  round: number;
  maxRounds: number;
  advanceRound?: () => void;
  isFinished: boolean;
  divisionIds: string[];
};

const EGTStarterLinkFragment = graphql(`
  fragment RoundGradingSingle on EGTStarterLink {
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

export default function RoundGradingSingle(props: RoundGradingSingleProps) {
  const { t } = useTranslation(["egt", "common"]);
  const [starterIndex, setStarterIndex] = useState(0);
  const [inReview, setInReview] = useState(false);
  const [openGradingList, setOpenGradingList] = useState(false);
  const [starterLinks, setStarterLinks] = useState<EgtStarterLink[]>([]);

  const [
    deviceQuery,
    { loading: deviceDataLoading, data: deviceData, refetch: refetchDevice },
  ] = useEgtDeviceGradingLazyQuery();
  const {
    data: allStarterLinks,
    loading: starterLinksLoading,
  } = useEGTStarterLinks(EGTStarterLinkFragment, {
    divisionIDs: props.divisionIds,
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
  const [addGradesMutation, { loading: saving }] = useEgtAddGradesMutation();
  const [
    advanceDivisionsDevice,
    { loading: advancingDevice },
  ] = useAdvanceEgtDivisionsDeviceMutation();
  const previousStarterLinks = usePrevious(allStarterLinks);

  const form = useForm({
    mode: "all",
  });
  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    if (!deviceDataLoading && !starterLinksLoading && !gradesLoading) {
      closeSnackbar("refreshing");
    } else {
      enqueueSnackbar(t("refreshing", { ns: "common" }), {
        key: "refreshing",
        persist: true,
        variant: "info",
      });
    }
    return () => closeSnackbar("refreshing");
  }, [deviceDataLoading, starterLinksLoading, gradesLoading]);

  useEffect(() => {
    const deviceStarters = deviceData?.egtJudgingDevice.starterslist ?? [];
    const activeStarterLinks =
      (allStarterLinks.filter(
        (link) =>
          deviceStarters.findIndex(
            (deviceLink) => deviceLink.id === link.id
          ) !== -1
      ) as EgtStarterLink[]) ?? [];
    setStarterLinks(
      activeStarterLinks.sort(
        (a, b) =>
          deviceStarters.findIndex((dl) => dl.id === a.id) -
          deviceStarters.findIndex((dl) => dl.id === b.id)
      )
    );
  }, [allStarterLinks, deviceData]);

  useEffect(() => {
    if (!previousStarterLinks || previousStarterLinks.length === 0) {
      return () => {};
    }

    for (const starter of allStarterLinks) {
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
            persist: true,
            variant: "warning",
            key: starter.id,
            action: (snackbarId) => (
              <Button
                color="inherit"
                size="small"
                onClick={() => closeSnackbar(snackbarId)}
              >
                <DoneIcon />
              </Button>
            ),
          }
        );
      }

      if (
        (!previousValue || (previousValue.isDeleted && !starter.isDeleted)) &&
        previousStarterLinks.length > 0
      ) {
        enqueueSnackbar(
          t("has_been_added", {
            ns: "common",
            name: `${starter.starterlink.starter.firstname} ${starter.starterlink.starter.lastname}`,
          }),
          {
            persist: true,
            variant: "warning",
            key: starter.id,
            action: (snackbarId) => (
              <Button
                color="inherit"
                size="small"
                onClick={() => closeSnackbar(snackbarId)}
              >
                <DoneIcon />
              </Button>
            ),
          }
        );
      }
    }

    refetchDevice();
  }, [allStarterLinks]);

  useEffect(() => {
    if (props.divisionIds.length > 0) {
      deviceQuery({
        variables: {
          device: props.device,
          round: props.round,
          ids: props.divisionIds,
        },
      });
    }
  }, [props.divisionIds, props.round]);

  useEffect(() => {
    if (deviceData?.egtJudgingDevice && starterLinks.length > 0) {
      gradesQuery();
    }
  }, [deviceData?.egtJudgingDevice, starterLinks]);

  useEffect(() => {
    if (gradesData?.starterGrades) {
      const values: { [index: string]: string | Object } = {};
      for (const starter of starterLinks ?? []) {
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
          form.clearErrors(`${starterId}.final`);
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
      // skip deleted starters
      if (
        allStarterLinks.find((link) => link.starterlink.id === starter)
          ?.isDeleted
      ) {
        continue;
      }

      let finalGrade = values[starter];
      if (maxInputs > 1) {
        finalGrade = finalGrade["final"];
      }

      if (finalGrade) {
        grades.push({
          deviceNumber: props.device,
          module: "egt",
          starterlinkId: starter,
          value: parseFloat(finalGrade),
        });
      }
    }
    try {
      if (grades.length > 0) {
        const result = await addGradesMutation({
          variables: {
            grades,
          },
        });
        if (result.errors) {
          console.error(result.errors);
          enqueueSnackbar(t("error", { ns: "common" }));
          return;
        }
        enqueueSnackbar(t("saved", { ns: "common" }), { variant: "success" });
      }
    } catch (e) {
      console.error(e);
      enqueueSnackbar(t("error", { ns: "common" }));
    }
    advanceDivisionsDevice({
      variables: {
        device: props.device,
        divisions: props.divisionIds,
        round: props.round + 1,
      },
    });

    setInReview(false);
    setStarterIndex(0);

    if (props.advanceRound) {
      props.advanceRound();
    }
  }

  function renderGradeInputs(starter: EgtStarterLink) {
    if (starter.isDeleted) {
      return null;
    }

    const categorySettings = getCategorySettings(starter.category || 1);

    if (categorySettings?.inputs === 1) {
      return (
        <FormTextInput
          key={starter.id}
          name={`${starter.starterlink.id}`}
          label="grade"
          inputMode="decimal"
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
            inputMode="decimal"
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
          inputMode="decimal"
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
    if (starterIndex < (starterLinks.length ?? 0) - 1) {
      setStarterIndex(starterIndex + 1);
    }
  }

  function renderReview() {
    return (
      <>
        <Typography variant="h5" sx={{ pt: 2, mb: 2 }}>
          {t("review", { ns: "common" })}
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>{t("firstname", { ns: "common" })}</TableCell>
              <TableCell>{t("lastname", { ns: "common" })}</TableCell>
              <TableCell>{t("category", { ns: "egt" })}</TableCell>
              <TableCell>{t("final_grade", { ns: "common" })}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {starterLinks.map((starter) => {
              const realStarter = starter.starterlink.starter;
              return (
                <TableRow
                  sx={{
                    textDecoration: starter.isDeleted ? "line-through" : "none",
                  }}
                >
                  <TableCell>{realStarter.firstname}</TableCell>
                  <TableCell>{realStarter.lastname}</TableCell>
                  <TableCell>
                    {t(
                      `category_${
                        starter.category
                      }_${realStarter.sex.toLowerCase()}`
                    )}
                  </TableCell>
                  <TableCell>
                    {!starter.isDeleted && (
                      <FormTextInput
                        key={starter.id}
                        name={`${starter.starterlink.id}${
                          maxInputs > 1 ? ".final" : ""
                        }`}
                        disableLabel
                        fieldProps={{
                          variant: "standard",
                        }}
                        inputMode="decimal"
                        fullWidth={true}
                        rules={{
                          required: true,
                          min: 0,
                          max: 10,
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
              onClick={() => setInReview(false)}
              disabled={starterIndex === 0}
            >
              {t("back", { ns: "common" })}
            </Button>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => form.handleSubmit(onFormSubmit)()}
              disabled={saving || advancingDevice}
            >
              {saving || advancingDevice ? (
                <CircularProgress size={19} />
              ) : (
                t("save", { ns: "common" })
              )}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  function renderContent(starter: EgtStarterLink) {
    if (inReview) {
      return renderReview();
    }

    return (
      <>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {t("round", { ns: "egt", number: props.round + 1 })}
        </Typography>
        <LinearProgress
          value={(100 / (starterLinks.length ?? 1)) * (starterIndex + 1)}
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
          <Grid
            item
            xs={12}
            md={6}
            lg={3}
            sx={{
              textAlign: "center",
              textDecoration: starter.isDeleted ? "line-through" : "none",
            }}
          >
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
            {starterIndex < (starterLinks.length ?? 0) - 1 && (
              <Button variant="contained" color="info" onClick={onNext}>
                {t("next", { ns: "common" })}
              </Button>
            )}
            {starterIndex === (starterLinks.length ?? 0) - 1 && (
              <Button
                variant="contained"
                color="success"
                type="submit"
                onClick={() => setInReview(true)}
              >
                {t("review", { ns: "common" })}
              </Button>
            )}
          </Grid>
        </Grid>
      </>
    );
  }

  const starter = useMemo(() => starterLinks[starterIndex], [
    starterLinks,
    starterIndex,
  ]);

  if (props.isFinished) {
    return (
      <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
        {t("finished", { ns: "common" })}
      </Typography>
    );
  }

  if (starterLinks.length === 0) {
    if (deviceDataLoading || gradesLoading || starterLinksLoading) {
      return <LinearProgress />;
    }
    return (
      <>
        <Typography variant="caption" sx={{ textAlign: "center" }}>
          {t("round", { ns: "egt", number: props.round + 1 })}
        </Typography>
        <Typography variant="h5" sx={{ mt: 3, textAlign: "center" }}>
          {t("break", { ns: "common" })}
        </Typography>
        <Grid
          container
          direction="row"
          spacing={2}
          justifyContent={"space-between"}
          sx={{ mt: 2 }}
        >
          <Grid item xs={2} sx={{ textAlign: "center" }}></Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <Button
              variant="contained"
              color="info"
              onClick={() => onFormSubmit({})}
            >
              {t("next", { ns: "common" })}
            </Button>
          </Grid>
        </Grid>
      </>
    );
  }

  if (!deviceData?.egtJudgingDevice) {
    return null;
  }

  return (
    <>
      <form>
        <FormProvider {...form}>
          {renderContent(starter as EgtStarterLink)}
        </FormProvider>
      </form>
      <GradingListDialog
        open={openGradingList}
        onClose={() => setOpenGradingList(false)}
        maxRounds={props.maxRounds}
        device={props.device}
        divisionIds={props.divisionIds}
        currentStarter={starter?.id}
      />
    </>
  );
}
