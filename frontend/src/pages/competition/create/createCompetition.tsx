import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  Step,
  StepButton,
  useMediaQuery,
  Stepper,
  Typography,
  useTheme,
  StepLabel,
  StepContent,
} from "@mui/material";
import { useMemo, useState } from "react";
import { GeneralInformation } from "./steps/generalInformation";
import { FormProvider, useForm, useFormState } from "react-hook-form";
import { Setup } from "./steps/setup";
import { ModulesSettings } from "./steps/modulesSettings";
import { Users } from "./steps/users";
import { Review } from "./steps/review";
import { useCreateCompetitionMutation } from "../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useModules } from "../../../hooks/useModules/useModules";

export function CreateCompetition() {
  const { t } = useTranslation();
  const theme = useTheme();
  const belowSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const form = useForm({
    mode: "all",
  });
  const [createCompetition, { loading }] = useCreateCompetitionMutation();
  const navigate = useNavigate();
  const [competitionId, setCompetitionId] = useState<string>();
  const moduleSelection = form.getValues("setup.modules");
  const modules = useModules(
    undefined,
    Object.keys(moduleSelection ?? {}).filter(
      (module) => moduleSelection[module]
    )
  );
  const [modulesLoading, setModulesLoading] = useState(false);
  const { isValid: isFormValid } = useFormState({
    control: form.control,
  });

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  async function handleNext() {
    if (isFormValid) {
      setActiveStep(activeStep + 1);
    }
  }

  async function handleCreate() {
    try {
      setActiveStep(activeStep + 1);
      const formValues = form.getValues();
      const competition = await createCompetition({
        variables: {
          name: formValues.general.name,
          location: formValues.general.location,
          startDate: formValues.general.startDate,
          endDate: formValues.general.endDate,
          grounds: parseInt(formValues.setup.grounds),
          modules: Object.keys(formValues.setup.modules).filter(
            (key) => formValues.setup.modules[key]
          ),
        },
      });

      if (!competition.data?.createCompetition.id) {
        throw new Error("Something failed");
      }
      setCompetitionId(competition.data.createCompetition.id);

      setModulesLoading(true);
      for (const module of modules.modules) {
        if (module.handlers.createCompetition) {
          await module.handlers.createCompetition(
            competition.data.createCompetition.id,
            form.getValues(`module.${module.name}`)
          );
        }
      }

      setModulesLoading(false);
    } catch {
      enqueueSnackbar(t("error"), {
        variant: "error",
      });
    }
  }

  const steps = useMemo(
    () => [
      {
        label: t("general_information"),
        component: <GeneralInformation />,
      },
      {
        label: t("setup"),
        component: <Setup />,
      },
      {
        label: t("module", { count: 2 }),
        component: <ModulesSettings />,
      },
      {
        label: t("user", { count: 2 }),
        component: <Users />,
      },
      {
        label: t("review"),
        component: <Review />,
      },
    ],
    []
  );

  function renderSuccess() {
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
            {t("created", {
              type: t("competition"),
              name: form.getValues("general.name"),
            })}
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={() => navigate(`/competition/${competitionId}/dashboard`)}
          >
            {t("open")}
          </Button>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => navigate(`/home`)}
          >
            {t("home")}
          </Button>
        </Box>
      );
    }
    return null;
  }

  function renderContent(step?: number) {
    if (loading || modulesLoading) {
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
          <Typography variant="h5">
            {t("creating", { name: t("competition") })}
          </Typography>
        </Box>
      );
    }

    if (!step && competitionId) {
      return renderSuccess();
    }

    return (
      <>
        <Typography sx={{ mt: 2, mb: 1, py: 1 }} variant="h4">
          {steps[step ?? activeStep].label}
        </Typography>
        <FormProvider {...form}>
          {steps[step ?? activeStep].component}
        </FormProvider>
        <Divider sx={{ mt: 2 }}></Divider>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="outlined"
            color="inherit"
            disabled={(step ?? activeStep) === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            {t("back")}
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {(step ?? activeStep) !== steps.length - 1 && (
            <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
              {t("next")}
            </Button>
          )}
          {(step ?? activeStep) === steps.length - 1 && (
            <Button
              variant="outlined"
              color="success"
              onClick={handleCreate}
              sx={{ mr: 1 }}
            >
              {t("create")}
            </Button>
          )}
        </Box>
      </>
    );
  }

  if (belowSmall) {
    return (
      <Paper sx={{ p: 2 }}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel={!belowSmall}
          orientation={belowSmall ? "vertical" : "horizontal"}
          onClick={(e) => e.stopPropagation()}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>{renderContent(index)}</StepContent>
            </Step>
          ))}
        </Stepper>
        {renderSuccess()}
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 2 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel={!belowSmall}
        orientation={belowSmall ? "vertical" : "horizontal"}
        onClick={(e) => e.stopPropagation()}
      >
        {steps.map((step) => (
          <Step key={step.label}>
            <StepButton>{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Divider sx={{ mt: 2 }}></Divider>
      {renderContent()}
    </Paper>
  );
}
