import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";

export type DeleteConfirmationDialogProps = {
  title: string;
  onConfirm: () => Promise<void>;
  onCancel: () => void | Promise<void>;
  isOpen: boolean;
};

export function DeleteConfirmationDialog(
  props: DeleteConfirmationDialogProps & PropsWithChildren
) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [deleting, setDeleting] = useState(false);

  async function onConfirm() {
    setDeleting(true);
    await props.onConfirm();
    setDeleting(false);
  }

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onCancel}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      <DialogActions>
        <Button onClick={props.onCancel}>{t("Cancel")}</Button>
        <Button
          variant="contained"
          color="error"
          type="submit"
          onClick={onConfirm}
        >
          {deleting && <CircularProgress size={24} />}
          {!deleting && t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
