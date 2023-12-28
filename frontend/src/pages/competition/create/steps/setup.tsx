import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

export function Setup() {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors: formErrors },
    watch,
  } = useFormContext();

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <TextField
        id="grounds"
        type="number"
        label={t("Grounds")}
        variant="filled"
        size="small"
        margin="normal"
        {...register("setup.grounds", {
          required: true,
          min: 1,
          valueAsNumber: true,
        })}
        error={!!formErrors?.setup?.grounds}
        helperText={formErrors?.setup?.grounds?.message?.toString()}
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
