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
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { FileUploadStep } from "./steps/fileUploadStep";
import { StartersReviewStep } from "./steps/startersReviewStep";
import { ClubInput } from "../../../../../components/form/FormClubAutocomplete";
import { PaperExtended } from "../../../../../components/paperExtended";
import { Starter } from "../../../../../__generated__/graphql";
import { processXLSX } from "./processImport";
import { ImportStep } from "./steps/importStep";

export function StartersImport() {
  const { t } = useTranslation();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
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

  useEffect(() => {
    (async function() {
      let starters: Starter[] = [];
      for (const file of files) {
        if (file instanceof File) {
          const url = window.URL.createObjectURL(file);
          const fileFetchResponse = await fetch(url);
          const fileBlob = await fileFetchResponse.blob();
          window.URL.revokeObjectURL(url);
          starters = starters.concat(processXLSX(await fileBlob.arrayBuffer()));
        }
      }
      form.setValue("starters", starters);
      form.trigger();
    })();
  }, [files]);

  const steps = [
    {
      label: t("File upload"),
      component: (
        <FileUploadStep
          files={files}
          onChange={(files: File[]) => setFiles(files)}
        />
      ),
    },
    {
      label: t("Starters"),
      component: <StartersReviewStep />,
    },
    {
      label: t("Import"),
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
            {t("Back")}
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          {activeStep < steps.length - 1 && (
            <Button variant="outlined" onClick={handleNext} sx={{ mr: 1 }}>
              {form.formState.isValidating && <CircularProgress size={24} />}
              {!form.formState.isValidating && t("Next")}
            </Button>
          )}
        </Box>
      </>
    );
  }

  return (
    <PaperExtended title={t("Starters import")}>
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
