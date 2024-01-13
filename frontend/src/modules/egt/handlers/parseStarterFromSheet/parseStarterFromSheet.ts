import { SheetRow } from "../../../../pages/competition/[id]/starters/import/processImport";

export type EGTParseStarterFromSheetReturn = {
  egt: EGTStarterExtension;
};

export type EGTStarterExtension = {
  category?: number;
  divisionNumber?: number;
};

export function parseStarterFromSheet(
  row: SheetRow
): EGTParseStarterFromSheetReturn {
  const category = getField(row, "category");
  const divisionNumber = getField(row, "divisionNumber");
  return {
    egt: {
      category: category ? parseInt(category) : undefined,
      divisionNumber: divisionNumber ? parseInt(divisionNumber) : undefined,
    },
  };
}

function getField(
  row: SheetRow,
  field: keyof EGTStarterExtension
): string | undefined {
  const keys = Object.keys(row);
  for (const key of keys) {
    switch (
      key
        .toLowerCase()
        .trim()
        .replace("-", "")
    ) {
      case "category":
      case "kategorie":
      case "cat":
      case "kat":
      case "cat.":
      case "kat.":
        if (field === "category") {
          // @ts-ignore we know the key is part of the row
          return row[key];
        }
        break;
      case "division":
      case "abteilung":
      case "div":
      case "abt":
      case "div.":
      case "abt.":
        if (field === "divisionNumber") {
          // @ts-ignore we know the key is part of the row
          return row[key];
        }
        break;
    }
  }
  return undefined;
}
