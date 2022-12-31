import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import LogoutIcon from '@mui/icons-material/Logout';
import HotelIcon from '@mui/icons-material/Hotel';
import DashboardIcon from '@mui/icons-material/Dashboard';
import React, {useContext} from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    ListItemButton,
} from '@mui/material';
import { styled } from '@mui/system';
import AuthContext from '../../../context/AuthContext';


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
    const { path } = useRouteMatch();

    const {logOut} = useContext(AuthContext);

    const menuItems = [
        {
            text: "نوبت های من",
            path: `${path}/doctor-reservations`,
            icon: <DashboardIcon color="f4f4f4" />
        },
        {
            text: "مدیریت رزرو هتل",
            path: `${path}/hotel-reservations`,
            icon: <HotelIcon color="f4f4f4" />
        },
        {
            text: "پروفایل",
            path: `${path}/profile`,
            icon: <AccountCircleIcon color="f4f4f4" />
        },
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
                                background: location.pathname == item.path ? '#f4f4f4' : null,
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
                            <LogoutIcon color="f4f4f4" />
                        </ListItemIcon>
                        <ListItemText primary={"خروج"} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>

            </Drawer>
        </Box>
    );
}
