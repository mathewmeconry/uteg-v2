import {
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  CircularProgress,
  DialogActions,
  ListItem,
  List,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components";
import {
  EgtDivision,
  useUpdateEgtDivisionStateMutation,
} from "../../../../__generated__/graphql";
import { useState } from "react";

export type StartDivisionDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  divisions: EgtDivision[];
};

export function StartDivisionsDialog(props: StartDivisionDialogProps) {
  const { t } = useTranslation(["common", "egt"]);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [updateDivisionStateMutation] = useUpdateEgtDivisionStateMutation();

  async function handleSubmit() {
    setLoading(true);
    for (const division of props.divisions) {
      await updateDivisionStateMutation({
        variables: {
          data: {
            id: division.id,
            state: "RUNNING",
            currentRound: 0,
          },
        },
      });
    }
    props.onClose();
    setLoading(false);
  }

  function handleCancel() {
    props.onClose();
  }

  return (
    <Dialog open={props.isOpen} fullScreen={fullScreen} maxWidth="sm" fullWidth>
      <DialogTitle>
        {t("start", { name: t("division", { ns: "egt" }) })}
      </DialogTitle>
      <DialogContent>
        <Typography>{t("start_confirmation", { ns: "common" })}</Typography>
        <List>
          {props.divisions.map((division) => (
            <ListItem key={division.id}>
              {t(`category_${division.category}`, {
                context: division.sex.toLowerCase(),
                ns: "egt",
              })}{" "}
              ({t(division.sex, { ns: "common" })}) #{division.number}
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t("cancel")}</Button>
        <Button
          variant="contained"
          color="warning"
          type="submit"
          onClick={handleSubmit}
        >
          {loading && <CircularProgress size={24} />}
          {!loading &&
            t("start", {
              name: t("division", { count: props.divisions.length, ns: "egt" }),
            })}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
