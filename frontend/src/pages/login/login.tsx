import { useTranslation } from "react-i18next";
import { LandingPageLayout } from "../../layouts/landingpagelayout";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Button, CircularProgress, Divider } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { getToken, isTokenValid } from "../../helpers/auth";
import { useState } from "react";
import { blue } from "@mui/material/colors";
import { enqueueSnackbar } from "notistack";
import { Navigate, useNavigate } from "react-router-dom";

export function Login() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (isTokenValid()) {
    return <Navigate to="/home" replace={true} />;
  }

  async function onSubmit(data: FieldValues) {
    setLoading(true);
    try {
      await getToken(data.email, data.password);
      enqueueSnackbar(t("Logged In"), { variant: "success" });
      navigate("/home");
    } catch (e) {
      if ((e as Error).message === "Unauthorized") {
        enqueueSnackbar(t("Invalid username or password"), {
          variant: "error",
        });
        setLoading(false);
        return;
      }
      enqueueSnackbar(t("Something went wrong... Please try again later"), {
        variant: "error",
      });
    }
    setLoading(false);
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
            error={!!errors.email}
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
            error={!!errors.password}
          />
          <Button type="submit" variant="contained" sx={{ mt: 2, width: 1 }}>
            {loading && (
              <CircularProgress size={24} sx={{ color: blue[500] }} />
            )}
            {!loading && t("Login")}
          </Button>
        </form>
        <Divider variant="middle" sx={{ mt: 2, width: 1 }}>
          {t("or")}
        </Divider>
        <Button href="/register" variant="outlined" sx={{ mt: 2, width: 1 }}>
          {t("Register")}
        </Button>
      </Box>
    </LandingPageLayout>
  );
}
