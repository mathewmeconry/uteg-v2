import { MenuItem } from "@mui/material";
import { FormTextInput } from "./FormTextInput";
import { useTranslation } from "react-i18next";

export function FormSexSelect() {
  const { t } = useTranslation('common');

  return (
    <FormTextInput
      name="sex"
      rules={{ required: true }}
      fieldProps={{ select: true }}
    >
      <MenuItem value="MALE">{t("male")}</MenuItem>
      <MenuItem value="FEMALE">{t("female")}</MenuItem>
    </FormTextInput>
  );
}
