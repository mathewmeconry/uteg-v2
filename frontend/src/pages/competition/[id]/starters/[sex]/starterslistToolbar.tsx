import { Button, ButtonGroup, Typography } from "@mui/material";
import {
  GridRowId,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridValidRowModel,
  gridExpandedSortedRowEntriesSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Dispatch, SetStateAction } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useTranslation } from "react-i18next";
import * as xlsx from "xlsx";

export function StarterslistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const { t } = useTranslation();
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();

  function onExportClick() {
    const rows = gridExpandedSortedRowEntriesSelector(gridApi);
    const columns = gridApi.current.getAllColumns();
    const starters = [];
    for (const row of rows) {
      const starter: { [index: string]: string | undefined } = {};
      for (const column of columns) {
        if (["__check__", "actions"].includes(column.field)) {
          continue;
        }
        if (column.valueGetter) {
          starter[column.headerName || "undefined"] = column.valueGetter({
            row: row.model,
          });
        }
      }
      starters.push(starter);
    }

    const sheet = xlsx.utils.json_to_sheet(starters);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(workbook, sheet, t("Starters"));
    xlsx.writeFile(workbook, `${t('Starters')}.xlsx`);
  }

  return (
    <GridToolbarContainer>
      {selectedRows.size > 0 && (
        <Button
          color="error"
          onClick={() => props.onRowDeletionClick(selectedRows)}
        >
          <Typography variant="body1"> ({selectedRows.size})</Typography>
          <DeleteIcon />
        </Button>
      )}
      <GridToolbarQuickFilter sx={{ m: 1, flex: 1 }} />
      <ButtonGroup variant="text">
        <GridToolbarDensitySelector />
        <Button onClick={onExportClick} size="small">
          <FileDownloadIcon />
          {t("Export")}
        </Button>
        <Button onClick={() => props.openDialog("addStarter")} size="small">
          <PersonAddIcon />
          {t("Add Starter")}
        </Button>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}
