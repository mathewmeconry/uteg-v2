import AccountCircle from "@mui/icons-material/AccountCircle";
import {
  AppBar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { isTokenValid, removeToken } from "../helpers/auth";
import {
  Navigate,
  Outlet,
  UIMatch,
  useLocation,
  useMatches,
  useNavigate,
  useOutletContext,
} from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { RouteHandleLayout } from "./types";
import MenuIcon from "@mui/icons-material/Menu";

function parseMatches(
  matches: UIMatch<unknown, { layout: RouteHandleLayout }>[]
): RouteHandleLayout {
  let result: RouteHandleLayout = {};
  for (const match of matches) {
    if (match.handle && match.handle.layout) {
      result = {
        ...result,
        ...match.handle.layout,
      };
    }
  }
  return result;
}

export function HomeLayout() {
  const drawerWidth = 250;
  const matches = useMatches();
  const location = useLocation();
  const props = parseMatches(
    matches as UIMatch<unknown, { layout: RouteHandleLayout }>[]
  );
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!isTokenValid()) {
    enqueueSnackbar(t("permission_denied"), {
      variant: "error",
      key: "permissionDenied",
    });
    return <Navigate to="/login" replace={true}></Navigate>;
  }

  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };

  const handleLogout = () => {
    removeToken();
    enqueueSnackbar(t("logged_out"), { variant: "success" });
    navigate("/login");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <AppBar>
        <Toolbar
          style={{
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: drawerOpen ? drawerWidth : 0,
          }}
        >
          {props.returnable && (
            <ArrowBackIosNewIcon
              onClick={handleBack}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          )}
          {props.hasDrawer && (
            <MenuIcon
              key="menu"
              sx={{ mr: 2, cursor: "pointer" }}
              onClick={() => setDrawerOpen(!drawerOpen)}
            />
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title && t(props.title)}
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ m: 1, mt: 2 }}>
        <Outlet context={{ drawerWidth, drawerOpen, setDrawerOpen }} />
      </Box>
    </>
  );
}

export type HomeLayoutContextType = {
  drawerWidth: number;
  drawerOpen: boolean;
  setDrawerOpen: (state: boolean) => void;
};
export function useHomeLayoutContext(): HomeLayoutContextType {
  return useOutletContext<HomeLayoutContextType>();
}
