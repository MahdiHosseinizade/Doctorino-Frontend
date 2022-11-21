import {useFormik} from "formik";
import { Link, withRouter } from "react-router-dom";
import './login.css';
import { useState } from "react";
import * as Yup from "yup";
import doctor from '../../assets/img/doctor.jpg'
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../common/Input";


const value = {
    email: "",
    password: "",
}

const validationSchema = Yup.object({
    email : Yup.string().email("ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
    password : Yup.string().required("کلمه عبور را وارد کنید"),
})


const Login = ({history}) => {
    const [user, setUser] = useState({...value});   
    // console.log(user);
    const formik = useFormik({
        initialValues: value,
        onSubmit : (values,e) =>{
          postuserHandler(values);
          e.preventDefault();
        },
        validationSchema: validationSchema,
        validateOnMount: true,
    }) 

    // useEffect(() => {
    //   if (document.cookie.token ) {
    //     history.push("/");
    //   }  
    //   },[])
    

    const postuserHandler = (user) =>{
      axios.post("http://127.0.0.1:8000/api/auth/token/",{username:user.username,password:user.password,is_doctor:user.is_doctor,is_hotel_owner:user.is_hotel_owner})
      .then((res) => {
        setUser(res.data);
        document.cookie = `token=${res.data.access}`;
        document.cookie = `refresh=${res.data.refresh}`;
        toast.success('Enter Succesfuly',{
          position: "top-right",
          autoClose: 2000,
        })
      })
      // add style to toast
      .catch((err) =>{
        toast.error('مشکلی پیش آمده',{
          position: "top-right",
          autoClose: 2000,
        })
      })
  }

    return (
        
        <div className="signUpPage">
          <div>
            <div className="formControllogin">
            <form onSubmit={formik.handleSubmit}>
            <h2 className="signUpTitle">ورود</h2>
            <hr />
            <div className="input">
              <div className="emailInput mb4">
                <Input formik={formik} name= "email" type="email" label="ایمیل" />
              </div>
              <div className="mb4">
                <Input formik={formik} name= "password" type="password" label="کلمه عبور" />
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
          </div>
        </div>
      );
}
 
export default withRouter(Login);