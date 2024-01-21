import { GridValueGetterParams } from "@mui/x-data-grid";
import { Club, StarterLink } from "../../__generated__/graphql";
import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Font,
} from "@react-pdf/renderer";
import { GridColDefExtension } from "../../types/GridColDefExtension";

export type StarterslistDocumentProps = {
  starters: StarterLink[];
  columns: GridColDefExtension[];
};

Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v15/dtpHsbgPEm2lVWciJZ0P-A.ttf",
  fontWeight: 300,
});
Font.register({
  family: "Roboto",
  src: "http://fonts.gstatic.com/s/roboto/v15/bdHGHleUa-ndQCOrdpfxfw.ttf",
  fontWeight: 700,
});

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Roboto",
    margin: "5vw",
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
  },
  tableCol: {
    width: "90vw",
  },
  tableCell: {
    fontSize: "9pt",
    padding: "2pt",
    width: "90vw",
  },
  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    width: "90vw",
    fontSize: "9pt",
    fontWeight: 700,
    borderBottomWidth: "1.5pt",
  },
});

export function StarterslistDocument(props: StarterslistDocumentProps) {
  const clubs = props.starters
    .map((starter) => starter.club)
    .filter((club) => club);
  const uniqueClubs = clubs
    .filter((club, index) => clubs.findIndex((c) => c.id === club.id) === index)
    .sort((a, b) => a.location.localeCompare(b.location));
  const filteredColumns = props.columns.filter((column) => column.renderInPdf);

  function getStarters(club: Club) {
    return props.starters
      .filter((starter) => starter.club)
      .filter((starter) => starter.club.id === club.id)
      .sort(
        (a, b) =>
          (parseInt(a.egt?.lineup?.device || "") || 0) -
          (parseInt(b.egt?.lineup?.device || "") || 0)
      )
      .sort(
        (a, b) =>
          (a.egt?.division?.number || 0) - (b.egt?.division?.number || 0)
      )
      .sort((a, b) => (a.egt?.category || 0) - (b.egt?.category || 0));
  }

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={true}>
        {uniqueClubs.map((club) => {
          const starters = getStarters(club);
          if (starters.length === 0) {
            return null;
          }
          return (
            <View style={styles.section} key={club.id} wrap={false}>
              <Text style={styles.h1}>{club.name}</Text>
              <View style={styles.table} key={`table-${club.id}`}>
                <View style={styles.tableHeaderRow} key={`header-${club.id}`}>
                  {filteredColumns.map((column) => (
                    <View
                      style={styles.tableCol}
                      key={`header-col-${column.field}`}
                    >
                      <Text style={styles.tableCell}>{column.headerName}</Text>
                    </View>
                  ))}
                </View>
                {starters.map((starter) => (
                  <View style={styles.tableRow} key={`row-${starter.id}`}>
                    {filteredColumns.map((column) => (
                      <View
                        style={styles.tableCol}
                        key={`row-${starter.id}-col-${column.field}`}
                      >
                        <Text style={styles.tableCell}>
                          {column.valueGetter
                            ? column.valueGetter({
                                row: starter,
                              } as GridValueGetterParams)
                            : ""}
                        </Text>
                      </View>
                    ))}
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </Page>
    </Document>
  );
}
