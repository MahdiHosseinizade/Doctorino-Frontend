import { useFormik } from "formik";
import Input from "../../common/Input";
import styles from "./doctor.module.css";
import * as Yup from "yup";
// import Select from 'react-select';
import { useState } from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import getDoctorScale from "./services/getDoctorScale";
import postDoctorRegister from "./services/postDoctorRegister";
// import {getDoctorScale} from "../../../services/getDoctorScale";
// import { postDoctorRegister } from "../../../services/postDocotorRegister";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import {makeStyles} from "@mui/styles";

const value = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  passwordConfrim: "",
  scale: [],
  code: "",
};

const useStyles = makeStyles({
  loginForm: { 
    height: "90%",
  }
})

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
  passwordConfrim: Yup.string()
    .required("تایید کلمه عبور را وارد کنید")
    .oneOf([Yup.ref("password"), null], "کلمه عبور مطابقت ندارد"),
  code: Yup.string().required("کد نظام پزشکی را وارد کنید"),
  first_name: Yup.string().required("نام را وارد کنید"),
  last_name: Yup.string().required("نام خانوادگی را وارد کنید"),
});

const DoctorRegister = () => {
  const classes = useStyles();
  const [scale, setscale] = useState("");
  const [doctor, setDoctor] = useState({ ...value });
  const [doctorScale, setDoctorScale] = useState([]);
  const [error, setError] = useState("Ooops !!!!");

  // var profilePicture = <img src="/src/assets/img/DoctorProfilePhoto.jpg" alt="Doctor"/>;

  const history = useHistory();
  useEffect(() => {
    getdoctorScale();
  }, [doctorScale]);


  const formik = useFormik({
    initialValues: value,
    onSubmit: (values, e) => {
      postdoctorHandler(values);
      e.preventDefault();
      setDoctor({ ...value });
    },
    validationSchema: validationSchema,
    validateOnMount: true,
  });
  // console.log(formik.values);
  
  const handleScale = (e) => {
    // console.log(e.target.value);
    setscale(e.target.value);
  };

  async function getdoctorScale() {
    try {
      const { data } = await getDoctorScale();
      setDoctorScale(data);
    } catch (error) {
      console.log(error);
    }
  }
  

  const postdoctorHandler = (doctor) => {
    // convet int to string
    const is_doctor = false;
    const user = {
      user: {
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        password: doctor.password,
      },
      specialties: [parseFloat(scale)],
      medical_system_number: doctor.code.toString(),
      // image: URL("../../../assets/img/DoctorProfilePhoto.jpg"),
      // image: profilePicture,
      is_doctor: true,
    };
    console.log(user);
    
    postDoctorRegister(user)
      .then((res) => {
        history.push("/login");
        setDoctor(user);
        toast.success("ثبت نام با موفقیت انجام شد", {
          position: "top-right",
          autoClose: 4000,
        });
      })
      .catch((err) => {
        if (err.response.data.email) {
          toast.error("ایمیل وارد شده تکراری است", {
            position: "top-right",
            autoClose: 3000,
          });
        } else if (err.response.data.medical_system_number) {
          toast.error("کد نظام پزشکی تکراری است", {
            position: "top-right",
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className={classes.loginForm}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
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
          <Grid item md={6} xs={6}>
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
          <Grid item md={12} xs={12}>
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
          </Grid>
          <Grid item md={6} xs={6}>
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
          <Grid item md={6} xs={6}>
            <STextField
              fullWidth
              error={
                formik.errors["passwordConfrim"] &&
                formik.touched["passwordConfrim"]
              }
              variant="outlined"
              label="تایید کلمه عبور"
              name="passwordConfrim"
              type="password"
              helperText={
                formik.errors["passwordConfrim"] &&
                formik.touched["passwordConfrim"] &&
                formik.errors["passwordConfrim"]
              }
              {...formik.getFieldProps("passwordConfrim")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            <STextField
              fullWidth
              error={formik.errors["code"] && formik.touched["code"]}
              variant="outlined"
              label="کد نظام پزشکی"
              name="code"
              type="text"
              helperText={
                formik.errors["code"] &&
                formik.touched["code"] &&
                formik.errors["code"]
              }
              {...formik.getFieldProps("code")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">تخصص</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              label="Age"
              onChange={(e) => {handleScale(e)}}
            >
            {doctorScale.map((item) => {
              return (
                <MenuItem value={item.id}>{item.name}</MenuItem>
              )
            } )}
          </Select>
        </FormControl>
          </Grid>
          <br />
          <Grid item md={12} xs={12}>
            <button
              className={styles.DoctorRegisterButton}
              disabled={!formik.isValid}
              type="submit"
            >
              ثبت نام
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DoctorRegister;
