import { useParams, useSearchParams } from "react-router-dom";
import { useEgtGradingDivisionsIdsQuery } from "../../../../__generated__/graphql";
import { Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useState } from "react";
import { RoundGradingTable } from "./RoundGradingTable";
import RoundGradingSingle from "./RoundGradingSingle";

export enum DeviceGradingMode {
  SINGLE = "SINGLE",
  TABLE = "TABLE",
}

type DeviceGradingProps = {
  device: number;
  ground: number;
  mode: DeviceGradingMode;
  hideTitle?: boolean;
  hideRound?: boolean;
};

export function DeviceGrading(props: DeviceGradingProps) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    round: "0",
  });
  const [round, setRound] = useState(
    parseInt(searchParams.get("round") || "0")
  );
  const [isFinished, setIsFinished] = useState(false);
  const { t } = useTranslation(["egt", "common"]);
  const {
    data: divisionsData,
    loading: divisionsDataLoading,
  } = useEgtGradingDivisionsIdsQuery({
    variables: {
      filter: {
        competitionID: id!,
        ground: props.ground,
        state: "RUNNING",
      },
    },
    fetchPolicy: "no-cache",
  });

  const { maxRounds, lowestRound } = useMemo(() => {
    if (!divisionsData) {
      return { maxRounds: 0, lowestRound: 0 };
    }

    let max = 0;
    // start high so we can progress down to the real value
    let lowest = Infinity;
    for (const division of divisionsData.egtDivisions) {
      if (division.totalRounds > max) {
        max = division.totalRounds;
      }
      if (division.currentRound < lowest) {
        lowest = division.currentRound;
      }
    }
    return { maxRounds: max, lowestRound: lowest };
  }, [divisionsData]);

  useEffect(() => {
    if (lowestRound !== undefined && lowestRound > round) {
      setRound(lowestRound);
    }
  }, [lowestRound]);

  useEffect(() => {
    if (props.mode === DeviceGradingMode.SINGLE) {
      setSearchParams({
        round: round.toString(),
      });
    }
  }, [round]);

  if (!divisionsData?.egtDivisions || divisionsData.egtDivisions.length === 0) {
    if (divisionsData?.egtDivisions.length === 0 && props.device === 0) {
      return (
        <Typography variant="h5" sx={{ mt: 3 }}>
          {t("no_started", { name: t("division") })}
        </Typography>
      );
    }

    return null;
  }

  if (divisionsDataLoading) {
    return <Skeleton />;
  }

  if (maxRounds <= props.device) {
    return null;
  }

  function advanceRound() {
    if (round < maxRounds - 1) {
      setRound(round + 1);
    } else {
      setIsFinished(true);
    }
  }

  function renderRoundGrading() {
    switch (props.mode) {
      case DeviceGradingMode.TABLE:
        return (
          <>
            <Tabs
              variant="fullWidth"
              onChange={(_, v) => setRound(v)}
              value={round}
            >
              {[...Array(maxRounds).keys()].map((i) => (
                <Tab key={i} label={t(`round`, { ns: "egt", number: i + 1 })} />
              ))}
            </Tabs>
            <RoundGradingTable
              device={props.device}
              ground={props.ground}
              round={round}
            />
          </>
        );
      case DeviceGradingMode.SINGLE:
        return (
          <RoundGradingSingle
            device={props.device}
            ground={props.ground}
            round={round}
            maxRounds={maxRounds}
            advanceRound={advanceRound}
            isFinished={isFinished}
          />
        );
    }
  }

  return (
    <>
      {!props.hideTitle && (
        <Typography sx={{ mt: 3 }} variant="h5">
          {t(`device_${props.device}`, { ns: "egt" })}
          {!props.hideRound && (
            <Typography variant="h5">
              {t(`round`, { ns: "egt", number: round + 1 })}
            </Typography>
          )}
        </Typography>
      )}

      {renderRoundGrading()}
    </>
  );
}
