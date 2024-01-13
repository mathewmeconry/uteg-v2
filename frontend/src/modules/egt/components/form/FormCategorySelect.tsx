import { MenuItem, TextFieldProps } from "@mui/material";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { useTranslation } from "react-i18next";
import {
  FieldValues,
  RegisterOptions,
  useFormContext,
  useWatch,
} from "react-hook-form";

export type EGTFormCategorySelectProps = {
  sexField?: string;
  sexOverride?: string;
  fieldProps?: TextFieldProps;
  name?: string;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormCategorySelect(props: EGTFormCategorySelectProps) {
  const { t } = useTranslation();
  const { control } = useFormContext();

  let chosenSex = useWatch({ name: props.sexField || "sex", control });
  if (props.sexOverride) {
    chosenSex = props.sexOverride;
  }

  return (
    <FormTextInput
      name={props.name || "category"}
      rules={props.rules}
      fieldProps={{
        select: true,
        ...props.fieldProps,
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
