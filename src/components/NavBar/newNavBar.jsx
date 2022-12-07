import * as React from "react";
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

const NavBar = () => {
  const history = useHistory();
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
            noWrap
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
                noWrap
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
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  // sx={{padding: "2px 0px 2px", my:2 , color: "black", display: "block", innerWidth: "30px", outerWidth: "40px" }}
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
              variant="text"
              size="medium"
              aria-label="text button group"
              sx={{
                padding: "4px  3px 2px 0px",
              }}
            >
              <Button
                onClick={() => {
                  history.push("/login");
                }}
              >
                &nbsp;ورود
              </Button>
              <Button
                onClick={() => {
                  history.push("/signup");
                }}
              >
                &nbsp;&nbsp;&nbsp;عضویت
              </Button>
            </ButtonGroup>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
