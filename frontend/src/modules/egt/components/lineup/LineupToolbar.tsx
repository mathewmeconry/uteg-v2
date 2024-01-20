import { GridToolbarContainer, useGridApiContext } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { Button, CircularProgress } from "@mui/material";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import {
  EgtLineup,
  useAssignEgtLineupMutation,
} from "../../../../__generated__/graphql";

export function LineupToolbar(props: { lineups: EgtLineup[] }) {
  const { t } = useTranslation();
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();
  const [assignMutation] = useAssignEgtLineupMutation();
  const [assigning, setAssigning] = useState(false);

  async function onAssignClick(lineupID: string) {
    setAssigning(true);
    const promises: Promise<any>[] = [];
    selectedRows.forEach((row) => {
      promises.push(
        assignMutation({
          variables: {
            data: {
              id: row.id,
              lineupID: lineupID,
            },
          },
          refetchQueries: ["egtStarterLinkUnassigned", "egtLineup"],
        })
      );
    });
    await Promise.all(promises);
    enqueueSnackbar(t("Starters assigned"), { variant: "success" });
    setAssigning(false);
  }

  function renderAssignButtons() {
    if (selectedRows.size > 0) {
      return props.lineups.map((lineup) => (
        <Button
          key={lineup.id}
          onClick={() => onAssignClick(lineup.id)}
          variant="outlined"
          disabled={assigning}
        >
          {!assigning &&
            t("Assign to device", { device: t(`egt.device.${lineup.device}`) })}
          {assigning && <CircularProgress />}
        </Button>
      ));
    }
    return <></>;
  }

  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      {renderAssignButtons()}
    </GridToolbarContainer>
  );
}
