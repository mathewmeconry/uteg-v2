import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { Sex } from "../../../../__generated__/graphql";

export function EGTSettings() {
  const { t } = useTranslation(["egt", "common"]);

  function renderCategory(category: number, sex: Sex) {
    return (
      <Grid item xs={2} md={1.5}>
        <Typography>
          {t(`category_${category + 1}`, { context: sex.toLowerCase() })}
          <FormTextInput
            name={`module.egt.categories.${sex}.${category}.honourPrecentage`}
            defaultValue="33"
            label={t(`honourPrecentage`)}
            endAdornment="%"
            rules={{ required: true }}
          />
        </Typography>
      </Grid>
    );
  }

  return (
    <>
      <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
        {t("categories")} {t("FEMALE", { ns: "common" })}
      </Typography>
      <Grid container spacing={2}>
        {[...Array(8).keys()].map((key) => renderCategory(key, "FEMALE"))}
      </Grid>

      <Typography sx={{ mt: 2, mb: 2 }} variant="h6">
        {t("categories")} {t("MALE", { ns: "common" })}
      </Typography>
      <Grid container spacing={2}>
        {[...Array(8).keys()].map((key) => renderCategory(key, "MALE"))}
      </Grid>
    </>
  );
}
