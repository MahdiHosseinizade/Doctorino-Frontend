import { useFormik } from "formik";
import Input from "../../common/Input";
import styles from "./doctor.module.css";
import * as Yup from "yup";
// import Select from 'react-select';
import { useState } from "react";
import { Grid, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { getDoctorScale } from "../../../services/getDoctorScale";
import { postDoctorRegister } from "../../../services/postDocotorRegister";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

const value = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  passwordConfrim: "",
  scale: [],
  code: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
  password: Yup.string().required("کلمه عبور را وارد کنید"),
  passwordConfrim: Yup.string()
    .required("تایید کلمه عبور را وارد کنید")
    .oneOf([Yup.ref("password"), null], "کلمه عبور مطابقت ندارد"),
  scale: Yup.string().required("تخصص را وارد کنید"),
  code: Yup.string().required("کد نظام پزشکی را وارد کنید"),
  first_name: Yup.string().required("نام را وارد کنید"),
  last_name: Yup.string().required("نام خانوادگی را وارد کنید"),
});

const STextField = styled(TextField)({
  "& .MuiFilledInput-root": {
      background: "#fefefe"
  },
  "& .MuiOutlinedInput-root": {
      background: "#fefefe"
  },
  spellCheck: false,
})

const DoctorRegister = () => {
  const [scale, setscale] = useState("پزشک عمومی");
  const [doctor, setDoctor] = useState({ ...value });
  const [doctorScale, setDoctorScale] = useState(null);
  const [error, setError] = useState("Ooops !!!!");
  
  const history = useHistory();
  useEffect(() => {
    getdoctorScale();
  }, []);

  // console.log(doctorScale);

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
  const setScale = (e) => {
    // console.log(e);
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
      const is_doctor = false ; 
      const user = {user:{first_name : doctor.first_name , last_name:doctor.last_name,email:doctor.email,password:doctor.password},specialties:[parseFloat(doctor.scale)],medical_system_number:(doctor.code).toString(),is_doctor:true}
      postDoctorRegister(user)
      .then((res) => {
        history.push('/')
        setDoctor(user);
        toast.success("ثبت نام با موفقیت انجام شد",{
          position: "top-right",
          autoClose: 4000,
        });
      })
      .catch((err) => {         
          if (err.response.data.email){
            toast.error('ایمیل وارد شده تکراری است', {
              position: "top-right",
              autoClose: 3000,
            })
          }
          else if (err.response.data.medical_system_number){
            toast.error('کد نظام پزشکی تکراری است', {
              position: "top-right",
              autoClose: 3000,
            })
          }
      });
  };


  
  
  

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
            {/* <TextField 
              onChange={(e) => {
                setDoctor({ ...doctor, first_name: e.target.value });
              }}
              label="نام"
              variant="outlined"
              name="fisrt_name"
              type="text"
              fullWidth
              required
            /> */}
            <STextField
                  // id="first_name"
                  fullWidth
                  error={
                    formik.errors["first_name"] && formik.touched["first_name"] 
                  }
                  variant="filled"
                  label="نام"
                  name="first_name"
                  type="text"
                  helperText={ formik.errors["first_name"] && formik.touched["first_name"] && formik.errors["first_name"]}
                  {...formik.getFieldProps("first_name")}                  
            />
            {/* <Input placeholder="نام" name="first_name" formik={formik} type="text" /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <TextField
              onChange={(e) => {
                setDoctor({ ...doctor, last_name: e.target.value });
              }}
              label="نام خانوادگی"
              variant="outlined"
              name="last_name"
              type="text"
              fullWidth
              required
            /> */}
            <STextField
                  fullWidth
                  error={
                    formik.errors["last_name"] && formik.touched["last_name"] 
                  }
                  variant="filled"
                  label="نام خانوادگی"
                  name="last_name"
                  type="text"
                  helperText={ formik.errors["last_name"] && formik.touched["last_name"] && formik.errors["last_name"]}
                  {...formik.getFieldProps("last_name")}
                />
            {/* <Input placeholder="نام خانوادگی" name="last_name" formik={formik} type="text" /> */}
          </Grid>
          <Grid item md={12} xs={12}>
            {/* <TextField
              onChange={(e) => {
                setDoctor({ ...doctor, email: e.target.value });
              }}
              label="ایمیل"
              variant="outlined"
              name="email"
              type="email"
              fullWidth
              required   */}
              {/* add  validation */}
               

            {/*  /> */}
            {/* <Input placeholder="ایمیل" name="email" formik={formik} type="email" /> */}
            <STextField 
                fullWidth
                error={
                  formik.errors["email"] && formik.touched["email"] 
                }
                variant="filled"
                label="ایمیل"
                name="email"
                type="text"
                helperText={ formik.errors["email"] && formik.touched["email"] && formik.errors["email"]}
                {...formik.getFieldProps("email")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              placeholder="کلمه عبور"
              name="password"
              formik={formik}
              type="password"
            /> */}
            <STextField 
                fullWidth
                error={
                  formik.errors["password"] && formik.touched["password"] 
                }
                variant="filled"
                label="کلمه عبور"
                name="password"
                type="password"
                helperText={ formik.errors["password"] && formik.touched["password"] && formik.errors["password"]}
                {...formik.getFieldProps("password")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              placeholder="تایید کلمه عبور"
              name="passwordConfrim"
              formik={formik}
              type="password"
            /> */}
            <STextField 
                fullWidth
                error={
                  formik.errors["passwordConfrim"] && formik.touched["passwordConfrim"] 
                }
                variant="filled"
                label="تایید کلمه عبور"
                name="passwordConfrim"
                type="password"
                helperText={ formik.errors["passwordConfrim"] && formik.touched["passwordConfrim"] && formik.errors["passwordConfrim"]}
                {...formik.getFieldProps("passwordConfrim")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              placeholder="کد نظام پزشکی"
              name="code"
              formik={formik}
              type="number"
            /> */}
              {/* Textfield tag that user just can enter number */}
            <STextField 
                fullWidth
                error={
                  formik.errors["code"] && formik.touched["code"] 
                }
                variant="filled"
                label="کد نظام پزشکی"
                name="code"
                type="text"
                helperText={ formik.errors["code"] && formik.touched["code"] && formik.errors["code"]}
                {...formik.getFieldProps("code")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
              {/* add placeholder to the select */}
              <select
                onChange={(e) => setScale(e)}
                placeholder="تخصص"
                className={styles.selectDocotorOption}
                name="code" 
                id="code"
                {...formik.getFieldProps("scale")}
              >
                {doctorScale &&
                  doctorScale.map((item) => (
                    <option value={item.id}>{item.name}</option>
                  ))}
              </select>
          </Grid>
          <br />
          <Grid item md={12} xs={12}>
            <button className={styles.DoctorRegisterButton} disabled={!formik.isValid} type="submit">
              ثبت نام
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default DoctorRegister;
