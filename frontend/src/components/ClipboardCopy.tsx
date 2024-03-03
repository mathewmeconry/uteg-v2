import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@mui/material";
import { ReactElement, useMemo, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { useTranslation } from "react-i18next";

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
    navigator.clipboard.writeText(props.value);
    setTimeout(() => {
      setClicked(false);
    }, 1000);
  }

  return (
    <Tooltip title={t("copy")}>
      <IconButton onClick={onClick}>{icon}</IconButton>
    </Tooltip>
  );
}
