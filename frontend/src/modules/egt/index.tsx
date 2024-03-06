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
import { GridActionsColDef } from "@mui/x-data-grid";
import { DocumentTransform } from "@apollo/client";
import { Kind, visit } from "graphql";
import { StarterslistSelectedRowsActions } from "./extensions/starterslistSelectedRowsActions/starterslistSelectedRowsActions";
import { GridColDefExtension } from "../../types/GridColDefExtension";
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

const starterListColumns: Array<GridColDefExtension | GridActionsColDef> = [
  {
    field: "egt.category",
    headerName: "category",
    valueGetter: (params) => {
      if (params.row.egt?.category) {
        if (params.row.egt?.category === 8) {
          return `category_${params.row.egt?.category}_${params.row.starter?.sex.toLowerCase()}`;
        }
        return `category_${params.row.egt?.category}`;
      }
      return "";
    },
    disableColumnMenu: true,
    renderInPdf: true,
    renderInXlsx: true,
  },
  {
    field: "egt.division",
    headerName: "division",
    valueGetter: (params) => params.row.egt?.division?.number,
    disableColumnMenu: true,
    renderInPdf: true,
    renderInXlsx: true,
  },
  {
    field: "egt.device",
    headerName: "starting_device",
    valueGetter: (params) =>
      params.row.egt?.lineup?.device?.deviceNumber !== undefined
        ? `device_${params.row.egt?.lineup?.device?.deviceNumber}`
        : "",
    disableColumnMenu: true,
    renderInPdf: true,
    renderInXlsx: true,
  },
];

const starterLinksQueryTransformer = new DocumentTransform((document) => {
  return visit(document, {
    Field(field) {
      if (field.name.value === "starterLinks") {
        return {
          ...field,
          selectionSet: {
            ...field.selectionSet,
            selections: [
              ...(field.selectionSet?.selections || []),
              {
                kind: Kind.FIELD,
                name: {
                  kind: Kind.NAME,
                  value: "egt",
                },
                selectionSet: {
                  kind: Kind.SELECTION_SET,
                  selections: [
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "id",
                      },
                    },
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "category",
                      },
                    },
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "division",
                      },
                      selectionSet: {
                        kind: Kind.SELECTION_SET,
                        selections: [
                          {
                            kind: Kind.FIELD,
                            name: {
                              kind: Kind.NAME,
                              value: "id",
                            },
                          },
                          {
                            kind: Kind.FIELD,
                            name: {
                              kind: Kind.NAME,
                              value: "number",
                            },
                          },
                        ],
                      },
                    },
                    {
                      kind: Kind.FIELD,
                      name: {
                        kind: Kind.NAME,
                        value: "lineup",
                      },
                      selectionSet: {
                        kind: Kind.SELECTION_SET,
                        selections: [
                          {
                            kind: Kind.FIELD,
                            name: {
                              kind: Kind.NAME,
                              value: "id",
                            },
                          },
                          {
                            kind: Kind.FIELD,
                            name: {
                              kind: Kind.NAME,
                              value: "device",
                            },
                            selectionSet: {
                              kind: Kind.SELECTION_SET,
                              selections: [
                                {
                                  kind: Kind.FIELD,
                                  name: {
                                    kind: Kind.NAME,
                                    value: "id",
                                  },
                                },
                                {
                                  kind: Kind.FIELD,
                                  name: {
                                    kind: Kind.NAME,
                                    value: "deviceNumber",
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        };
      }
    },
  });
});

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
  transformers: {
    starterLinksQuery: starterLinksQueryTransformer,
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
