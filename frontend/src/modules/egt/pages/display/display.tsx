import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  createTheme,
  Drawer,
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
  EgtDisplayCompetitionQuery,
  EgtDisplayGradesSubscriptionSubscription,
  useEgtDisplayCompetitionLazyQuery,
  useEgtDisplayDivisionDataLazyQuery,
  useEgtDisplayGradesSubscriptionSubscription,
} from "../../../../__generated__/graphql";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type DisplayTokenData = {
  competition: number;
  ground: number;
};

export default function Display() {
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<DisplayTokenData | null>(
    getTokenData(),
  );
  const [authenticating, setAuthenticating] = useState(true);
  const [queryCompetition, { data, loading, error }] =
    useEgtDisplayCompetitionLazyQuery();

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
  return <Running competition={data?.competition} />;
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
  competition,
}: {
  competition?: EgtDisplayCompetitionQuery["competition"];
}) {
  const { t } = useTranslation(["egt", "common"]);
  const token = getTokenData<DisplayTokenData>();
  const [subscriptionGrades, setSubscriptionGrades] = useState<
    EgtDisplayGradesSubscriptionSubscription["grade"][]
  >([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(
    localStorage.getItem("displayFontSize")
      ? Number(localStorage.getItem("displayFontSize"))
      : 30,
  );
  const theme = useMemo(() => {
    localStorage.setItem("displayFontSize", fontSize.toString());
    return createTheme({
      typography: {
        fontSize: fontSize,
        fontWeightRegular: 450,
      },
    });
  }, [fontSize]);

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

  if (divisionsDataLoading) {
    return <Loading />;
  }

  if (!divisionsData || divisionsData.length === 0) {
    return (
      <>
        <ThemeProvider theme={theme}>
          <PaperExtended
            title={competition?.name || t("display")}
            actions={[
              <Button
                variant="text"
                size="small"
                onClick={() => setSettingsOpen(true)}
              >
                <InfoOutlinedIcon
                  fontSize="small"
                  color="action"
                  style={{ fontSize: 25 }}
                />
              </Button>,
            ]}
          >
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
          </PaperExtended>
        </ThemeProvider>
        <SettingsDrawer
          open={settingsOpen}
          onClose={() => setSettingsOpen(false)}
          fontSize={fontSize}
          setFontSize={setFontSize}
          competition={competition ? { name: competition.name } : undefined}
          token={token}
        />
      </>
    );
  }

  if (divisionsDataLoading || divisionsQueryLoading) {
    return <Loading />;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <PaperExtended
          title={
            (competition?.name || t("display")) +
            ` - ${t("round", { number: lowestRound + 1 })}`
          }
          actions={[
            <Button
              variant="text"
              size="small"
              onClick={() => setSettingsOpen(true)}
            >
              <InfoOutlinedIcon
                fontSize="small"
                color="action"
                style={{ fontSize: 25 }}
              />
            </Button>,
          ]}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              gap: "2.5rem",
              justifyContent: "space-between",
              height: "90svh",
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
        </PaperExtended>
      </ThemeProvider>
      <SettingsDrawer
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        fontSize={fontSize}
        setFontSize={setFontSize}
        competition={competition ? { name: competition.name } : undefined}
        lowestRound={lowestRound}
        token={token}
        startersCountPerDevice={
          divisionsQueryData
            ? Object.fromEntries(
                divisionsQueryData.egtJudgingDevices.map((device) => [
                  device.device.deviceNumber,
                  device.starterslist.length,
                ]),
              )
            : undefined
        }
      />
    </>
  );
}

function SettingsDrawer({
  open,
  onClose,
  fontSize,
  setFontSize,
  competition,
  lowestRound,
  token,
  startersCountPerDevice,
}: {
  open: boolean;
  onClose: () => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  competition?: { name: string };
  lowestRound?: number;
  token: DisplayTokenData;
  startersCountPerDevice?: { [deviceNumber: number]: number };
}) {
  const { t } = useTranslation(["egt", "common"]);

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 250, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {t("settings")}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="subtitle1">{t("font_size")}</Typography>
          <input
            type="range"
            min={10}
            max={60}
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2" color="textSecondary">
            {t("competition")}: {competition?.name || t("unknown")}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t("ground")}: {token.ground}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {t("round", { number: lowestRound ?? 0 })}
          </Typography>
          {startersCountPerDevice && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                {t("starters_per_device")}
              </Typography>
              {Object.entries(startersCountPerDevice).map(
                ([deviceNumber, count]) => (
                  <Typography
                    key={deviceNumber}
                    variant="body2"
                    color="textSecondary"
                  >
                    {t("device", { number: deviceNumber })}: {count}
                  </Typography>
                ),
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
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
      <Typography variant="h3" style={{ marginBottom: "1rem" }}>
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
