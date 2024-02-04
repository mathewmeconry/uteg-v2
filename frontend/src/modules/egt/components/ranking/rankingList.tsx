import { useParams } from "react-router-dom";
import {
  EgtStarterRanking,
  Sex,
  useEgtStarterRankingQuery,
} from "../../../../__generated__/graphql";
import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  ToggleButton,
  Typography,
} from "@mui/material";
import { RankingTable } from "./rankingTable";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { InputClickEditable } from "../../../../components/InputClickEditable";
import { usePdfDownload } from "../../../../hooks/usePdfDownload/usePdfDownload";
import { RankingDocument } from "../../documents/rankingDocument/rankingDocument";
import { useState } from "react";

export type RankingListProps = {
  sex: Sex;
  category: number;
};

export function RankingList(props: RankingListProps) {
  const { t } = useTranslation("common");
  const [showIntermediate, setShowIntermediate] = useState(false);
  const { id } = useParams();
  const {
    data: rankingData,
    loading: rankingLoading,
    error: rankingError,
  } = useEgtStarterRankingQuery({
    variables: {
      competitionID: id!,
      sex: props.sex,
      category: props.category,
    },
  });
  let {
    update: pdfUpdate,
    download: pdfDownload,
    loading: pdfLoading,
  } = usePdfDownload({});

  async function onPdfClick() {
    await pdfUpdate({
      document: (
        <RankingDocument
          t={t}
          sex={props.sex}
          category={props.category}
          rankings={rankingData?.egtStarterRankings as EgtStarterRanking[]}
        />
      ),
      filename: `${t("rankings", {
        ns: "egt",
        category: t(`category_${props.category}`, {
          ns: "egt",
          context: props.sex.toLowerCase(),
        }),
      })} ${t(props.sex.toLowerCase(), { ns: "common" })}.pdf`,
    });
    pdfDownload();
  }

  if (rankingLoading) {
    return <LinearProgress />;
  }

  if (rankingError) {
    enqueueSnackbar(t("error"), { variant: "error" });
    return <Typography>{t("error")}</Typography>;
  }

  return (
    <Grid container spacing={2} direction={"row"} wrap="wrap-reverse">
      <Grid item xs>
        <RankingTable
          rankings={rankingData?.egtStarterRankings as EgtStarterRanking[]}
        />
      </Grid>
      <Grid item xs={12} md={2}>
        <InputClickEditable
          value="33"
          label={t("honourPrecentage", { ns: "egt" })}
          endAdornment="%"
        />
        <Divider sx={{ mt: 2, mb: 2 }} />
        <ToggleButton
          sx={{ mb: 2 }}
          size="small"
          fullWidth
          color="primary"
          value="intermediate"
          selected={showIntermediate}
          onChange={() => {
            setShowIntermediate(!showIntermediate);
          }}
        >
          {t("intermediate", { ns: "egt" })}
        </ToggleButton>
        <Button
          startIcon={<PictureAsPdfIcon />}
          fullWidth
          variant="outlined"
          onClick={onPdfClick}
        >
          {pdfLoading ? <LinearProgress sx={{ width: "100%" }} /> : "PDF"}
        </Button>
      </Grid>
    </Grid>
  );
}
