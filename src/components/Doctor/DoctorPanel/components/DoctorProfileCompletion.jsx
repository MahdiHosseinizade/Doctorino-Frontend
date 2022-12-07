import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useFormik } from "formik";
// import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { provinces, educations, specialties } from "./Information";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
    
  },
  formHeader: {
    marginBottom: "1rem",
  },
  breakLine: {
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#000",
  },
  boxContainer: {
    marginBottom: "3rem",
  },
  box: {
    marginTop: "100px",
    marginBottom: "40px",
    marginLeft: "100px",
    marginRight: "100px",
    bgcolor: "rgb(245, 246, 248)",
    height: "87%",
    border: "1px solid black",
    borderRadius: "10px",
    // padding: "20px",
    paddingTop: "1.5rem",
    paddingBottom: "0.1rem",
    "& .MuiTextField-root": { m: 0 },
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
  },
});

const formValues = {
  firstName: "",
  lastName: "",
  idNumber: "",
  medicalSystemCode: "",
  phoneNumber: "",
  officeNumber: "",
  education: "",
  specialty: "",
  province: "",
  city: "",
  officeAddress: "",
};

export default function DoctorProfileCompletion() {
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({ ...formValues });
  const [errors, setErrors] = useState({ ...formValues });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
  const API = useAxios();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    // if (validateOnChange)
    //     validate({ [name]: value })
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("firstName" in fieldValues)
      temp.firstName = fieldValues.firstName ? "" : "نام خود را وارد کنید.";
    if ("lastName" in fieldValues)
      temp.lastName = fieldValues.lastName
        ? ""
        : "نام خانوادگی خود را وارد کنید.";
    if ("idNumber" in fieldValues)
      temp.idNumber = fieldValues.idNumber ? "" : "وارد کردن کد ملی الزامیست.";
    if ("medicalSystemCode" in fieldValues)
      temp.medicalSystemCode = fieldValues.medicalSystemCode
        ? ""
        : "وارد کردن کد نظام پزشکی الزامیست.";
    if ("phoneNumber" in fieldValues)
      temp.phoneNumber = fieldValues.phoneNumber
        ? ""
        : "شماره موبایل خود را وارد کنید.";
    if ("officeNumber" in fieldValues)
      temp.officeNumber = fieldValues.officeNumber
        ? ""
        : "وارد کردن شماره مطب الزامیست.";
    if ("education" in fieldValues)
      temp.education = fieldValues.education ? "" : "تحصیلات خود را مشخص کنید.";
    if ("specialty" in fieldValues)
      temp.specialty = fieldValues.specialty ? "" : "تخصص خود را مشخص کنید.";
    if ("province" in fieldValues)
      temp.province = fieldValues.province
        ? ""
        : "استان مورد نظر را انتخاب کنید.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "شهر مورد نظر را انتخاب کنید.";
    if ("officeAddress" in fieldValues)
      temp.officeAddress = fieldValues.officeAddress
        ? ""
        : "وارد کردن آدرس مطب ضروری است.";

    // if ("email" in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email)
    //     ? ""
    //     : "Email is not valid.";
    // if ("mobile" in fieldValues)
    //   temp.mobile =
    //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    // if ("departmentId" in fieldValues)
    //   temp.departmentId =
    //     fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  useEffect(() => {
    function fetchData() {
      console.log("this the user's id before anything goes wrong: ", user.user_id);
      API.get(
        // `http://127.0.0.1:8000/api/doctor/user_id_to_doctor_id/${user.user_id}/`,
        `/api/doctor/user_id_to_doctor_id/${user.user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
        .then((response) => {
          console.log("this is the response of doctor id", response.data);
          // API.get(`http://127.0.0.1:8000/api/doctor/${response.data.id}/`, {
            API.get(`/api/doctor/${response.data.id}/`, {
          headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          })
            .then((response) => {
              console.log("the response of doctor", response.data);
              setValues({ ...response.data });
              // setValues({
              //   firstName: response.data.user.first_name,
              //   lastName: response.data.user.last_name,
              //   idNumber: response.data.idNumber,
              //   medicalSystemCode: response.data.medicalSystemCode,
              //   phoneNumber: response.data.phoneNumber,
              //   officeNumber: response.data.officeNumber,
              //   education: response.data.education,
              //   specialty: response.data.specialty,
              //   province: response.data.province,
              //   city: response.data.city,
              //   officeAddress: response.data.officeAddress,
              // })
              console.log("this is the values of doctor", values);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [loading, API, authTokens.access, user.user_id, values]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log(values);
      console.log("button clicked");
      console.log("this is the user's id: ", user.user_id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.box} autoComplete="off">
      <Container className={classes.boxContainer}>
        <Grid>
          <Typography
            className={classes.formHeader}
            align="center"
            variant="h5"
            component="h5"
          >
            تکمیل اطلاعات پزشک
          </Typography>
        </Grid>

        <hr className={classes.breakLine} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام"
              variant="outlined"
              name="firstName"
              type="text"
              value={values.firstName}
              onChange={handleInputChange}
              fullWidth
              error={errors.firstName ? true : false}
              helperText={errors.firstName ? errors.firstName : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="نام خانوادگی"
              name="lastName"
              type="text"
              value={values.lastName}
              fullWidth
              onChange={handleInputChange}
              error={errors.lastName ? true : false}
              helperText={errors.lastName ? errors.lastName : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد ملی"
              name="idNumber"
              type="text"
              value={values.idNumber}
              onChange={handleInputChange}
              fullWidth
              error={errors.idNumber ? true : false}
              helperText={errors.idNumber ? errors.idNumber : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد نظام پزشکی"
              name="medicalSystemCode"
              type="text"
              value={values.medicalSystemCode}
              onChange={handleInputChange}
              fullWidth
              error={errors.medicalSystemCode ? true : false}
              helperText={
                errors.medicalSystemCode ? errors.medicalSystemCode : null
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره موبایل"
              name="phoneNumber"
              type="text"
              value={values.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              error={errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber ? errors.phoneNumber : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره تلفن مطب"
              name="officeNumber"
              type="text"
              value={values.officeNumber}
              onChange={handleInputChange}
              fullWidth
              error={errors.officeNumber ? true : false}
              helperText={errors.officeNumber ? errors.officeNumber : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>تحصیلات پزشک</InputLabel>
              <Select
                label="تحصیلات پزشک"
                name="education"
                value={values.education}
                onChange={handleInputChange}
                error={errors.education ? true : false}
                helperText={errors.education ? errors.education : null}
              >
                {/* {educations.map((education) => (
                  <MenuItem>{education}</MenuItem>
                ))} */}
                <MenuItem value={1}>عمومی</MenuItem>
                <MenuItem value={2}>متخصص</MenuItem>
                <MenuItem value={3}>فوق تخصص</MenuItem>
                <MenuItem value={4}>کارشناس</MenuItem>
                <MenuItem value={5}>مشاور</MenuItem>
                <MenuItem value={6}>کارشناس ارشد</MenuItem>
                <MenuItem value={7}>فلوشیپ</MenuItem>
                <MenuItem value={8}>دکترا</MenuItem>
                <MenuItem value={9}>سایر</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>تخصص</InputLabel>
              <Select
                label="تخصص"
                name="specialty"
                value={values.specialty}
                onChange={handleInputChange}
                error={errors.specialty ? true : false}
                helperText={errors.specialty ? errors.specialty : null}
              >
                <MenuItem value={1}>آسیب شناسی</MenuItem>
                <MenuItem value={2}>جراحی کودکان</MenuItem>
                <MenuItem value={3}>سونوگرافی</MenuItem>
                <MenuItem value={4}>ارتوپدی کودکان</MenuItem>
                <MenuItem value={5}>نفرولوژی</MenuItem>
                <MenuItem value={6}>جراحی سر و گردن</MenuItem>
                <MenuItem value={7}>جراحی سرطان</MenuItem>
                <MenuItem value={8}>زنان، زایمان و نازایی</MenuItem>
                <MenuItem value={9}>بهداشت خانواده</MenuItem>
                <MenuItem value={10}>سایر</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>استان</InputLabel>
              <Select
                // onChange={(e) => {
                //   setDoctor({
                //     ...doctor,
                //     province: provinces.find((p) => {
                //       if (p.id === e.target.value) {
                //         return p.name;
                //       }
                //     })["name"],
                //   });
                // }}
                // onChange={(e) => {
                //   setDoctor({
                //     ...doctor,
                //     province: provinces.find((p) => p.id === e.target.value),
                //   });
                // }}

                name="province"
                label="استان"
                value={values.province}
                onChange={handleInputChange}
                error={errors.province ? true : false}
                helperText={errors.province ? errors.province : null}
              >
                {provinces.map((province) => (
                  <MenuItem value={province.id}>{province.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>شهر</InputLabel>
              <Select
                // onChange={(e) => {
                //   setDoctor({ ...doctor, city: e.target.value });
                // }}
                label="شهر"
                name="city"
                value={values.city}
                onChange={handleInputChange}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city : null}
              >
                <MenuItem value={1}>تهران</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              // onChange={(e) => {
              //   setDoctor({ ...doctor, address: e.target.value });
              // }}
              variant="outlined"
              label="آدرس مطب"
              name="officeAddress"
              type="text"
              value={values.officeAddress}
              onChange={handleInputChange}
              error={errors.officeAddress ? true : false}
              helperText={errors.officeAddress ? errors.officeAddress : null}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>

          <Grid item md={12} xs={12}>
            {/* <Button
              className={classes.button}
              type="submit"
              variant="contained"
              // onClick={formik.handleSubmit}
              // onClick={(values, e) => {
              //   // e.preventDefault();
              //   setDoctor({ ...values });
              //   // history.push("/doctor-panel");
              // }}
            >
              ذخیره اطلاعات
            </Button> */}
            <button 
            className={classes.button}
            type="submit"
            >ذخیره اطلاعات</button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
