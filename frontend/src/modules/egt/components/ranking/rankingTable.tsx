import { TableVirtuoso, TableComponents } from "react-virtuoso";
import { EgtStarterRanking } from "../../../../__generated__/graphql";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

export type RankingTableProps = {
  rankings: EgtStarterRanking[];
};

export function RankingTable(props: RankingTableProps) {
  const { t } = useTranslation(["egt", "common"]);

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

  const TableComponents: TableComponents<EgtStarterRanking, any> = {
    Scroller: React.forwardRef((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} style={{ borderCollapse: "separate" }} />
    ),
    TableHead: TableHead,
    TableRow: TableRow,
    TableBody: React.forwardRef((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

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

  function renderRow(_index: number, item: EgtStarterRanking) {
    const grades = [...item.grades].sort(
      (a, b) => a.deviceNumber - b.deviceNumber
    );
    const highGrades = highestGrades;

    return (
      <>
        <TableCell>{item.rank}</TableCell>
        <TableCell>
          {item.egtStarterlink.starterlink.starter.firstname}
        </TableCell>
        <TableCell>
          {item.egtStarterlink.starterlink.starter.lastname}
        </TableCell>
        <TableCell>{item.egtStarterlink.starterlink.club.name}</TableCell>
        {grades.map((grade) => (
          <TableCell
            key={grade.id}
            sx={{
              textAlign: "center",
              fontWeight:
                highGrades[grade.deviceNumber] === grade.value ? "bold" : "",
            }}
          >
            {(Math.round(Math.ceil(grade.value * 1000) / 10) / 100).toFixed(2)}
          </TableCell>
        ))}
        <TableCell>{(Math.round(Math.ceil(item.total * 1000) / 10) / 100).toFixed(2)}</TableCell>
        <TableCell>{getAwardIcon(item.award)}</TableCell>
      </>
    );
  }

  return (
    <TableVirtuoso
      style={{ height: 400, minWidth: 650 }}
      components={TableComponents}
      data={props.rankings}
      useWindowScroll
      fixedHeaderContent={() => (
        <TableRow>
          <TableCell></TableCell>
          <TableCell>{t("firstname", { ns: "common" })}</TableCell>
          <TableCell>{t("lastname", { ns: "common" })}</TableCell>
          <TableCell>{t("club", { ns: "common" })}</TableCell>
          {[...Array(highestDeviceCount).keys()].map((i) => (
            <TableCell key={i} sx={{ textAlign: "center" }}>
              {t(`device_${i}_short`, { ns: "egt" })}
            </TableCell>
          ))}
          <TableCell>{t("total", { ns: "common" })}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      )}
      itemContent={renderRow}
    />
  );
}
