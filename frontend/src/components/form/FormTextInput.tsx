import {
  CircularProgress,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { PropsWithChildren, ReactElement } from "react";
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
  labelVariables?: { [index: string]: any };
  fieldProps?: TextFieldProps;
  defaultValue?: string;
  annotation?: string;
  annotationNs?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormTextInput(props: FormTextInputProps) {
  const { control: formControl } = useFormContext();
  const { t } = useTranslation();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: formControl,
    rules: props.rules,
    defaultValue: props.defaultValue ?? "",
  });

  let label: string | ReactElement = t(props.label || props.name, {
    ns: props.ns,
    ...props.labelVariables,
  });
  if (props.annotation) {
    label = (
      <>
        {label}
        <Typography variant="caption" ml={1}>
          {t(props.annotation, { ns: props.annotationNs })}
        </Typography>
      </>
    );
  }

  return (
    <TextField
      key={props.name}
      label={label}
      variant="standard"
      margin="normal"
      fullWidth={props.fullWidth ?? true}
      {...props.fieldProps}
      error={invalid}
      helperText={error?.message?.toString()}
      onChange={field.onChange}
      disabled={props.disabled}
      inputProps={{
        onBlur: field.onBlur,
      }}
      value={field.value}
      ref={field.ref}
      InputProps={{
        endAdornment: props.loading ? <CircularProgress size={20} /> : null,
      }}
    >
      {props.children}
    </TextField>
  );
}
