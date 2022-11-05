import Login from "./components/Login/Login";
import SignUpPage from "./components/Sign Up/SignUp";
import NotFound from "./pages/NotFoundPage";


const routes = [
    {path: '/signup', component: SignUpPage},
    {path:'/',component : Login , exact : true },
    {component:NotFound},
]

export default routes;