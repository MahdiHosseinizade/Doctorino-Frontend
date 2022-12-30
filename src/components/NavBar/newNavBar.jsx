import React, { useState, useEffect, useContext } from 'react';
import { Box } from "@mui/material";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/LocalHospitalTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Link, useHistory } from "react-router-dom";
import AuthContext from '../../context/AuthContext';


const NavBar = () => {
  let { user, authTokens, logOut } = useContext(AuthContext);
  // console.log(user);

  const history = useHistory();
  const pages = ["لیست پزشکان", "جستجوی هتل",];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {

    setAnchorElNav(event.currentTarget);

  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);

  };

  const handleCloseNavMenu = (e) => {
    setAnchorElNav(null);
    if (e.target.innerHTML === "لیست پزشکان")
      history.push("/list-of-doctors/")
    else if (e.target.innerHTML === "جستجوی هتل")
      history.push("/hotel-search/")
    if (e.target.innerText === "لیست پزشکان")
      history.push("/list-of-doctors/")
    else if (e.target.innerText === "جستجوی هتل")
      history.push("/hotel-search/")
    console.log(e)
  };

  const handleCloseUserMenu = () => {

    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 100,
        direction: "rtl",
        background: "#65B9D3",
        enableColorOnDark: true,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          paddingTop: "3px",
          paddingBottom: "7px",
          height: "auto",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              color: "text.primary",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            <AdbIcon
              color="primary"
              onClick={() => history.push("/")}
              sx={{ display: { xs: "none", md: "flex" }, fontSize: 45, mr: 1 }}
            />
            دکترینو
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              alignItems: "self-end",
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="medium"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                mr: 10,
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              mr: 0,
              marginLeft: "10px",
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              flexGrow: 10,
            }}
          >
            <Link to="/">
              <AdbIcon color="primary" sx={{ fontSize: 45, mr: 1 }} />
              <Typography
                variant="h4"
                sx={{
                  display: "inline-block",
                  fontSize: "35px",
                  fontWeight: "bold",
                  color: "text.primary",
                  textDecoration: "none",
                  lineHeight: "45px",
                  letterSpacing: "0em",
                }}
              >
                دکترینو
              </Typography>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 1, mr: 5, display: { xs: "none", md: "flex" } }}>
            <ButtonGroup
              sx={{ mr: 5, with: "20px", padding: "7px 7px 0px 0px" }}
              variant="inline"
            >
              <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{
                    width: "140px",
                    color: "black",
                    padding: "7px -5px 2px",
                    display: "block",
                  }}
                >
                  {page}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: "column",
              alignItems: "center",
              size: "medium",
              "& < *": {
                m: 0,
              },
            }}
          >

            <ButtonGroup
              variant="text"
              size="medium"
              aria-label="text button group"
              sx={{
                width: 'auto',
                margin: '0px 20px 0px 0px',
                padding: "4px  3px 2px 0px",
                display: user ? 'none' : 'flex',
              }}
            >
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
                sx={{ width: 'auto', }}
              >
                &nbsp;ثبت نام
              </Button>

              <Button
                onClick={() => {
                  history.push("/login");
                }}
                sx={{ width: 'auto', }}
              >
                &nbsp;ورود
              </Button>
            </ButtonGroup>

            <ButtonGroup
              variant="text"
              size="medium"
              aria-label="text button group"
              sx={{
                width: 'auto',
                margin: '0px 20px 0px 0px',
                padding: "4px  3px 2px 0px",
                display: !user ? 'none' : 'flex',
              }}
            >
              <Button
                onClick={() => {
                  if (user.role === "doctor") {
                    history.push("/doctor-panel/dashboard");
                  } else if (user.role === "hotel_owner") {
                    history.push("/hotel-panel/dashboard");
                  } else {
                    history.push("/patient-panel/dashboard");
                  }
                }}
                sx={{ width: 'auto', }}
              >
                پنل کاربری
              </Button>
              <Button
                onClick={() => {
                  logOut();
                }}
                sx={{ width: 'auto', }}
              >
                خروج
              </Button>
            </ButtonGroup>

          </Box>



        </Toolbar>
      </Container >
    </AppBar >
  );
};

export default NavBar;
