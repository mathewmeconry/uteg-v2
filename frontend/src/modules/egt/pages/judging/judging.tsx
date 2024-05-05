import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { useNavigate, useParams } from "react-router-dom";
import {
  authWithJudgeToken,
  getTokenData,
  isTokenValid,
  removeToken,
} from "../../../../helpers/auth";
import { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useEgtJudgingCompetitionLazyQuery } from "../../../../__generated__/graphql";
import {
  DeviceGrading,
  DeviceGradingMode,
} from "../../components/grading/DeviceGrading";
import LogoutIcon from "@mui/icons-material/Logout";
import { enqueueSnackbar } from "notistack";

export type JudgingTokenData = {
  competition: number;
  device: number;
  ground: number;
};

const theme = createTheme({
  typography: {
    fontSize: 20,
    fontWeightRegular: 450,
  },
});

export default function Judging() {
  const { t } = useTranslation(["egt", "common"]);
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<JudgingTokenData | null>(null);
  const navigate = useNavigate();
  const [authenticating, setAuthenticating] = useState(true);
  const [
    queryCompetition,
    { data: competition, loading: competitionLoading },
  ] = useEgtJudgingCompetitionLazyQuery();

  useEffect(() => {
    setTokenData(getTokenData());
  }, [authenticating]);

  useEffect(() => {
    if (tokenData) {
      queryCompetition({
        variables: {
          id: (tokenData.competition ?? "").toString(),
        },
      });
    }
  }, [tokenData]);

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

  function logout() {
    removeToken();
    enqueueSnackbar(t("logged_out", { ns: "common" }), { variant: "success" });
    navigate("/login");
  }

  if (!isTokenValid()) {
    authWithJudgeToken(token || "").then(() => setAuthenticating(false));
    return renderLoading();
  } else {
    if (authenticating) {
      setAuthenticating(false);
    }
  }

  if (!tokenData || competitionLoading) {
    return renderLoading();
  }

  return (
    <ThemeProvider theme={theme}>
      <PaperExtended
        title={t(`device_${tokenData?.device}`)}
        titleSuffix={
          t("ground_typed", { name: tokenData?.ground, ns: "common" }) +
            " - " +
            competition?.competition.name || t("loading", { ns: "common" })
        }
        actions={[
          <Tooltip title={t("logout", { ns: "common" })}>
            <IconButton onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>,
        ]}
      >
        <DeviceGrading
          device={tokenData?.device}
          ground={tokenData?.ground}
          mode={DeviceGradingMode.SINGLE}
          hideTitle={true}
          onlyRunning
        />
      </PaperExtended>
    </ThemeProvider>
  );
}
