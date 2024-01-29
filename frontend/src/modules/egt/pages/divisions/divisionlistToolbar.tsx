import {
  Button,
  ButtonGroup,
  LinearProgress,
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
  useGridApiContext,
} from "@mui/x-data-grid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import StartIcon from "@mui/icons-material/Start";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useParams } from "react-router-dom";
import {
  EgtDivisionJudgingQueryHookResult,
  useCompetitionGroundsQuery,
  useEgtDevicesJudgingLazyQuery,
  useEgtDivisionJudgingLazyQuery,
  useEgtDivisionsIdsLazyQuery,
} from "../../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { usePDF } from "@react-pdf/renderer";
import { JudgingDocument } from "../../documents/jugingDocument/judgingDocument";
import dayjs from "dayjs";

export function DivisionlistToolbar(props: {
  openDialog: Dispatch<SetStateAction<string>>;
  onRowDeletionClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
  onRowStartClick: (rows: Map<GridRowId, GridValidRowModel>) => void;
}) {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const gridApi = useGridApiContext();
  const selectedRows = gridApi.current.getSelectedRows();
  const [exportAnchorEl, setExportAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const exportMenuOpen = Boolean(exportAnchorEl);
  const [downloadingPdf, setDownloadingPdf] = useState(0);
  const [pdfUpdatePending, setPdfUpdatePending] = useState(false);
  const {
    data: competition,
    loading: competitionLoading,
  } = useCompetitionGroundsQuery({
    variables: {
      id: id!,
    },
  });
  const [divisionsQuery] = useEgtDivisionsIdsLazyQuery({
    fetchPolicy: "network-only",
  });
  const [judingQuery] = useEgtDivisionJudgingLazyQuery({
    fetchPolicy: "network-only",
  });
  let [pdfInstance, updatePdfInstance] = usePDF();

  function handleExportClick(event: React.MouseEvent<HTMLButtonElement>) {
    setExportAnchorEl(event.currentTarget);
  }

  function handleExportMenuClose() {
    setExportAnchorEl(null);
  }

  async function exportGroundPdf(ground: number) {
    setDownloadingPdf(ground);

    const divisions = await divisionsQuery({
      variables: {
        filter: {
          competitionID: id!,
          ground: ground,
          state: "RUNNING",
        },
      },
    });

    if (divisions.error) {
      enqueueSnackbar(t("error", { ns: "common" }), { variant: "error" });
      setDownloadingPdf(0);
      return;
    }

    const divisionIds = divisions.data?.egtDivisions
      .map((d) => d.id)
      .filter((d) => !!d);

    await exportDivisionsLineupPdf(divisionIds);

    setDownloadingPdf(0);
  }

  async function exportDivisionSelectionPdf(
    rows: Map<GridRowId, GridValidRowModel>
  ) {
    let divisionIds: string[] = [];
    for (const row of rows) {
      divisionIds.push(row[1].id);
    }

    await exportDivisionsLineupPdf(divisionIds);
  }

  async function exportDivisionsLineupPdf(divisionIds: string[] | undefined) {
    setPdfUpdatePending(true);

    if (!divisionIds || divisionIds.length === 0) {
      enqueueSnackbar(t("no_started", { name: t("division", { count: 1 }) }), {
        variant: "error",
      });
      return;
    }

    const rounds: EgtDivisionJudgingQueryHookResult[] = [];
    for (let i = 0; i < 5; i++) {
      const judging = await judingQuery({
        variables: {
          ids: divisionIds,
          round: i,
        },
      });

      if (judging.error) {
        enqueueSnackbar(t("error", { ns: "common" }));
        return;
      }

      if (judging.data?.egtJudgingDevices) {
        rounds.push(judging);
      }
    }

    updatePdfInstance(<JudgingDocument rounds={rounds} t={t} />);
    setPdfUpdatePending(false);
  }

  useEffect(() => {
    if (pdfInstance.loading || !pdfInstance.url || pdfUpdatePending) {
      return;
    }

    const link = document.createElement("a");
    link.href = pdfInstance.url;
    link.setAttribute(
      "download",
      `${t("ground_typed", {
        ns: "common",
        name: downloadingPdf,
      })} - ${dayjs().format("L LT")}.pdf`
    );

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode?.removeChild(link);

    setDownloadingPdf(0);
  }, [pdfInstance, pdfUpdatePending]);

  useEffect(() => {
    if (downloadingPdf === 0) {
      handleExportMenuClose();
    }
  }, [downloadingPdf]);

  function renderExportMenuItems() {
    if (competitionLoading) {
      return <LinearProgress />;
    }

    const { grounds } = competition!.competition;
    const menuItems: JSX.Element[] = [];
    for (let i = 1; i <= grounds; i++) {
      menuItems.push(
        <MenuItem onClick={() => exportGroundPdf(i)}>
          <ListItemIcon>
            <PictureAsPdfIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {downloadingPdf === i ? (
              <LinearProgress sx={{ width: "10vw" }} />
            ) : (
              t("ground_typed", { ns: "common", name: i })
            )}
          </ListItemText>
        </MenuItem>
      );
    }
    return menuItems;
  }

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
          <Tooltip
            title={t("juging_report", {
              ns: "common",
              count: selectedRows.size,
              type: t("division", { count: selectedRows.size }),
            })}
          >
            {pdfUpdatePending && <LinearProgress sx={{ width: "5vw" }} />}
            {!pdfUpdatePending && (
              <Button
                color="primary"
                onClick={() => exportDivisionSelectionPdf(selectedRows)}
              >
                <FileDownloadIcon />
                <Typography variant="body1"> ({selectedRows.size})</Typography>
              </Button>
            )}
          </Tooltip>
        </>
      )}
      <GridToolbarDensitySelector />
      <GridToolbarQuickFilter sx={{ flex: 1 }} />
      <ButtonGroup variant="text">
        <Tooltip title={t("juging_report")}>
          <Button
            onClick={handleExportClick}
            size="small"
            aria-controls={exportMenuOpen ? "export-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={exportMenuOpen ? "true" : undefined}
          >
            <FileDownloadIcon />
          </Button>
        </Tooltip>
        <Menu
          id="export-menu"
          anchorEl={exportAnchorEl}
          open={exportMenuOpen}
          onClose={handleExportMenuClose}
          transformOrigin={{ horizontal: "left", vertical: "top" }}
          anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
          MenuListProps={{
            "aria-labelledby": "export-menu",
          }}
        >
          {renderExportMenuItems()}
        </Menu>
        <Tooltip title={t("add", { ns: "common", name: t("division") })}>
          <Button onClick={() => props.openDialog("createDivision")}>
            <AddIcon />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </GridToolbarContainer>
  );
}
