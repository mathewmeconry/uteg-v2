import { Button, Grid, Paper, Skeleton } from "@mui/material";
import { HomeLayout } from "../../layouts/homelayout";
import { useTranslation } from "react-i18next";
import { Competition, useCompetitionsQuery } from "../../__generated__/graphql";
import { CompetitionCard } from "./competitionCard";
import { enqueueSnackbar } from "notistack";

export function Home() {
  const { t } = useTranslation();
  const { data: competitions, loading } = useCompetitionsQuery();

  function renderCompetitions() {
    const competitionElements = [];
    if (loading) {
      for (let i = 0; i < 12; i++) {
        competitionElements.push(
          <Grid item={true} xs={3} key={i}>
            <Skeleton variant="rectangular" height={120} />
          </Grid>
        );
      }

      return competitionElements;
    }

    if (!competitions || !competitions.competitions) {
      enqueueSnackbar(t("Failed to load data... Please try again later"), {
        variant: "error",
      });
      return [];
    }

    for (const competition of competitions?.competitions) {
      competitionElements.push(
        <Grid item={true} xs={3} key={competition.id}>
          <CompetitionCard competition={competition} />
        </Grid>
      );
    }

    return competitionElements;
  }

  return (
    <HomeLayout title={t("Home")}>
      <Button href="/competition/create" variant="outlined" sx={{ mt: 1, mb: 1, float: "right" }}>
        {t("Create Competition")}
      </Button>
      <Grid container spacing={2}>
        {renderCompetitions()}
      </Grid>
    </HomeLayout>
  );
}
