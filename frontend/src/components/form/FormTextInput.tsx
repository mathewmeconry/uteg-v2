import { TextField, TextFieldProps } from "@mui/material";
import { ChangeEvent, PropsWithChildren } from "react";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type FormTextInputProps = PropsWithChildren & {
  name: string;
  fieldProps?: TextFieldProps;
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
    fieldState: { invalid, isTouched, error },
    formState: formState,
  } = useController({
    name: props.name,
    control: formControl,
    rules: props.rules,
  });


  return (
    <TextField
      key={props.name}
      id={props.name}
      label={t(props.name)}
      variant="standard"
      margin="normal"
      fullWidth
      {...props.fieldProps}
      error={invalid && (isTouched || formState.isSubmitted)}
      helperText={error?.message?.toString()}
      onChange={field.onChange}
      inputProps={{ onBlur: field.onBlur }}
      value={field.value}
      ref={field.ref}
    >
      {props.children}
    </TextField>
  );
}
