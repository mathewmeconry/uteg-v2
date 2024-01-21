import { Button, Tooltip, Typography } from "@mui/material";
import {
  GridRowId,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridValidRowModel,
  useGridApiContext,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import AddIcon from "@mui/icons-material/Add";
import StartIcon from "@mui/icons-material/Start";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";

export function DivisionlistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
  onRowStartClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const { t } = useTranslation("egt");
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();

  return (
    <GridToolbarContainer>
      {selectedRows.size > 0 && (
        <>
          <Tooltip
            title={t("delete_typed", {
              ns: "common",
              count: selectedRows.size,
              type: t("division", { count: selectedRows.size }),
            })}
          >
            <Button
              color="error"
              onClick={() => props.onRowDeletionClick(selectedRows)}
            >
              <DeleteIcon />
              <Typography variant="body1"> ({selectedRows.size})</Typography>
            </Button>
          </Tooltip>
          <Tooltip
            title={t("start_typed", {
              ns: "common",
              count: selectedRows.size,
              type: t("division", { count: selectedRows.size }),
            })}
          >
            <Button
              color="warning"
              onClick={() => props.onRowStartClick(selectedRows)}
            >
              <StartIcon />
              <Typography variant="body1"> ({selectedRows.size})</Typography>
            </Button>
          </Tooltip>
        </>
      )}
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <Tooltip title={t("add", { ns: "common", name: t("division") })}>
        <Button onClick={() => props.openDialog("createDivision")}>
          <AddIcon />
        </Button>
      </Tooltip>
    </GridToolbarContainer>
  );
}
