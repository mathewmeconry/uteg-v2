import { useParams } from "react-router-dom";
import { CompetitionLayout } from "../../../../../layouts/competitionlayout";
import { Sex, useStartersQuery } from "../../../../../__generated__/graphql";
import { enqueueSnackbar } from "notistack";
import { Error } from "../../../../../components/error";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PaperExtended } from "../../../../../components/paperExtended";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { CreateStarterDialog } from "../../../../../dialogs/createStarter/createStarterDialog";

export function StartersList() {
  const { sex, id } = useParams();
  const { t } = useTranslation();
  const [openDialog, setOpenDialog] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (!sex) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }
  if (!id) {
    enqueueSnackbar("Ooops", { variant: "error" });
    return <Error />;
  }

  const {
    data: starters,
    loading,
    refetch: refetchStarters,
  } = useStartersQuery({
    variables: {
      filter: {
        competitionID: id,
        sex: sex.toUpperCase() as Sex,
        firstname: searchQuery,
        lastname: searchQuery
      },
    },
  });

  const columns: GridColDef[] = [
    {
      field: "firstname",
      headerName: t("firstname"),
    },
    {
      field: "lastname",
      headerName: t("lastname"),
    },
  ];

  return (
    <CompetitionLayout>
      <PaperExtended title={t(`${sex} Starters`)}>
        <Box sx={{ display: "flex" }}>
          <TextField
            id="search"
            type="string"
            label={t("Search")}
            variant="standard"
            margin="normal"
            fullWidth
            sx={{ mt: 0 }}
            value={searchQuery}
            onChange={(data) => setSearchQuery(data.currentTarget.value)}
          />
          <Button
            variant="outlined"
            onClick={() => setOpenDialog("addStarter")}
            sx={{ m: 1, whiteSpace: "nowrap" }}
          >
            {t("Add Starter")}
          </Button>
        </Box>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            loading={loading}
            rows={starters?.starters || []}
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
    </CompetitionLayout>
  );
}
