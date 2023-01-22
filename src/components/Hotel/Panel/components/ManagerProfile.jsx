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
  social_number: "",
  gender: "",
  first_phone_number: "",
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
  social_number: Yup.string().required("کد ملی ضروری است").min(10, 'کد ملی باید 10 رقم باشد').max(10, 'کد ملی باید 10 رقم باشد'),
  gender: Yup.string().required('جنسیت ضروری است'),
  area_code: Yup.string(),
  telephone_number: Yup.string(),
  address: Yup.string(),
  birthDay: Yup.string().required("روز تولد ضروری است"),
  birthMonth: Yup.string().required("ماه تولد ضروری است"),
  birthYear: Yup.string().required("سال تولد ضروری است"),
  shaba_code: Yup.string().required("شماره شبا ضروری است").min(12, "شماره شبا  باید حداقل 12 رقم باشد"),
});



export default function ManagerProfile(props) {
  const [ownerInfos, setOwnerInfos] = useState({ ...formValue });
  const [hotel, setHotel] = useState([]);
  const [gender, setGender] = useState([]);
  const [day, setDay] = useState([]);
  const [month, setMonth] = useState([]);
  const [year, setYear] = useState([]);
  const [loading, setLoading] = useState(true);

  let { user, authData, logoutUser } = useContext(AuthContext);
  let api = useAxios();

  function fetchData() {
    api
      .get(`api/hotel/owner/${authData["child-id"]}/`, {
        headers: {
          Authorization: "Bearer " + authData?.access,
        },
      })

      .then((response) => {

        const {
          user: {
            first_name,
            last_name,
            email,
            username,
          },
          father_name,
          gender,
          first_phone_number,
          area_code,
          telephone_number,
          address,
          birth_day,
          shaba_code,
          social_number,
        } = response.data;

        setOwnerInfos({
          ...ownerInfos,
          first_name: first_name,
          last_name: last_name,
          email: email,
          username:  username,
          father_name: father_name,
          gender: gender,
          first_phone_number: first_phone_number,
          area_code: area_code,
          telephone_number: telephone_number,
          address: address,
          birth_day: birth_day,
          shaba_code: shaba_code,
          social_number: social_number,
        });

        if (first_name) {
          formik.setFieldValue("first_name", first_name);
        }
        if (last_name) {
          formik.setFieldValue("last_name", last_name);
        }
        if (father_name) {
          formik.setFieldValue("father_name", father_name);
        }
        if (social_number) {
          formik.setFieldValue("social_number", social_number);
        }
        if (gender != null) {
          setGender(gender)
          formik.setFieldValue("gender", gender);
        }
        if (first_phone_number) {
          formik.setFieldValue("first_phone_number", first_phone_number);
        }
        if (area_code) {
          formik.setFieldValue("area_code", area_code);
        }
        if (telephone_number) {
          formik.setFieldValue("telephone_number", telephone_number);
        }
        if (address) {
          formik.setFieldValue("address", address);
        }
        if (birth_day) {
          let [year, month, day] = birth_day.split("-");

          setDay(parseInt(day))
          formik.setFieldValue("birthDay", parseInt(day));

          setMonth(months[month-1]);
          formik.setFieldValue("birthMonth", months[month-1]);

          setYear(parseInt(year));
          formik.setFieldValue("birthYear", parseInt(year));
        }
        if (shaba_code) {
          formik.setFieldValue("shaba_code", shaba_code);
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (loading) {
      fetchData();
    }

  }, [loading, ownerInfos]);


  const reHandleDay = (e) => {
    setDay(e.target.value);
    formik.setFieldValue("birthDay", e.target.value)
  };


  const reHandleMonth = (e) => {
    setMonth(e.target.value);
    formik.setFieldValue("birthMonth", e.target.value)
  };


  const reHandleYear = (e) => {
    setYear(e.target.value);
    formik.setFieldValue("birthYear", e.target.value)
  };


  const genders = ["مذکر", "مونث",];

  const formik = useFormik({
    initialValues: formValue,

    onSubmit: (values) => {

      let send_data = {
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: ownerInfos.email,
          username: ownerInfos.username,
        },
        first_phone_number: values.first_phone_number,
        gender: values.gender,
        social_number: values.social_number,
        father_name: values.father_name,
        area_code: values.area_code,
        telephone_number: values.telephone_number,
        address: values.address,
        birth_day: `${values.birthYear}-${months.indexOf(values.birthMonth) + 1}-${values.birthDay}`,
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
                error={formik.errors["gender"] && formik.touched["gender"]}
                {...formik.getFieldProps('gender')}
                input={<OutlinedInput label="جنسیت" />}
              >
                <MenuItem value={0}>
                  <ListItemText primary="مرد" />
                </MenuItem>
                <MenuItem value={1}>
                  <ListItemText primary="زن" />
                </MenuItem>
                <MenuItem value={2}>
                  <ListItemText primary="سایر" />
                </MenuItem>
              </SSelect>
            </SFormControl>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <STextField
              fullWidth
              error={
                formik.errors["social_number"] && formik.touched["social_number"]
              }
              variant="outlined"
              label="کد ملی"
              name="social_number"
              type="text"
              helperText={
                formik.touched["social_number"] && formik.errors["social_number"]
              }
              {...formik.getFieldProps("social_number")}
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
                value={formik.values["birthDay"]}
                label="روز تولد"
                onChange={reHandleDay}
                error={formik.errors["birthDay"] && formik.touched["birthDay"]}
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
                value={formik.values["birthMonth"]}
                label="ماه تولد"
                onChange={reHandleMonth}
                error={
                  formik.errors["birthMonth"] && formik.touched["birthMonth"]
                }
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
                value={formik.values["birthYear"]}
                label="سال تولد"
                onChange={reHandleYear}
                error={
                  formik.errors["birthYear"] && formik.touched["birthYear"]
                }
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
