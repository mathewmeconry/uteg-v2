import { useParams } from "react-router-dom";
import {
  EgtStarterRanking,
  Sex,
  useEgtStarterRankingQuery,
} from "../../../../__generated__/graphql";
import { LinearProgress, Typography } from "@mui/material";
import { RankingTable } from "./rankingTable";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";

export type RankingListProps = {
  sex: Sex;
  category: number;
};

export function RankingList(props: RankingListProps) {
  const { t } = useTranslation("common");
  const { id } = useParams();
  const {
    data: rankingData,
    loading: rankingLoading,
    error: rankingError,
  } = useEgtStarterRankingQuery({
    variables: {
      competitionID: id!,
      sex: props.sex,
      category: props.category,
    },
  });

  if (rankingLoading) {
    return <LinearProgress />;
  }

  if (rankingError) {
    enqueueSnackbar(t("error"), { variant: "error" });
    return <Typography>{t("error")}</Typography>;
  }

  return (
    <>
    
    <RankingTable
      rankings={rankingData?.egtStarterRankings as EgtStarterRanking[]}
    />
    </>
  );
}
