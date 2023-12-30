import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export function BasicInformation() {
  const { t } = useTranslation();
  const {
    register,
    watch,
    setValue,
    getValues,
    control: formControl,
    formState: { errors: formErrors },
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormTextInput
        name="email"
        fieldProps={{ type: "email" }}
        control={formControl}
        rules={{ required: true }}
      />
      <FormTextInput
        name="location"
        fieldProps={{ type: "string" }}
        control={formControl}
        rules={{ required: true }}
      />
      <DatePicker
        label={t("Start Date")}
        minDate={dayjs()}
        onChange={(value): void => setValue("basic.startDate", value)}
        value={getValues("basic.startDate")}
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            margin: "normal",
            error: !!formErrors?.basic?.startDate,
            helperText: formErrors?.basic?.startDate?.message?.toString(),
            ...register("basic.startDate", {
              required: true,
              validate: (value: Dayjs) => value.isValid(),
            }),
          },
        }}
      />
      <DatePicker
        label={t("End Date")}
        minDate={watch("basic.startDate") || dayjs()}
        onChange={(value): void => setValue("basic.endDate", value)}
        value={getValues("basic.endDate")}
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            margin: "normal",
            error: !!formErrors?.basic?.endDate,
            helperText: formErrors?.basic?.endDate?.message?.toString(),
            ...register("basic.endDate", {
              required: true,
              validate: (value: Dayjs) =>
                value.isValid() &&
                (value.isSame(getValues("basic.startDate")) ||
                  value.isAfter(getValues("basic.startDate"))),
            }),
          },
        }}
      />
    </Box>
  );
}
