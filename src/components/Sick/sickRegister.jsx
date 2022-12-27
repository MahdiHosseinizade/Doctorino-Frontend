import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../common/Input";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, TextField } from "@mui/material";
import "./sickRegister.css";
import { toast } from "react-toastify";
import styled from "@emotion/styled";

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
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [error, setError] = useState("Ooops !!!!");
  // console.log(error);

  const formik = useFormik({
    initialValues: value,
    onSubmit: (values, e) => {
      // console.log(values);
      postsickHandler(values);
      history.push("/login");
      e.preventDefault();
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });

  console.log(formik.values);

  const postsickHandler = (user) => {
    // post Header in Body Request
    axios
      .post("http://127.0.0.1:8000/api/auth/new-user/", user)
      .then((res) => {
        setUser(res.data);
        toast.success("ثبت نام با موفقیت انجام شد", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        setError(err.response.data.email);
        if (err.response.data.email) {
          toast.error("ایمیل وارد شده تکرای است", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={6}>
            <STextField
              // id="first_name"
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
            {/* <Input placeholder="نام" name="first_name" formik={formik} type="text" /> */}
          </Grid>
          <Grid item xs={6} md={6}>
            {/* <Input
              placeholder="نام خانوادگی"
              label="نام خانوادگی"
              name="last_name"
              formik={formik}
              type="text"
            /> */}
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
            {/* <Input placeholder="ایمیل" name="email" formik={formik} type="email" /> */}
          </Grid>
          <Grid item xs={6} md={6}>
            {/* <Input
              label="کلمه عبور"
              placeholder="کلمه عبور"
              name="password"
              formik={formik}
              type="password"
            /> */}
            <STextField
              fullWidth
              error={formik.errors["password"] && formik.touched["password"]}
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
          </Grid>
          <Grid item xs={6} md={6}>
            {/* <Input
              label="تایید کلمه عبور"
              placeholder="تایید کلمه عبور"
              name="passwordconfrim"
              formik={formik}
              type="password"
            /> */}
            <STextField
              fullWidth
              error={
                formik.errors["passwordconfrim"] &&
                formik.touched["passwordconfrim"]
              }
              variant="outlined"
              label="تایید کلمه عبور"
              name="passwordconfrim"
              type="password"
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
