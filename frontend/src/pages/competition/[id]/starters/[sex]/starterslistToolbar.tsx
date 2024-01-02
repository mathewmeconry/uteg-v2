import { Button, Typography } from "@mui/material";
import {
  GridRowId,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridValidRowModel,
  useGridApiContext,
} from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Dispatch, SetStateAction } from "react";
import DeleteIcon from "@mui/icons-material/Delete";

export function StarterslistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();

  return (
    <GridToolbarContainer>
      {selectedRows.size > 0 && (
        <Button color="error" onClick={() => props.onRowDeletionClick(selectedRows)}>
          <Typography variant="body1"> ({selectedRows.size})</Typography>
          <DeleteIcon />
        </Button>
      )}
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <Button onClick={() => props.openDialog("addStarter")}>
        <PersonAddIcon />
      </Button>
    </GridToolbarContainer>
  );
}
