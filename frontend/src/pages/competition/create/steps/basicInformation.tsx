import { Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export function BasicInformation() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormTextInput
        name="basic.name"
        label="name"
        fieldProps={{ type: "name" }}
        rules={{ required: true }}
      />
      <FormTextInput
        name="basic.location"
        label="location"
        fieldProps={{ type: "string" }}
        rules={{ required: true }}
      />
      <DatePicker
        label={t("start_date")}
        minDate={dayjs()}
        onChange={(value): void => form.setValue("basic.startDate", value)}
        value={form.watch("basic.startDate")}
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            margin: "normal",
            // @ts-expect-error
            error: !!form.formState.errors?.basic?.startDate,
            // @ts-expect-error
            helperText: form.formState.errors?.basic?.startDate?.message?.toString(),
            ...form.register("basic.startDate", {
              required: true,
              validate: (value: Dayjs) => value.isValid(),
            }),
          },
        }}
      />
      <DatePicker
        label={t("end_date")}
        minDate={form.watch("basic.startDate") || dayjs()}
        onChange={(value): void => form.setValue("basic.endDate", value)}
        value={form.getValues("basic.endDate")}
        slotProps={{
          textField: {
            variant: "filled",
            size: "small",
            margin: "normal",
            // @ts-expect-error
            error: !!form.formState.errors?.basic?.endDate,
            // @ts-expect-error
            helperText: form.formState.errors?.basic?.endDate?.message?.toString(),
            ...form.register("basic.endDate", {
              required: true,
              validate: (value: Dayjs) =>
                value.isValid() &&
                (value.isSame(form.getValues("basic.startDate")) ||
                  value.isAfter(form.getValues("basic.startDate"))),
            }),
          },
        }}
      />
    </Box>
  );
}
