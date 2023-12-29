import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "./helpers/apollo";
import { Home } from "./pages/home/home";
import { ProtectedRoute } from "./helpers/protectedRoute";
import { ThemeProvider } from "@mui/material";
import { CreateCompetition } from "./pages/competition/create/createCompetition";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dashboard } from "./pages/competition/[id]/dashboard";
import { StartersList } from "./pages/competition/[id]/starters/[sex]/staterslist";

const router = createBrowserRouter([
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
    path: "/home",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/competition",
    element: <ProtectedRoute />,
    children: [
      {
        path: "create",
        element: <CreateCompetition />,
      },
      {
        path: ":id",
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "starters",
            children: [
              {
                path: ":sex",
                element: <StartersList />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/profile",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <>TODO</>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <CssBaseline>
        <SnackbarProvider autoHideDuration={3000} preventDuplicate={true} />
        <ThemeProvider theme>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <RouterProvider router={router} />
          </LocalizationProvider>
        </ThemeProvider>
      </CssBaseline>
    </ApolloProvider>
  </React.StrictMode>
);
