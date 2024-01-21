import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function Review() {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const formValues = getValues();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <Divider>{t("basic_information")}</Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("name")}</Typography>
          <Typography variant="body2">{formValues.basic.name}</Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("location")}</Typography>
          <Typography variant="body2">{formValues.basic.location}</Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("start_date")}</Typography>
          <Typography variant="body2">
            {formValues.basic.startDate.format("L")}
          </Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("end_date")}</Typography>
          <Typography variant="body2">
            {formValues.basic.endDate.format("L")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("setup")}</Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("ground")}</Typography>
          <Typography variant="body2">{formValues.setup.grounds}</Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">
            {t("module", { count: Object.keys(formValues.setup.modules).length, ns: "common" })}
          </Typography>
          <Typography variant="body2">
            {Object.keys(formValues.setup.modules)
              .filter((key) => formValues.setup.modules[key])
              .map((key: string) => t(key, {ns: key}))
              .join(", ")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>
        {t("settings", { name: t("module", { ns: "common", count: Object.keys(formValues.setup.modules).length }) })}
      </Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("TODO")}</Typography>
          <Typography variant="body2">TODO</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("user", { count: 2 })}</Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("TODO")}</Typography>
          <Typography variant="body2">TODO</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
