import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function Review() {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const formValues = getValues();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <Divider>{t("Basic")}</Divider>
      <Grid container>
        <Grid xs={3} item>
          <Typography variant="body1">{t("Name")}</Typography>
          <Typography variant="body2">{formValues.basic.name}</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography variant="body1">{t("Location")}</Typography>
          <Typography variant="body2">{formValues.basic.location}</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography variant="body1">{t("Start Date")}</Typography>
          <Typography variant="body2">
            {formValues.basic.startDate.format("L")}
          </Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography variant="body1">{t("End Date")}</Typography>
          <Typography variant="body2">
            {formValues.basic.endDate.format("L")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("Setup")}</Divider>
      <Grid container>
        <Grid xs={3} item>
          <Typography variant="body1">{t("Grounds")}</Typography>
          <Typography variant="body2">{formValues.setup.grounds}</Typography>
        </Grid>
        <Grid xs={3} item>
          <Typography variant="body1">{t("Modules")}</Typography>
          <Typography variant="body2">
            {Object.keys(formValues.setup.modules)
              .filter((key) => formValues.setup.modules[key])
              .map((key: string) => t(key))
              .join(", ")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("Modules Settings")}</Divider>
      <Grid container>
        <Grid xs={3} item>
          <Typography variant="body1">{t("TODO")}</Typography>
          <Typography variant="body2">TODO</Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("Users")}</Divider>
      <Grid container>
        <Grid xs={3} item>
          <Typography variant="body1">{t("TODO")}</Typography>
          <Typography variant="body2">TODO</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
