import { GridColDef } from "@mui/x-data-grid";
import { RouteObject } from "react-router-dom";
import { MenuItem } from "../layouts/competitionlayout";

export type Module = {
  name: string;

  routes: RouteObject[];
  menuItems: MenuItem[];
  extensions: ModuleExtensions;
};

export type ModuleExtensions = {
  addStarterForm?: JSX.Element;
  updateStarterForm?: JSX.Element;
};

export type SubmitHandler = (data: any) => void;

export type DataGridExtension = {
  columns: GridColDef[];
};
