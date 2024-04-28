import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip, Typography } from "@mui/material";
import { ReactElement, useMemo, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslation } from "react-i18next";
import { enqueueSnackbar } from "notistack";

export type ClipboardCopyProps = {
  value: string;
};

export default function ClipboardCopy(props: ClipboardCopyProps) {
  const [clicked, setClicked] = useState(false);
  const { t } = useTranslation("common");

  const icon: ReactElement = useMemo(() => {
    if (clicked) {
      return <DoneIcon />;
    }
    return <ContentCopyIcon />;
  }, [clicked]);

  function onClick() {
    setClicked(true);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(props.value);
    } else {
      enqueueSnackbar(t("error"), { variant: "error" });
    }
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }

  if (!navigator.clipboard) {
    return (
      <Typography sx={{ m: 1 }} variant="caption">
        {props.value}
      </Typography>
    );
  }

  return (
    <Tooltip title={t("copy")}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
}
