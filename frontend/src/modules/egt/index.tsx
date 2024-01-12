import { Module } from "../types";
import { RouteObject } from "react-router-dom";
import { Divisionslist } from "./pages/divisions/divisionlist";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { Lineup } from "./pages/divisions/[id]/lineup/lineup";
import { EGTUpdateStarterForm } from "./extensions/updateStarterForm/updateStarterForm";

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

export const EGTModule: Module = {
  name: "egt",
  routes: routes,
  extensions: {
    updateStarterForm: <EGTUpdateStarterForm />,
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
