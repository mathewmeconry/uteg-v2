import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export function Setup() {
  const { t } = useTranslation();
  const { register, watch, control: formControl } = useFormContext();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormTextInput
        name="grounds"
        fieldProps={{ type: "number" }}
        control={formControl}
        rules={{
          required: true,
          min: 1,
        }}
      />
      <FormControl sx={{ mt: 1 }}>
        <FormLabel>{t("Modules")}</FormLabel>
        <FormControlLabel
          label={t("EGT")}
          value={watch("basic.modules.egt")}
          control={
            <Checkbox defaultChecked {...register("setup.modules.egt")} />
          }
        ></FormControlLabel>
      </FormControl>
    </Box>
  );
}
