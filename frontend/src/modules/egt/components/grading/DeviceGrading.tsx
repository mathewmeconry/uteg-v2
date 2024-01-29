import { useParams } from "react-router-dom";
import { useEgtGradingDivisionsIdsQuery } from "../../../../__generated__/graphql";
import { Skeleton, Tab, Tabs, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCallback, useState } from "react";
import { RoundGrading } from "./RoundGrading";

type DeviceGradingProps = {
  device: number;
  ground: number;
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
  const maxRounds = useCallback(() => {
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

  if (divisionsDataLoading) {
    return <Skeleton />;
  }

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

  return (
    <>
      <Typography sx={{ mt: 3 }} variant="h5">
        {t(`device_${props.device}`, { ns: "egt" })}
      </Typography>
      <Tabs variant="fullWidth" onChange={(_, v) => setRound(v)} value={round}>
        {[...Array(maxRounds()).keys()].map((i) => (
          <Tab key={i} label={t(`round`, { ns: "egt", number: i + 1 })} />
        ))}
      </Tabs>
      <RoundGrading device={props.device} ground={props.ground} round={round} />
    </>
  );
}
