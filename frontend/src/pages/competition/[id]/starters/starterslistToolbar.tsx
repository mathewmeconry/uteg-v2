import {
  Button,
  ButtonGroup,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  GridRowId,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  GridValidRowModel,
  GridValueGetterParams,
  gridExpandedSortedRowEntriesSelector,
  useGridApiContext,
} from "@mui/x-data-grid";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Dispatch, SetStateAction, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useTranslation } from "react-i18next";
import * as xlsx from "xlsx";
import { Link, useParams } from "react-router-dom";
import { useModules } from "../../../../hooks/useModules/useModules";
import ListIcon from "@mui/icons-material/List";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { StarterslistDocument } from "../../../../documents/starterslistDocument/starterslistDocument";
import { StarterLink, useCompetitionNameQuery } from "../../../../__generated__/graphql";
import { GridColDefExtension } from "../../../../types/GridColDefExtension";
import UploadIcon from "@mui/icons-material/Upload";
import { usePdfDownload } from "../../../../hooks/usePdfDownload/usePdfDownload";

export function StarterslistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const { t } = useTranslation("common");
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();
  const rows = gridExpandedSortedRowEntriesSelector(gridApi);
  const { id } = useParams();
  const {data: competitionName} = useCompetitionNameQuery({
    variables: {
      id: id!
    }
  })
  const modules = useModules(id!);
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const exportMenuOpen = Boolean(exportAnchorEl);
  const {
    update: pdfUpdate,
    download: pdfDownload,
    loading: pdfLoading,
  } = usePdfDownload({});

  function handleExportClick(event: React.MouseEvent<HTMLButtonElement>) {
    setExportAnchorEl(event.currentTarget);
  }
  function handleExportMenuClose() {
    setExportAnchorEl(null);
  }

  const columns: GridColDefExtension[] = gridApi.current.getAllColumns();

  function exportExcel() {
    const starters = [];
    for (const row of rows) {
      const starter: { [index: string]: string | undefined } = {};
      for (const column of columns) {
        if (column.renderInXlsx && column.valueGetter) {
          starter[column.headerName || "undefined"] = column.valueGetter({
            row: row.model,
          } as GridValueGetterParams);
        }
      }
      starters.push(starter);
    }
    const sheet = xlsx.utils.json_to_sheet(starters);
    const workbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(
      workbook,
      sheet,
      t("starter", { count: starters.length })
    );
    xlsx.writeFile(
      workbook,
      `${t("starter", { count: starters.length })}.xlsx`
    );
    handleExportMenuClose();
  }

  async function exportPdf() {
    await pdfUpdate({
      document: StarterslistDocument({
        starters: rows.map((row) => row.model) as StarterLink[],
        columns,
        competitionName: competitionName?.competition.name || ""
      }),
      filename: `${t("starter", { count: rows.length })}.pdf`,
    });
    pdfDownload();
  }

  return (
    <GridToolbarContainer>
      {selectedRows.size > 0 && (
        <>
          <Tooltip
            title={t("delete_typed", {
              ns: "common",
              count: selectedRows.size,
              type: t("starter", { count: selectedRows.size }),
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
          {...modules.modules.map(
            (module) =>
              module.extensions.starterslistSelectedRowsActions && (
                <module.extensions.starterslistSelectedRowsActions />
              )
          )}
        </>
      )}
      <GridToolbarQuickFilter sx={{ m: 1, flex: 1 }} />
      <ButtonGroup variant="text">
        <GridToolbarDensitySelector />
        <Button
          onClick={handleExportClick}
          size="small"
          aria-controls={exportMenuOpen ? "export-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? "true" : undefined}
          startIcon={<FileDownloadIcon />}
        >
          {t("export")}
        </Button>
        <Menu
          id="export-menu"
          anchorEl={exportAnchorEl}
          open={exportMenuOpen}
          onClose={handleExportMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={exportExcel}>
            <ListItemIcon>
              <ListIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Excel</ListItemText>
          </MenuItem>
          <MenuItem onClick={exportPdf}>
            <ListItemIcon>
              <PictureAsPdfIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>
              {pdfLoading ? <Typography>{t("loading")}</Typography> : "PDF"}
            </ListItemText>
          </MenuItem>
        </Menu>
        <Button
          size="small"
          startIcon={<UploadIcon />}
          component={Link}
          to="import"
        >
          {t("import", { ns: "common" })}
        </Button>
        <Button
          onClick={() => props.openDialog("addStarter")}
          size="small"
          startIcon={<PersonAddIcon />}
        >
          {t("add", { name: t("starter", { count: 1 }) })}
        </Button>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}
