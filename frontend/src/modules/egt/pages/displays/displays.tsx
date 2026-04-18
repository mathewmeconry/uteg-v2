import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import {
  Displaytoken,
  useEgtDisplaysCreateTokenMutation,
  useEgtDisplaysDeleteTokenMutation,
  useEgtDisplaysGroundsQuery,
  useEgtDisplaysResetTokenMutation,
  useEgtDisplaysTokensQuery,
} from "../../../../__generated__/graphql";
import { useParams } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  LinearProgress,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";
import ClipboardCopy from "../../../../components/ClipboardCopy";
import LockResetIcon from "@mui/icons-material/LockReset";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";

export default function Displays() {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const [createOpen, setCreateOpen] = useState(false);
  const { data, loading, error, refetch } = useEgtDisplaysTokensQuery({
    variables: {
      competitionID: id!,
    },
  });
  const {
    data: groundsData,
    loading: groundsLoading,
    error: groundsError,
  } = useEgtDisplaysGroundsQuery({
    variables: {
      id: id!,
    },
  });
  const [createToken] = useEgtDisplaysCreateTokenMutation();

  async function create(ground: number) {
    await createToken({
      variables: {
        competitionID: id!,
        ground,
      },
    });
    enqueueSnackbar(t("common:has_been_added", { name: t("common:token") }), {
      variant: "success",
    });
    setCreateOpen(false);
    await refetch();
  }

  const actions = [];
  actions.push(
    <Button key={"create"} onClick={() => setCreateOpen(true)}>
      {t("common:create")}
    </Button>,
  );

  if (loading || groundsLoading) {
    return (
      <PaperExtended title={t("displays")}>
        <LinearProgress />
      </PaperExtended>
    );
  }

  if (!data?.displayTokens || data.displayTokens.length === 0) {
    return (
      <>
        <PaperExtended title={t("displays")} actions={actions}>
          <p>{t("egt:no_displays")}</p>
        </PaperExtended>

        <CreateDialog
          open={createOpen}
          onClose={() => setCreateOpen(false)}
          grounds={groundsData?.competition.grounds || 0}
          onCreate={create}
        />
      </>
    );
  }

  return (
    <>
      <PaperExtended title={t("displays")} actions={actions}>
        <Table>
          <TableHead>
            <TableCell>{t("common:token")}</TableCell>
            <TableCell>{t("common:ground")}</TableCell>
            <TableCell></TableCell>
          </TableHead>
          {data?.displayTokens.map((token) => (
            <DisplayToken key={token.id} token={token} refetch={refetch} />
          ))}
        </Table>
      </PaperExtended>
      <CreateDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        grounds={groundsData?.competition.grounds || 0}
        onCreate={create}
      />
    </>
  );
}

function DisplayToken({
  token,
  refetch,
}: {
  token: Displaytoken;
  refetch: () => void;
}) {
  const { t } = useTranslation(["egt", "common"]);
  const [resetToken, { loading: resetLoading }] =
    useEgtDisplaysResetTokenMutation();
  const [deleteToken, { loading: deleteLoading }] =
    useEgtDisplaysDeleteTokenMutation();

  const loading = resetLoading || deleteLoading;

  return (
    <TableRow>
      <TableCell>{token.token}</TableCell>
      <TableCell>{token.ground}</TableCell>
      <TableCell>
        <ClipboardCopy
          value={`${document.location.origin}/egt/display/${encodeURIComponent(token.token)}`}
          disabled={loading}
        />
        <IconButton
          disabled={loading}
          onClick={async () => {
            await resetToken({
              variables: {
                id: token.id,
              },
            });
            enqueueSnackbar(
              t("common:has_been_reset", { name: t("common:token") }),
              {
                variant: "success",
              },
            );
            await refetch();
          }}
        >
          <LockResetIcon />
        </IconButton>
        <IconButton
          disabled={loading}
          onClick={async () => {
            await deleteToken({
              variables: {
                id: token.id,
              },
            });
            enqueueSnackbar(
              t("common:has_been_deleted", { name: t("common:token") }),
              { variant: "success" },
            );
            await refetch();
          }}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function CreateDialog({
  open,
  onClose,
  grounds,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  grounds: number;
  onCreate: (ground: number) => void;
}) {
  const { t } = useTranslation(["egt", "common"]);
  const [selectedGround, setSelectedGround] = useState(0);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{t("create_display_token")}</DialogTitle>
      <DialogContent>
        <p>{t("common:ground")}</p>
        <Select
          value={selectedGround}
          onChange={(e) => setSelectedGround(e.target.value as number)}
          fullWidth
        >
          {Array.from({ length: grounds || 0 }, (_, i) => i + 1).map(
            (ground) => (
              <MenuItem key={ground} value={ground}>
                {ground}
              </MenuItem>
            ),
          )}
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onCreate(selectedGround)}>
          {t("common:create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
