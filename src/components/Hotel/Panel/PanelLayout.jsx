import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import SideBar from "./components/SideBar";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme"

export default function PanelLayout({ children }) {

  const [buttonsInNavBar, setButtonsInNavBar] = React.useState([]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 600) {
        setButtonsInNavBar(
          [
            {
              text: "لیست پزشکان",
              path: "/list-of-doctors",
            },
            {
              text: "جستجوی هتل",
              path: "/hotel-search",
            },
            {
              text: "اطلاعات رزرو",
              path: "/hotel-panel/booking-reports"
            },
            {
              text: "اضافه کردن هتل",
              path: "/hotel-panel/add-hotel",
            },
            {
              text: "پروفایل مدیر",
              path: "/hotel-panel/profile-completion",
            },
            {
              text: "اطلاعات تکمیلی هتل",
              path: "/hotel-panel/hotel-info",
            },
            {
              text: "تغییر رمز عبور",
              path: "/hotel-panel/verify-email"
            },
          ]
        );
      } else {
        setButtonsInNavBar([]);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  });

  return (
    <div>
      <CssBaseline />
      <Box
        mt={10}
        sx={{
          position: "static",
          top: "0",
          right: "0",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "auto",
          alignItems: "center",
          boxSizing: "border-box",
        }}
      >
        <NavBar buttons={buttonsInNavBar} bgColor={theme.palette.hotel} />
      </Box>

      <Box sx={{
        width: "100%",
        position: "sticky",
        display: "flex",
        justifyContent: "center"
      }}
      >
        <Box sx={{
          display: { xs: "none", sm: "block" }
        }}>
          <SideBar />
        </Box>
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
