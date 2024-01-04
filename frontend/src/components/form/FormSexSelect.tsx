import { MenuItem } from "@mui/material";
import { FormTextInput } from "./FormTextInput";
import { useTranslation } from "react-i18next";

export function FormSexSelect() {
  const { t } = useTranslation();

  return (
    <FormTextInput
      name="sex"
      rules={{ required: true }}
      fieldProps={{ select: true }}
    >
      <MenuItem value="MALE">{t("Male")}</MenuItem>
      <MenuItem value="FEMALE">{t("Female")}</MenuItem>
    </FormTextInput>
  );
}
