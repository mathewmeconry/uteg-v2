import { useParams } from "react-router-dom";
import {
  StarterLink,
  StarterLinksDocument,
  useRemoveStarterLinkMutation,
} from "../../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { Error } from "../../../../components/error";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsColDef,
  GridRowId,
  GridValidRowModel,
} from "@mui/x-data-grid";
import { PaperExtended } from "../../../../components/paperExtended";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { useMemo, useState } from "react";
import { CreateStarterDialog } from "../../../../dialogs/createStarterDialog/createStarterDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateStarterDialog } from "../../../../dialogs/updateStarterDialog/updateStarterDialog";
import { ApolloError, useQuery } from "@apollo/client";
import { StarterslistToolbar } from "./starterslistToolbar";
import { GridColumnFilterMenu } from "../../../../components/grid/gridColumnFilterMenu";
import { DeleteConfirmationDialog } from "../../../../dialogs/deleteConfirmationDialog/deleteConfirmationDialog";
import { List, ListItem, Typography } from "@mui/material";
import { useModules } from "../../../../hooks/useModules/useModules";
import { GridColDefExtension } from "../../../../types/GridColDefExtension";
import inFilter from "../../../../components/grid/inFilterOperator";

export function StartersList() {
  const { id } = useParams();
  const { t } = useTranslation("common");
  const [openDialog, setOpenDialog] = useState("");
  const [toEditLink, setToEditLink] = useState<string>("");
  const [removeStarterLink] = useRemoveStarterLinkMutation();
  const [toDeleteStarters, setToDeleteStarters] = useState<StarterLink[]>([]);
  const modules = useModules(id || "");

  if (!id) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }

  let starterLinksQueryDocument = StarterLinksDocument;
  for (const module of modules.modules) {
    if (module.transformers.starterLinksQuery) {
      starterLinksQueryDocument = module.transformers.starterLinksQuery.transformDocument(
        starterLinksQueryDocument
      );
    }
  }

  const {
    data: starterLinksData,
    loading,
    refetch: refetchStarters,
  } = useQuery(starterLinksQueryDocument, {
    variables: {
      competitionID: id,
    },
    fetchPolicy: "cache-and-network",
  });

  const moduleColumns = useMemo(() => {
    const columns: Array<GridColDefExtension | GridActionsColDef> = [];
    for (const module of modules.modules) {
      if (module.extensions.starterslistColumns) {
        columns.push(
          ...module.extensions.starterslistColumns.map((col) => ({
            ...col,
            headerName: t(col.headerName || "", { ns: module.name }),
            valueGetter: (params: any) =>
              t(col.valueGetter?.(params) || "", { ns: module.name }),
          }))
        );
      }
    }
    return columns;
  }, [modules.modules]);

  const columns: Array<GridColDefExtension | GridActionsColDef> = [
    {
      field: "starter.firstname",
      headerName: t("firstname"),
      valueGetter: (params) => params.row.starter.firstname,
      flex: 1,
      disableColumnMenu: true,
      renderInPdf: true,
      pdfWidth: "108pt",
      renderInXlsx: true,
    },
    {
      field: "starter.lastname",
      headerName: t("lastname"),
      valueGetter: (params) => params.row.starter.lastname,
      flex: 1,
      disableColumnMenu: true,
      renderInPdf: true,
      pdfWidth: "108pt",
      renderInXlsx: true,
    },
    {
      field: "starter.sex",
      headerName: t("sex"),
      valueGetter: (params) => t(params.row.starter.sex),
      flex: 1,
      filterOperators: [inFilter],
      renderInPdf: true,
      pdfWidth: "63pt",
      renderInXlsx: true,
    },
    {
      field: "starter.birthyear",
      headerName: t("birthyear"),
      valueGetter: (params) => params.row.starter.birthyear,
      disableColumnMenu: true,
      renderInPdf: true,
      pdfWidth: "54pt",
      renderInXlsx: true,
    },
    {
      field: "club.name",
      headerName: t("club"),
      valueGetter: (params) => params.row.club.name,
      flex: 1,
      filterOperators: [inFilter],
      renderInPdf: false,
      renderInXlsx: true,
    },
    {
      field: "club.location",
      headerName: t("location"),
      valueGetter: (params) => params.row.club.location,
      flex: 1,
      renderInPdf: false,
      renderInXlsx: true,
    },
    ...moduleColumns,
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

  function onRemoveRows(rows: Map<GridRowId, GridValidRowModel>) {
    const deletionArray: StarterLink[] = [];
    rows.forEach((row) => deletionArray.push(row as StarterLink));
    setToDeleteStarters(deletionArray);
    setOpenDialog("deleteStarter");
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
      enqueueSnackbar(
        t("unlinked", {
          name: t("starter", { count: toDeleteStarters.length }),
        }),
        { variant: "success" }
      );
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
    <>
      <PaperExtended title={t(`starters`, { count: 2 })}>
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
              sorting: {
                sortModel: [
                  {
                    field: "starter.lastname",
                    sort: "asc",
                  },
                ],
              },
              columns: {
                columnVisibilityModel: {
                  "club.location": false,
                },
              },
            }}
            pageSizeOptions={[20, 50, 100]}
            checkboxSelection
            slots={{
              toolbar: StarterslistToolbar,
              columnMenu: GridColumnFilterMenu,
            }}
            slotProps={{
              columnMenu: {
                // @ts-expect-error
                rows: starterLinksData?.starterLinks || [],
              },
              toolbar: {
                openDialog: setOpenDialog,
                onRowDeletionClick: onRemoveRows,
              },
            }}
            ignoreDiacritics={false}
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
        title={t("delete", {
          name: t("starter", { count: toDeleteStarters.length }),
        })}
        onCancel={() => setOpenDialog("")}
        onConfirm={handleStarterDelete}
      >
        <Typography>{t("delete_confirmation")}</Typography>
        <List>
          {toDeleteStarters.map((starterLink) => (
            <ListItem key={starterLink.id}>
              {starterLink.starter.firstname} {starterLink.starter.lastname}
            </ListItem>
          ))}
        </List>
      </DeleteConfirmationDialog>
    </>
  );
}
