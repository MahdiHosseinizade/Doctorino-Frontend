import "./signUp.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import doctor from '../../assets/img/doctor.jpg'
import axios from "axios";
import { TextField } from "@mui/material";

const value = {
  username: "",
  password: "",
  passwordconfrim: "",
  is_doctor: false,
  is_hotel_owner: false,
};

const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری ضروریه"),
  password: Yup.string()
    .required("رمزت نامعتبره")
    .matches(/[a-zA-Z]/, "رمزت باید حداقل یک حرف داشته باشه"),
  passwordconfrim: Yup.string()
    .required("تایید رمزت ضروزیه")
    .oneOf([Yup.ref("password"), null], "پسورد باید یکی باشه "),
});


const SignUp = () => {
  const [user, setUser] = useState({...value});
  console.log(user);

  
  const formik = useFormik({
    initialValues: value,
    onSubmit: (values) => {
      postuserHandler(values);
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });
  // console.log(formik);
 

  const postuserHandler = (user) =>{
      axios.post("http://127.0.0.1:8000/api/auth/new-user/",{username:user.username,password:user.password,is_doctor:user.is_doctor,is_hotel_owner:user.is_hotel_owner})
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  }

  // async function  getUsers() {
  //   try {
  //     const res = await axios.get("http://localhost:3001/users");
  //     setUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect (() =>{
  //     getUsers();
  // },[])

  return (
    <div className="signUpPage">
      <div className="signUpBox">
        <div className="signUpBoxForm">
        <form className="formControl" onSubmit={formik.handleSubmit}>
        <h2 className="signUpTitle">ثبت نام</h2>
        <hr />
        <div className="input">
          <div className="emailInput mb4">
            <label >نام کاربری</label>
            <div className="icon-email">
              <input
                type = "text"
                className="email"
                name="username"
                {...formik.getFieldProps("username")}
              />
              {formik.errors.username && formik.touched.username && (
                <div className="error">{formik.errors.username}</div>
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
                // onChange={(e)=>{
                //   setUser({...user,password:e.target.value})
                // }}
                
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="error">{formik.errors.password}</div>
              )}
              {/* <GrKey className="icon2" /> */}
            </div>
          </div>
          <div className="re-enter mb4">
            <label >تایید کلمه عبور</label>
            <div className="icon-password">
              <input
                className="password"
                type="password"
                // placeholder="Password confrimation"
                name="passwordconfrim"
                {...formik.getFieldProps("passwordconfrim")}
              />
              {formik.errors.passwordconfrim && formik.touched.passwordconfrim && (
                <div className="error">{formik.errors.passwordconfrim}</div>
              )}
              {/* <GrKey className="icon2" /> */}
            </div>
          </div>
        </div>
        <button onClick={postuserHandler}  disabled={!(formik.isValid && formik.dirty)}   type="submit">ثبت نام</button>
        <h2 className="h2text">
          آیا حساب کاربری دارید ؟
          <Link className="link" to="/">
            ورود
          </Link>
        </h2>
      </form>
        </div>
        <div className="signUpimgcontainer">
          <img  src= {doctor} />
        </div>
      </div>
    </div>
  );
};

export default SignUp;