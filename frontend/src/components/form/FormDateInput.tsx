import { Skeleton, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { ReactElement, useEffect } from "react";
import {
  FieldValues,
  RegisterOptions,
  useController,
  useFormContext,
} from "react-hook-form";
import { useTranslation } from "react-i18next";

export type FormDateInputProps = {
  name: string;
  label?: string;
  ns?: string;
  labelVariables?: { [index: string]: any };
  defaultValue?: Dayjs | "";
  annotation?: string;
  annotationNs?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  initialLoading?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  rules:
    | Omit<
        RegisterOptions<FieldValues, any>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
};

export function FormDateInput(props: FormDateInputProps) {
  const { control: formControl, setValue } = useFormContext();
  const { t } = useTranslation();
  const {
    field,
    fieldState: { invalid, error },
  } = useController({
    name: props.name,
    control: formControl,
    rules: props.rules,
    defaultValue: props.defaultValue ? dayjs(props.defaultValue) : null,
  });

  useEffect(() => {
    if (props.defaultValue) {
      setValue(props.name, dayjs(props.defaultValue));
    }
  }, [props.defaultValue]);

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

  const dateField = (
    <DatePicker
      key={props.name}
      label={label}
      minDate={props.minDate}
      maxDate={props.maxDate}
      onChange={field.onChange}
      value={field.value}
      disabled={props.disabled}
      slotProps={{
        textField: {
          variant: "standard",
          size: "small",
          margin: "normal",
          error: invalid,
          helperText: error?.message?.toString(),
          fullWidth: props.fullWidth,
          sx: {
            paddingLeft: 0,
          },
        },
      }}
    />
  );

  if (props.initialLoading) {
    return (
      <Skeleton variant="text" width={props.fullWidth ? "100%" : "auto"}>
        {dateField}
      </Skeleton>
    );
  }

  return dateField;
}
