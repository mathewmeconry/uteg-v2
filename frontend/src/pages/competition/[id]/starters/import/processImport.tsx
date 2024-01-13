import * as xlsx from "xlsx";
import { Sex, Starter } from "../../../../../__generated__/graphql";
import { ParseStarterFromSheetHandler } from "../../../../../modules/types";

type Indexes = {
  stvID: string;
  firstname: string;
  lastname: string;
  birthyear: string;
  sex: string;
  [key: string]: string;
};

export type SheetRow = { [index: string]: number | string };

export function processXLSX(
  data: ArrayBuffer,
  moduleParsers: Array<ParseStarterFromSheetHandler | undefined>
) {
  let starters: Starter[] = [];
  const file = xlsx.read(data);
  for (const sheetName of file.SheetNames) {
    const sheet = xlsx.utils.sheet_to_json<SheetRow>(file.Sheets[sheetName], {
      header: 0,
    });
    if (detectStarterSheet(sheet[0])) {
      starters = starters.concat(parseSheet(sheet, moduleParsers));
    }
  }
  return starters;
}

function parseSheet(
  sheet: SheetRow[],
  moduleParsers: Array<ParseStarterFromSheetHandler | undefined>
): Starter[] {
  const starters: Starter[] = [];
  const indexes = getFieldIndexes(sheet[0]);
  for (const row of sheet) {
    let starter: Starter = {
      id: "",
      stvID: normalizeField(row[indexes.stvID]),
      firstname: capitalizeNames(normalizeField(row[indexes.firstname])),
      lastname: capitalizeNames(normalizeField(row[indexes.lastname])),
      birthyear: parseBirthyear(normalizeField(row[indexes.birthyear])),
      sex: detectSex(normalizeField(row[indexes.sex])),
      starterLinks: [],
    };
    for(const parser of moduleParsers) {
      if(parser) {
        starter = {
          ...starter,
          ...parser(row)
        }
      }
    }
    starters.push(starter);
  }

  return starters;
}

export function normalizeField(field: string | number): string {
  return field.toString().trim();
}

function capitalizeNames(name: string): string {
  return name
    .toLowerCase()
    .split("-")
    .map((namePart) => namePart[0].toUpperCase() + namePart.substring(1))
    .join("-")
    .split(" ")
    .map((namePart) => namePart[0].toUpperCase() + namePart.substring(1))
    .join(" ");
}

function parseBirthyear(birthyear: string): number {
  const birthyearInt = parseInt(birthyear);
  if (birthyear.length === 2) {
    if (birthyearInt > 50) {
      return birthyearInt + 1900;
    }
    return birthyearInt + 2000;
  }
  return birthyearInt;
}

function detectSex(sex: string): Sex {
  switch (sex.toLowerCase().trim()) {
    case "m":
    case "männlich":
    case "male":
      return "MALE";
    case "f":
    case "w":
    case "weiblich":
      return "FEMALE";
    default:
      return "MALE";
  }
}

function detectStarterSheet(data: SheetRow): boolean {
  const indexes = getFieldIndexes(data);
  for (const index in indexes) {
    if (!indexes[index] && index !== "stvID") {
      return false;
    }
  }
  return true;
}

function getFieldIndexes(data: SheetRow): Indexes {
  const indexes: Indexes = {
    stvID: "",
    firstname: "",
    lastname: "",
    birthyear: "",
    sex: "",
  };
  if (!data) {
    return indexes;
  }

  const keys = Object.keys(data);
  for (const key of keys) {
    switch (
      key
        .toLowerCase()
        .trim()
        .replace("-", "")
    ) {
      case "stvid":
      case "stv":
      case "stvnummer":
      case "stvnumber":
        indexes.stvID = key;
        break;
      case "firstname":
      case "vorname":
        indexes.firstname = key;
        break;
      case "lastname":
      case "nachname":
      case "name":
        indexes.lastname = key;
        break;
      case "geschlecht":
      case "biogeschlecht":
      case "biologischesgeschlecht":
      case "gender":
      case "sex":
        indexes.sex = key;
        break;
      case "birthyear":
      case "jahrgang":
      case "geburtsjahr":
      case "jg":
        indexes.birthyear = key;
        break;
    }
  }
  return indexes;
}
