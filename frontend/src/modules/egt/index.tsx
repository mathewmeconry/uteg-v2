import { Module } from "../types";
import { RouteObject } from "react-router-dom";
import { Divisionslist } from "./pages/divisions/divisionlist";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Lineups } from "./pages/divisions/[id]/lineups/lineups";
import { EGTUpdateStarterForm } from "./extensions/updateStarterForm/updateStarterForm";
import { EGTStartersReviewStepRow } from "./extensions/startersReviewStepRow/startersReviewStepRow";
import { parseStarterFromSheet } from "./handlers/parseStarterFromSheet/parseStarterFromSheet";
import { EGTStartersReviewHeaders } from "./extensions/startersReviewHeaders/startersReviewHeaders";
import { importStarters } from "./handlers/importStarters/importStarters";
import { StarterslistSelectedRowsActions } from "./extensions/starterslistSelectedRowsActions/starterslistSelectedRowsActions";
import GradingIcon from "@mui/icons-material/Grading";
import { Grading } from "./pages/grading/grading";
import { Ranking } from "./pages/ranking/ranking";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { EGTSettings } from "./extensions/settings/settings";
import { createCompetition } from "./handlers/createCompetition/createCompetition";
import { EGTSettingsReview } from "./extensions/settingsReview/settingsReview";
import Judges from "./pages/judges/judges";
import GavelIcon from "@mui/icons-material/Gavel";
import Judging from "./pages/judging/judging";
import DivisionGrading from "./pages/divisions/[id]/grading/divisionGrading";
import { graphql } from "../../__new_generated__/gql";
import { MRT_ColumnDef, MRT_FilterFns } from "material-react-table";
import { MRT_ColumnDefExtension } from "../../types/MRT_ColumnDefExtension";

const routes: RouteObject[] = [
  {
    path: "egt",
    children: [
      {
        path: "divisions",
        element: <Divisionslist />,
      },
      {
        path: "division",
        children: [
          {
            path: ":divisionID",
            children: [
              {
                path: "lineups",
                element: <Lineups />,
                handle: {
                  layout: {
                    returnable: true,
                    hasDrawer: false,
                  },
                },
              },
              {
                path: "grading",
                element: <DivisionGrading />,
                handle: {
                  layout: {
                    returnable: true,
                    hasDrawer: false,
                  },
                },
              },
            ],
          },
        ],
      },
      {
        path: "grades",
        element: <Grading />,
      },
      {
        path: "ranking",
        element: <Ranking />,
      },
      {
        path: "judges",
        element: <Judges />,
      },
      {
        path: "judging",
        handle: {
          layout: {
            hasDrawer: false,
            hideAccount: true,
            skipTokenCheck: true,
            hideAppbar: true,
          },
        },
        children: [
          {
            path: ":token",
            element: <Judging />,
          },
        ],
      },
    ],
  },
];

const starterListColumns: Array<
  MRT_ColumnDef<any> | MRT_ColumnDefExtension<any>
> = [
  {
    accessorFn: (row) =>
      row.egt?.category
        ? `category_${row.egt.category}_${row.starter.sex.toLowerCase()}`
        : "",
    header: "category",
    enableGlobalFilter: false,
    filterVariant: "multi-select",
    filterFn: MRT_FilterFns.arrIncludesSome,
    renderInPdf: true,
    pdfWidth: "63pt",
    renderInXlsx: true,
  },
  {
    accessorFn: (row) =>
      row.egt?.division?.number ? row.egt.division.number : "",
    header: "division",
    enableGlobalFilter: false,
    filterVariant: "multi-select",
    filterFn: MRT_FilterFns.arrIncludesSome,
    renderInPdf: true,
    pdfWidth: "63pt",
    renderInXlsx: true,
  },
  {
    accessorFn: (row) =>
      row.egt?.lineup?.device?.deviceNumber
        ? `device_${row.egt?.lineup?.device?.deviceNumber}`
        : "",
    header: "starting_device",
    filterVariant: "multi-select",
    filterFn: MRT_FilterFns.arrIncludesSome,
    enableGlobalFilter: false,
    renderInPdf: true,
    pdfWidth: "63pt",
    renderInXlsx: true,
  },
];

const StarterLinkFragment = graphql(`
  fragment EGTStarterListFragment on StarterLink {
    egt {
      id
      category
      division {
        id
        number
      }
      lineup {
        id
        device {
          id
          deviceNumber
        }
      }
    }
  }
`);

export const EGTModule: Module = {
  name: "egt",
  routes: routes,
  extensions: {
    updateStarterForm: <EGTUpdateStarterForm />,
    startersReviewStepRow: EGTStartersReviewStepRow,
    startersReviewStepHeader: <EGTStartersReviewHeaders />,
    starterslistColumns: starterListColumns,
    starterslistSelectedRowsActions: StarterslistSelectedRowsActions,
    settings: EGTSettings,
    settingsReview: EGTSettingsReview,
  },
  handlers: {
    parseStarterFromSheet: parseStarterFromSheet,
    importStarters: importStarters,
    createCompetition: createCompetition,
  },
  fragments: {
    starterLinkFragment: StarterLinkFragment,
  },
  menuItems: [
    {
      icon: <AccountTreeIcon />,
      text: "divisions",
      key: "divisions",
      to: "/competition/:id/egt/divisions",
    },
    {
      icon: <GradingIcon />,
      text: "grading",
      key: "grading",
      to: "/competition/:id/egt/grades",
    },
    {
      icon: <MilitaryTechIcon />,
      text: "ranking",
      key: "ranking",
      to: "/competition/:id/egt/ranking",
    },
    {
      icon: <GavelIcon />,
      text: "judges",
      key: "judges",
      to: "/competition/:id/egt/judges",
    },
  ],
};
