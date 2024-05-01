import { useParams, useSearchParams } from "react-router-dom";
import { Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import { RoundGradingTable } from "./RoundGradingTable";
import RoundGradingSingle from "./RoundGradingSingle";
import { graphql } from "../../../../__new_generated__/gql";
import useEGTDivisions from "../../hooks/useEGTDivisions/useEGTDivisions";
import { EgtDivisionStates } from "../../../../__new_generated__/graphql";
import usePrevious from "../../../../hooks/usePrev/usePrev";
import { enqueueSnackbar } from "notistack";

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
  divisionIds?: string[];
  onlyRunning: boolean;
};

const DeviceGradingDivisionFragment = graphql(`
  fragment DeviceGradingDivisionFragment on EGTDivision {
    id
    totalRounds
    currentRound
    state
  }
`);

export function DeviceGrading(props: DeviceGradingProps) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    round: "0",
  });
  const [round, setRound] = useState(
    parseInt(searchParams.get("round") || "0")
  );
  const [isFinished, setIsFinished] = useState(false);
  const [blockReset, setBlockReset] = useState(false);
  const { t } = useTranslation(["egt", "common"]);
  const {
    data: divisionsData,
    loading: divisionsDataLoading,
  } = useEGTDivisions(DeviceGradingDivisionFragment, {
    filter: {
      competitionID: id!,
      ground: props.ground,
      state: props.onlyRunning ? EgtDivisionStates.Running : undefined,
      ids: props.divisionIds,
    },
  });
  const previousData = usePrevious(divisionsData);
  const finishedTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    return () => {
      if (finishedTimeout.current) {
        clearTimeout(finishedTimeout.current);
      }
    };
  }, []);

  useEffect(() => {
    if (
      divisionsData?.length !== previousData?.length &&
      divisionsData &&
      divisionsData.length > 0
    ) {
      enqueueSnackbar(
        t("started", {
          ns: "egt",
          name: t("division", { ns: "egt", count: divisionsData?.length }),
        }),
        { variant: "success", key: "device_grading_division_started" }
      );
    }
  }, [divisionsData]);

  useEffect(() => {
    reset();
  }, [divisionsData, blockReset]);

  const { maxRounds, lowestRound } = useMemo(() => {
    if (!divisionsData) {
      return { maxRounds: 0, lowestRound: 0 };
    }

    let max = 0;
    // start high so we can progress down to the real value
    let lowest = Infinity;
    for (const division of divisionsData) {
      if (division.totalRounds > max) {
        max = division.totalRounds;
      }
      if (division.currentRound < lowest) {
        lowest = division.currentRound;
      }
    }
    if (divisionsData.length === 0) {
      lowest = 0;
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

    if(maxRounds > 0 && round > maxRounds - 1) {
      setIsFinished(true);
    }
  }, [round, maxRounds]);

  function reset() {
    if (divisionsData?.length === 0 && !divisionsDataLoading && !blockReset) {
      setIsFinished(false);
      setRound(0);
      if (finishedTimeout.current) {
        clearTimeout(finishedTimeout.current);
      }
    }
  }

  function advanceRound() {
    if (round < maxRounds - 1) {
      setRound(round + 1);
    } else {
      setIsFinished(true);
      setBlockReset(true);
      finishedTimeout.current = setTimeout(() => {
        setBlockReset(false);
      }, 5000);
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
              divisionIds={divisionsData?.map((division) => division.id) ?? []}
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
            divisionIds={divisionsData?.map((division) => division.id) ?? []}
          />
        );
    }
  }

  if ((!divisionsData || divisionsData.length === 0) && !isFinished) {
    if (
      divisionsData &&
      divisionsData.length === 0 &&
      (props.device === 0 || props.mode === DeviceGradingMode.SINGLE)
    ) {
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

  if (maxRounds <= props.device && !isFinished) {
    return null;
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
