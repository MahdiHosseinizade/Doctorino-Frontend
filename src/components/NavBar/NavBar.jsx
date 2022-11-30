import * as React from "react";
import { Box } from "@mui/material";
import { AppBar } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import {IconButton} from "@mui/material";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/LocalHospitalTwoTone";
import ButtonGroup from "@mui/material/ButtonGroup";



const NavBar = () => {
  const pages = ["نوبت دهی مطب", "مشاوره پزشکی", "مراکز درمانی"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        direction: "rtl",
        background: "#65B9D3",
        // color: "#65B9D3",
        enableColorOnDark: true,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon
            color="primary"
            sx={{ display: { xs: "none", md: "flex" }, fontSize: 35, mr: 1 }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 0,
              display: { xs: "none", md: "flex" },
              fontFamily: "Inter",
              fontWeight: 900,
              color: "#000000",
              textDecoration: "none",
            }}
          >
            دکترینو
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="#000000"
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
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon
            color="primary"
            sx={{ display: { xs: "flex", md: "none" }, fontSize: 35, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 0,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Inter",
              fontSize: "32px",
              fontWeight: 900,
              color: "#000000",
              textDecoration: "none",
              lineHeight: "39px",
              letterSpacing: "0em",
              textAlign: "left",
            }}
          >
            دکترینو
          </Typography>
          <Box sx={{ flexGrow: 1, mr: 3, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/*///////////////////////*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              size: "medium",
              "& < *": {
                m: 0,
              },
            }}
          >
            <ButtonGroup
              sx={{ direction: "ltr" }}
              variant="text"
              aria-label="text button group"
            >
              <Button>ورود</Button>
              <Button>عضویت</Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
