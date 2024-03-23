import {
  Font,
  StyleSheet,
  Document,
  Text,
  View,
  Page,
} from "@react-pdf/renderer";
import { EgtStarterRanking, Sex } from "../../../../__generated__/graphql";
import { memo, useMemo } from "react";
import { TFunction } from "i18next";

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
  },
  section: {
    marginBottom: 20,
    width: "90vw",
  },
  h1: {
    width: "90vw",
    fontSize: "14pt",
    fontWeight: 700,
    marginBottom: 10,
  },
  h2: {
    width: "90vw",
    fontSize: "12pt",
    fontWeight: 300,
    marginBottom: 10,
  },
  table: {
    fontFamily: "Roboto",
    display: "flex",
    flexDirection: "column",
    width: "90vw",
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    borderBottomWidth: 1,
    height: "20pt",
    paddingTop: "1.75pt",
  },
  tableCol: {
  },
  tableCell: {
    fontSize: "9pt",
    padding: "2pt",
  },
  tableCellAnnotation: {
    fontSize: "7pt",
    color: "grey",
    width: "90vw",
    marginBottom: "2pt",
    marginTop: "auto",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    fontSize: "9pt",
    fontWeight: 700,
    borderBottomWidth: "1.5pt",
  },
  rank: {
    width: "31pt"
  },
  name: {
    width: "94pt"
  },
  club: {
    width: "139pt"
  },
  grade: {
    width: "49pt",
    textAlign: "center",
  },
  award: {
    width: "13pt"
  },
});

export type RankingDocumentProps = {
  t: TFunction;
  sex: Sex;
  category: number;
  rankings: EgtStarterRanking[];
};

function RankingDocumentNonMemo(props: RankingDocumentProps) {
  const highestDeviceCount = useMemo(() => {
    let max = 0;
    props.rankings.forEach((r) => {
      if (r.grades.length > max) {
        max = r.grades.length;
      }
    });
    return max;
  }, [props.rankings]);

  const highestGrades = useMemo(() => {
    const highestGrades: number[] = Array(5).fill(0);
    for (const ranking of props.rankings) {
      for (const grade of ranking.grades) {
        if (highestGrades[grade.deviceNumber] < grade.value) {
          highestGrades[grade.deviceNumber] = grade.value;
        }
      }
    }
    return highestGrades;
  }, [props.rankings]);

  function getAwardIcon(award: string): string {
    switch (award) {
      case "gold":
        return "G";
      case "silver":
        return "S";
      case "bronze":
        return "B";
      case "honour":
        return "*";
      default:
        return "";
    }
  }

  function renderRow(item: EgtStarterRanking) {
    const grades = [...item.grades].sort(
      (a, b) => a.deviceNumber - b.deviceNumber
    );
    const highGrades = highestGrades;

    return (
      <View style={styles.tableRow}>
        <View style={{ ...styles.tableCol, ...styles.rank }}>
          <Text style={styles.tableCell}>{item.rank}</Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.name }}>
          <Text style={styles.tableCell}>
            {item.egtStarterlink.starterlink.starter.firstname}
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.name }}>
          <Text style={styles.tableCell}>
            {item.egtStarterlink.starterlink.starter.lastname}
          </Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.club }}>
          <Text style={styles.tableCell}>
            {item.egtStarterlink.starterlink.club.name}
          </Text>
        </View>
        {grades.map((grade) => (
          <View style={{ ...styles.tableCol, ...styles.grade }}>
            <Text
              key={grade.id}
              style={{
                ...styles.tableCell,
                fontWeight:
                  highGrades[grade.deviceNumber] === grade.value
                    ? "bold"
                    : "normal",
              }}
            >
              {grade.value.toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={{ ...styles.tableCol, ...styles.grade }}>
          <Text style={styles.tableCell}>{item.total.toFixed(2)}</Text>
        </View>
        <View style={{ ...styles.tableCol, ...styles.award }}>
          <Text style={styles.tableCell}>{getAwardIcon(item.award)}</Text>
        </View>
      </View>
    );
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        <Text style={styles.h1}>
          {props.t("ranking_typed", {
            ns: "egt",
            category: props.t(`category_${props.category}`, {
              ns: "egt",
              context: props.sex.toLowerCase(),
            }),
          })}
        </Text>
        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <View style={{ ...styles.tableCol, ...styles.rank }}>
              <Text style={styles.tableCell}></Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.name }}>
              <Text style={styles.tableCell}>
                {props.t("firstname", { ns: "common" })}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.name }}>
              <Text style={styles.tableCell}>
                {props.t("lastname", { ns: "common" })}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.club }}>
              <Text style={styles.tableCell}>
                {props.t("club", { ns: "common" })}
              </Text>
            </View>
            {[...Array(highestDeviceCount).keys()].map((i) => (
              <View style={{ ...styles.tableCol, ...styles.grade }}>
                <Text key={i} style={{ ...styles.tableCell }}>
                  {props.t(`device_${i}_short`, { ns: "egt" })}
                </Text>
              </View>
            ))}
            <View style={{ ...styles.tableCol, ...styles.grade }}>
              <Text style={styles.tableCell}>
                {props.t("total", { ns: "common" })}
              </Text>
            </View>
            <View style={{ ...styles.tableCol, ...styles.award }}>
              <Text style={styles.tableCell}></Text>
            </View>
          </View>
          {props.rankings.map((ranking) => renderRow(ranking))}
        </View>
      </Page>
    </Document>
  );
}

export const RankingDocument = memo<RankingDocumentProps>(
  RankingDocumentNonMemo
);
