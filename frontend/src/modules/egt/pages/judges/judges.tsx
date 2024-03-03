import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import {
  Judgetoken,
  useEgtJudgesGroundsQuery,
  useEgtJudgesResetTokenMutation,
  useEgtJudgesTokensLazyQuery,
} from "../../../../__generated__/graphql";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import QRCode from "react-qr-code";
import ClipboardCopy from "../../../../components/ClipboardCopy";
import { enqueueSnackbar } from "notistack";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function Judges() {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: grounds, loading: groundsLoading } = useEgtJudgesGroundsQuery({
    variables: {
      id: id!,
    },
  });
  const [tokens, setTokens] = useState<Judgetoken[]>([]);
  const [tokenQuery] = useEgtJudgesTokensLazyQuery();
  const [resetToken, { loading: resetting }] = useEgtJudgesResetTokenMutation();

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      const tokens: Judgetoken[] = [];
      for (let i = 0; i < 5; i++) {
        const tokenData = await tokenQuery({
          variables: {
            competitionID: id!,
            device: i,
            ground: selectedTab + 1,
            create: true,
          },
        });
        if (tokenData.data?.findJudgeToken) {
          tokens.push(tokenData.data?.findJudgeToken as Judgetoken);
        }
        if (tokenData.error) {
          enqueueSnackbar(t("error"), { variant: "error" });
          continue;
        }
      }
      setTokens(tokens);
    }
  }, []);

  async function resetTokenClick(id: string) {
    try {
      const data = await resetToken({
        variables: { id },
        refetchQueries: ["EgtJudgesTokens"],
      });
      const index = tokens.findIndex((t) => t.id === id);
      setTokens((state) => {
        const cloned = [...state];
        cloned[index] = {
            ...cloned[index],
            token: data.data?.resetJudgeToken?.token as string
        }
        return cloned;
      });
      enqueueSnackbar(t("token_reset"), { variant: "success" });
    } catch {
      enqueueSnackbar(t("error"), { variant: "error" });
    }
  }

  function renderTabs() {
    if (!grounds?.competition.grounds || groundsLoading) {
      return <LinearProgress />;
    }

    const tabs: ReactElement[] = [];
    for (let i = 0; i < grounds?.competition.grounds; i++) {
      tabs.push(
        <Tab label={t("ground_typed", { ns: "common", name: i + 1 })} key={i} />
      );
    }

    return (
      <Tabs
        variant="fullWidth"
        value={selectedTab}
        onChange={(_, v) => setSelectedTab(v)}
      >
        {tabs}
      </Tabs>
    );
  }

  function renderJudgeLinks() {
    if (!grounds?.competition.grounds || groundsLoading) {
      return <LinearProgress />;
    }

    const qrCodes: ReactElement[] = [];
    for (const token of tokens) {
      const location = `${
        document.location.origin
      }/competition/${id}/egt/judging/${encodeURIComponent(token.token)}`;
      qrCodes.push(
        <Grid item key={token.id} md={4} lg={3} sm={6} mt={2}>
          <Typography variant="h5">
            {t(`device_${token.device}`, { ns: "egt" })}
            <ClipboardCopy value={location} />
            {resetting && <CircularProgress size={19} />}

            {!resetting && (
              <Tooltip title={t("reset", { ns: "common" })}>
                <IconButton onClick={() => resetTokenClick(token.id)}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          <QRCode value={location} />
        </Grid>
      );
    }

    return (
      <Grid container spacing={2}>
        {qrCodes}
      </Grid>
    );
  }

  return (
    <PaperExtended title={t("judges")}>
      <Box>{renderTabs()}</Box>
      <Box>{renderJudgeLinks()}</Box>
    </PaperExtended>
  );
}
