import { useFormik } from "formik";
import { Link, withRouter } from "react-router-dom";
import "./login.css";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Input from "../common/Input";
import NavBar from "../NavBar/newNavBar.jsx";
import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";


const value = {
  email: "",
  password: "",
};

const STextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    background: "#fefefe",
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
  },
  spellCheck: false,
});
const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
  password: Yup.string().required("کلمه عبور را وارد کنید"),
});

// const Login = ({ history }) => {
//   const [user, setUser] = useState({ ...value });
//   // console.log(user);
//   const formik = useFormik({
//     initialValues: value,
//     onSubmit: (values, e) => {
//       postuserHandler(values);
//       e.preventDefault();
//       setUser({ ...value });
//     },
//     validationSchema: validationSchema,
//     validateOnMount: true,
//   });
//   console.log(formik.values);
const Login = ({ history }) => {
  const { loginUser } = useContext(AuthContext);
  const [user, setUser] = useState({ ...value });
  // const history = useHistory();
  // console.log(user);
  const formik = useFormik({
    initialValues: value,
    onSubmit: (values, e) => {
      // postuserHandler(values);
      loginUser(values.email, values.password);
      // if login successfull redirect to landing page
      if (document.cookie.token) {
        history.push("/");
      }
      e.preventDefault();
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  // useEffect(() => {
  //   if (document.cookie.token ) {
  //     history.push("/hotel-panel");

  //   }
  //   },[])

  const postuserHandler = (user) => {
    axios
      // .post("http://127.0.0.1:8000/api/auth/token/", {
        .post("http://188.121.113.74/api/auth/token/", {
        password: user.password,
        email: user.email,
      })
      .then((res) => {
        setUser(res.data);
        document.cookie = `token=${res.data.access}`;
        document.cookie = `refresh=${res.data.refresh}`;
        localStorage.setItem("token", res.data.access);
        toast.success("Enter Succesfuly", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      // add style to toast
      .catch((err) => {
        toast.error("مشکلی پیش آمده", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  return (
    <div className="signUpPage">
      <div>
        <nav>
          <NavBar />
        </nav>
        <div className="formControllogin">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="signUpTitle">ورود</h2>
            <hr />
            <div className="input">
              <div className="emailInput mb4">
                <STextField
                  fullWidth
                  error={formik.errors["email"] && formik.touched["email"]}
                  variant="outlined"
                  label="ایمیل"
                  name="email"
                  type="text"
                  helperText={
                    formik.errors["email"] &&
                    formik.touched["email"] &&
                    formik.errors["email"]
                  }
                  {...formik.getFieldProps("email")}
                />
                {/* <Input formik={formik} name= "email" type="email" label="ایمیل" /> */}
              </div>
              <div className="mb4">
                {/* <Input
                  formik={formik}
                  name="password"
                  type="password"
                  label="کلمه عبور"
                /> */}
                <STextField
                  fullWidth
                  error={
                    formik.errors["password"] && formik.touched["password"]
                  }
                  variant="outlined"
                  label="کلمه عبور"
                  name="password"
                  type="password"
                  helperText={
                    formik.errors["password"] &&
                    formik.touched["password"] &&
                    formik.errors["password"]
                  }
                  {...formik.getFieldProps("password")}
                />
              </div>
            </div>
            <button disabled={!(formik.isValid && formik.dirty)} type="submit">
              ورود
            </button>
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
};

export default withRouter(Login);
