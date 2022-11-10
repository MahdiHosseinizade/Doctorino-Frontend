import "./signUp.css";
import { useFormik } from "formik";
import {useState } from "react";
import { Link, withRouter } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from "../common/Input";


const value = {
  email: "",
  password: "",
  passwordconfrim: "",
  is_doctor: false,
  is_hotel_owner: false,
};


const validationSchema = Yup.object({
  email : Yup.string().email("ایمیل معتبر نیست").required("ایمیل الزامی است"),
  password: Yup.string()
    .required("رمز عبور الزامی است"),
  passwordconfrim: Yup.string()
    .required("تکرار رمز عبور الزامی است")
    .oneOf([Yup.ref("password"), null], "رمز عبور همخوانی ندارد"),
});


const SignUp = ({history}) => {
  const [user, setUser] = useState({...value});
  // const [error,setError] = useState(null);
  

  
  const formik = useFormik({
    initialValues: value,
    onSubmit: (values,e) => {
      postuserHandler(values)
      e.preventDefault();
    },
    validationSchema: validationSchema,
    validateOnMount: false,
  });
  
 

  const postuserHandler = (user) =>{
      axios.post("http://127.0.0.1:8000/api/auth/new-user/",{username:user.username,password:user.password,is_doctor:user.is_doctor,is_hotel_owner:user.is_hotel_owner})
      .then((res) =>{
        // setUser(res.data);
        history.push("/");
        toast.success('ثبت نام با موفقیت انجام شد',{
          className:"toast-succces",
          position: "top-right",
          autoClose: 5000,
        });
      })
      .catch((error) => {
        toast.error('you have some error')
        console.log(error);
      });
  }

  // const changeHandler = (selectedOption) =>{
  //   setSelect(selectedOption);
  //   if (selectedOption.value === "مریض"){
  //     formik.values.is_doctor = false;
  //     formik.values.is_hotel_owner = false;
  //   }
  //   else if (selectedOption.value === "دکتر"){
  //     formik.values.is_doctor = true;
  //     formik.values.is_hotel_owner = false;
  //   }
  //   else {
  //     formik.values.is_doctor = false;
  //     formik.values.is_hotel_owner = true;
  //   }
  //   setUser(formik.values);
  // }

  return (
    <div className="signUpPage">
      <div className="signUpBox">
        <div className="signUpBoxForm">
        <form className="formControl" onSubmit={formik.handleSubmit}>
        <h2 className="signUpTitle">ثبت نام</h2>
        <hr />
        <div className="input">
          <div className="emailInput mb4">
            <Input label="ایمیل" name="email" formik={formik} type="email" />
          </div>
          <div className="mb4">
            <Input label="رمز عبور" name="password" formik={formik} type="password" />
          </div>
          <div className="re-enter mb4">
            <Input label="تایید رمز عبور" name="passwordconfrim" formik={formik} type="password" />
          </div>
        </div>
        <div>
        </div>
        <button  disabled={!(formik.isValid)}  type="submit">ثبت نام</button>
        <h2 className="h2text">
          آیا حساب کاربری دارید ؟
          <Link className="link" to="/">
            ورود
          </Link>
        </h2>
      </form>
        </div>
        
      </div>
    </div>
  );
};

export default withRouter(SignUp);