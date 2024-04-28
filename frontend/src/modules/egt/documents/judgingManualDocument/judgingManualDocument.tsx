import { Page, Document, StyleSheet, Text, Font } from "@react-pdf/renderer";
import { TFunction } from "i18next";
import { Judgetoken } from "../../../../__generated__/graphql";
import { QRCode } from "../../../../components/qrcode/QRCode";

Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf",
  fontWeight: 300,
});
Font.register({
  family: "Roboto",
  src: "https://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf",
  fontWeight: 700,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Roboto",
    padding: "5vw",
    fontWeight: 300,
    fontSize: "9pt",
  },
  section: {
    marginBottom: 20,
  },
  h1: {
    width: "90vw",
    fontSize: "16pt",
    fontWeight: 700,
    marginBottom: 10,
  },
  h2: {
    width: "90vw",
    fontSize: "12pt",
    fontWeight: 700,
    marginBottom: 10,
    marginTop: 40,
  },
  table: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "column",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
    height: "30pt",
    paddingTop: 8,
  },
  tableCell: {
    fontSize: "9pt",
    padding: "2pt",
  },
  tableCellAnnotation: {
    fontSize: "7pt",
    color: "grey",
    marginBottom: "2pt",
    marginTop: "auto",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9pt",
    fontWeight: 700,
    borderBottomWidth: "1.5pt",
  },
  grade: {
    textAlign: "center",
  },
});
export type JudgingManualDocumentProps = {
  t: TFunction;
  tokens: Judgetoken[];
  competitionID: string;
};

export function JudgingManualDocument(props: JudgingManualDocumentProps) {
  function renderJudgingManual(token: Judgetoken) {
    const location = `${document.location.origin}/competition/${
      props.competitionID
    }/egt/judging/${encodeURIComponent(token.token)}`;

    return (
      <Page size="A4" style={styles.page} wrap={true}>
        <Text style={styles.h1}>
          {props.t("judging_manual", { ns: "egt" })}
        </Text>
        <Text style={{ ...styles.h2, marginTop: 0 }}>
          {props.t("login", { ns: "common" })}
        </Text>
        <Text>{props.t("judging_manual_login_step1", { ns: "egt" })}</Text>
        <QRCode
          value={location}
          inPDF
          style={{ width: "15vw", height: "15vw", margin: "2vw" }}
        />
        <Text>
          {props.t("judging_manual_login_step2", {
            ns: "egt",
            device: props.t(`device_${token.device}`, { ns: "egt" }),
            ground: token.ground,
          })}
        </Text>
        <Text style={styles.h2}>
          {props.t("no_started", {
            ns: "egt",
            name: props.t("division", { ns: "egt" }),
          })}
        </Text>
        <Text>
          {props.t("judging_manual_no_division", {
            ns: "egt",
            no_division: props.t("no_started", {
              ns: "egt",
              name: props.t("division", { ns: "egt" }),
            }),
          })}
        </Text>
        <Text style={styles.h2}>{props.t("grading", { ns: "egt" })}</Text>
        <Text>
          {props.t("judging_manual_grading_step_1", {
            ns: "egt",
          })}
        </Text>
        <Text>
          {props.t("judging_manual_grading_step_2", {
            ns: "egt",
          })}
        </Text>
        <Text>
          {props.t("judging_manual_grading_step_3", {
            ns: "egt",
          })}
        </Text>
        <Text>
          {props.t("judging_manual_grading_step_4", {
            ns: "egt",
          })}
        </Text>
        <Text>
          {props.t("judging_manual_grading_step_5", {
            ns: "egt",
          })}
        </Text>
        <Text style={styles.h2}>
          {props.t("judging_manual_division_overview", {
            ns: "egt",
          })}
        </Text>
        <Text>
          {props.t("judging_manual_division_overview_content", { ns: "egt" })}
        </Text>
        <Text>
          {props.t("judging_manual_division_overview_close", { ns: "egt" })}
        </Text>
        <Text style={styles.h2}>
          {props.t("notification", {
            ns: "common",
            count: 2,
          })}
        </Text>
        <Text>
          {props.t("judging_manual_notifications", { ns: "egt" })}
        </Text>
      </Page>
    );
  }

  return (
    <Document>
      {props.tokens.map((token) => renderJudgingManual(token))}
    </Document>
  );
}
