import { RouteObject } from "react-router-dom";
import { MenuItem } from "../layouts/competitionlayout";
import { SheetRow } from "../pages/competition/[id]/starters/import/processImport";
import { StartersReviewStepRowProps } from "../pages/competition/[id]/starters/import/steps/startersReviewStepRow";
import { StarterLink } from "../__generated__/graphql";
import { Dispatch, SetStateAction } from "react";
import { ImportFailure } from "../pages/competition/[id]/starters/import/steps/importStep";
import { FieldValues } from "react-hook-form";
import { MRT_TableInstance, MRT_ColumnDef } from 'material-react-table'
import { TypedDocumentNode } from "@apollo/client";
import { MRT_ColumnDefExtension } from "../types/MRT_ColumnDefExtension";
export type Module = {
  name: string;

  routes: RouteObject[];
  menuItems: MenuItem[];
  extensions: ModuleExtensions;
  handlers: ModuleHandlers;
  fragments: ModuleFragments;
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
  createCompetition?: (
    competitionID: string,
    values: FieldValues
  ) => Promise<void>;
};

export type ModuleExtensions = {
  addStarterForm?: JSX.Element;
  updateStarterForm?: JSX.Element;
  startersReviewStepRow?: React.FunctionComponent<StartersReviewStepRowProps>;
  startersReviewStepHeader?: JSX.Element;
  starterslistColumns?: Array<MRT_ColumnDef<any> | MRT_ColumnDefExtension<any>>;
  starterslistSelectedRowsActions?: React.FunctionComponent<{table: MRT_TableInstance<StarterLink>}>;
  settings?: React.FunctionComponent<ModulesSettingsProps>;
  settingsReview?: React.FunctionComponent;
};

export type ModuleFragments = {
  starterLinkFragment?: TypedDocumentNode;
};

export type ModulesSettingsProps = {
  competitionCreation?: boolean;
};


