import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../components/paperExtended";
import { Box, Button, Typography } from "@mui/material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { FormTextInput } from "../../../components/form/FormTextInput";
import { useParams } from "react-router-dom";
import {
  useCompetitionSettingsQuery,
  useCompetitionSettingsUpdateMutation,
} from "../../../__generated__/graphql";
import { FormDateInput } from "../../../components/form/FormDateInput";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";

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
