import { Box } from "@mui/material";
import dayjs from "dayjs";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { FormDateInput } from "../../../../components/form/FormDateInput";
import { useWatch } from "react-hook-form";

export function GeneralInformation() {
  const startDate = useWatch({ name: "general.startDate" });

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormTextInput
        name="general.name"
        label="name"
        fieldProps={{ type: "name" }}
        rules={{ required: true }}
      />
      <FormTextInput
        name="general.location"
        label="location"
        fieldProps={{ type: "string" }}
        rules={{ required: true }}
      />
      <FormDateInput
        name="general.startDate"
        label="start_date"
        rules={{ required: true }}
        minDate={dayjs()}
        defaultValue=""
      />
      <FormDateInput
        name="general.endDate"
        label="end_date"
        rules={{ required: true }}
        minDate={dayjs(startDate)}
        defaultValue=""
      />
    </Box>
  );
}
