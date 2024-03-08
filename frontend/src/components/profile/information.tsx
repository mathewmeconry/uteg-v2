import { Button, Divider, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FormProvider, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "../form/FormTextInput";
import {
  useCurrentUserQuery,
  useUpdateUserMutation,
} from "../../__generated__/graphql";
import { useEffect } from "react";
import { enqueueSnackbar } from "notistack";

export function Information() {
  const {
    data: currentUserData,
    loading: currentUserLoading,
  } = useCurrentUserQuery();
  const [updateUser] = useUpdateUserMutation();
  const { t, i18n } = useTranslation("common");
  const form = useForm();

  useEffect(() => {
    if (currentUserData && currentUserData.currentUser) {
      form.setValue("email", currentUserData.currentUser.email);
      form.setValue("language", currentUserData.currentUser.language);
    }
  }, [currentUserData]);

  async function onSubmit(data: any) {
    if (!currentUserData || !currentUserData.currentUser) {
      enqueueSnackbar(t("error"), { variant: "error" });
      return;
    }

    await updateUser({
      variables: {
        data: {
          id: currentUserData.currentUser.id,
          email: data.email,
          language: data.language,
        },
      },
    });

    enqueueSnackbar(t("updated", { name: data.email }), { variant: "success" });
    i18n.changeLanguage(data.language);
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4">{t("information")}</Typography>
      <Divider sx={{ mb: 2 }} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormTextInput
            name="email"
            rules={{ required: true }}
            defaultValue=""
            loading={currentUserLoading}
          />
          <FormTextInput
            name="language"
            rules={{ required: true }}
            defaultValue=""
            fieldProps={{
              select: true,
            }}
            loading={currentUserLoading}
          >
            <MenuItem value="en">{t("english")}</MenuItem>
            <MenuItem value="de">{t("german")}</MenuItem>
          </FormTextInput>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              type="submit"
              color="success"
              variant="contained"
              sx={{ mt: 2 }}
            >
              {t("save")}
            </Button>
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
}
