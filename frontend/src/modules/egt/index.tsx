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
import { GridActionsColDef, GridColDef } from "@mui/x-data-grid";
import { DocumentTransform } from "@apollo/client";
import { Kind, visit } from "graphql";

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
                    hasDrawer: false
                  },
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

const starterListColumns: Array<GridColDef | GridActionsColDef> = [
  {
    field: "egt.category",
    headerName: "category",
    valueGetter: (params) => {
      if (params.row.egt?.category) {
        if (params.row.egt?.category === 8) {
          return `category_${params.row.egt?.category}_${params.row.starter?.sex}`;
        }
        return `category_${params.row.egt?.category}`;
      }
      return "";
    },
    disableColumnMenu: true,
  },
  {
    field: "egt.division",
    headerName: "division",
    valueGetter: (params) => params.row.egt?.division?.number,
    disableColumnMenu: true,
  },
  {
    field: "egt.device",
    headerName: "device",
    valueGetter: (params) =>
      params.row.egt?.lineup?.device
        ? `device_${params.row.egt?.lineup?.device}`
        : "",
    disableColumnMenu: true,
  },
];

const starterLinksQueryTransformer = new DocumentTransform((document) => {
  return visit(document, {
    Field(field) {
      console.log(field);
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
  },
  handlers: {
    parseStarterFromSheet: parseStarterFromSheet,
    importStarters: importStarters,
  },
  transformers: {
    starterLinksQuery: starterLinksQueryTransformer,
  },
  menuItems: [
    {
      icon: <AccountTreeIcon />,
      text: "divisions",
      key: "divisions",
      to: `/competition/:id/egt/divisions`,
    },
  ],
};
