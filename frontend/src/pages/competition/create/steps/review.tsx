import { Box, Divider, Grid, Typography } from "@mui/material";
import { useFormContext, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useModules } from "../../../../hooks/useModules/useModules";

export function Review() {
  const { getValues } = useFormContext();
  const { t } = useTranslation();
  const formValues = getValues();
  const moduleSelection = useWatch({ name: "setup.modules" });
  const modules = useModules(
    undefined,
    Object.keys(moduleSelection ?? {}).filter(
      (module) => moduleSelection[module]
    )
  );

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <Divider>{t("general_information")}</Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("name")}</Typography>
          <Typography variant="body2">{formValues.general.name}</Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("location")}</Typography>
          <Typography variant="body2">{formValues.general.location}</Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("start_date")}</Typography>
          <Typography variant="body2">
            {formValues.general.startDate.format("L")}
          </Typography>
        </Grid>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("end_date")}</Typography>
          <Typography variant="body2">
            {formValues.general.endDate.format("L")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>{t("setup")}</Divider>
      <Grid container>
        <Grid xs={6} md={3} item sx={{ mt: 1 }}>
          <Typography variant="body1">{t("ground")}</Typography>
          <Typography variant="body2">{formValues.setup.grounds}</Typography>
        </Grid>
        <Grid xs={12} item sx={{ mt: 1 }}>
          <Typography variant="body1">
            {t("module", {
              count: Object.keys(formValues.setup.modules).length,
              ns: "common",
            })}
          </Typography>
          <Typography variant="body2">
            {modules.modules
              .map((module) => t(module.name, { ns: module.name }))
              .join(", ")}
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ mt: 3 }}>
        {t("settings_named", {
          name: t("module", {
            ns: "common",
            count: Object.keys(formValues.setup.modules).length,
          }),
        })}
      </Divider>
      <Grid container>
        <Grid xs={12} item sx={{ mt: 1 }}>
          {modules.modules.map((module) => {
            if (module.extensions.settingsReview) {
              return (
                <>
                  <Typography variant="body1">
                    {t(module.name, { ns: module.name })}
                  </Typography>
                  <module.extensions.settingsReview />
                </>
              );
            }
          })}
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
