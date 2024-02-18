import { FormClubAutocomplete } from "../../../../../../components/form/FormClubAutocomplete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, IconButton, Typography, styled } from "@mui/material";
import { useTranslation } from "react-i18next";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ChangeEvent } from "react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

type FileUploadStepProps = {
  onChange: (files: File[]) => void;
  files: File[];
};

export function FileUploadStep(props: FileUploadStepProps) {
  const { t } = useTranslation();
  const { files } = props;

  function renderFile() {
    const filesComponents = files.map((file, index) => {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }} key={index}>
          <AttachFileIcon />
          <Typography>{file.name}</Typography>
          <IconButton
            onClick={() => {
              const filesClone = [...files];
              filesClone.splice(index, 1);
              props.onChange(filesClone);
            }}
          >
            <DeleteOutlineIcon />
          </IconButton>
        </Box>
      );
    });

    return (
      <>
        {filesComponents}
        <Button
          component="label"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
          }}
          fullWidth
        >
          <Typography textAlign="center">
            <UploadFileIcon />
            <Typography>{t("select_file")}</Typography>
          </Typography>
          <VisuallyHiddenInput
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              const chosenFiles: File[] = [];
              if (event.currentTarget.files) {
                for (let i = 0; i < event.currentTarget.files.length; i++) {
                  const item = event.currentTarget.files.item(i);
                  if (item) {
                    chosenFiles.push(item);
                  }
                }
              }
              props.onChange([...files, ...chosenFiles]);
            }}
            multiple
          />
        </Button>
      </>
    );
  }

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormClubAutocomplete rules={{ required: true }} />
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
          border: "1px dashed grey",
          borderRadius: 1,
        }}
      >
        {renderFile()}
      </Box>
      <Typography variant="caption">
        {t("starters_import_file_clarifications")}
        <ul style={{margin: 0}}>
          <li>{t('firstname')}</li>
          <li>{t('lastname')}</li>
          <li>{t('birthyear')}</li>
          <li>{t('sex')}</li>
        </ul>
      </Typography>
    </Box>
  );
}
