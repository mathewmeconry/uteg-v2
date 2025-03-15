import { Skeleton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  EgtLineup,
  EgtStarterLink,
  useEgtLineupQuery,
} from "../../../../__generated__/graphql";
import { useTranslation } from "react-i18next";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { LineupToolbar } from "./LineupToolbar";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import { UpdateStarterDialog } from "../../../../dialogs/updateStarterDialog/updateStarterDialog";
import inFilter from "../../../../components/grid/inFilterOperator";
import { GridColumnFilterMenu } from "../../../../components/grid/gridColumnFilterMenu";

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

  const columns: GridColDef[] = [
    {
      field: "starter.firstname",
      headerName: t("firstname"),
      valueGetter: (_, row) => row.starterlink.starter.firstname,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "starter.lastname",
      headerName: t("lastname"),
      valueGetter: (_, row) => row.starterlink.starter.lastname,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "club.name",
      headerName: t("club"),
      valueGetter: (_, row) => row.starterlink.club.name,
      flex: 1,
      filterOperators: [inFilter],
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
          rows={lineup?.egtLineup?.starterlinks as EgtStarterLink[] || []}
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
            // @ts-expect-error
            toolbar: LineupToolbar,
            // @ts-expect-error
            columnMenu: GridColumnFilterMenu,
          }}
          slotProps={{
            columnMenu: {
              // @ts-expect-error
              rows: lineup?.egtLineup?.starterlinks || [],
            },
            toolbar: {
              // @ts-expect-error
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
