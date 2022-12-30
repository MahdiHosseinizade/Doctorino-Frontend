import Login from "./components/Login/Login";
import SignUpPage from "./components/SignUp/SignUp";
import HotelPanel from "./components/Hotel/Panel/HotelPanel";
import Hotels from "./components/Hotel/HotelList/Hotels";
import DoctorPanel from "./components/Doctor/DoctorPanel/DoctorPanel.jsx";
import ListOfDoctors from "./components/Doctor/ListOfDoctors/ListOfDoctors";
import DoctorProfileLayout from "./components/Doctor/DoctorProfile/DoctorProfileLayout";
import LandingPage from "./components/LandingPage/LandingPage.jsx";
import HotelSearch from "./components/LandingPage/HotelSearch/HotelSearch";
import FoundHotels from "./components/LandingPage/HotelSearch/FoundHotels";
import NotFound from "./pages/NotFoundPage";
import scheduleTable from "./components/Doctor/DoctorProfile/scheduleTable";
import drLayout from "./components/Doctor/DoctorProfile/DoctorProfileLayout";
import Hotel from "./components/Hotel/Hotel/Hotel";
import DoctorSpecialitie from "./components/Doctor/SpecialitiePage/DoctorSpecialities";
import HotelReservation from "./components/Hotel/HotelReservation/HotelReservation";
import SearchDoctorResponse from "./components/LandingPage/SearchDocResponse";

const routes = [
  { path: "/schedule-table", component: scheduleTable },
  { path: "/doctor/:id", component: DoctorProfileLayout },
  { path: "/specialist/:id", component: DoctorSpecialitie },
  { path: "/doctor-layout", component: drLayout },
  { path: "/SearchDoctor", component: SearchDoctorResponse },
  {
    path: "/doctor-panel",
    component: DoctorPanel,
    private: true,
    role: "doctor",
  },
  { path: "/list-of-doctors", component: ListOfDoctors },

  { path: "/hotel/:id", component: Hotel },
  { path: "/hotel-reservation", component: HotelReservation },
  {
    path: "/hotel-panel",
    component: HotelPanel,
    private: true,
    role: "hotel_owner",
  },
  { path: "/hotels", component: Hotels },
  { path: "/hotel-search", component: HotelSearch },
  { path: "/found-hotels", component: FoundHotels },

  { path: "/login", component: Login },
  { path: "/signup", component: SignUpPage },
  { path: "/", component: LandingPage, exact: true },
  { component: NotFound },
];

export default routes;
