import { Typography, Grid, Divider } from "@mui/material";
import { useWatch } from "react-hook-form";
import { Sex } from "../../../../__generated__/graphql";
import { useTranslation } from "react-i18next";

export function EGTSettingsReview() {
  const values = useWatch({ name: "module.egt" });
  const { t } = useTranslation("egt");

  function renderCategory(category: number, sex: Sex, value: any) {
    return (
      <Grid item xs={2} md={1.5}>
        <Divider>
          {t(`category_${category}`, { context: sex.toLowerCase() })}
        </Divider>
        <Typography variant="body2">{t('honourPrecentage')}: {value.honourPrecentage}%</Typography>
      </Grid>
    );
  }

  return (
    <>
      <Typography sx={{ mt: 2, mb: 2 }}>
        {t("categories")} {t("FEMALE", { ns: "common" })}
      </Typography>
      <Grid container spacing={2} justifyContent={"space-around"} sx={{width: 1}}>
        {[1,2,3,4,5,6,7,8].map((key) =>
          renderCategory(
            key,
            "FEMALE",
            values.categories.FEMALE[key]
          )
        )}
      </Grid>
      <Typography sx={{ mt: 4, mb: 2 }}>
        {t("categories")} {t("MALE", { ns: "common" })}
      </Typography>
      <Grid container spacing={2}>
        {[1,2,3,4,5,6,7,8].map((key) =>
          renderCategory(
            key,
            "MALE",
            values.categories.MALE[key]
          )
        )}
      </Grid>
    </>
  );
}
