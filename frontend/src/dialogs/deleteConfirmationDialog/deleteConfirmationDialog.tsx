import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

export type DeleteConfirmationDialogProps = {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
  isOpen: boolean;
};

export function DeleteConfirmationDialog(
  props: DeleteConfirmationDialogProps & PropsWithChildren
) {
  const { t } = useTranslation();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

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
          onClick={props.onConfirm}
        >
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
