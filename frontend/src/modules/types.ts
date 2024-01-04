import { GridColDef } from "@mui/x-data-grid";
import { RouteObject } from "react-router-dom";
import { MenuItem } from "../layouts/competitionlayout";

export type IModule = {
  name: string;

  routes: RouteObject[];
  menuItems: MenuItem[];
};

export type ModuleExtensions = {
  addStarterForm: FormExtension;
};

export type FormExtension = {
  components: JSX.Element[];
  handleSubmit: (data: any) => void;
};

export type DataGridExtension = {
  columns: GridColDef[];
};
