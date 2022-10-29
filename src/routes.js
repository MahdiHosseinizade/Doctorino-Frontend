import Login from "./components/Login/Login";
import SignUpPage from "./components/Sign Up/SignUp";


const routes = [
    {path: '/signup', component: SignUpPage},
    {path:'/',component : Login , exact : true },
]

export default routes;