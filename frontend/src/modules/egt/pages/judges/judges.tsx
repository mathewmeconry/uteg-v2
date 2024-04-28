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
  Button,
  CircularProgress,
  Grid,
  IconButton,
  LinearProgress,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import ClipboardCopy from "../../../../components/ClipboardCopy";
import { enqueueSnackbar } from "notistack";
import LockResetIcon from "@mui/icons-material/LockReset";
import DownloadIcon from "@mui/icons-material/Download";
import { QRCode } from "../../../../components/qrcode/QRCode";
import { usePdfDownload } from "../../../../hooks/usePdfDownload/usePdfDownload";
import { JudgingManualDocument } from "../../documents/judgingManualDocument/judgingManualDocument";

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
  const {
    update: pdfUpdate,
    download: pdfDownload,
    loading: pdfLoading,
  } = usePdfDownload({});

  useEffect(() => {
    load();
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
  }, [selectedTab]);

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
          token: data.data?.resetJudgeToken?.token as string,
        };
        return cloned;
      });
      enqueueSnackbar(t("token_reset"), { variant: "success" });
    } catch {
      enqueueSnackbar(t("error"), { variant: "error" });
    }
  }

  async function resetAllTokensClick() {
    for (const token of tokens) {
      await resetTokenClick(token.id);
    }
  }

  async function downloadManuals(tokens: Judgetoken[]) {
    await pdfUpdate({
      document: (
        <JudgingManualDocument tokens={tokens} competitionID={id!} t={t} />
      ),
      filename: `${t("judging_manual")}_${t("ground_typed", {
        ns: "common",
        name: selectedTab + 1,
      })}_${tokens.map((token) => t(`device_${token.device}`)).join("_")}.pdf`,
    });
    pdfDownload();
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
        <Grid item key={token.id} md={6} lg={4} sm={12} mt={2}>
          <Typography variant="h5">
            {t(`device_${token.device}`, { ns: "egt" })}
            <ClipboardCopy value={location} />
            <Tooltip title={t("manual", { count: 1, ns: "egt" })}>
              <IconButton onClick={() => downloadManuals([token])}>
                {pdfLoading ? <CircularProgress size={19} /> : <DownloadIcon />}
              </IconButton>
            </Tooltip>
            {resetting && <CircularProgress size={19} />}

            {!resetting && (
              <Tooltip title={t("reset", { ns: "common" })}>
                <IconButton onClick={() => resetTokenClick(token.id)}>
                  <LockResetIcon />
                </IconButton>
              </Tooltip>
            )}
          </Typography>
          <QRCode value={location} style={{ margin: 1 }} />
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
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
        {pdfLoading ? (
          <LinearProgress />
        ) : (
          <Button
            startIcon={<DownloadIcon />}
            onClick={() => downloadManuals(tokens)}
          >
            {t("manual", { count: 2, ns: "egt" })}
          </Button>
        )}

        <Button startIcon={<LockResetIcon />} onClick={resetAllTokensClick}>
          {t("reset_all", { ns: "common" })}
        </Button>
      </Box>
      <Box>{renderJudgeLinks()}</Box>
    </PaperExtended>
  );
}
