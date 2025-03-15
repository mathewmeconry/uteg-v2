import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PaperExtended } from "../../../../../../components/paperExtended";
import {
  EgtLineup,
  EgtStarterLink,
  useEgtDivisionQuery,
  useEgtStarterLinkUnassignedQuery,
} from "../../../../../../__generated__/graphql";
import { Box, CircularProgress, Typography } from "@mui/material";
import { Lineup } from "../../../../components/lineup/Lineup";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { LineupToolbar } from "../../../../components/lineup/LineupToolbar";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateStarterDialog } from "../../../../../../dialogs/updateStarterDialog/updateStarterDialog";
import { GridColumnFilterMenu } from "../../../../../../components/grid/gridColumnFilterMenu";
import inFilter from "../../../../../../components/grid/inFilterOperator";
import DivisionInfo from "../../../../components/division/DivisionInfo";

export function Lineups() {
  const { divisionID } = useParams();
  const { t } = useTranslation(["common", "egt"]);
  const [editDialog, setEditDialog] = useState(false);
  const [toEditLink, setToEditLink] = useState<string>("");
  const { data: division, loading } = useEgtDivisionQuery({
    variables: {
      id: divisionID!,
    },
  });
  const {
    data: unassignedStarters,
    loading: startersLoading,
    refetch: refetchUnassigned,
  } = useEgtStarterLinkUnassignedQuery({
    variables: {
      divisionID: divisionID!,
    },
  });

  function renderLineups() {
    if (loading) {
      return (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      );
    }

    return division?.egtDivision?.lineups.map((lineup) => (
      <Lineup
        key={lineup.id}
        id={lineup.id}
        lineups={(division?.egtDivision?.lineups as EgtLineup[]) || []}
      />
    ));
  }

  function getColumnActions({ row }: { row: EgtStarterLink }) {
    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={onEdit(row.starterlink.id)}
        color="inherit"
      />,
    ];
  }

  function onEdit(id: string) {
    return () => {
      setToEditLink(id);
      setEditDialog(true);
    };
  }

  function renderUnassigned() {
    if (startersLoading) {
      return <CircularProgress />;
    }

    const columns: GridColDef[] = [
      {
        field: "starter.firstname",
        headerName: t("firstname", { ns: "common" }),
        valueGetter: (_, row) => row.starterlink.starter.firstname,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "starter.lastname",
        headerName: t("lastname", { ns: "common" }),
        valueGetter: (_, row) => row.starterlink.starter.lastname,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "club.name",
        headerName: t("club", { ns: "common" }),
        valueGetter: (_, row) => row.starterlink.club.name,
        flex: 1,
        filterOperators: [inFilter],
      },
      {
        type: "actions",
        headerName: t("actions", { ns: "common" }),
        field: "actions",
        getActions: getColumnActions,
        disableColumnMenu: true,
      },
    ];

    return (
      <>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Typography variant="h5">
            {t("unassigned", { ns: "egt" })}
            <Typography variant="caption" sx={{ ml: 1 }}>
              {(unassignedStarters?.egtStarterLinkUnassigned || []).length}
            </Typography>
          </Typography>
          <DataGrid
            rows={
              (unassignedStarters?.egtStarterLinkUnassigned as EgtStarterLink[]) ||
              []
            }
            sx={{
              minHeight: "20vh",
            }}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            checkboxSelection
            slots={{
              // @ts-expect-error
              toolbar: LineupToolbar,
              // @ts-expect-error
              columnMenu: GridColumnFilterMenu,
            }}
            slotProps={{
              columnMenu: {
                // @ts-expect-error
                rows: unassignedStarters?.egtStarterLinkUnassigned || [],
              },
              toolbar: {
                // @ts-expect-error
                lineups: division?.egtDivision?.lineups || [],
              },
            }}
            pageSizeOptions={[10, 20, 50, 100]}
            density="compact"
          />
        </Box>
        <UpdateStarterDialog
          isOpen={editDialog}
          linkID={toEditLink}
          onClose={() => {
            refetchUnassigned();
            setEditDialog(false);
          }}
        />
      </>
    );
  }

  return (
    <>
      <PaperExtended title={t("division_info", { ns: "egt" })}>
        <DivisionInfo id={divisionID!} />
      </PaperExtended>
      <PaperExtended
        sx={{ mt: 2 }}
        title={t("lineup", { count: 2, ns: "egt" })}
      >
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {renderUnassigned()}
          {renderLineups()}
        </Box>
      </PaperExtended>
    </>
  );
}
