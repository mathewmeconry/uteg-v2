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
import React, { PropsWithChildren, useState } from "react";
import { removeToken } from "../helpers/auth";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export function HomeLayout(
  props: {
    title: string | React.ReactElement;
    returnable?: boolean;
    icons?: React.ReactElement[];
    ml?: number;
  } & PropsWithChildren
) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

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
    enqueueSnackbar(t("Logged out"), { variant: "success" });
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
            marginLeft: props.ml,
            transition: theme.transitions.create(["margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          }}
        >
          {props.returnable && (
            <ArrowBackIosNewIcon
              onClick={handleBack}
              sx={{ mr: 3, cursor: "pointer" }}
            />
          )}
          {!props.returnable && (props.icons || [])}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.title}
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
      <Box sx={{ m: 1, mt: 2 }}>{props.children}</Box>
    </>
  );
}