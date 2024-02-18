import { useParams } from "react-router-dom";
import { useCompetitionDashboardStatsQuery } from "../../../../__generated__/graphql";
import { useTranslation } from "react-i18next";
import { NumberStatsCard } from "../../../../components/cards/NumberStatsCard";
import { Grid } from "@mui/material";

export function Dashboard() {
  const { id } = useParams();
  const {
    data: statsData,
    loading: statsLoading,
  } = useCompetitionDashboardStatsQuery({
    variables: {
      id: id!,
    },
  });
  const { t } = useTranslation("common");

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={4}>
        <NumberStatsCard
          title={t("starters")}
          value={statsData?.competition.stats.starters || 0}
          loading={statsLoading}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <NumberStatsCard
          title={t("clubs")}
          value={statsData?.competition.stats.clubs || 0}
          loading={statsLoading}
        />
      </Grid>
      <Grid item xs={6} md={4}>
        <NumberStatsCard
          title={t("grades")}
          value={statsData?.competition.stats.grades || 0}
          loading={statsLoading}
        />
      </Grid>
    </Grid>
  );
}
