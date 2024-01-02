import { useParams } from "react-router-dom";
import { CompetitionLayout } from "../../../../../layouts/competitionlayout";
import {
  Sex,
  StarterLink,
  useRemoveStarterLinkMutation,
  useStarterLinksQuery,
} from "../../../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { Error } from "../../../../../components/error";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
} from "@mui/x-data-grid";
import { PaperExtended } from "../../../../../components/paperExtended";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { useState } from "react";
import { CreateStarterDialog } from "../../../../../dialogs/createStarterDialog/createStarterDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateStarterDialog } from "../../../../../dialogs/updateStarterDialog/updateStarterDialog";
import { ApolloError } from "@apollo/client";
import { StarterslistToolbar } from "./starterslistToolbar";
import { StarterlistColumnMenu } from "./starterslistColumnMenu";
import { DeleteConfirmationDialog } from "../../../../../dialogs/deleteConfirmationDialog/deleteConfirmationDialog";
import { List, ListItem, Typography } from "@mui/material";

export function StartersList() {
  const { sex, id } = useParams();
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState("");
  const [toEditLink, setToEditLink] = useState<string>("");
  const [removeStarterLink] = useRemoveStarterLinkMutation();
  const [toDeleteStarters, setToDeleteStarters] = useState<StarterLink[]>([]);

  if (!sex) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }
  if (!id) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }

  const {
    data: starterLinksData,
    loading,
    refetch: refetchStarters,
  } = useStarterLinksQuery({
    variables: {
      competitionID: id,
      sex: sex.toUpperCase() as Sex,
    },
  });

  const columns: Array<GridColDef | GridActionsColDef> = [
    {
      field: "starter.firstname",
      headerName: t("firstname"),
      valueGetter: (params) => params.row.starter.firstname,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "starter.lastname",
      headerName: t("lastname"),
      valueGetter: (params) => params.row.starter.lastname,
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "starter.birthyear",
      headerName: t("birthyear"),
      valueGetter: (params) => params.row.starter.birthyear,
      disableColumnMenu: true,
    },
    {
      field: "club.name",
      headerName: t("club"),
      valueGetter: (params) => params.row.club.name,
      flex: 1,
    },
    {
      type: "actions",
      headerName: t("actions"),
      field: "actions",
      getActions: getColumnActions,
      disableColumnMenu: true,
    },
  ];

  function onEdit(starterLink: StarterLink) {
    return () => {
      setToEditLink(starterLink.id);
      setOpenDialog("updateStarter");
    };
  }

  function onRemove(starterLink: StarterLink) {
    return () => {
      setToDeleteStarters([starterLink]);
      setOpenDialog("deleteStarter");
    };
  }

  async function handleStarterDelete() {
    try {
      for (const starterLink of toDeleteStarters) {
        await removeStarterLink({
          variables: {
            id: starterLink.id,
          },
        });
      }
      enqueueSnackbar(t("Starters unlinked"), { variant: "success" });
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(t(e.message), { variant: "error" });
      }
      console.error(e);
    }
    setOpenDialog("");
    setToDeleteStarters([]);
    refetchStarters();
  }

  function getColumnActions({ row: starterlink }: { row: StarterLink }) {
    return [
      <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={onEdit(starterlink)}
        color="inherit"
      />,
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        color="inherit"
        onClick={onRemove(starterlink)}
      />,
    ];
  }

  return (
    <CompetitionLayout>
      <PaperExtended title={t(`${sex} Starters`)}>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={starterLinksData?.starterLinks || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
            pageSizeOptions={[20, 50, 100]}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{
              toolbar: StarterslistToolbar,
              columnMenu: StarterlistColumnMenu,
            }}
            slotProps={{
              columnMenu: {
                rows: starterLinksData?.starterLinks || [],
              },
              toolbar: {
                openDialog: setOpenDialog,
              },
            }}
            ignoreDiacritics
          />
        </Box>
      </PaperExtended>
      <CreateStarterDialog
        isOpen={openDialog === "addStarter"}
        onClose={() => {
          refetchStarters();
          setOpenDialog("");
        }}
      />
      <UpdateStarterDialog
        isOpen={openDialog === "updateStarter"}
        linkID={toEditLink}
        onClose={() => {
          refetchStarters();
          setOpenDialog("");
        }}
      />
      <DeleteConfirmationDialog
        isOpen={openDialog === "deleteStarter"}
        title={t("Delete Starter")}
        onCancel={() => setOpenDialog("")}
        onConfirm={() => handleStarterDelete()}
      >
        <Typography>{t("Do you really wanna delete?")}</Typography>
        <List>
          {toDeleteStarters.map((starterLink) => (
            <ListItem key={starterLink.id}>
              {starterLink.starter.firstname} {starterLink.starter.lastname}
            </ListItem>
          ))}
        </List>
      </DeleteConfirmationDialog>
    </CompetitionLayout>
  );
}
