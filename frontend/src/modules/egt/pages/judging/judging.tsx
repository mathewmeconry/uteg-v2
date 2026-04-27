import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { useNavigate, useParams } from "react-router-dom";
import {
  authWithToken,
  getTokenData,
  isTokenValid,
  removeToken,
} from "../../../../helpers/auth";
import { useEffect, useMemo, useState } from "react";
import {
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  createTheme,
  ThemeProvider,
  Button,
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

export default function Judging() {
  const { t } = useTranslation(["egt", "common"]);
  const { token } = useParams();
  const [tokenData, setTokenData] = useState<JudgingTokenData | null>(null);
  const navigate = useNavigate();
  const [authenticating, setAuthenticating] = useState(true);
  const [queryCompetition, { data: competition, loading: competitionLoading }] =
    useEgtJudgingCompetitionLazyQuery();
  const [fontSize, setFontSize] = useState(20);

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

  const theme = useMemo(() => {
    return createTheme({
      typography: {
        fontSize: fontSize,
        fontWeightRegular: 450,
      },
    });
  }, [fontSize]);

  function renderLoading() {
    return (
      <PaperExtended
        title={t("loading")}
        actions={[
          <Button
            variant="outlined"
            onClick={() => setFontSize(fontSize + 2.5)}
          >
            A+
          </Button>,
          <Button
            variant="outlined"
            onClick={() => setFontSize(Math.min(fontSize - 2.5, 15))}
          >
            A-
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
    authWithToken(token || "").then(() => setAuthenticating(false));
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
          <IconButton
            size="small"
            onClick={() => setFontSize(fontSize + 2.5)}
            style={{ marginRight: "2rem" }}
          >
            A+
          </IconButton>,
          <IconButton
            size="small"
            style={{ marginRight: "2rem" }}
            onClick={() => setFontSize(Math.max(fontSize - 2.5, 10))}
          >
            A-
          </IconButton>,
          <Tooltip title={t("logout", { ns: "common" })}>
            <IconButton size="small" onClick={logout}>
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
