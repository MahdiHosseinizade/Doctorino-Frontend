import {useFormik} from "formik";
import { Link } from "react-router-dom";

const value = {
    email: "",
}
const Login = () => {
    
    const formik = useFormik({
        initialValues: value,
        onSubmit : (values) => console.log(values),
    }) 

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label>email</label>
                    <input type="text" name="email" onChange={formik.handleChange} value={formik.values.email} />
                </div>
                <button type="submit">Submit</button>
            </form>
            <Link to="/signup">Don't have an account</Link>
        </div>
    );
}
 
export default Login;