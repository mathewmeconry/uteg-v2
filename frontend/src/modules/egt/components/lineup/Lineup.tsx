import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  EgtLineup,
  EgtStarterLink,
  useEgtLineupQuery,
} from "../../../../__generated__/graphql";
import { useTranslation } from "react-i18next";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { LineupToolbar } from "./LineupToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { UpdateStarterDialog } from "../../../../dialogs/updateStarterDialog/updateStarterDialog";

export function Lineup(props: { id: string; lineups: EgtLineup[] }) {
  const { t } = useTranslation(["common", "egt"]);
  const [editDialog, setEditDialog] = useState(false);
  const [toEditLink, setToEditLink] = useState<string>("");
  const { data: lineup, loading, refetch: refetchLineup } = useEgtLineupQuery({
    variables: {
      id: props.id,
    },
  });

  if (loading) {
    return <Skeleton />;
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
        <Typography variant="h5">
          {t(`device_${lineup?.egtLineup?.device?.deviceNumber}`, { ns: "egt" })}
          <Typography variant="caption" sx={{ ml: 1 }}>
            {(lineup?.egtLineup?.starterlinks || []).length}
          </Typography>
        </Typography>
        <DataGrid
          rows={lineup?.egtLineup?.starterlinks || []}
          sx={{
            minHeight: "20vh",
          }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          density="compact"
          slots={{
            toolbar: LineupToolbar,
          }}
          slotProps={{
            toolbar: {
              lineups: props.lineups,
            },
          }}
        />
      </Box>
      <UpdateStarterDialog
        isOpen={editDialog}
        linkID={toEditLink}
        onClose={() => {
          refetchLineup();
          setEditDialog(false);
        }}
      />
    </>
  );
}
