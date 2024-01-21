import { Button, Typography } from "@mui/material";
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

export function DivisionlistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
  onRowStartClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();

  return (
    <GridToolbarContainer>
      {selectedRows.size > 0 && (
        <>
          <Button
            color="error"
            onClick={() => props.onRowDeletionClick(selectedRows)}
          >
            <Typography variant="body1"> ({selectedRows.size})</Typography>
            <DeleteIcon />
          </Button>
          <Button
            color="warning"
            onClick={() => props.onRowStartClick(selectedRows)}
          >
            <Typography variant="body1"> ({selectedRows.size})</Typography>
            <StartIcon />
          </Button>
        </>
      )}
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <Button onClick={() => props.openDialog("createDivision")}>
        <AddIcon />
      </Button>
    </GridToolbarContainer>
  );
}
