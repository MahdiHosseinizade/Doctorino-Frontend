import Login from "./components/Login/Login";
import SignUpPage from "./components/Sign Up/SignUp";


const routes = [
    {path:'/',component : Login , exact : true },
    {path: '/signup', component: SignUpPage },
]

export default routes;