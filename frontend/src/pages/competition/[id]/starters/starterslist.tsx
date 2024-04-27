import { useParams } from "react-router-dom";
import { StarterLink } from "../../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { Error } from "../../../../components/error";
import { PaperExtended } from "../../../../components/paperExtended";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { MouseEventHandler, useMemo, useState } from "react";
import { CreateStarterDialog } from "../../../../dialogs/createStarterDialog/createStarterDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateStarterDialog } from "../../../../dialogs/updateStarterDialog/updateStarterDialog";
import { ApolloError, useMutation, useQuery } from "@apollo/client";
import { DeleteConfirmationDialog } from "../../../../dialogs/deleteConfirmationDialog/deleteConfirmationDialog";
import { IconButton, List, ListItem, Typography } from "@mui/material";
import { useModules } from "../../../../hooks/useModules/useModules";
import { MRT_ColumnDefExtension } from "../../../../types/MRT_ColumnDefExtension";
import {
  useMaterialReactTable,
  MRT_ColumnDef,
  MRT_Row,
  getMRT_RowSelectionHandler,
  MRT_TableInstance,
  MRT_RowData,
  MaterialReactTable,
} from "material-react-table";
import { graphql } from "../../../../__new_generated__/gql";
import { FragmentDefinitionNode, Kind, visit } from "graphql";
import { StarterslistToolbarActions } from "./starterslistToolbarActions";
import StarterslistToolbarSelectionActions from "./starterslistToolbarSelectionActions";
import useMaterialReactTableLocalization from "../../../../hooks/useMaterialReactTableLocalization/useMaterialReactTableLocalization";

const REMOVE_STARTER_LINK = graphql(`
  mutation removeStarterLink($id: ID!) {
    removeStarterLink(id: $id) {
      id
    }
  }
`);

const QUERY = graphql(`
  query starterLinks($competitionID: ID!, $sex: String) {
    starterLinks(competitionID: $competitionID, sex: $sex) {
      id
      starter {
        id
        firstname
        lastname
        birthyear
        stvID
        sex
      }
      club {
        id
        name
        location
      }
    }
  }
`);

export function StartersList() {
  const { id } = useParams();
  const { t } = useTranslation("common");
  const [openDialog, setOpenDialog] = useState("");
  const [toEditLink, setToEditLink] = useState<string>("");
  const [removeStarterLink] = useMutation(REMOVE_STARTER_LINK);
  const [toDeleteStarters, setToDeleteStarters] = useState<StarterLink[]>([]);
  const modules = useModules(id!);

  if (!id) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }

  const starterLinkQuery = useMemo(() => {
    const fragments = modules.modules
      .map((module) => module.fragments.starterLinkFragment?.definitions[0])
      .filter((fragment) => fragment) as FragmentDefinitionNode[];
    return visit(QUERY, {
      Document: {
        enter: (document) => {
          return {
            ...document,
            definitions: [...document.definitions, ...fragments],
          };
        },
      },
      Field: {
        enter: (field) => {
          if (field.name.value === "starterLinks") {
            return {
              ...field,
              selectionSet: {
                ...field.selectionSet,
                selections: [
                  ...(field.selectionSet?.selections ?? []),
                  ...fragments.map((fragment) => ({
                    kind: Kind.FRAGMENT_SPREAD,
                    name: {
                      kind: Kind.NAME,
                      value: fragment.name.value,
                    },
                  })),
                ],
              },
            };
          }
        },
      },
    });
  }, [modules.modules]);

  const {
    data: starterLinksData,
    loading,
    refetch: refetchStarters,
  } = useQuery(starterLinkQuery, {
    variables: {
      competitionID: id,
    },
    fetchPolicy: "cache-and-network",
  });

  const moduleColumns = useMemo(() => {
    const columns: Array<MRT_ColumnDef<any> | MRT_ColumnDefExtension<any>> = [];
    for (const module of modules.modules) {
      if (module.extensions.starterslistColumns) {
        columns.push(
          ...module.extensions.starterslistColumns.map((col) => {
            const clone = { ...col };
            if (col.accessorFn) {
              clone.accessorFn = (row) =>
                col.accessorFn!(row)
                  ? t(col.accessorFn!(row) as string, { ns: module.name })
                  : "";
            }
            clone.header = t(col.header || "", { ns: module.name });
            return clone;
          })
        );
      }
    }
    return columns;
  }, [modules.modules]);

  const columns: Array<
    MRT_ColumnDef<any> | MRT_ColumnDefExtension<any>
  > = useMemo(
    () => [
      {
        accessorKey: "starter.firstname",
        header: t("firstname"),
        enableColumnFilter: false,
        renderInPdf: true,
        pdfWidth: "108pt",
        renderInXlsx: true,
      },
      {
        accessorKey: "starter.lastname",
        header: t("lastname"),
        enableColumnFilter: false,
        renderInPdf: true,
        pdfWidth: "108pt",
        renderInXlsx: true,
      },
      {
        accessorFn: (row) =>
          row.starter?.sex ? t(row.starter.sex, { ns: "common" }) : "",
        header: t("sex"),
        filterFn: "equals",
        filterVariant: "select",
        enableGlobalFilter: false,
        size: 200,
        grow: false,
        renderInPdf: true,
        pdfWidth: "63pt",
        renderInXlsx: true,
      },
      {
        accessorKey: "starter.birthyear",
        header: t("birthyear"),
        enableGlobalFilter: false,
        enableColumnFilter: false,
        renderInPdf: true,
        pdfWidth: "54pt",
        renderInXlsx: true,
      },
      {
        accessorFn: (row) => (row.club?.name ? row.club.name : ""),
        header: t("club"),
        filterVariant: "multi-select",
        enableGlobalFilter: false,
        renderInPdf: false,
        renderInXlsx: true,
      },
      {
        accessorKey: "club.location",
        header: t("location"),
        enableGlobalFilter: false,
        renderInPdf: false,
        renderInXlsx: true,
      },
      ...moduleColumns,
    ],
    [moduleColumns]
  );

  const tableLocalization = useMaterialReactTableLocalization();
  const table = useMaterialReactTable({
    columns,
    data: starterLinksData?.starterLinks || [],
    enableRowSelection: true,
    enableColumnOrdering: false,
    enableRowVirtualization: true,
    enableRowActions: true,
    renderRowActions: getColumnActions,
    positionActionsColumn: "last",
    enableTopToolbar: true,
    initialState: { showGlobalFilter: true },
    positionToolbarAlertBanner: "bottom",
    columnFilterDisplayMode: "subheader",
    selectAllMode: "all",
    enableFacetedValues: true,
    localization: tableLocalization,
    muiSearchTextFieldProps: {
      variant: "standard",
      fullWidth: true,
    },
    state: {
      isLoading: loading || modules.loading,
      showToolbarDropZone: false,
      showColumnFilters: true,
      columnVisibility: {
        "club.location": false,
      },
    },
    muiTableBodyRowProps: ({ row, staticRowIndex, table }) => ({
      onClick: (event) =>
        getMRT_RowSelectionHandler({ row, staticRowIndex, table })(event), //import this helper function from material-react-table
      sx: { cursor: "pointer" },
    }),
    renderToolbarInternalActions: ({
      table,
    }: {
      table: MRT_TableInstance<StarterLink & MRT_RowData>;
    }) => (
      <StarterslistToolbarActions openDialog={setOpenDialog} table={table} />
    ),
    renderTopToolbarCustomActions: ({
      table,
    }: {
      table: MRT_TableInstance<StarterLink & MRT_RowData>;
    }) => (
      <StarterslistToolbarSelectionActions
        table={table}
        onRowDeletionClick={onRemoveRows}
      />
    ),
  });

  function onEdit(starterLink: StarterLink): MouseEventHandler {
    return (e) => {
      e.stopPropagation();
      setToEditLink(starterLink.id);
      setOpenDialog("updateStarter");
      return false;
    };
  }

  function onRemove(starterLink: StarterLink): MouseEventHandler {
    return (e) => {
      e.stopPropagation();
      setToDeleteStarters([starterLink]);
      setOpenDialog("deleteStarter");
    };
  }

  function onRemoveRows(rows: MRT_Row<StarterLink>[]): void {
    const deletionArray: StarterLink[] = [];
    rows.forEach((row) => deletionArray.push(row.original));
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
    table.resetRowSelection();
    refetchStarters();
  }

  function getColumnActions({
    row,
  }: {
    row: MRT_Row<StarterLink & MRT_RowData>;
  }) {
    return (
      <Box>
        <IconButton onClick={onEdit(row.original)}>
          <EditIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={onRemove(row.original)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  }

  return (
    <>
      <PaperExtended title={t(`starters`, { count: 2 })}>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <MaterialReactTable table={table} />
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
