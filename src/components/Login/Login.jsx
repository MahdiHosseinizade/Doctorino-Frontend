import {useFormik} from "formik";
import { Link } from "react-router-dom";
import './login.css';
import { useState } from "react";
import * as Yup from "yup";
import images from '../../assets/img/images.jpg'

const value = {
    email: "",
    password: "",
}

const validationSchema = Yup.object({
    email: Yup.string().email("فرم ایمیلت اشتباهه").required("ایمیلت ضروریه"),
    password: Yup.string()
    .required("پسوردت ضروریه")
    .min(8, "password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "پسورد باید شامل حروف لاتین باشه"),
})


const Login = () => {
    const [user, setUser] = useState([]);   
    // console.log(user);
    const formik = useFormik({
        initialValues: value,
        onSubmit : (values) => setUser(values),
        validationSchema: validationSchema,
        validateOnMount: true,
    }) 

    return (
        <div className="signUpPage">
          <div className="signUpBox">
            <div className="signUpBoxForm">
            <form className="formControl" onSubmit={formik.handleSubmit}>
            <h2 className="signUpTitle">ورود </h2>
            <hr />
            <div className="input">
              <div className="emailInput mb4">
                <label >ایمیل</label>
                <div className="icon-email">
                  <input
                    type = "email"
                    className="email"
                    // type="text"
                    // placeholder="email@test.com"
                    name="email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.errors.email && formik.touched.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                  {/* <AiOutlineMail className="icon" /> */}
                </div>
              </div>
              <div className="mb4">
                <label >کلمه عبور</label>
                <div className="icon-password">
                  <input
                    className="password"
                    type= "password"
                    // placeholder="Password"
                    name="password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.errors.password && formik.touched.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}
                  {/* <GrKey className="icon2" /> */}
                </div>
              </div>
            </div>
            <button disabled={!(formik.isValid && formik.dirty)}   type="submit">ورود</button>
            <h2 className="h2text">
              آیا حساب کاربری ندارید ؟
              <Link className="link" to="/signup">
                ثبت نام
              </Link>
            </h2>
          </form>
            </div>
            <div className="signUpimgcontainer">
              <img  src= {images} />
            </div>
          </div>
        </div>
      );
}
 
export default Login;