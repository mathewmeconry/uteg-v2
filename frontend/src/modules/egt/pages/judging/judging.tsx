import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { useParams } from "react-router-dom";
import {
  authWithJudgeToken,
  getTokenData,
  isTokenValid,
} from "../../../../helpers/auth";
import { useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import {
  useEgtJudgingArrayLazyQuery,
  useEgtJudgingCompetitionLazyQuery,
  useEgtJudgingDivisionsIdsLazyQuery,
} from "../../../../__generated__/graphql";
import { DeviceGrading } from "../../components/grading/DeviceGrading";

export type JudgingTokenData = {
  competition: number;
  device: number;
  ground: number;
};

export default function Judging() {
  const { t } = useTranslation(["egt", "common"]);
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<JudgingTokenData | null>(null);
  const [round, _setRound] = useState(0);
  const [authenticating, setAuthenticating] = useState(true);
  const [
    queryCompetition,
    { data: _competition, loading: competitionLoading },
  ] = useEgtJudgingCompetitionLazyQuery();
  const [
    queryJudgingArray,
    { data: _judgingArray, loading: judgingArrayLoading },
  ] = useEgtJudgingArrayLazyQuery();
  const [
    queryDivisions,
    { data: divisions, loading: divisionsLoading },
  ] = useEgtJudgingDivisionsIdsLazyQuery();

  useEffect(() => {
    setTokenData(getTokenData());
  }, [authenticating]);

  useEffect(() => {
    if (tokenData) {
      queryCompetition({
        variables: {
          id: tokenData?.competition.toString(),
        },
      });
      queryDivisions({
        variables: {
          filter: {
            competitionID: tokenData?.competition.toString(),
            ground: tokenData?.ground,
            state: "RUNNING",
          },
        },
      });
    }
  }, [tokenData]);

  useEffect(() => {
    if (divisions && divisions.egtDivisions.length > 0 && tokenData) {
      queryJudgingArray({
        variables: {
          device: tokenData?.device,
          round: round,
          ids: divisions.egtDivisions.map((division) => division.id),
        },
      });
    }
  }, [divisions]);

  function renderLoading() {
    return (
      <PaperExtended title={t("loading")}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <CircularProgress />
        </Box>
      </PaperExtended>
    );
  }

  if (!isTokenValid()) {
    authWithJudgeToken(token || "").then(() => setAuthenticating(false));
    return renderLoading();
  } else {
    if (authenticating) {
      setAuthenticating(false);
    }
  }

  if (
    !tokenData ||
    competitionLoading ||
    judgingArrayLoading ||
    divisionsLoading
  ) {
    return renderLoading();
  }

  return (
    <PaperExtended
      title={t(`device_${tokenData?.device}`)}
      titleSuffix={t("ground_typed", { name: tokenData?.ground, ns: "common" })}
    >
      <DeviceGrading device={tokenData?.device} ground={tokenData?.ground} />
    </PaperExtended>
  );
}
