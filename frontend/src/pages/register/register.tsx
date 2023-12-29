import { useTranslation } from "react-i18next";
import { LandingPageLayout } from "../../layouts/landingpagelayout.tsx";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Divider } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../../__generated__/graphql.ts";
import { Navigate, useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { getToken, isTokenValid } from "../../helpers/auth.ts";

export function Register() {
  const [createUser, { loading, error }] = useCreateUserMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors: formErrors, isValid: formIsValid },
  } = useForm();

  if (isTokenValid()) {
    return <Navigate to="/home" replace={true} />;
  }

  async function onSubmit(data: FieldValues) {
    await trigger();
    if (!formIsValid) {
      return;
    }

    if (data.password !== data.passwordRepeat) {
      setError("password", {
        message: t("Passwords don't match"),
      });
      setError("passwordRepeat", {
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
        setError("email", {
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id="email"
            type="email"
            label={t("E-Mail")}
            variant="standard"
            margin="normal"
            fullWidth
            required={true}
            {...register("email")}
            error={!!formErrors.email}
            helperText={formErrors.email?.message?.toString()}
          />
          <TextField
            id="password"
            type="password"
            label={t("Password")}
            variant="standard"
            margin="normal"
            fullWidth
            required={true}
            {...register("password")}
            error={!!formErrors.password}
          />
          <TextField
            id="passwordRepeat"
            type="password"
            label={t("Repeat Password")}
            variant="standard"
            margin="normal"
            fullWidth
            required={true}
            {...register("passwordRepeat")}
            error={!!formErrors.passwordRepeat}
            helperText={formErrors.passwordRepeat?.message?.toString()}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2, width: 1 }}>
            {loading && <CircularProgress />}
            {!loading && t("Register")}
          </Button>
        </form>
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
