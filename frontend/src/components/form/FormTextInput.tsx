import { TextField, TextFieldProps } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type FormTextInputProps = PropsWithChildren & {
  name: string;
  label?: string;
  ns?: string;
  fieldProps?: TextFieldProps;
  defaultValue?: string;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormTextInput(props: FormTextInputProps) {
  const { control: formControl, trigger: formTrigger } = useFormContext();
  const { t } = useTranslation();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: formControl,
    rules: props.rules,
    defaultValue: props.defaultValue,
  });

  return (
    <TextField
      key={props.name}
      id={props.name}
      label={t(props.label || props.name, { ns : props.ns })}
      variant="standard"
      margin="normal"
      fullWidth
      {...props.fieldProps}
      error={invalid}
      helperText={error?.message?.toString()}
      onChange={field.onChange}
      inputProps={{
        onBlur: field.onBlur,
      }}
      value={field.value}
      ref={field.ref}
    >
      {props.children}
    </TextField>
  );
}
