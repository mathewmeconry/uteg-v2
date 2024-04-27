import {MRT_ColumnDef, MRT_RowData
} from 'material-react-table';

export type MRT_ColumnDefExtension<T extends MRT_RowData> = MRT_ColumnDef<T> & {
  renderInPdf?: boolean;
  pdfWidth?: string;
  renderInXlsx?: boolean;
};
