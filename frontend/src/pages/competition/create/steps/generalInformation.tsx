import { Box, Button, ButtonGroup, InputLabel } from "@mui/material";
import dayjs from "dayjs";
import { FormTextInput } from "../../../../components/form/FormTextInput";
import { FormDateInput } from "../../../../components/form/FormDateInput";
import { useFormContext, useWatch } from "react-hook-form";
import VisuallyHiddenInput from "../../../../components/form/VisuallyHiddenInput";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export function GeneralInformation() {
  const startDate = useWatch({ name: "general.startDate" });
  const logo: FileList = useWatch({ name: "general.logo" });
  const { control: formControl, setValue } = useFormContext();
  const { t } = useTranslation("common");
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    if (logo) {
      setLogoUrl(URL.createObjectURL(logo[0]));
    }
    return () => URL.revokeObjectURL(logoUrl);
  }, [logo]);

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
      <InputLabel shrink htmlFor="logo-upload" sx={{ mt: 2 }}>
        {t("logo", { ns: "common" })}
      </InputLabel>
      {logo && (
        <img
          style={{
            display: "block",
            objectFit: "contain",
            alignSelf: "flex-start",
          }}
          height={100}
          src={logoUrl}
        />
      )}
      <ButtonGroup sx={{ mt: 2 }}>
        <Button variant="contained" component="label">
          <FileUploadIcon />
          <VisuallyHiddenInput
            id="logo-upload"
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            {...formControl.register("general.logo")}
          />
        </Button>
        {logo && (
          <Button
            variant="contained"
            color="error"
            onClick={() => setValue("general.logo", null)}
          >
            <DeleteForeverIcon />
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
