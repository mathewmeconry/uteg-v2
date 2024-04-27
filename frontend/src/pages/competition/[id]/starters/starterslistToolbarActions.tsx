import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Dispatch, SetStateAction, useState } from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useTranslation } from "react-i18next";
import * as xlsx from "xlsx";
import { Link, useParams } from "react-router-dom";
import ListIcon from "@mui/icons-material/List";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { StarterslistDocument } from "../../../../documents/starterslistDocument/starterslistDocument";
import {
  StarterLink,
  useCompetitionNameQuery,
} from "../../../../__generated__/graphql";
import UploadIcon from "@mui/icons-material/Upload";
import { usePdfDownload } from "../../../../hooks/usePdfDownload/usePdfDownload";
import {
  MRT_ShowHideColumnsButton,
  MRT_TableInstance,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
} from "material-react-table";
import { MRT_ColumnDefExtension } from "../../../../types/MRT_ColumnDefExtension";

export function StarterslistToolbarActions(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  table: MRT_TableInstance<StarterLink>;
}) {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const { data: competitionName } = useCompetitionNameQuery({
    variables: {
      id: id!,
    },
  });
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

  function exportExcel() {
    const starters = [];
    for (const row of props.table.getFilteredRowModel().rows) {
      const starter: { [index: string]: string | undefined } = {};
      for (const cell of row.getAllCells()) {
        const columnDef = cell.column.columnDef as MRT_ColumnDefExtension<
          StarterLink
        >;
        if (columnDef.renderInXlsx) {
          starter[columnDef.header] = cell.renderValue() as string;
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
    const rows = props.table.getFilteredRowModel().rows;
    await pdfUpdate({
      document: StarterslistDocument({
        starters: rows,
        columns: props.table
          .getAllColumns()
          .map((column) => column.columnDef) as MRT_ColumnDefExtension<
          StarterLink
        >[],
        competitionName: competitionName?.competition.name || "",
      }),
      filename: `${t("starter", { count: rows.length })}.pdf`,
    });
    pdfDownload();
    handleExportMenuClose();
  }

  return (
    <>
      <Tooltip title={t("add", { name: t("starter", { count: 1 }) })}>
        <IconButton onClick={() => props.openDialog("addStarter")} size="small">
          <PersonAddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("import", { ns: "common" })}>
        <IconButton size="small" component={Link} to="import">
          <UploadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={t("export")}>
        <IconButton
          onClick={handleExportClick}
          size="small"
          aria-controls={exportMenuOpen ? "export-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={exportMenuOpen ? "true" : undefined}
        >
          <FileDownloadIcon />
        </IconButton>
      </Tooltip>
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
      <MRT_ShowHideColumnsButton table={props.table} />
      <MRT_ToggleDensePaddingButton table={props.table} />
      <MRT_ToggleFullScreenButton table={props.table} />
    </>
  );
}
