import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import {
  authWithToken,
  getTokenData,
  isTokenValid,
} from "../../../../helpers/auth";
import { PaperExtended } from "../../../../components/paperExtended";
import useEGTDivisions from "../../hooks/useEGTDivisions/useEGTDivisions";
import { graphql } from "../../../../__new_generated__/gql";
import {
  EgtDisplayDivisionDataQuery,
  EgtDivisionStates,
} from "../../../../__new_generated__/graphql";
import {
  EgtDisplayGradesSubscriptionSubscription,
  useEgtDisplayCompetitionLazyQuery,
  useEgtDisplayDivisionDataLazyQuery,
  useEgtDisplayGradesSubscriptionSubscription,
} from "../../../../__generated__/graphql";

type DisplayTokenData = {
  competition: number;
  ground: number;
};

export default function Display() {
  const { t } = useTranslation(["egt", "common"]);
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<DisplayTokenData | null>(
    getTokenData(),
  );
  const [authenticating, setAuthenticating] = useState(true);
  const [queryCompetition, { data, loading, error }] =
    useEgtDisplayCompetitionLazyQuery();
  const [round, setRound] = useState(0);
  const [fontSize, setFontSize] = useState(50);

  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontSize: fontSize,
        fontWeightRegular: 450,
      },
    });
  }, [fontSize]);

  useEffect(() => {
    if (tokenData) {
      setAuthenticating(false);
    }
  }, []);

  useEffect(() => {
    if (tokenData && !authenticating) {
      queryCompetition({
        variables: {
          id: (tokenData.competition ?? "").toString(),
        },
      });
    }
  }, [tokenData, authenticating]);

  if (!isTokenValid()) {
    authWithToken(token || "").then(() => {
      setAuthenticating(false);
      setTokenData(getTokenData());
    });
    return <Loading />;
  }

  if (authenticating || loading) {
    return <Loading />;
  }

  let title = data?.competition.name || t("display");
  title += ` - ${t("round", { number: round + 1 })}`;

  const fontActions = [
    <Button
      key="decrease"
      onClick={() => setFontSize((s) => Math.max(s - 2.5, 10))}
      variant="text"
      size="small"
      style={{
        marginRight: "0.5rem",
      }}
    >
      A-
    </Button>,
    <Button
      key="increase"
      onClick={() => setFontSize((s) => s + 2.5)}
      variant="text"
      size="small"
    >
      A+
    </Button>,
  ];

  return (
    <ThemeProvider theme={theme}>
      <PaperExtended title={title} actions={fontActions}>
        <Running setRound={setRound} />
      </PaperExtended>
    </ThemeProvider>
  );
}

function Loading() {
  const { t } = useTranslation(["egt", "common"]);
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

const DisplayDivisionFragment = graphql(`
  fragment DisplayDivisionFragment on EGTDivision {
    id
    totalRounds
    currentRound
    state
  }
`);

function Running({
  setRound,
}: {
  setRound: React.Dispatch<React.SetStateAction<number>>;
}) {
  const { t } = useTranslation(["egt", "common"]);
  const token = getTokenData<DisplayTokenData>();
  const [subscriptionGrades, setSubscriptionGrades] = useState<
    EgtDisplayGradesSubscriptionSubscription["grade"][]
  >([]);
  if (!token) {
    throw new Error("Token data is required for Running component");
  }

  const { data: divisionsData, loading: divisionsDataLoading } =
    useEGTDivisions(DisplayDivisionFragment, {
      filter: {
        competitionID: token.competition.toString(),
        ground: token.ground,
        state: EgtDivisionStates.Running,
      },
    });
  const [
    queryDivisions,
    { data: divisionsQueryData, loading: divisionsQueryLoading },
  ] = useEgtDisplayDivisionDataLazyQuery();

  const {
    data: gradesData,
    error: gradesError,
    restart: restartGradesSubscription,
  } = useEgtDisplayGradesSubscriptionSubscription({
    variables: {
      filter: {
        starterlinkIds:
          divisionsQueryData?.egtJudgingDevices.flatMap((d) =>
            d.starterslist.map((s) => s.starterlink.id),
          ) || [],
      },
    },
  });

  useEffect(() => {
    if (gradesData) {
      setSubscriptionGrades((prev) => [...prev, gradesData.grade]);
    }
  }, [gradesData]);

  useEffect(() => {
    restartGradesSubscription();
  }, [divisionsQueryData?.egtJudgingDevices, gradesError]);

  if (gradesError) {
    console.error(gradesError);
  }

  const lowestRound = useMemo(() => {
    if (!divisionsData || divisionsData.length === 0) {
      return 0;
    }
    let lowest = Infinity;
    for (const division of divisionsData) {
      if (division.currentRound < lowest) {
        lowest = division.currentRound;
      }
    }
    return lowest === Infinity ? 0 : lowest;
  }, [divisionsData]);

  useEffect(() => {
    if (divisionsData && divisionsData.length > 0) {
      queryDivisions({
        variables: {
          ids: divisionsData.map((d) => d.id.toString()),
          round: lowestRound,
        },
      });
    }
  }, [divisionsData, lowestRound]);

  useEffect(() => {
    setRound(lowestRound);
  }, [lowestRound]);

  if (divisionsDataLoading) {
    return <Loading />;
  }

  if (!divisionsData || divisionsData.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 5,
        }}
      >
        <Typography variant="h5" sx={{ mt: 3 }}>
          {t("no_started", { name: t("division") })}
        </Typography>
      </Box>
    );
  }

  if (divisionsDataLoading || divisionsQueryLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          gap: "2.5rem",
        }}
      >
        {divisionsQueryData?.egtJudgingDevices.map((device, index) => (
          <Device
            key={device.device.id}
            number={device.device.deviceNumber}
            starters={device.starterslist}
            grades={subscriptionGrades}
          />
        ))}
      </div>
    </div>
  );
}

function Device({
  number,
  starters,
  grades,
}: {
  number: number;
  starters: EgtDisplayDivisionDataQuery["egtJudgingDevices"][0]["starterslist"];
  grades: EgtDisplayGradesSubscriptionSubscription["grade"][];
}) {
  const { t } = useTranslation(["egt", "common"]);

  function getGrade(starterlinkId: string) {
    const deviceGrade = starters
      .find((s) => s.starterlink.id === starterlinkId)
      ?.starterlink.grades.find((grade) => grade.deviceNumber === number);

    const subscriptionGrade = grades.find(
      (grade) =>
        grade.starterlink.id === starterlinkId && grade.deviceNumber === number,
    );

    return subscriptionGrade ?? deviceGrade;
  }

  const gradedStarter = useMemo(() => {
    let lastGradedStarter: (typeof starters)[0] | null = null;
    for (const starter of starters) {
      const latestGrade = getGrade(starter.starterlink.id);
      if (!latestGrade) {
        break;
      }
      lastGradedStarter = starter;
    }
    return lastGradedStarter ?? starters[0];
  }, [starters, grades]);

  const nextToGradeStarter = useMemo(() => {
    const index = starters.findIndex(
      (s) => s.starterlink.id === gradedStarter?.starterlink.id,
    );
    if (index === -1 || index === starters.length - 1) {
      return null;
    }
    return starters[index + 1];
  }, [gradedStarter]);

  return (
    <div>
      <Typography variant="h2" style={{ marginBottom: "1rem" }}>
        {t(`device_${number}`)}
      </Typography>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gridTemplateRows: "repeat(2, auto)",
          gap: "1rem",
          justifyContent: "space-between",
        }}
      >
        {gradedStarter && (
          <>
            <Typography variant="h4">
              {gradedStarter.starterlink.starter.firstname}{" "}
              {gradedStarter.starterlink.starter.lastname}
            </Typography>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              {gradedStarter.starterlink.club.name}
            </Typography>
            <Typography variant="h4" style={{ textAlign: "end" }}>
              {getGrade(gradedStarter.starterlink.id)?.value.toFixed(2)}
            </Typography>
          </>
        )}
        {nextToGradeStarter && (
          <>
            <Typography variant="h5">
              {nextToGradeStarter.starterlink.starter.firstname}{" "}
              {nextToGradeStarter.starterlink.starter.lastname}
            </Typography>
            <Typography variant="h5" style={{ textAlign: "center" }}>
              {nextToGradeStarter.starterlink.club.name}
            </Typography>
            <Typography variant="h5" style={{ textAlign: "end" }}>
              {getGrade(nextToGradeStarter.starterlink.id)?.value.toFixed(2) ??
                ""}
            </Typography>
          </>
        )}
      </div>
    </div>
  );
}
