// import DoctorLogin from "./components/Doctor.jsx/doctorLogin";
// import doctorPanel from "./components/Doctor.jsx/doctorPanel";
import Login from "./components/Login/Login";
import SignUpPage from "./components/Sign Up/SignUp";

import HotelPanel from "./components/Hotel/Panel/HotelPanel";

import DoctorPanel from "./components/Doctor/DoctorPanel/DoctorPanel";
import ListOfDoctors from "./components/Doctor/ListOfDoctors/ListOfDoctors";

import LandingPage from "./components/LandingPage/LandingPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  { path: "/signup", component: SignUpPage },

  { path: "/hotel-panel", component: HotelPanel },

  { path: "/doctor-panel", component: DoctorPanel, private: true },
  { path: "/list-of-doctors", component: ListOfDoctors },

  { path: "/login", component: Login },
  
  { path: "/", component: LandingPage, exact: true },

  { component: NotFound },
];

export default routes;
