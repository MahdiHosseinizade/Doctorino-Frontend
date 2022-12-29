import React from 'react'
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Box, Button, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';
import AuthContext from '../../../../context/AuthContext';
import { useContext } from 'react';
import useAxios from '../../../../utils/useAxios';
import { useEffect } from 'react';
import moment from "jalali-moment";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import "./Profile.css";

const STextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    background: "#fefefe"
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe"
  },
  spellCheck: false,
})

const SSelect = styled(Select)({
  background: "#fefefe"
})

const formValue = {
  first_name: "",
  last_name: "",
  father_name: "",
  sex: "",
  social_number: "", // code meli
  sex: "",
  phone_number: "", // شماره موبایل
  birth_day: "1200/01/01",
};

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  father_name: Yup.string(),
  social_number: Yup.string(),
  sex: Yup.string(),
  phone_number: Yup.string(),
  birth_day: Yup.string(),
});


const Profile = () => {

  const { authTokens, user } = useContext(AuthContext);
  const [birthDay, setBirthDay] = useState({day: 26, month: 10, year: 1401});
  const [loading, setLoading] = useState(true);
  const [usr, setUsr] = useState(null);
  const api = useAxios();

  const fetchData = () => {
    if (loading) {
      api.get(`/api/auth/new-user/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })
        .then(async (res) => {
          setUsr(res.data);
          console.log(res.data);
          if (res.data.first_name) {
            formik.setFieldValue("first_name", res.data.first_name);
          }
          if (res.data.last_name) {
            formik.setFieldValue("last_name", res.data.last_name);
          }
          if (res.data.code_melli) {
            formik.setFieldValue("social_number", res.data.code_melli);
          }
          if (res.data.phone_number) {
            formik.setFieldValue("phone_number", res.data.phone_number);
          }

          let date = moment(res.data.birth_day);
          date = date.format("jYYYY-jM-jD");
          formik.setFieldValue("birth_day", date);
          // setBirthDay(date);


          if (res.data.birth_day) {
            console.log("birth day setting");

          }

          if (res.data.gender != null) {
            formik.setFieldValue("sex", res.data.gender)
          }
          setLoading(false);
        })
    }

    // console.log("use state", birthDay);
    // console.log(formik.values);
    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 2000);

    return () => clearInterval(id);

  }, [loading, usr, birthDay])

  function handleDatePicker(e) {
    console.log(e);
    // setBirthDay({day: 26, month: 10, year: 1402});
    // let date = moment(`${e.year}/${e.month}/${e.day}`);
    // date = date.format("jYYYY-jM-jD");
    // formik.setFieldValue("birth_day", date);
    // console.log(formik.values["birth_day"]);
  }

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values) => {
      setUsr((prev) => (
        {
          ...prev,
          "first_name": values.first_name,
          "last_name": values.last_name,
          "code_melli": values.social_number,
          "birth_day": values.birth_day,
          "gender": values.sex,
          "phone_number": values.phone_number,
        }
      ))

      api.put(`/api/auth/new-user/${user.user_id}/`,
        usr, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })
        .then(res => toast.success('اطلاعات با موفقیت ثبت شد', {
          position: "top-right",
          autoClose: 2000,
        }))
        .catch(err => toast.error('خطایی رخ داده است', {
          position: "top-right",
          autoClose: 2000,
        }))
    },
    validationSchema: validationSchema,
  });

  return (
    <Container sx={{
      mr: 10,
      ml: 10
    }}>
      <Box
        sx={{
          marginTop: "200px",
          bgcolor: "rgb(245, 246, 248)",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0.5 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
        onSubmit={formik.handleSubmit}
        component="form"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
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
                formik.touched["first_name"] &&
                formik.errors["first_name"]
              }
              {...formik.getFieldProps("first_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["last_name"] && formik.touched["last_name"]
              }
              variant="outlined"
              label="نام خانوادگی"
              name="last_name"
              type="text"
              helperText={
                formik.touched["last_name"] &&
                formik.errors["last_name"]
              }
              {...formik.getFieldProps("last_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
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
                formik.touched["father_name"] &&
                formik.errors["father_name"]
              }
              {...formik.getFieldProps("father_name")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>جنسیت</InputLabel>
              <SSelect
                error={formik.errors["sex"] && formik.touched["sex"]}
                {...formik.getFieldProps('sex')}
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
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["social_number"] && formik.touched["social_number"]
              }
              variant="outlined"
              label="شماره ملی"
              name="social_number"
              type="text"
              helperText={
                formik.touched["social_number"] &&
                formik.errors["social_number"]
              }
              {...formik.getFieldProps("social_number")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["phone_number"] && formik.touched["phone_number"]
              }
              variant="outlined"
              label="شماره موبایل"
              name="phone_number"
              type="text"
              helperText={
                formik.touched["phone_number"] &&
                formik.errors["phone_number"]
              }
              {...formik.getFieldProps("phone_number")}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {/* <DatePicker timePicker={false} value={birthDay} onClickSubmitButton={handleDatePicker} /> */}
            <DatePicker
              inputPlaceholder='تاریخ تولد'
              value={birthDay}
              colorPrimary="#3f51b5"
              colorPrimaryLight='#757ce8'
              onChange={setBirthDay}
              shouldHighlightWeekends
              locale="fa"
              calendarPopperPosition='auto'
              calendarSelectedDayClassName='selected-day'
              calendarClassName='custom-calendar'
            />
          </Grid>
          <Grid item md={12} sx={{
            marginTop: 4,
          }}>
            <Button fullWidth variant="contained" color="primary" type="submit" disabled={!(formik.isValid)}>ذخیره</Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Profile;
