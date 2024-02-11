import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
} from "@mui/material";
import { FormProvider, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { FormTextInput } from "../../../../components/form/FormTextInput";

export function Setup() {
  const { t } = useTranslation();
  const form = useFormContext();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormProvider {...form}>
        <FormTextInput
          name="setup.grounds"
          label="grounds"
          fieldProps={{ type: "number" }}
          rules={{
            required: true,
            min: 1,
          }}
        />
        <FormControl sx={{ mt: 1 }}>
          <FormLabel>{t("module", { count: 2 })}</FormLabel>
          <FormControlLabel
            label={t("egt", { ns: "egt" })}
            value={form.watch("basic.modules.egt")}
            control={
              <Checkbox
                defaultChecked
                {...form.register("setup.modules.egt")}
              />
            }
          ></FormControlLabel>
        </FormControl>
      </FormProvider>
    </Box>
  );
}
