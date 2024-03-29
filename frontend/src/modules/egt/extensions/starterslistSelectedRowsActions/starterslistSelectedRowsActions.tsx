import { useGridApiContext } from "@mui/x-data-grid";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { AssignToDivisionDialog } from "../../dialogs/assignToDivisionDialog/assignToDivisionDialog";
import { StarterLink } from "../../../../__generated__/graphql";

export function StarterslistSelectedRowsActions() {
  const gridApi = useGridApiContext();
  const selectedRows = useMemo(() => gridApi.current.getSelectedRows(), [
    gridApi.current.getSelectedRows(),
  ]);
  const { t } = useTranslation(["egt", "common"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const starters = useMemo(() => {
    const arr: StarterLink[] = [];
    for (const row of selectedRows) {
      if (!arr.includes(row[1] as StarterLink)) {
        arr.push(row[1] as StarterLink);
      }
    }
    return arr;
  }, [selectedRows]);

  return (
    <>
      <Tooltip
        title={t("assign_to", {
          what: t("starters", { ns: "common" }),
          to: t("division"),
        })}
      >
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <AccountTreeIcon />
          <Typography variant="body1"> ({selectedRows.size})</Typography>
        </Button>
      </Tooltip>
      <AssignToDivisionDialog
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          gridApi.current.setRowSelectionModel([]);
        }}
        starters={starters}
      />
    </>
  );
}
