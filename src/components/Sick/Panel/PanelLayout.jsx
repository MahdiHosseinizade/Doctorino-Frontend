import { Box, CssBaseline } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme";


export default function PanelLayout({ children }) {
  return (
    <div>
      <CssBaseline />
      <Box
        mt = {10}
        sx={{
          position: "static",
          top: "0",
          right: "0",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          alignItems: "center",
          boxSizing: " border-box",
        }}
      >
        <NavBar bgColor={theme.palette.navbar}/>
      </Box>

      <Box  sx={{ width: "100%", position: "sticky", display: "flex", justifyContent: "center"}}>
        <SideBar />
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          {children}
        </Box>
      </Box>
    </div>
  );
}