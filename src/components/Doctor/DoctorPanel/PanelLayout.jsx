import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import SideBar from "./components/SideBar";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme";
// import "./panelLayout.css"

const PanelLayout = ({ children }) => {
  return (
    <div>
      <Box className="navbar">
        <NavBar bgColor={theme.palette.doctor}/>
      </Box>

      <Box sx={{ marginTop: "20px", position: "sticky", display: "flex" }}>
        <SideBar />
        {children}
      </Box>
    </div>
  );
};

export default PanelLayout;
