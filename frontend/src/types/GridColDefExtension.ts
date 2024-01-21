import { GridColDef } from "@mui/x-data-grid";

export type GridColDefExtension = GridColDef & {
  renderInPdf?: boolean;
  renderInXlsx?: boolean;
};
