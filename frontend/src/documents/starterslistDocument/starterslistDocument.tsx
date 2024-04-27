import { Club, StarterLink } from "../../__generated__/graphql";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Font,
} from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";
import { MRT_ColumnDefExtension } from "../../types/MRT_ColumnDefExtension";
import { Row } from "@tanstack/react-table";

export type StarterslistDocumentProps = {
  starters: Row<StarterLink>[];
  columns: MRT_ColumnDefExtension<StarterLink>[];
  competitionName: string;
};

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
Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create<{ [index: string]: Style }>({
  page: {
    flexDirection: "column",
    fontFamily: "Roboto",
    padding: "35pt",
    paddingTop: "45pt",
    fontWeight: 300,
  },
  margin: {
    marginBottom: 20,
  },
  h1: {
    fontSize: "14pt",
    fontWeight: 700,
    paddingBottom: 10,
  },
  tableRow: {
    display: "flex",
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tableCol: {
    width: "22pt",
  },
  tableCell: {
    fontSize: "9pt",
    padding: "2pt",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    fontSize: "9pt",
    fontWeight: 700,
    borderBottomWidth: "1.5pt",
  },
  competitionName: {
    position: "absolute",
    top: "15pt",
    right: "35pt",
    fontSize: "11pt",
  },
});

export function StarterslistDocument(props: StarterslistDocumentProps) {
  const clubs = props.starters
    .map((starter) => starter.original.club)
    .filter((club) => club);
  const uniqueClubs = clubs
    .filter((club, index) => clubs.findIndex((c) => c.id === club.id) === index)
    .sort((a, b) => a.location.localeCompare(b.location));
  const filteredColumns = props.columns.filter((column) => column.renderInPdf);

  function getStarters(club: Club) {
    return props.starters
      .filter((starter) => starter.original.club)
      .filter((starter) => starter.original.club.id === club.id)
      .sort(
        (a, b) =>
          (parseInt(a.original.egt?.id || "") || 0) -
          (parseInt(b.original.egt?.id || "") || 0)
      )
      .sort(
        (a, b) =>
          // @ts-expect-error
          (parseInt(a.egt?.lineup?.device?.deviceNumber || "") || 0) -
          // @ts-expect-error
          (parseInt(b.egt?.lineup?.device?.deviceNumber || "") || 0)
      )
      .sort(
        (a, b) =>
          (a.original.egt?.division?.number || 0) -
          (b.original.egt?.division?.number || 0)
      )
      .sort(
        (a, b) =>
          (a.original.egt?.category || 0) - (b.original.egt?.category || 0)
      )
      .sort((a, b) =>
        a.original.starter.sex.localeCompare(b.original.starter.sex)
      );
  }

  function getTotalHeight(headersRendered: number, startersRendered: number) {
    let headerHeight = headersRendered * 73;
    let startersHeight = startersRendered * 16;

    return headerHeight + startersHeight;
  }

  function getTableHeaderRow(pageBreak?: boolean) {
    return (
      <View
        style={styles.tableHeaderRow}
        key={`header-${Math.random()}`}
        break={pageBreak}
      >
        {filteredColumns.map((column) => (
          <View
            style={{
              ...styles.tableCol,
              width: column.pdfWidth ?? styles.tableCol.width,
            }}
            key={`header-col-${column.id}`}
          >
            <Text style={styles.tableCell}>{column.header}</Text>
          </View>
        ))}
      </View>
    );
  }

  function renderClubs(clubs: Club[]) {
    const views: React.ReactElement[] = [];
    let headersRendered = 0;
    let startersRendered = 0;
    for (const club of clubs) {
      headersRendered++;
      let headerbreak = false;

      const starters = getStarters(club);
      if (starters.length === 0) {
        return null;
      }
      const startersElements: React.ReactElement[] = [];
      for (const i in starters) {
        const starter = starters[i];
        startersRendered++;
        let pagebreak = false;
        if (getTotalHeight(headersRendered, startersRendered) > 750) {
          pagebreak = true;
          headersRendered = 0;
          startersRendered = 0;
        }

        // if only 2 would be left break
        if (
          starters.length - 1 - parseInt(i) < 3 &&
          getTotalHeight(
            headersRendered,
            startersRendered + starters.length - 1 - parseInt(i)
          ) > 750
        ) {
          pagebreak = true;
          headersRendered = 0;
          startersRendered = 0;
        }

        // break header to next page
        if (parseInt(i) < 3 && pagebreak) {
          pagebreak = false;
          headerbreak = true;
          headersRendered = 1;
        }

        let style = {
          ...styles.tableRow,
        };

        if (parseInt(i) === starters.length - 1) {
          style = {
            ...style,
            ...styles.margin,
          };
        }

        if (pagebreak) {
          startersElements.push(getTableHeaderRow(true));
        }

        startersElements.push(
          <View style={style} key={`row-${starter.id}`} wrap={true}>
            {starter.getAllCells().map((cell) => {
              const column = filteredColumns.find(
                (column) => column.id === cell.column.id
              );
              if (!column) {
                return null;
              }

              return (
                <View
                  style={{
                    ...styles.tableCol,
                    width: column.pdfWidth ?? styles.tableCol.width,
                  }}
                  key={`row-${starter.id}-col-${column.id}`}
                >
                  <Text style={styles.tableCell}>
                    {cell.renderValue() as string}
                  </Text>
                </View>
              );
            })}
          </View>
        );
      }
      const header = (
        <>
          <Text style={styles.h1} break={headerbreak}>
            {club.name}
          </Text>
          {getTableHeaderRow()}
          {startersElements}
        </>
      );
      views.push(header);
    }
    return views;
  }

  return (
    <Document
      author="https://app.uteg.ch"
      title={props.competitionName}
      creator="UTEG"
    >
      <Page size="A4" style={styles.page} wrap>
        <Text style={styles.competitionName} fixed>
          {props.competitionName}
        </Text>
        {renderClubs(uniqueClubs)}
      </Page>
    </Document>
  );
}
