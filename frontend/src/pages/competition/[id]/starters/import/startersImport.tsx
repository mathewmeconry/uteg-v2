import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";
import {
  Button,
  CircularProgress,
  Divider,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FileUploadStep } from "./steps/fileUploadStep";
import { StartersReviewStep } from "./steps/startersReviewStep";
import { ClubInput } from "../../../../../components/form/FormClubAutocomplete";
import { PaperExtended } from "../../../../../components/paperExtended";
import { Starter } from "../../../../../__generated__/graphql";
import { processXLSX } from "./processImport";
import { ImportStep } from "./steps/importStep";
import { useParams } from "react-router-dom";
import { useModules } from "../../../../../hooks/useModules/useModules";
import { getModulesHandlers } from "../../../../../modules";
import { ParseStarterFromSheetHandler } from "../../../../../modules/types";

export function StartersImport() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const modules = useModules(id || "");

  const form = useForm<{
    club: ClubInput | string;
    starters: Starter[];
  }>({
    defaultValues: {
      club: "",
      starters: [],
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });

  const moduleHandlers = useMemo(() => {
    if (modules.loading) {
      return [];
    }

    return getModulesHandlers<ParseStarterFromSheetHandler>(modules.modules, "parseStarterFromSheet");
  }, [modules]);

  useEffect(() => {
    (async function() {
      let starters: Starter[] = [];
      for (const file of files) {
        if (file instanceof File) {
          const url = window.URL.createObjectURL(file);
          const fileFetchResponse = await fetch(url);
          const fileBlob = await fileFetchResponse.blob();
          window.URL.revokeObjectURL(url);
          starters = starters.concat(
            processXLSX(await fileBlob.arrayBuffer(), moduleHandlers)
          );
        }
      }
      form.setValue("starters", starters);
      form.trigger();
    })();
  }, [files]);

  const steps = [
    {
      label: t("upload"),
      component: (
        <FileUploadStep
          files={files}
          onChange={(files: File[]) => setFiles(files)}
        />
      ),
    },
    {
      label: t("starter", {count: 2}),
      component: <StartersReviewStep />,
    },
    {
      label: t("import"),
      component: <ImportStep />,
    },
  ];

  function handleBack() {
    setActiveStep(activeStep - 1);
  }

  async function handleNext() {
    form.trigger().then((valid) => {
      if (valid) {
        setActiveStep(activeStep + 1);
      }
    });
  }

  function renderContent() {
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
            {t("back")}
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep < steps.length - 1 && (
            <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
              {form.formState.isValidating && <CircularProgress size={24} />}
              {!form.formState.isValidating && t("next")}
            </Button>
          )}
        </Box>
      </>
    );
  }

  return (
    <PaperExtended title={t("starters_import")}>
      <Stepper activeStep={activeStep}>
        {steps.map((step) => (
          <Step key={step.label}>
            <StepButton>{step.label}</StepButton>
          </Step>
        ))}
      </Stepper>
      <Divider sx={{ mt: 2 }}></Divider>
      {renderContent()}
    </PaperExtended>
  );
}
