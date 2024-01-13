import { Module } from "../types";
import { RouteObject } from "react-router-dom";
import { Divisionslist } from "./pages/divisions/divisionlist";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Lineup } from "./pages/divisions/[id]/lineup/lineup";
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
            path: ":id",
            children: [
              {
                path: "lineup",
                element: <Lineup />,
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
    headerName: "egt.category",
    valueGetter: (params) => {
      if (params.row.egt?.category) {
        if (params.row.egt?.category === 8) {
          return `egt.category.${params.row.egt?.category}.${params.row.starter?.sex}`;
        }
        return `egt.category.${params.row.egt?.category}`;
      }
      return "";
    },
    disableColumnMenu: true,
  },
  {
    field: "egt.division",
    headerName: "egt.division",
    valueGetter: (params) => params.row.egt?.division?.number,
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
                  kind: "Name",
                  value: "egt",
                },
                selectionSet: {
                  kind: Kind.SELECTION_SET,
                  selections: [
                    {
                      kind: "Field",
                      name: {
                        kind: "Name",
                        value: "category",
                      },
                    },
                    {
                      kind: "Field",
                      name: {
                        kind: "Name",
                        value: "division",
                      },
                      selectionSet: {
                        kind: Kind.SELECTION_SET,
                        selections: [
                          {
                            kind: "Field",
                            name: {
                              kind: "Name",
                              value: "id",
                            },
                          },
                          {
                            kind: "Field",
                            name: {
                              kind: "Name",
                              value: "number",
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
