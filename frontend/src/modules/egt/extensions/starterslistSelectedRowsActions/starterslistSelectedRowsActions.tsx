import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Button, Tooltip, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
import { AssignToDivisionDialog } from "../../dialogs/assignToDivisionDialog/assignToDivisionDialog";
import { StarterLink } from "../../../../__generated__/graphql";
import { MRT_TableInstance } from "material-react-table";

export function StarterslistSelectedRowsActions(props: {
  table: MRT_TableInstance<StarterLink>;
}) {
  const selectedRows = props.table.getSelectedRowModel().rows;
  const { t } = useTranslation(["egt", "common"]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const starters = useMemo(() => {
    const arr: StarterLink[] = [];
    for (const row of selectedRows) {
      if (!arr.includes(row.original)) {
        arr.push(row.original);
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
          size="small"
        >
          <AccountTreeIcon />
          <Typography variant="body1"> ({selectedRows.length})</Typography>
        </Button>
      </Tooltip>
      <AssignToDivisionDialog
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          props.table.resetRowSelection();
        }}
        starters={starters}
      />
    </>
  );
}
