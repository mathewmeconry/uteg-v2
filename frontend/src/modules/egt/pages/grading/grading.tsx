import { useTranslation } from "react-i18next";
import { PaperExtended } from "../../../../components/paperExtended";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { useEgtGradingGroundsQuery } from "../../../../__generated__/graphql";
import { LinearProgress, Tab, Tabs } from "@mui/material";
import { ReactElement, useState } from "react";
import {
  DeviceGrading,
  DeviceGradingMode,
} from "../../components/grading/DeviceGrading";

export function Grading() {
  const { id } = useParams();
  const { t } = useTranslation(["egt", "common"]);
  const [selectedTab, setSelectedTab] = useState(0);
  const { data: grounds, loading: groundsLoading } = useEgtGradingGroundsQuery({
    variables: {
      id: id!,
    },
  });

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

  function renderGradings() {
    if (!grounds?.competition.grounds || groundsLoading) {
      return <LinearProgress />;
    }

    const gradings: ReactElement[] = [];
    for (let i = 0; i < 5; i++) {
      gradings.push(
        <DeviceGrading
          hideRound
          device={i}
          ground={selectedTab + 1}
          key={i}
          mode={DeviceGradingMode.TABLE}
        />
      );
    }
    return gradings;
  }

  return (
    <PaperExtended title={t("grading")}>
      <Box>
        {renderTabs()}
        {renderGradings()}
      </Box>
    </PaperExtended>
  );
}
