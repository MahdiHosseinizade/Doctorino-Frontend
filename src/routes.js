// import DoctorLogin from "./components/Doctor.jsx/doctorLogin";
// import doctorPanel from "./components/Doctor.jsx/doctorPanel";
import Login from "./components/Login/Login";
import SignUpPage from "./components/Sign Up/SignUp";
import NotFound from "./pages/NotFoundPage";


const routes = [
    {path: '/signup', component: SignUpPage},
    // {path:'/doctor-login' ,component:DoctorLogin },
    // {path:'/doctor-panel' ,component:doctorPanel},
    {path:'/',component : Login , exact : true },
    {component:NotFound},
]

export default routes;