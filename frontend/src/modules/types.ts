import { GridColDef } from "@mui/x-data-grid";
import { RouteObject } from "react-router-dom";

export interface IModule {
  name: string;

  extensions: 

  getCompetitionRoutes(): RouteObject[]
  renderMenu(): React.ReactElement[];
}

export type ModuleExtensions = {
  addStarterForm:FormExtension
}

export type FormExtension = {
  components: JSX.Element[],
  handleSubmit: (data: any) => void
}

export type DataGridExtension = {
  columns: GridColDef[]
}