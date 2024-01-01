import { useTranslation } from "react-i18next";
import { HomeLayout } from "../../../layouts/homelayout";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { BasicInformation } from "./steps/basicInformation";
import { FormProvider, useForm } from "react-hook-form";
import { Setup } from "./steps/setup";
import { ModulesSettings } from "./steps/modulesSettings";
import { Users } from "./steps/users";
import { Review } from "./steps/review";
import { useCreateCompetitionMutation } from "../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export function CreateCompetition() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const form = useForm();
  const [createCompetition, { loading }] = useCreateCompetitionMutation();
  const navigate = useNavigate();
  const [competitionId, setCompetitionId] = useState<string>();

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  async function handleNext() {
    await form.trigger();
    if (form.formState.isValid) {
      setActiveStep(activeStep + 1);
    }
  }

  async function handleCreate() {
    try {
      setActiveStep(activeStep + 1);
      const formValues = form.getValues();
      const competition = await createCompetition({
        variables: {
          name: formValues.basic.name,
          location: formValues.basic.location,
          startDate: formValues.basic.startDate,
          endDate: formValues.basic.endDate,
          grounds: formValues.setup.grounds,
          modules: Object.keys(formValues.setup.modules).filter(
            (key) => formValues.setup.modules[key]
          ),
        },
      });

      if (!competition.data?.createCompetition.id) {
        throw new Error("Something failed");
      }
      setCompetitionId(competition.data.createCompetition.id);
    } catch {
      enqueueSnackbar(t("Something went wrong... Please try again later"), {
        variant: "error",
      });
    }
  }

  const steps = useMemo(() => [
    {
      label: t("Basic Information"),
      component: <BasicInformation />,
    },
    {
      label: t("Setup"),
      component: <Setup />,
    },
    {
      label: t("Modules"),
      component: <ModulesSettings />,
    },
    {
      label: t("Users"),
      component: <Users />,
    },
    {
      label: t("Review"),
      component: <Review />,
    },
  ], []);

  function renderContent() {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
          <Typography variant="h5">{t("Creating...")}</Typography>
        </Box>
      );
    }

    if (competitionId) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography variant="h5">
            {t("Competition")} {form.getValues("basic.name")} {t("created")}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={() => navigate(`/competition/${competitionId}/dashboard`)}
          >
            {t("Open")}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate(`/home`)}
          >
            {t("Home")}
          </Button>
        </Box>
      );
    }

    return (
      <>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }} variant="h5">
          {steps[activeStep].label}
        </Typography>
        <FormProvider {...form}>{steps[activeStep].component}</FormProvider>
        <Divider sx={{ mt: 2 }}></Divider>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {t("Back")}
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep !== steps.length - 1 && (
            <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
              {t("Next")}
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              variant="outlined"
              color="success"
              onClick={handleCreate}
              sx={{ mr: 1 }}
            >
              {t("Create")}
            </Button>
          )}
        </Box>
      </>
    );
  }

  return (
    <HomeLayout title={t("Create Competition")} returnable={true}>
      <Paper sx={{ p: 2 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepButton>{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Divider sx={{ mt: 2 }}></Divider>
        {renderContent()}
      </Paper>
    </HomeLayout>
  );
}
