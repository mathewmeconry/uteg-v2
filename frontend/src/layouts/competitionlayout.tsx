import { Fragment, useState } from "react";
import { useCompetitionNameQuery } from "../__generated__/graphql";
import { NavLink, Outlet, generatePath, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Toolbar,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import SettingsIcon from "@mui/icons-material/Settings";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useModules } from "../hooks/useModules/useModules";
import { useHomeLayoutContext } from "./homelayout";

export type MenuItem = {
  icon: React.ReactElement;
  text: string;
  key: string;
  to?: string;
  children?: MenuItem[];
};

export function CompetitionLayout() {
  const { id } = useParams();
  const { drawerWidth, drawerOpen, setDrawerOpen } = useHomeLayoutContext();
  const { modules: competitionModules } = useModules(id || "");
  const { data, loading } = useCompetitionNameQuery({ variables: { id } });
  const { t } = useTranslation();
  const [submenuStates, setSubmenuStates] = useState<{
    [index: string]: boolean;
  }>({});

  function renderName() {
    if (loading) {
      return <Skeleton variant="text" />;
    }
    return data?.competition.name || t("Loading failed");
  }

  const menuItems: MenuItem[] = [
    {
      icon: <DashboardIcon />,
      text: "Dashboard",
      key: "dashboard",
      to: `/competition/:id/dashboard`,
    },
    {
      icon: <PeopleIcon />,
      text: "Starters",
      key: "starters",
      children: [
        {
          icon: <WomanIcon />,
          text: "Female",
          key: "starters.female",
          to: `/competition/:id/starters/female`,
        },

        {
          icon: <ManIcon />,
          text: "Male",
          key: "starters.male",
          to: `/competition/:id/starters/male`,
        },
        {
          icon: <UploadFileIcon />,
          text: "Import",
          key: "starters.import",
          to: `/competition/:id/starters/import`,
        },
      ],
    },
    {
      icon: <SettingsIcon />,
      text: "Settings",
      key: "settings",
      to: `/competition/:id/settings`,
    },
  ];

  function toggleSubmenu(key: string) {
    const cloned = {
      ...submenuStates,
    };
    cloned[key] = !cloned[key];
    setSubmenuStates(cloned);
  }

  function renderMenuItem(item: MenuItem) {
    if (item.to) {
      return (
        <NavLink
          key={item.key}
          to={generatePath(item.to, {
            id,
          })}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {({ isActive }) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton selected={isActive}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={t(item.text)}></ListItemText>
              </ListItemButton>
            </ListItem>
          )}
        </NavLink>
      );
    }

    if (item.children) {
      return (
        <ListItem key={item.key} sx={{ display: "block" }} disablePadding>
          <ListItemButton onClick={() => toggleSubmenu(item.key)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.text}</ListItemText>
            {submenuStates[item.key] ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={submenuStates[item.key]} timeout="auto" unmountOnExit>
            <List disablePadding>
              {item.children.map((childItem) => renderMenuItem(childItem))}
            </List>
          </Collapse>
        </ListItem>
      );
    }

    return (
      <ListItem key={item.key} disablePadding>
        <ListItemButton>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text}></ListItemText>
        </ListItemButton>
      </ListItem>
    );
  }

  return (
    <>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="temporary"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box>
          <Toolbar>
            <Typography variant="button" sx={{ flexGrow: 1 }}>
              {renderName()}
            </Typography>
            <Button href="/home">
              <Typography variant="caption">{t("Go back home")}</Typography>
            </Button>
          </Toolbar>
          <Divider>{t("competition")}</Divider>
          <List>{menuItems.map((item) => renderMenuItem(item))}</List>
          {competitionModules.map((module) => (
            <Fragment key={module.name}>
              <Divider>{t(module.name)}</Divider>
              {module.menuItems.map((item) => renderMenuItem(item))}
            </Fragment>
          ))}
        </Box>
      </Drawer>
      <Outlet />
    </>
  );
}
