import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./i18n";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./helpers/apollo";
import { Home } from "./pages/home/home";
import { createTheme, ThemeProvider } from "@mui/material";
import { CreateCompetition } from "./pages/competition/create/createCompetition";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dashboard } from "./pages/competition/[id]/dashboard";
import { StartersList } from "./pages/competition/[id]/starters/starterslist";
import { StartersImport } from "./pages/competition/[id]/starters/import/startersImport";
import { HomeLayout } from "./layouts/homelayout";
import { CompetitionLayout } from "./layouts/competitionlayout";
import { EGTModule } from "./modules/egt";
import { registerModule } from "./hooks/useModules/useModules";

const theme = createTheme();

registerModule({
  name: "egt",
  module: EGTModule,
});

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" replace={true} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <HomeLayout />,
    children: [
      {
        path: "/profile",
        element: <>TODO</>,
      },
      {
        path: "/home",
        element: <Home />,
        handle: {
          layout: {
            title: "home",
          },
        },
      },
    ],
  },
  {
    path: "/competition",
    element: <HomeLayout />,
    children: [
      {
        path: "create",
        element: <CreateCompetition />,
        handle: {
          layout: {
            title: "create competition",
            returnable: true,
          },
        },
      },
      {
        path: ":id",
        element: <CompetitionLayout />,
        handle: {
          layout: {
            hasDrawer: true,
          },
        },
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "starters",
            children: [
              {
                path: "",
                element: <StartersList />,
              },
              {
                path: "import",
                element: <StartersImport />,
                handle: {
                  layout: {
                    hasDrawer: false,
                    returnable: true
                  }
                }
              },
            ],
          },
          ...EGTModule.routes,
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <CssBaseline>
        <SnackbarProvider autoHideDuration={3000} preventDuplicate={true} />
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </CssBaseline>
    </ApolloProvider>
  </React.StrictMode>
);
