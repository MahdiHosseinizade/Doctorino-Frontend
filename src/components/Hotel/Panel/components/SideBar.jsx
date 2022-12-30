import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import AddHomeIcon from '@mui/icons-material/AddHome';
import LogoutIcon from '@mui/icons-material/Logout';
import PasswordIcon from '@mui/icons-material/Password';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SummarizeIcon from '@mui/icons-material/Summarize';
import React, {useContext} from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    IconButton,
    ListItemButton,
} from '@mui/material';
import { styled } from '@mui/system';
import AuthContext from '../../../../context/AuthContext';


const widthDraw = 240;

const openedMixin = (theme) => ({
    width: widthDraw,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: widthDraw,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function SideBar() {
    const history = useHistory();
    const location = useLocation();

    const {logOut} = useContext(AuthContext);

    const menuItems = [
        {
            text: "داشبورد",
            path: "/hotel-panel/dashboard",
            icon: <DashboardIcon color="hotel" />
        },
        {
            text: "اضافه کردن هتل",
            path: "/hotel-panel/add-hotel",
            icon: <AddHomeIcon color="hotel" />
        },
        {
            text: "پروفایل",
            path: "/hotel-panel/profile-completion",
            icon: <AccountCircleIcon color="hotel" />
        },
        {
            text: "اطلاعات تکمیلی هتل",
            path: "/hotel-panel/hotel-info",
            icon: <MenuIcon color="hotel" />
        },
        {
            text: "گزارش رزرو ها",
            path: "/hotel-panel/booking-reports",
            icon: <SummarizeIcon color="hotel" />
        },
        {
            text: "امور مالی",
            path: "/hotel-panel/finances",
            icon: <AccountBalanceIcon color="hotel" />
        },
        {
            text: "تغییر رمزعبور",
            path: "/hotel-panel/change-password",
            icon: <PasswordIcon color="hotel" />
        }
    ]

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box>
            <Drawer variant="permanent" open={open} onMouseOver={handleDrawerOpen} onMouseOut={handleDrawerClose} >
                <DrawerHeader />
                <Divider />
                <List>
                    {menuItems.map((item, index) => (
                        <ListItem key={index} disablePadding
                            onClick={() => history.push(item.path)}
                            sx={{
                                display: 'block',
                                background: location.pathname == item.path ? '#FFF6E7' : null,
                            }}
                        >
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider />

                <ListItem disablePadding
                    onClick={logOut}
                    sx={{
                        display: 'block',
                        marginTop: 'auto',
                    }}
                >
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutIcon color="black" />
                        </ListItemIcon>
                        <ListItemText primary={"خروج"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            </Drawer>
        </Box>
    );
}
