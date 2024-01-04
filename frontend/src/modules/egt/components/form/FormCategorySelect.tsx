import { MenuItem } from "@mui/material";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { useTranslation } from "react-i18next";
import { useFormContext } from "react-hook-form";

export function FormCategorySelect() {
  const { t } = useTranslation();
  const { getValues } = useFormContext();

  const chosenSex = getValues("sex");
  return (
    <FormTextInput
      name="category"
      rules={{ required: true }}
      fieldProps={{
        select: true,
      }}
    >
      <MenuItem value="1">{t("egt.category.1")}</MenuItem>
      <MenuItem value="2">{t("egt.category.2")}</MenuItem>
      <MenuItem value="3">{t("egt.category.3")}</MenuItem>
      <MenuItem value="4">{t("egt.category.4")}</MenuItem>
      <MenuItem value="5">{t("egt.category.5")}</MenuItem>
      <MenuItem value="6">{t("egt.category.6")}</MenuItem>
      <MenuItem value="7">{t("egt.category.7")}</MenuItem>
      <MenuItem value="8">
        {chosenSex ? t(`egt.category.8.${chosenSex}`) : t("egt.category.8")}
      </MenuItem>
    </FormTextInput>
  );
}
