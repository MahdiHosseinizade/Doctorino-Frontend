import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import AddHomeIcon from "@mui/icons-material/AddHome";
import LogoutIcon from "@mui/icons-material/Logout";
import PasswordIcon from "@mui/icons-material/Password";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SummarizeIcon from "@mui/icons-material/Summarize";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  ListItemButton,
} from "@mui/material";
import { styled } from "@mui/system";
import AuthContext from "../../../../context/AuthContext";
import {makeStyles} from "@mui/styles";

const useStyles = makeStyles({
  list: {
    marginTop: "10px",
  },
  drawer: {
    // width: "240px",
    marginTop: "20px",
  },
});

const widthDraw = 240;

const openedMixin = (theme) => ({
  width: widthDraw,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: widthDraw,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
export default function SideBar() {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();

  const { logOut } = useContext(AuthContext);

  const menuItems = [
    // {
    //   text: "داشبورد",
    //   path: "/doctor-panel/dashboard",
    //   icon: <AddHomeIcon color="f4f4f4" />,
    // },
    {
      text: "پروفایل",
      path: "/doctor-panel/doctor-profile",
      icon: <AccountCircleIcon color="f4f4f4" />,
    },
    {
      text: "تکمیل پنل کاربری",
      path: "/doctor-panel/doctor-profile-completion",
      icon: <MenuIcon color="f4f4f4" />,
    },
    {
      // text: "مدیریت نوبت ها",
      text: "مدیریت زمان نوبت دهی",
      path: "/doctor-panel/appointments-management",
      icon: <SummarizeIcon color="f4f4f4" />,
    },
    // {
    //   text: "امور مالی",
    //   path: "/doctor-panel/finance-issues",
    //   icon: <AccountBalanceIcon color="f4f4f4" />,
    // },
    // {
    //   text: "تغییر رمزعبور",
    //   path: "/doctor-panel/change-password",
    //   icon: <PasswordIcon color="f4f4f4" />,
    // },
    // {
    //   text: "خروج",
    //   path: "/",
    //   icon: <LogoutIcon color="f4f4f4" />,
    // },
  ];

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Drawer
        variant="permanent"
        open={open}
        onMouseOver={handleDrawerOpen}
        onMouseOut={handleDrawerClose}
        // className={classes.drawer}
      >
        <DrawerHeader className={classes.drawer}/>
        <Divider />
        <List className={classes.list}>
          {menuItems.map((item, index) => (
            <ListItem
              key={index}
              disablePadding
              onClick={() => history.push(item.path)}
              sx={{
                display: "block",
                background: location.pathname == item.path ? "#f4f4f4" : null,
              }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <ListItem
          disablePadding
          onClick={logOut}
          sx={{
            display: "block",
            marginTop: "auto",
          }}
        >
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <LogoutIcon color="f4f4f4" />
            </ListItemIcon>
            <ListItemText primary={"خروج"} sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </Drawer>
    </Box>
  );
}