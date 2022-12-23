// import DoctorLogin from "./components/Doctor.jsx/doctorLogin";
// import doctorPanel from "./components/Doctor.jsx/doctorPanel";
import Login from "./components/Login/Login";
import SignUpPage from "./components/SignUp/SignUp";

import HotelPanel from "./components/Hotel/Panel/HotelPanel";
import Hotels from './components/Hotel/HotelList/Hotels';

import DoctorPanel from "./components/Doctor/DoctorPanel/DoctorPanel";
import ListOfDoctors from "./components/Doctor/ListOfDoctors/ListOfDoctors";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import NotFound from "./pages/NotFoundPage";

import scheduleTable from "./components/Doctor/DoctorProfile/scheduleTable";
import drLayout from "./components/Doctor/DoctorProfile/DoctorProfileLayout";
import Hotel from "./components/Hotel/Hotel/Hotel";
import DoctorSpecialitie from "./components/Doctor/SpecialitiePage/DoctorSpecialities";
import HotelReservation from "./components/Hotel/HotelReservation/HotelReservation";

import SickPanel from './components/Sick/Panel/SickPanel';


const routes = [

  { path: "/sick-panel", component: SickPanel, private: true },

  { path: "/schedule-table", component: scheduleTable },
  { path: "/doctor-layout", component: drLayout},
  { path: "/signup", component: SignUpPage },
  {path: "/hotel/:id", component: Hotel},
  {path: "/specialist/:id", component: DoctorSpecialitie},
  { path: "/hotel-panel", component: HotelPanel, private: true },
  { path: '/hotels', component: Hotels },
  { path: "/doctor-panel", component: DoctorPanel, private: true },
  {path : "/hotel-reservation" , component: HotelReservation},
  { path: "/list-of-doctors", component: ListOfDoctors },
  { path: "/login", component: Login },
  { path: "/", component: LandingPage, exact: true },
  { component: NotFound },
];

export default routes;
