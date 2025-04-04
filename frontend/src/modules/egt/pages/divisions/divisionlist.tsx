import { useNavigate, useParams } from "react-router-dom";
import {
  EgtDivision,
  EgtDivisionStates,
  useRemoveEgtDivisionMutation,
} from "../../../../__generated__/graphql";
import {
  DataGrid,
  GridActionsCellItem,
  GridActionsColDef,
  GridColDef,
  GridRowId,
} from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { enqueueSnackbar } from "notistack";
import { Error } from "../../../../components/error";
import { useEffect, useState } from "react";
import { DivisionlistToolbar } from "./divisionlistToolbar";
import PendingIcon from "@mui/icons-material/Pending";
import {
  CircularProgress,
  Box,
  ListItem,
  Typography,
  List,
  Tooltip,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import StartIcon from "@mui/icons-material/Start";
import DeleteIcon from "@mui/icons-material/Delete";
import GroupsIcon from "@mui/icons-material/Groups";
import { CreateDivisionDialog } from "../../dialogs/createDivisionDialog/createDivisionDialog";
import { DeleteConfirmationDialog } from "../../../../dialogs/deleteConfirmationDialog/deleteConfirmationDialog";
import { ApolloError } from "@apollo/client";
import { StartDivisionsDialog } from "../../dialogs/startDivisionsDialog/startDivisionsDialog";
import GradingIcon from "@mui/icons-material/Grading";
import { graphql } from "../../../../__new_generated__/gql";
import useEGTDivisions from "../../hooks/useEGTDivisions/useEGTDivisions";
import usePrevious from "../../../../hooks/usePrev/usePrev";

const DivisionListFragment = graphql(`
  fragment DivisionListFragment on EGTDivision {
    id
    ground
    state
    currentRound
    totalRounds
    category
    sex
    number
    totalStarters
  }
`);

export function Divisionslist() {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState("");
  const [toDeleteDivisions, setToDeleteDivisions] = useState<EgtDivision[]>([]);
  const [toStartDivisions, setToStartDivisions] = useState<EgtDivision[]>([]);
  const [removeDivision] = useRemoveEgtDivisionMutation();

  const {
    data: divisionsData,
    loading,
    refetch: refetchDivisions,
  } = useEGTDivisions(DivisionListFragment, {
    filter: {
      competitionID: id!,
    },
  });
  const previousData = usePrevious(divisionsData);
  useEffect(() => {
    if (!divisionsData) {
      return;
    }

    const diffs: Partial<EgtDivision>[] = [];
    for (const index in divisionsData) {
      if (
        divisionsData[index] !== previousData?.[index] &&
        divisionsData[index].id === previousData?.[index]?.id
      ) {
        diffs.push(divisionsData[index]);
      }
    }

    for (const diff of diffs) {
      if (diff.state === "RUNNING") {
        enqueueSnackbar(
          t("started", { ns: "egt", name: t("division", { ns: "egt" }) }),
          { variant: "success" }
        );
      }
    }
  }, [divisionsData]);

  if (!id) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }

  async function onRemoveRows(rows: Map<GridRowId, EgtDivision>) {
    const deletionArray: EgtDivision[] = [];
    rows.forEach((row) => deletionArray.push(row));
    setToDeleteDivisions(deletionArray);
    setOpenDialog("deleteDivisions");
  }

  async function onStartRows(rows: Map<GridRowId, EgtDivision>) {
    const startArray: EgtDivision[] = [];
    rows.forEach((row) => startArray.push(row));
    setToStartDivisions(startArray);
    setOpenDialog("startDivision");
  }

  function onRemove(division: EgtDivision) {
    return () => {
      setOpenDialog("deleteDivisions");
      setToDeleteDivisions([division]);
    };
  }

  function onStart(division: EgtDivision) {
    return () => {
      setOpenDialog("startDivision");
      setToStartDivisions([division]);
    };
  }

  async function handleDivisionDelete() {
    try {
      for (const division of toDeleteDivisions) {
        await removeDivision({
          variables: {
            id: division.id,
          },
        });
      }
      enqueueSnackbar(
        t("deleted", { ns: "common", name: t("division", { ns: "egt" }) }),
        {
          variant: "success",
        }
      );
    } catch (e) {
      if (e instanceof ApolloError) {
        enqueueSnackbar(t(e.message, { ns: "common" }), { variant: "error" });
      }
      console.error(e);
    }
    setOpenDialog("");
    setToDeleteDivisions([]);
    refetchDivisions();
  }

  const columns: Array<GridColDef | GridActionsColDef> = [
    {
      field: "number",
      headerName: t("number", { ns: "common" }),
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "category",
      headerName: t("category", { ns: "egt" }),
      disableColumnMenu: true,
      flex: 1,
      valueGetter: (_, row) =>
        t(`category_${row.category}`, {
          ns: "egt",
          context: row.sex.toLowerCase(),
        }),
    },
    {
      field: "sex",
      headerName: t("sex", { ns: "common" }),
      valueGetter: (_, row) =>
        t(row.sex, { ns: "common" }),
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "ground",
      headerName: t("ground", { ns: "common", count: 1 }),
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "state",
      headerName: t("state", { ns: "common" }),
      disableColumnMenu: true,
      flex: 1,
      renderCell: (params) => {
        const divisionState: EgtDivisionStates = params.row.state;
        switch (divisionState) {
          case "PENDING":
            return <PendingIcon style={{ fontSize: "1.7rem" }} />;
          case "RUNNING":
            return (
              <Box sx={{ position: "relative", display: "inline-flex" }}>
                <CircularProgress
                  variant="determinate"
                  size="1.5rem"
                  color="inherit"
                  value={Math.round(
                    (100 / params.row.totalRounds) * params.row.currentRound
                  )}
                />
                <Box
                  sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                  >
                    {params.row.currentRound}
                  </Typography>
                </Box>
              </Box>
            );
          case "ENDED":
            return <DoneIcon style={{ fontSize: "1.7rem" }} />;
        }
      },
    },
    {
      field: "totalStarters",
      headerName: t("starters", { ns: "common" }),
      disableColumnMenu: true,
      flex: 1,
    },
    {
      type: "actions",
      headerName: t("actions", { ns: "common" }),
      field: "actions",
      getActions: getColumnActions,
      disableColumnMenu: true,
      flex: 1,
    },
  ];

  function getColumnActions({ row: division }: { row: EgtDivision }) {
    const actions = [
      // TODO: Add edits capabilities to reset rounds and if division is started
      /*       <GridActionsCellItem
        icon={<EditIcon />}
        label="Edit"
        className="textPrimary"
        onClick={onEdit()}
        color="inherit"
      />, */
      <GridActionsCellItem
        icon={
          <Tooltip
            title={t("assign_to", {
              what: t("starters", { ns: "common" }),
              to: t("starting_device"),
            })}
          >
            <GroupsIcon />
          </Tooltip>
        }
        label="Lineup"
        className="textPrimary"
        color="inherit"
        onClick={() =>
          navigate(`/competition/${id}/egt/division/${division.id}/lineups`)
        }
      />,
      <GridActionsCellItem
        icon={
          <Tooltip title={t("grading")}>
            <GradingIcon />
          </Tooltip>
        }
        label="Grading"
        className="textPrimary"
        color="inherit"
        onClick={() =>
          navigate(`/competition/${id}/egt/division/${division.id}/grading`)
        }
      />,
      <GridActionsCellItem
        icon={
          <Tooltip title={t("delete", { ns: "common" })}>
            <DeleteIcon />
          </Tooltip>
        }
        label="Delete"
        onClick={onRemove(division)}
        color="inherit"
      />,
    ];

    if (division.state === "PENDING") {
      actions.push(
        <GridActionsCellItem
          icon={
            <Tooltip title={t("start", { ns: "common", name: t("division") })}>
              <StartIcon />
            </Tooltip>
          }
          label="Start"
          className="textWarning"
          color="warning"
          onClick={onStart(division)}
        />
      );
    }

    return actions;
  }
  return (
    <>
      <PaperExtended title={t("division", { count: 2, ns: "egt" })}>
        <Box sx={{ height: "80vh", width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={divisionsData || []}
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
                    field: "category",
                    sort: "asc",
                  },
                ],
              },
            }}
            pageSizeOptions={[20, 50, 100]}
            checkboxSelection
            slots={{
              // @ts-expect-error
              toolbar: DivisionlistToolbar,
            }}
            slotProps={{
              toolbar: {
                // @ts-expect-error
                openDialog: setOpenDialog,
                onRowDeletionClick: onRemoveRows,
                onRowStartClick: onStartRows,
              },
            }}
            ignoreDiacritics={false}
          />
        </Box>
        <CreateDivisionDialog
          isOpen={openDialog === "createDivision"}
          onClose={() => {
            setOpenDialog("");
          }}
        />
        <DeleteConfirmationDialog
          isOpen={openDialog === "deleteDivisions"}
          title={t("delete", {
            ns: "common",
            name: t("division", { count: 1, ns: "egt" }),
          })}
          onCancel={() => setOpenDialog("")}
          onConfirm={handleDivisionDelete}
        >
          <Typography>{t("delete_confirmation", { ns: "common" })}</Typography>
          <List>
            {toDeleteDivisions.map((division) => (
              <ListItem key={division.id}>
                {t(`category_${division.category}`, {
                  context: division.sex,
                  ns: "egt",
                })}{" "}
                ({t(division.sex, { ns: "common" })}) #{division.number}
              </ListItem>
            ))}
          </List>
        </DeleteConfirmationDialog>
        <StartDivisionsDialog
          isOpen={openDialog === "startDivision"}
          onClose={() => {
            setOpenDialog("");
          }}
          divisions={toStartDivisions}
        />
      </PaperExtended>
    </>
  );
}
