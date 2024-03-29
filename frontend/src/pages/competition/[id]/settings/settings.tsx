import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  InputLabel,
  Typography,
} from "@mui/material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { useParams } from "react-router-dom";
import {
  useCompetitionSettingsLogoUpdateMutation,
  useCompetitionSettingsQuery,
  useCompetitionSettingsUpdateMutation,
} from "../../../../__generated__/graphql";
import { FormDateInput } from "../../../../components/form/FormDateInput";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VisuallyHiddenInput from "../../../../components/form/VisuallyHiddenInput";
import { ChangeEvent } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export function Settings() {
  const { t } = useTranslation("common");
  const form = useForm();
  const { id } = useParams();
  const {
    data: competitionData,
    loading: competitionLoading,
  } = useCompetitionSettingsQuery({
    variables: {
      id: id!,
    },
  });

  const [
    updateCompetitionLogoMutation,
    { loading: logoUpdating },
  ] = useCompetitionSettingsLogoUpdateMutation();
  const [updateCompetitionMutation] = useCompetitionSettingsUpdateMutation();

  async function onSubmit(values: FieldValues) {
    try {
      await updateCompetitionMutation({
        variables: {
          id: id!,
          data: {
            name: values.name,
            location: values.location,
            startDate: values.startDate,
            endDate: values.endDate,
            grounds: parseInt(values.grounds),
          },
        },
      });
      enqueueSnackbar(t("updated", { name: values.name }), {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(t("error"), {
        variant: "error",
      });
    }
  }

  async function onLogoUpdate(file: File) {
    try {
      await updateCompetitionLogoMutation({
        variables: {
          id: id!,
          logo: file,
        },
        refetchQueries: ["competitionSettings"],
      });

      enqueueSnackbar(t("updated", { name: t("logo") }), {
        variant: "success",
      });
    } catch {
      enqueueSnackbar(t("error"), {
        variant: "error",
      });
    }
  }

  async function deleteLogo() {
    try {
      await updateCompetitionMutation({
        variables: {
          id: id!,
          data: {
            deleteLogo: true,
          },
        },
        refetchQueries: ["competitionSettings"],
      });
      enqueueSnackbar(t("deleted", { name: t("logo") }), {
        variant: "success",
      });
    } catch (e) {
      console.error(e);
      enqueueSnackbar(t("error"), {
        variant: "error",
      });
    }
  }

  return (
    <PaperExtended title={t("settings")}>
      <Typography variant="h5">{t("general")}</Typography>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextInput
            name="name"
            rules={{ required: true }}
            initialLoading={competitionLoading}
            defaultValue={competitionData?.competition?.name}
          />
          <FormTextInput
            name="location"
            rules={{ required: true }}
            initialLoading={competitionLoading}
            defaultValue={competitionData?.competition?.location}
          />
          <FormDateInput
            name="start_date"
            rules={{ required: true }}
            minDate={dayjs()}
            initialLoading={competitionLoading}
            defaultValue={dayjs(
              parseInt(competitionData?.competition?.startDate ?? "")
            )}
            fullWidth
          />
          <FormDateInput
            name="end_date"
            rules={{ required: true }}
            minDate={dayjs()}
            initialLoading={competitionLoading}
            defaultValue={dayjs(
              parseInt(competitionData?.competition?.endDate ?? "")
            )}
            fullWidth
          />
          <FormTextInput
            name="grounds"
            rules={{ required: true }}
            initialLoading={competitionLoading}
            defaultValue={competitionData?.competition?.grounds.toString()}
          />
          <InputLabel shrink htmlFor="logo-upload" sx={{ mt: 2 }}>
            {t("logo", { ns: "common" })}
          </InputLabel>
          {competitionData?.competition?.logo && (
            <img
              style={{ display: "block" }}
              height={100}
              src={`${import.meta.env.VITE_BACKEND_URI}/${
                competitionData?.competition?.logo
              }`}
            />
          )}
          <ButtonGroup sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              disabled={logoUpdating}
            >
              {logoUpdating && <CircularProgress size={24} color="inherit" />}
              {!logoUpdating && <FileUploadIcon />}
              <VisuallyHiddenInput
                id="logo-upload"
                type="file"
                accept="image/png,image/jpeg,image/svg+xml"
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (event.target.files) {
                    const file = event.target.files[0];
                    onLogoUpdate(file);
                  }
                  event.target.value = "";
                }}
              />
            </Button>
            {competitionData?.competition.logo && (
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteLogo()}
              >
                <DeleteForeverIcon />
              </Button>
            )}
          </ButtonGroup>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="contained" type="submit" color="success">
              {t("save")}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </PaperExtended>
  );
}
