import {
  Page,
  Document,
  StyleSheet,
  View,
  Text,
  Font,
} from "@react-pdf/renderer";
import {
  EgtDeviceAggregationMode,
  EgtDeviceOverride,
  EgtDivisionJudgingQueryHookResult,
} from "../../../../__generated__/graphql";
import { TFunction } from "i18next";
import { ReactElement } from "react";

export type JudgingDocumentProps = {
  rounds: EgtDivisionJudgingQueryHookResult[];
  t: TFunction;
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

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    fontFamily: "Roboto",
    padding: "5vw",
    fontWeight: 300,
  },
  section: {
    marginBottom: 20,
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

type Device = {
  number: number;
  rounds: Starter[][];
  overrides: EgtDeviceOverride[];
  inputs: number;
  aggregationMode: EgtDeviceAggregationMode;
};

type Starter = {
  id: string;
  firstname: string;
  lastname: string;
  club: string;
  category: number;
  isDeleted: boolean;
};

export function JudgingDocument(props: JudgingDocumentProps) {
  const translations = {
    firstname: (_?: string) => props.t("firstname", { ns: "common" }),
    lastname: (_?: string) => props.t("lastname", { ns: "common" }),
    club: (_: string) => props.t("club", { ns: "common" }),
    category: (_?: string) => props.t("category", { ns: "egt" }),
    grade: (_?: string) => props.t("grade", { ns: "common" }),
    grade_labled: (label?: string) =>
      props.t("grade_labled", { ns: "common", label }),
  };
  const widths = {
    firstname: "98pt",
    lastname: "98pt",
    club: "98pt",
    category: "40pt",
    grade: "80pt",
    grade_labled: "80pt",
  };

  let groupedByDevices: Device[] = [];
  for (const round in props.rounds) {
    const roundBundle = props.rounds[round];

    if (!roundBundle.data?.egtJudgingDevices) {
      continue;
    }

    for (const deviceBundle of roundBundle.data?.egtJudgingDevices) {
      const deviceIndex = groupedByDevices.findIndex(
        (device) => device.number === deviceBundle.device.deviceNumber
      );
      let device = groupedByDevices[deviceIndex];
      if (!device) {
        const deviceSettings = deviceBundle.device;

        device = {
          number: deviceBundle.device.deviceNumber,
          rounds: [],
          overrides: deviceSettings?.overrides,
          inputs: deviceSettings?.inputs,
          aggregationMode: deviceSettings?.aggregationMode,
        };
      }

      const starters = deviceBundle.starterslist.map((egtStarterlink) => ({
        id: egtStarterlink.id,
        firstname: egtStarterlink.starterlink.starter.firstname,
        lastname: egtStarterlink.starterlink.starter.lastname,
        club: egtStarterlink.starterlink.club.name,
        category: egtStarterlink.category || 0,
        isDeleted: egtStarterlink.isDeleted
      }));
      device.rounds[round] = starters;

      if (deviceIndex > -1) {
        groupedByDevices[deviceIndex] = device;
      } else {
        groupedByDevices.push(device);
      }
    }
  }

  groupedByDevices = groupedByDevices.sort((a, b) => a.number - b.number);

  function getDeviceWithOverride(device: Device, category: number) {
    const categoryOverride = device.overrides.find(
      (override) => override.category === category
    );
    let updatedDevice = { ...device };
    if (categoryOverride) {
      if (categoryOverride.aggregationMode) {
        updatedDevice.aggregationMode = categoryOverride.aggregationMode;
      }
      if (categoryOverride.inputs) {
        updatedDevice.inputs = categoryOverride.inputs;
      }
    }
    return updatedDevice;
  }

  function getHighestDeviceInputs(device: Device, categories: number[]) {
    const devicesWithOverrides = categories.map((category) =>
      getDeviceWithOverride(device, category)
    );
    let inputsCount = 0;
    for (const deviceWithOverride of devicesWithOverrides) {
      if (deviceWithOverride.inputs > inputsCount) {
        inputsCount = deviceWithOverride.inputs;
      }
    }
    return inputsCount;
  }

  function renderDevice(device: Device) {
    return device.rounds.map((round, index) => (
      <Page size="A4" style={styles.page} wrap={true}>
        {renderStarters(round, device, ++index)}
      </Page>
    ));
  }

  function renderGrades(device: Device, category: number, inputsCount: number) {
    const deviceWithOverride = getDeviceWithOverride(device, category);
    const gradeInputs: ReactElement[] = [];
    for (let i = 0; i < inputsCount; i++) {
      gradeInputs.push(
        <View style={{ width: widths.grade, ...styles.grade }}>
          {deviceWithOverride.inputs <= i && (
            <Text style={styles.tableCell}>------</Text>
          )}
        </View>
      );
    }

    if (inputsCount > 1) {
      gradeInputs.push(
        <View style={{ width: widths.grade, ...styles.grade }}>
          <Text style={styles.tableCellAnnotation}>
            {props.t(`aggregationMode_${deviceWithOverride.aggregationMode}`, {
              ns: "egt",
            })}
          </Text>
        </View>
      );
    }

    return gradeInputs;
  }

  function renderGradesHeaders(device: Device, categories: number[]) {
    const inputsCount = getHighestDeviceInputs(device, categories);
    const gradeInputs: ReactElement[] = [];
    for (let i = 0; i < inputsCount; i++) {
      gradeInputs.push(
        <View
          style={{
            width: inputsCount !== 1 ? widths.grade : "180pt",
            ...styles.grade,
          }}
          key={`header_${device.number}_${i}`}
        >
          <Text style={styles.tableCell}>
            {inputsCount == 1
              ? props.t("grade", { ns: "common" })
              : props.t("grade_labled", { ns: "common", label: `${i + 1}.` })}
          </Text>
        </View>
      );
    }

    if (inputsCount > 1) {
      gradeInputs.push(
        <View
          style={{ width: widths.grade, ...styles.grade }}
          key={`header_${device.number}_total`}
        >
          <Text style={styles.tableCell}>
            {props.t("final_grade", {
              ns: "common",
            })}
          </Text>
        </View>
      );
    }

    return gradeInputs;
  }

  function renderStarters(starters: Starter[], device: Device, round: number) {
    const starterCategoriesdedup = starters
      .map((starter) => starter.category)
      .filter((category, index, self) => self.indexOf(category) === index);
    const inputsCount = getHighestDeviceInputs(device, starterCategoriesdedup);

    return (
      <View key={`${device.number}_${round}`}>
        <Text style={styles.h1}>
          {props.t(`device_${device.number}`, { ns: "egt" })}
        </Text>
        <Text style={styles.h2}>
          {props.t("round", { ns: "egt", number: round })}
        </Text>
        <View style={styles.tableHeaderRow}>
          {starters[0] &&
            Object.keys(starters[0])
              .filter((key) => translations[key as keyof typeof translations])
              .map((key) => (
                <View
                  style={{
                    width: widths[key as keyof typeof widths],
                  }}
                  key={`${device.number}_${round}_${key}`}
                >
                  <Text style={styles.tableCell}>
                    {translations[key as keyof typeof translations]("")}
                  </Text>
                </View>
              ))}
          {renderGradesHeaders(device, starterCategoriesdedup)}
        </View>
        {...starters.map((starter) => (
          <View
            style={{
              ...styles.tableRow,
              textDecoration: starter.isDeleted ? "line-through" : "none",
            }}
            key={`${device.number}_${starter.id}`}
          >
            <View style={{ width: widths.firstname }}>
              <Text style={styles.tableCell}>{starter.firstname}</Text>
            </View>
            <View style={{ width: widths.lastname }}>
              <Text style={styles.tableCell}>{starter.lastname}</Text>
            </View>
            <View style={{ width: widths.club }}>
              <Text style={styles.tableCell}>{starter.club}</Text>
            </View>
            <View style={{ width: widths.category }}>
              <Text style={styles.tableCell}>
                {props.t(`category_${starter.category}`, { ns: "egt" })}
              </Text>
            </View>
            {renderGrades(device, starter.category, inputsCount)}
          </View>
        ))}
        {!starters.length && (
          <Text style={{ ...styles.h2, marginTop: "10px" }}>
            {props.t("break", { ns: "common" })}
          </Text>
        )}
      </View>
    );
  }

  return (
    <Document>
      {groupedByDevices.map((device) => renderDevice(device))}
    </Document>
  );
}
