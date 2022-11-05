import "./signUp.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import images from '../../assets/img/images.jpg'

const value = {
  email: "",
  password: "",
  passwordconfrim: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("ایمیلت نامعتبره").required("ایمیل ضروریه"),
  password: Yup.string()
    .required("رمزت نامعتبره")
    // .min(8, "password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "رمزت باید حداقل یک حرف داشته باشه"),
  passwordconfrim: Yup.string()
    .required("تایید رمزت ضروزیه")
    .oneOf([Yup.ref("password"), null], "پسورد باید یکی باشه "),
});


const SignUp = () => {
  const [user, setUser] = useState([]);
  
  console.log(user);

  
  const formik = useFormik({
    initialValues: value,
    onSubmit: (values) => setUser([...user, values]),
    validationSchema: validationSchema,
    validateOnMount: true,
  });
  // console.log(formik);
 

  // const post{userHandler = () =>{
  //     axios.post("http://localhost:3001/users",{...user})
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.log(err));
  // }

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
        <button disabled={!(formik.isValid && formik.dirty)}   type="submit">ثبت نام</button>
        <h2 className="h2text">
          آیا حساب کاربری دارید ؟
          <Link className="link" to="/">
            ورود
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
};

export default SignUp;