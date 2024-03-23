import { useParams } from "react-router-dom";
import {
  EgtStarterRanking,
  Sex,
  useEgtCategorySettingsQuery,
  useEgtStarterRankingQuery,
  useUpdateEgtCategorySettingsMutation,
} from "../../../../__generated__/graphql";
import {
  Button,
  Divider,
  Grid,
  LinearProgress,
  Skeleton,
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
    refetch: rankingRefetch,
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
  const {
    data: honourPrecentageData,
    loading: honourPrecentageLoading,
    refetch: honourPrecentageRefetch,
  } = useEgtCategorySettingsQuery({
    variables: {
      competitionID: id!,
      category: props.category,
      sex: props.sex,
    },
  });
  const [
    categorySettingsMutation,
  ] = useUpdateEgtCategorySettingsMutation();

  async function onHonourPercentageChange(value: string) {
    const result = await categorySettingsMutation({
      variables: {
        competitionID: id!,
        data: {
          category: props.category,
          sex: props.sex,
          honourPrecentage: parseInt(value),
        },
      },
      refetchQueries: ["egtCategorySettings", "egtStarterRankings"],
    });
    if (result.errors) {
      enqueueSnackbar(t("error"), { variant: "error" });
      return;
    }
    honourPrecentageRefetch();
    rankingRefetch();
    enqueueSnackbar(t("saved"), { variant: "success" });
  }

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
      filename: `${t("ranking_typed", {
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
    return Array.from(Array(10).keys()).map((_) => (
      <Skeleton variant="text" />
    ));
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
          value={
            honourPrecentageData?.egtCategorySettings.honourPrecentage.toString() ||
            ""
          }
          label={t("honourPrecentage", { ns: "egt" })}
          endAdornment="%"
          loading={honourPrecentageLoading}
          onSave={onHonourPercentageChange}
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
          {t("TODO", { ns: "egt" })}
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
