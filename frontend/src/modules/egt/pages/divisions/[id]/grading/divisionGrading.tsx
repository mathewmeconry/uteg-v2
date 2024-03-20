import { useParams } from "react-router-dom";
import { PaperExtended } from "../../../../../../components/paperExtended";
import DivisionInfo from "../../../../components/division/DivisionInfo";
import { useTranslation } from "react-i18next";
import {
  DeviceGrading,
  DeviceGradingMode,
} from "../../../../components/grading/DeviceGrading";
import { useEgtDivisionGradingQuery } from "../../../../../../__generated__/graphql";
import { LinearProgress } from "@mui/material";

export default function DivisionGrading() {
  const { divisionID } = useParams();
  const { t } = useTranslation(["common", "egt"]);
  const {
    data: divisionData,
    loading: divisionLoading,
  } = useEgtDivisionGradingQuery({
    variables: {
      id: divisionID!,
    },
  });

  if (divisionLoading || !divisionData || !divisionData.egtDivision) {
    return <LinearProgress />;
  }

  return (
    <>
      <PaperExtended title={t("division_info", { ns: "egt" })}>
        <DivisionInfo id={divisionID!} />
      </PaperExtended>
      <PaperExtended sx={{ mt: 2 }} title={t("grading", { ns: "egt" })}>
        {[...Array(divisionData.egtDivision.totalRounds).keys()].map(
          (deviceNumber) => (
            <DeviceGrading
              key={deviceNumber}
              device={deviceNumber}
              divisionIds={[divisionID!]}
              ground={divisionData?.egtDivision?.ground ?? 0}
              onlyRunning={false}
              mode={DeviceGradingMode.TABLE}
            />
          )
        )}
      </PaperExtended>
    </>
  );
}
