import { GridActionsColDef, GridColDef } from "@mui/x-data-grid";
import { RouteObject } from "react-router-dom";
import { MenuItem } from "../layouts/competitionlayout";
import { SheetRow } from "../pages/competition/[id]/starters/import/processImport";
import { StartersReviewStepRowProps } from "../pages/competition/[id]/starters/import/steps/startersReviewStepRow";
import { StarterLink } from "../__generated__/graphql";
import { Dispatch, SetStateAction } from "react";
import { ImportFailure } from "../pages/competition/[id]/starters/import/steps/importStep";
import { DocumentTransform } from "@apollo/client";

export type Module = {
  name: string;

  routes: RouteObject[];
  menuItems: MenuItem[];
  extensions: ModuleExtensions;
  handlers: ModuleHandlers;
  transformers: ModuleTransformers;
};

export type ParseStarterFromSheetHandler = (starters: SheetRow) => Object;
export type ImportStartersHandler = (
  starters: Object[],
  starterLinks: Partial<StarterLink>[],
  progressUpdater: Dispatch<SetStateAction<number>>,
  setFailure: Dispatch<SetStateAction<ImportFailure[]>>
) => Promise<void>;

export type ModuleHandlers = {
  parseStarterFromSheet?: ParseStarterFromSheetHandler;
  importStarters?: ImportStartersHandler;
};

export type ModuleExtensions = {
  addStarterForm?: JSX.Element;
  updateStarterForm?: JSX.Element;
  startersReviewStepRow?: (props: StartersReviewStepRowProps) => JSX.Element;
  startersReviewStepHeader?: JSX.Element;
  starterslistColumns?: Array<GridColDef | GridActionsColDef>
};

export type ModuleTransformers = {
  starterLinksQuery?: DocumentTransform
};