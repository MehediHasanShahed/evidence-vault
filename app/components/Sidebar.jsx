"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SecurityIcon from "@mui/icons-material/Security";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../providers";

const DRAWER_WIDTH = 260;

const navItems = [
  { text: "Evidence Vault", href: "/vault", icon: <FolderIcon /> },
  { text: "Buyer Requests", href: "/requests", icon: <AssignmentIcon /> },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
        },
      }}
    >
      {/* Header with logo and theme toggle */}
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 2,
              background: "linear-gradient(135deg, #1976d2 0%, #7c4dff 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SecurityIcon sx={{ color: "white", fontSize: 24 }} />
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="primary.main"
            >
              SentryLink
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Comply Phase A
            </Typography>
          </Box>
        </Box>

        {/* Theme Toggle Button */}
        <Tooltip
          title={
            mode === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
          }
        >
          <IconButton
            onClick={toggleTheme}
            sx={{
              bgcolor: mode === "light" ? "grey.100" : "rgba(255,255,255,0.1)",
              "&:hover": {
                bgcolor:
                  mode === "light" ? "grey.200" : "rgba(255,255,255,0.2)",
              },
            }}
          >
            {mode === "light" ? (
              <DarkModeIcon />
            ) : (
              <LightModeIcon sx={{ color: "warning.main" }} />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <List sx={{ px: 1, py: 2 }}>
        {navItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={Link}
                href={item.href}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? "primary.main" : "transparent",
                  color: isActive ? "white" : "text.primary",
                  "&:hover": {
                    bgcolor: isActive
                      ? "primary.dark"
                      : mode === "light"
                      ? "grey.100"
                      : "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: isActive ? "white" : "inherit", minWidth: 40 }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
}

export { DRAWER_WIDTH };
