import React, { useContext, useEffect } from "react";
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
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
  Input,
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { styled, border } from "@mui/system";
import useAxios from "../../../../utils/useAxios";
import AuthContext from "../../../../context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";
import { baseURL } from "../../../../utils/useAxios";
import theme from "../../../../assets/theme/defaultTheme";
import { set } from "date-fns-jalali";
import years from "./years";
import months from "./months";
import days from "./days";

const SMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: theme.palette.hotel.light,
  },
  // style when selected
  "&.Mui-selected": {
    backgroundColor: theme.palette.hotel.light,
  },
  "&.Mui-selected:hover": {
    backgroundColor: "transparent",
  },
});

const SFormControl = styled(FormControl)({
  "& .MuiOutlinedInput-root": {
    // set the color of the input when focused
    "&:hover fieldset": {
      borderColor: theme.palette.hotel.main,
    },
  },

  // focused style
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.hotel.main,
    borderWidth: "1px",
  },
  // set the label color when focused
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
  },
  // style the dropdown icon
  "& .MuiSelect-icon": {
    color: theme.palette.hotel.contrastText,
    backgroundColor: theme.palette.hotel.main,
    borderRadius: "50%",
  },
});

const STextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
  },
  "& .MuiFilledInput-root": {
    background: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
    "&:hover fieldset": {
      borderColor: theme.palette.hotel.main,
    },
  },
  // style when focused
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.hotel.main,
  },

  spellCheck: false,
});

const SSelect = styled(Select)({
  background: "#fefefe",
});

const formValue = {
  first_name: "",
  last_name: "",
  father_name: "",
  national_code: "",
  gender: "",
  first_phone_number: "",
  second_phone_number: "",
  area_code: "",
  telephone_number: "", 
  address: "",
  birthDay: "",
  birthMonth: "",
  birthYear: "",
  shaba_code: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string().required("نام ضروری است"),
  last_name: Yup.string().required("نام خانوادگی ضروری است"),
  father_name: Yup.string().required("نام پدر ضروری است"),
  national_code: Yup.string().required("کد ملی ضروری است").min(10, 'کد ملی باید 10 رقم باشد').max(10, 'کد ملی باید 10 رقم باشد'),
  gender: Yup.string().required('جنسیت ضروری است'),
  second_phone_number: Yup.string().min(11, 'تلفن همراه باید 11 رقم باشد').max(11, 'تلفن همراه باید 11 رقم باشد'),
  area_code: Yup.string(),
  telephone_number: Yup.string(),
  address: Yup.string(),
  birthDay: Yup.string().required("روز تولد ضروری است"),
  birthMonth: Yup.string().required("ماه تولد ضروری است"),
  birthYear: Yup.string().required("سال تولد ضروری است"),
  shaba_code: Yup.string().required("شماره شبا ضروری است").min(12, "شماره شبا  باید حداقل 12 رقم باشد"),
});



export default function ManagerProfile(props) {
  const [ownerInfos, setOwnerInfos] = useState({ ...formValue});
  const [hotel, setHotel] = useState([]);
  const [gender, setGender] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [loading, setLoading] = useState(true);
  let recieved_values = {};

  let { user, authData, logoutUser } = useContext(AuthContext);
  let api = useAxios();

  useEffect(() => {
    function fetchData() {
      api
        .get(`api/hotel/owner/${authData["child-id"]}/`, {
          headers: {
            Authorization: "Bearer " + authData?.access,
          },
        })
        
        .then((response) => {
          setOwnerInfos({
            ...ownerInfos,
            first_name: response.data.user.first_name,
            last_name: response.data.user.last_name,
            email: response.data.user.email,
            username:  response.data.user.username,
            father_name: response.data.father_name,
            gender: response.data.gender,
            first_phone_number: response.data.first_phone_number,
            second_phone_number: response.data.second_phone_number,
            area_code: response.data.area_code,
            telephone_number: response.data.telephone_number,
            address: response.data.address,
            birth_day: response.data.birth_day,
            shaba_code: response.data.shaba_code,
            national_code: response.data.national_code,
          });

          recieved_values = response.data;
          setOwnerFileds()
          setLoading(false);
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
  }, [api, authData, loading, ownerInfos]);


  const reHandleGender = (e) => {
    setGender(e.target.value);
  };

  const reHandleDay = (e) => {
    setDay(e.target.value);
  };


  const reHandleMonth = (e) => {
    setMonth(e.target.value);
  };


  const reHandleYear = (e) => {
    setYear(e.target.value);
  };


  const genders = ["مذکر", "مونث", ];

  const formik = useFormik({
    initialValues: formValue,

    onSubmit: (values) => {
    
      let send_data ={
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: ownerInfos.email,
          username: ownerInfos.username,
        },
        first_phone_number: values.first_phone_number,
        gender: genders.indexOf(values.gender),
        national_code: values.national_code,
        father_name: values.father_name,
        area_code: values.area_code,
        telephone_number: values.telephone_number,
        address: values.address,
        birth_day: `${values.birthYear}-${months.indexOf(values.birthMonth)+1}-${values.birthDay}`,
        shaba_code: values.shaba_code,
      }

      api
        .put(`/api/hotel/owner/${authData["child-id"]}/`, send_data, {
          headers: {
            Authorization: "Bearer " + authData?.access,
          },
          
        })
        .then((res) => {
          toast.success("اطلاعات با موفقیت ثبت شد", {
            position: "top-right",
            autoClose: 2000,
          });
          setOwnerInfos({
            ...ownerInfos,
            first_name: send_data.user.first_name,
            last_name: send_data.user.last_name,
            email: send_data.user.email,
            username:  send_data.user.username,
            father_name: send_data.father_name,
            gender: send_data.gender,
            first_phone_number: send_data.first_phone_number,
            second_phone_number: send_data.second_phone_number,
            area_code: send_data.area_code,
            telephone_number: send_data.telephone_number,
            address: send_data.address,
            birth_day: send_data.birth_day,
            shaba_code: send_data.shaba_code,
            national_code: send_data.national_code,
          });
          setOwnerFileds()
          setLoading(true);
        })
        // .catch((err) =>
        //   toast.error("مشکلی پیش آمده", {
        //     position: "top-right",
        //     autoClose: 2000,
        //   })
        // )
        ;
    },

    validationSchema: validationSchema,
  });

  const setOwnerFileds = () => 
  {
    if(recieved_values.user.first_name){
      formik.setFieldValue("first_name", recieved_values.user.first_name);
    }
    if(recieved_values.user.last_name){
      formik.setFieldValue("last_name", recieved_values.user.last_name);
    }
    if(recieved_values.father_name){
      formik.setFieldValue("father_name", recieved_values.father_name);
    }
    if(recieved_values.national_code){
      formik.setFieldValue("national_code", recieved_values.national_code);
    }
    if(recieved_values.gender){
      setGender(recieved_values.gender)
      formik.setFieldValue("gender", gender);
    }
    if(recieved_values.first_phone_number){
      formik.setFieldValue("first_phone_number", recieved_values.first_phone_number);
    }
    if(recieved_values.area_code){
      formik.setFieldValue("area_code", recieved_values.area_code);
    }
    if(recieved_values.telephone_number){
      formik.setFieldValue("telephone_number", recieved_values.telephone_number);
    }
    if(recieved_values.address){
      formik.setFieldValue("address", recieved_values.address);
    }
    if(recieved_values.birthDay){
      setDay(recieved_values.birthDay)
      formik.setFieldValue("birthDay", day);
    }
    if(recieved_values.birthMonth){
      setMonth(recieved_values.birthMonth)
      formik.setFieldValue("birthMonth", month);
    }
    if(recieved_values.birthYear){
      setYear(recieved_values.birthYear)
      formik.setFieldValue("birthYear", year);
    }
    if(recieved_values.shaba_code){
      formik.setFieldValue("shaba_code", recieved_values.shaba_code);
    }
    
  }

  return (
    <Container>
      <Box
        onSubmit={formik.handleSubmit}
        component="form"
        // autoComplete="off"
        mt={5}
        sx={{
          bgcolor: "rgb(245, 246, 248)",
          height: "80%",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0.5 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            margin: "10px",
          }}
          variant="h5"
        >
          پروفایل کاربری
        </Typography>

        <hr width="100%" style={{ margin: 10 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: "error.main",
                width: "20%",
                display: "flex",
              }}
            >
              <p>مشخصات فردی&nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={formik.errors["first_name"] && formik.touched["first_name"]}
              variant="outlined"
              label="نام"
              name="first_name"
              type="text"
              helperText={
                formik.touched["first_name"] && formik.errors["first_name"]
              }
              {...formik.getFieldProps("first_name")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={formik.errors["last_name"] && formik.touched["last_name"]}
              variant="outlined"
              label="نام خانوادگی"
              name="last_name"
              type="text"
              helperText={
                formik.touched["last_name"] && formik.errors["last_name"]
              }
              {...formik.getFieldProps("last_name")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["father_name"] && formik.touched["father_name"]
              }
              variant="outlined"
              label="نام پدر"
              name="father_name"
              type="text"
              helperText={
                formik.touched["father_name"] && formik.errors["father_name"]
              }
              {...formik.getFieldProps("father_name")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SFormControl fullWidth>
              <InputLabel>جنسیت</InputLabel>
              <SSelect
                required
                // defaultValue={0}
                value={gender}
                label="جنسیت"
                onChange={reHandleGender}
                error={formik.errors["gender"] && formik.touched["gender"]}
                {...formik.getFieldProps("gender")}
              >
                {genders.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["national_code"] && formik.touched["national_code"]
              }
              variant="outlined"
              label="کد ملی"
              name="national_code"
              type="text"
              helperText={
                formik.touched["national_code"] && formik.errors["national_code"]
              }
              {...formik.getFieldProps("national_code")}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["first_phone_number"] &&
                formik.touched["first_phone_number"]
              }
              variant="outlined"
              label="تلفن همراه اول"
              name="first_phone_number"
              type="text"
              helperText={
                formik.touched["first_phone_number"] &&
                formik.errors["first_phone_number"]
              }
              {...formik.getFieldProps("first_phone_number")}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <SFormControl fullWidth>
              <InputLabel>روز تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={day}
                label="روز تولد"
                onChange={reHandleDay}
                error={formik.errors["birthDay"] && formik.touched["birthDay"]}
                {...formik.getFieldProps("birthDay")}
              >
                {days.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={days.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <SFormControl fullWidth>
              <InputLabel>ماه تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={month}
                label="ماه تولد"
                onChange={reHandleMonth}
                error={
                  formik.errors["birthMonth"] && formik.touched["birthMonth"]
                }
                {...formik.getFieldProps("birthMonth")}
              >
                {months.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={months.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12} md={4}>
            <SFormControl fullWidth>
              <InputLabel>سال تولد</InputLabel>
              <SSelect
                required
                defaultValue={0}
                value={year}
                label="سال تولد"
                onChange={reHandleYear}
                error={
                  formik.errors["birthYear"] && formik.touched["birthYear"]
                }
                {...formik.getFieldProps("birthYear")}
              >
                {years.map((feat, ind) => (
                  <MenuItem key={ind} value={feat}>
                    {/* <Checkbox checked={years.indexOf(feat) > -1} /> */}
                    <ListItemText primary={feat} />
                  </MenuItem>
                ))}
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: `${theme.palette.hotel.main}`,
                width: "20%",
                display: "flex",
              }}
            >
              <p>اطلاعات محل اسکان &nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={formik.errors["area_code"] && formik.touched["area_code"]}
              variant="outlined"
              label="کد شهرستان"
              name="area_code"
              type="text"
              helperText={
                formik.errors["area_code"] && formik.touched["area_code"]
              }
              {...formik.getFieldProps("area_code")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["telephone_number"] &&
                formik.touched["telephone_number"]
              }
              variant="outlined"
              label="تلفن ثابت"
              name="telephone_number"
              type="text"
              helperText={
                formik.errors["telephone_number"] &&
                formik.touched["telephone_number"]
              }
              {...formik.getFieldProps("telephone_number")}
            />
          </Grid>

          <Grid item xs={12}>
            <STextField
              fullWidth
              error={formik.errors["address"] && formik.touched["address"]}
              variant="outlined"
              label="آدرس"
              name="address"
              type="text"
              helperText={formik.errors["address"] && formik.touched["address"]}
              {...formik.getFieldProps("address")}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              ml={1}
              sx={{
                borderBottom: 1,
                boredrColor: "error.main",
                width: "20%",
                display: "flex",
              }}
            >
              <p>تکمیل حساب بانکی&nbsp;&nbsp;&nbsp;</p>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={formik.errors["shaba_code"] && formik.touched["shaba_code"]}
              variant="outlined"
              label="شماره شبا"
              name="shaba_code"
              type="text"
              helperText={formik.errors["shaba_code"] && formik.touched["shaba_code"]}
              {...formik.getFieldProps("shaba_code")}
            />
          </Grid>
          <Grid item xs={12} sx={{ marginTop: "20px" }}>
            <Button
              type="submit"
              disabled={!(formik.isValid)}
              variant="contained"
              color="hotel"
              style={{ fontSize: "15px" }}
            >
              ثبت اطلاعات
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

// *new:
// disable button
// year,...
// map in year,...

// failiures:
// 1. sselect ha ke chackbox nadarand entekhab nemishavand
