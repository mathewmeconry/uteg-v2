import { PropsWithChildren, useState } from "react";
import { HomeLayout } from "./homelayout";
import { useCompetitionNameQuery } from "../__generated__/graphql";
import { NavLink, useParams } from "react-router-dom";
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
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import WomanIcon from "@mui/icons-material/Woman";
import ManIcon from "@mui/icons-material/Man";
import SettingsIcon from "@mui/icons-material/Settings";

type MenuItem = {
  icon: React.ReactElement;
  text: string;
  key: string;
  to?: string;
  children?: MenuItem[];
};

export function CompetitionLayout(props: PropsWithChildren) {
  const { id } = useParams();
  const { data, loading } = useCompetitionNameQuery({ variables: { id } });
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState<{
    [index: string]: boolean;
  }>({});
  const drawerWidth = 250;

  function renderName() {
    if (loading) {
      return <Skeleton variant="text" />;
    }
    return data?.competition.name || t("Loading failed");
  }

  const icons = [
    <MenuIcon
      sx={{ mr: 2, cursor: "pointer" }}
      onClick={() => setDrawerOpen(!drawerOpen)}
    />,
  ];

  const menuItems: MenuItem[] = [
    {
      icon: <DashboardIcon />,
      text: t("Dashboard"),
      key: "dashboard",
      to: `/competition/${id}/dashboard`,
    },
    {
      icon: <PeopleIcon />,
      text: t("Starters"),
      key: "starters",
      children: [
        {
          icon: <WomanIcon />,
          text: t("Female"),
          key: "starters.female",
          to: `/competition/${id}/starters/female`,
        },

        {
          icon: <ManIcon />,
          text: t("Male"),
          key: "starters.male",
          to: `/competition/${id}/starters/male`,
        },
      ],
    },
    {
      icon: <SettingsIcon />,
      text: t("Settings"),
      key: "settings",
      to: `/competition/${id}/settings`,
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
          to={item.to || ""}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {({ isActive }) => (
            <ListItem key={item.key} disablePadding>
              <ListItemButton selected={isActive}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text}></ListItemText>
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
      <HomeLayout title="" icons={icons} ml={drawerOpen ? drawerWidth : 0}>
        {props.children}
      </HomeLayout>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        variant="persistent"
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
          <Divider />
          <List>{menuItems.map((item) => renderMenuItem(item))}</List>
        </Box>
      </Drawer>
    </>
  );
}
