import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../common/Input";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import "./sickRegister.css";
import { toast } from "react-toastify";
import styled from "@emotion/styled";
import AuthContext from "../../context/AuthContext";
import { useContext } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const value = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  passwordconfrim: "",
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
  passwordconfrim: Yup.string()
    .required("تایید کلمه عبور را وارد کنید")
    .oneOf([Yup.ref("password"), null], "کلمه عبور مطابقت ندارد"),
  first_name: Yup.string().required("نام را وارد کنید"),
  last_name: Yup.string().required("نام خانوادگی را وارد کنید"),
});

const SickRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfrim, setShowPasswordconfrim] = useState(false);
  const {loginUser} = useContext(AuthContext);
  const history = useHistory();

  const handleClickShowPasswordConfrim = () => setShowPasswordconfrim(!showPasswordConfrim);
  const handleMouseDownPasswordConfrim = () => setShowPasswordconfrim(!showPasswordConfrim);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: value,
    onSubmit: (values, e) => {
      // console.log(values);
      postsickHandler(values);
      e.preventDefault();
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  const postsickHandler = async (user) => {
    
    
    const userData = {
      user:{
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        password: user.password,
      }
    }
    await axios.post("http://188.121.113.74/api/auth/patient/new/",userData)
    .then((res) =>{
      toast.success(
        `ثبت نام ${res.data.user.first_name} ${res.data.user.last_name} با موفقیت انجام شد`,
        {
            position: "top-right",
            autoClose: 3000,
        }
      )
      history.push("/login", { destination: "/" });
    })
    .catch((err) =>{         
      if (err.response.data.email){
        toast.error('ایمیل وارد شده تکراری است', {
          position: "top-right",
          autoClose: 3000,
        })
      }
  })
  
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["first_name"] && formik.touched["first_name"]
              }
              variant="outlined"
              label="نام"
              name="first_name"
              type="text"
              helperText={
                formik.errors["first_name"] &&
                formik.touched["first_name"] &&
                formik.errors["first_name"]
              }
              {...formik.getFieldProps("first_name")}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <STextField
              fullWidth
              error={formik.errors["last_name"] && formik.touched["last_name"]}
              variant="outlined"
              label="نام خانوادگی"
              name="last_name"
              type="text"
              helperText={
                formik.errors["last_name"] &&
                formik.touched["last_name"] &&
                formik.errors["last_name"]
              }
              {...formik.getFieldProps("last_name")}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <STextField
              fullWidth
              error={formik.errors["email"] && formik.touched["email"]}
              variant="outlined"
              label="ایمیل"
              name="emiail"
              type="text"
              helperText={
                formik.errors["email"] &&
                formik.touched["email"] &&
                formik.errors["email"]
              }
              {...formik.getFieldProps("email")}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <STextField
              fullWidth
              error={formik.errors["password"] && formik.touched["password"]}
              variant="outlined"
              label="کلمه عبور"
              name="password"
              type = {showPassword ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
              helperText={
                formik.errors["password"] &&
                formik.touched["password"] &&
                formik.errors["password"]
              }
              {...formik.getFieldProps("password")}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["passwordconfrim"] &&
                formik.touched["passwordconfrim"]
              }
              variant="outlined"
              label="تایید کلمه عبور"
              name="passwordconfrim"
              type = {showPasswordConfrim ? "text" : "password"}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPasswordConfrim}
                          onMouseDown={handleMouseDownPasswordConfrim}
                        >
                          {showPasswordConfrim ? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
              helperText={
                formik.errors["passwordconfrim"] &&
                formik.touched["passwordconfrim"] &&
                formik.errors["passwordconfrim"]
              }
              {...formik.getFieldProps("passwordconfrim")}
            />
          </Grid>
        </Grid>
        <button
          className="sickRegisterButton"
          disabled={!(formik.isValid && formik.dirty)}
          type="submit"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
};

export default SickRegister;