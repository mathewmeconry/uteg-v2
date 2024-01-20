import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { PaperExtended } from "../../../../../../components/paperExtended";
import {
  EgtStarterLink,
  useEgtDivisionQuery,
  useEgtStarterLinkUnassignedQuery,
} from "../../../../../../__generated__/graphql";
import {
  Box,
  CircularProgress,
  List,
  ListItemText,
  Skeleton,
  Typography,
} from "@mui/material";
import { Lineup } from "../../../../components/lineup/Lineup";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { LineupToolbar } from "../../../../components/lineup/LineupToolbar";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { UpdateStarterDialog } from "../../../../../../dialogs/updateStarterDialog/updateStarterDialog";

export function Lineups() {
  const { divisionID } = useParams();
  const { t } = useTranslation();
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

  function renderInfo() {
    if (loading) {
      return (
        <List>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </List>
      );
    }

    return (
      <List sx={{ display: "flex", flexDirection: "column" }}>
        <ListItemText
          primary={t("egt.category")}
          secondary={division?.egtDivision?.category}
        />
        <ListItemText
          primary={t("egt.number")}
          secondary={division?.egtDivision?.number}
        />
        <ListItemText
          primary={t("egt.sex")}
          secondary={t(`sex.${division?.egtDivision?.sex}`)}
        />
        <ListItemText
          primary={t("egt.ground")}
          secondary={division?.egtDivision?.ground}
        />
        <ListItemText
          primary={t("egt.currentRound")}
          secondary={division?.egtDivision?.currentRound}
        />
        <ListItemText
          primary={t("egt.totalRounds")}
          secondary={division?.egtDivision?.totalRounds}
        />
      </List>
    );
  }

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
        lineups={division?.egtDivision?.lineups || []}
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

    const columns = [
      {
        field: "starter.firstname",
        headerName: t("firstname"),
        valueGetter: (params) => params.row.starterlink.starter.firstname,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "starter.lastname",
        headerName: t("lastname"),
        valueGetter: (params) => params.row.starterlink.starter.lastname,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        field: "club.name",
        headerName: t("club"),
        valueGetter: (params) => params.row.starterlink.club.name,
        flex: 1,
        disableColumnMenu: true,
      },
      {
        type: "actions",
        headerName: t("actions"),
        field: "actions",
        getActions: getColumnActions,
        disableColumnMenu: true,
      },
    ];

    return (
      <>
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Typography variant="h5">{t("egt.unassigned")}</Typography>
          <DataGrid
            rows={unassignedStarters?.egtStarterLinkUnassigned || []}
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
              toolbar: LineupToolbar,
            }}
            slotProps={{
              toolbar: {
                lineups: division?.egtDivision?.lineups || [],
              },
            }}
            pageSizeOptions={[5, 10]}
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
      <PaperExtended title={t("egt.division.info")}>
        {renderInfo()}
      </PaperExtended>
      <PaperExtended sx={{ mt: 2 }} title={t("egt.lineups")}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {renderUnassigned()}
          {renderLineups()}
        </Box>
      </PaperExtended>
    </>
  );
}
