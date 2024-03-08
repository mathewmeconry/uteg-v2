import { useParams } from "react-router-dom";
import { useEgtGradingDivisionsIdsQuery } from "../../../../__generated__/graphql";
import { Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useMemo, useState } from "react";
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
};

export function DeviceGrading(props: DeviceGradingProps) {
  const { id } = useParams();
  const [round, setRound] = useState(0);
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
  });
  const maxRounds = useMemo(() => {
    if (!divisionsData) {
      return 0;
    }

    let max = 0;
    for (const division of divisionsData.egtDivisions) {
      if (division.totalRounds > max) {
        max = division.totalRounds;
      }
    }
    return max;
  }, [divisionsData]);

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
          />
        );
    }
  }

  return (
    <>
      {!props.hideTitle && (
        <Typography sx={{ mt: 3 }} variant="h5">
          {t(`device_${props.device}`, { ns: "egt" })}
          <Typography variant="h5">
            {t(`round`, { ns: "egt", number: round + 1 })}
          </Typography>
        </Typography>
      )}

      {renderRoundGrading()}
    </>
  );
}
