import { useTranslation } from "react-i18next";
import { LandingPageLayout } from "../../layouts/landingpagelayout.tsx";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Divider } from "@mui/material";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../__generated__/graphql.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getToken, isTokenValid } from "../../helpers/auth.ts";
import { FormTextInput } from "../../components/form/FormTextInput.tsx";

export function Register() {
  const [createUser, { loading, error }] = useCreateUserMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const form = useForm();

  if (isTokenValid()) {
    return <Navigate to="/home" replace={true} />;
  }

  async function onSubmit(data: FieldValues) {
    await form.trigger();
    if (!form.formState.isValid) {
      return;
    }

    if (data.password !== data.passwordRepeat) {
      form.setError("password", {
        message: t("Passwords don't match"),
      });
      form.setError("passwordRepeat", {
        message: t("Passwords don't match"),
      });
      return;
    }

    try {
      await createUser({
        variables: {
          email: data.email,
          password: data.password,
        },
      });
      await getToken(data.email, data.password);
      enqueueSnackbar(t("User created"), {
        variant: "success",
      });
      navigate("/home");
    } catch {
      if (error?.message.includes("Duplicate entry")) {
        form.setError("email", {
          message: t("E-Mail already exists"),
        });
      }
    }
  }

  return (
    <LandingPageLayout>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          alignSelf: "center",
          flexDirection: "column",
          width: 1,
        }}
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormTextInput
              name="email"
              fieldProps={{ type: "email" }}
              rules={{ required: true }}
            />
            <FormTextInput
              name="password"
              fieldProps={{ type: "password" }}
              rules={{ required: true }}
            />
            <FormTextInput
              name="passwordRepeat"
              fieldProps={{ type: "password" }}
              rules={{ required: true }}
            />
            <Button type="submit" variant="contained" sx={{ mt: 2, width: 1 }}>
              {loading && <CircularProgress />}
              {!loading && t("Register")}
            </Button>
          </form>
        </FormProvider>
        <Divider variant="middle" sx={{ mt: 2, width: 1 }}>
          {t("or")}
        </Divider>
        <Button href="/login" variant="outlined" sx={{ mt: 2, width: 1 }}>
          {t("Login")}
        </Button>
      </Box>
    </LandingPageLayout>
  );
}
