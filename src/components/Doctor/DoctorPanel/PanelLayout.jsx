import { Box, Container, CssBaseline } from "@mui/material";
import React from "react";
import { useRouteMatch } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme";
import Footer from "../../Footer/Footer";

const PanelLayout = ({ children }) => {
  const [buttonsInNavBar, setButtonsInNavBar] = React.useState([]);
  const { path } = useRouteMatch();
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 600) {
        setButtonsInNavBar([
          {
            text: "پروفایل",
            path: `${path}/doctor-profile`,
          },
          {
            text: "تکمیل پنل کاربری",
            path: `${path}/doctor-profile-completion`,
          },
          {
            text: "مدیریت زمان نوبت دهی",
            path: `${path}/appointments-management`,
          },
          {
            text: "تغییر رمز عبور",
            path: "/hotel-panel/verify-email"
          },
        ]);
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
        <NavBar buttons={buttonsInNavBar} bgColor={theme.palette.doctor} />
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
      {/* <Footer /> */}
    </div>
  );
};

export default PanelLayout;
