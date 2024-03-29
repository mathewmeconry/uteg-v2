import { FormClubAutocomplete } from "../../../../../../components/form/FormClubAutocomplete";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { ChangeEvent, useMemo, DragEvent } from "react";
import VisuallyHiddenInput from "../../../../../../components/form/VisuallyHiddenInput";

type FileUploadStepProps = {
  onChange: (files: File[]) => void;
  files: File[];
};

export function FileUploadStep(props: FileUploadStepProps) {
  const { t } = useTranslation();
  const { files } = props;

  const filesComponents = useMemo(() => {
    if (files.length === 0) {
      return null;
    }

    const filecomps = files.map((file, index) => {
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
        <Typography sx={{ mt: 2 }}>{t("files")}</Typography>
        {filecomps}
      </>
    );
  }, [files]);

  function processFiles(inputFiles: FileList | null | undefined) {
    const chosenFiles: File[] = [];
    if (inputFiles) {
      for (let i = 0; i < inputFiles.length; i++) {
        const item = inputFiles.item(i);
        if (item) {
          chosenFiles.push(item);
        }
      }
    }
    props.onChange([...files, ...chosenFiles]);
  }

  function renderFileUpload() {
    return (
      <Box
        sx={{
          mt: 2,
          minHeight: 250,
          border: "1px dashed grey",
          borderRadius: 1,
        }}
      >
        <Button
          // @ts-expect-error
          component="label"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 250,
          }}
          fullWidth
          onDrop={(event: DragEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            event.stopPropagation();
            processFiles(event.dataTransfer?.files);
          }}
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <Typography textAlign="center">
            <UploadFileIcon />
            <Typography>{t("select_file")}</Typography>
          </Typography>
          <VisuallyHiddenInput
            type="file"
            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              processFiles(event.currentTarget.files);
            }}
            multiple
          />
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", width: 1, flexDirection: "column" }}>
      <FormClubAutocomplete rules={{ required: true }} />
      {filesComponents}
      {renderFileUpload()}
      <Typography variant="caption">
        {t("starters_import_file_clarifications")}
        <ul style={{ margin: 0 }}>
          <li>{t("firstname")}</li>
          <li>{t("lastname")}</li>
          <li>{t("birthyear")}</li>
          <li>{t("sex")}</li>
        </ul>
      </Typography>
    </Box>
  );
}
