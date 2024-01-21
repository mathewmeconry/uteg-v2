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
  const { t } = useTranslation("egt");
  const { control } = useFormContext();

  let chosenSex = useWatch({ name: props.sexField || "sex", control });
  if (props.sexOverride) {
    chosenSex = props.sexOverride;
  }

  return (
    <FormTextInput
      name={props.name || "category"}
      ns="egt"
      rules={props.rules}
      fieldProps={{
        select: true,
        ...props.fieldProps,
      }}
    >
      <MenuItem value="1">{t("category_1")}</MenuItem>
      <MenuItem value="2">{t("category_2")}</MenuItem>
      <MenuItem value="3">{t("category_3")}</MenuItem>
      <MenuItem value="4">{t("category_4")}</MenuItem>
      <MenuItem value="5">{t("category_5")}</MenuItem>
      <MenuItem value="6">{t("category_6")}</MenuItem>
      <MenuItem value="7">{t("category_7")}</MenuItem>
      <MenuItem value="8">{t(`category_8`, { context: chosenSex?.toLowerCase() })}</MenuItem>
    </FormTextInput>
  );
}
