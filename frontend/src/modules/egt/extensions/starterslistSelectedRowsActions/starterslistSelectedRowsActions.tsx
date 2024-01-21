import { useGridApiContext } from "@mui/x-data-grid";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { AssignToDivisionDialog } from "../../dialogs/assignToDivisionDialog/assignToDivisionDialog";
import { useParams } from "react-router-dom";
import { EgtStarterLink, Sex } from "../../../../__generated__/graphql";

export function StarterslistSelectedRowsActions() {
  const { sex } = useParams();
  const gridApi = useGridApiContext();
  const selectedRows = useMemo(() => gridApi.current.getSelectedRows(), [
    gridApi.current.getSelectedRows(),
  ]);
  const { t } = useTranslation(["egt", "common"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const starters = useMemo(() => {
    const arr: EgtStarterLink[] = [];
    for (const row of selectedRows) {
      if (!arr.includes(row[1].egt)) {
        arr.push(row[1].egt);
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
        sex={sex?.toUpperCase() as Sex}
      />
    </>
  );
}
