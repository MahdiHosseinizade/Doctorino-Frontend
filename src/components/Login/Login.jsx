import {useFormik} from "formik";
import { Link } from "react-router-dom";
import './login.css';
import { useState } from "react";
import * as Yup from "yup";

const value = {
    email: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("email is Required"),
})
const Login = () => {
    const [user, setUser] = useState([]);   
    // console.log(user);
    const formik = useFormik({
        initialValues: value,
        onSubmit : (values) => setUser(values),
        validationSchema: validationSchema,
    }) 

    return (
        <div className="formControllogin">
            <form  onSubmit={formik.handleSubmit}>
                <h2>Login</h2>
                <hr/>
                <div className="emailLogin">
                    <label>email</label>
                    <input 
                        type="text" 
                        name="email" 
                        placeholder="Email"
                        {...formik.getFieldProps("email")} 
                    />
                    {formik.errors.email && formik.touched.email && (
                        <div className="error">{formik.errors.email}</div>
                    )}
                </div>
                <button type="submit">Submit</button>
            </form>
            <h2 className="h2text">Don't have an account? <Link className="link"  to="/signup">signup</Link></h2>
            
        </div>
    );
}
 
export default Login;