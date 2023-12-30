import { TextField, TextFieldProps } from "@mui/material";
import { PropsWithChildren } from "react";
import {
  Control,
  FieldValues,
  RegisterOptions,
  useController,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type FormTextInputProps = PropsWithChildren & {
  name: string;
  control: Control<any>;
  fieldProps?: TextFieldProps;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormTextInput(props: FormTextInputProps) {
  const { t } = useTranslation();
  const {
    field,
    fieldState: { invalid, isTouched, error },
  } = useController({
    name: props.name,
    control: props.control,
    rules: props.rules,
  });

  return (
    <TextField
      id={props.name}
      label={t(props.name)}
      variant="standard"
      margin="normal"
      fullWidth
      {...props.fieldProps}
      error={invalid && isTouched}
      helperText={error?.message?.toString()}
      onChange={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
      ref={field.ref}
    >
      {props.children}
    </TextField>
  );
}
