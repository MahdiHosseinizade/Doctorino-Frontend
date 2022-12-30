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
import cities from "../../../../db/Cities.js";
import provinces from "../../../../db/Provinces";


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
  province: "",
  city: "",
  sex: "",
  social_number: "", // code meli
  phone_number: "", // شماره موبایل
  birth_day: "1200/01/01",
};

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  province: Yup.number(),
  city: Yup.number(),
  social_number: Yup.string().length(10, "کد ملی باید 10 رقم باشد"),
  sex: Yup.string(),
  phone_number: Yup.string(),
  birth_day: Yup.string(),
});


const Profile = () => {

  const { authData, user } = useContext(AuthContext);
  const [birthDay, setBirthDay] = useState({ day: 26, month: 10, year: 1401 });
  const [toShow, setToShow] = useState("");
  const [citiesToShow, setCitiesToShow] = useState([]);
  const [provincesToShow, setProvincesToShow] = useState([]);
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(true);
  const [usr, setUsr] = useState(null);
  const api = useAxios();

  async function setCitiesByProvince(province) {
    const citiesLST = cities.filter((city) => city.province_id === province);
    setCitiesToShow(citiesLST);
  }

  const handleProvince = (event) => {
    const value = event.target.value;
    setProvince(value);

    const province = provinces.find((province) => province.id === value);
    formik.setFieldValue("province", province.id);

    setCitiesByProvince(value);
  }

  const handleCity = (event) => {
    const value = event.target.value;
    setCity(value);

    const city = cities.find((city) => city.id === value);
    formik.setFieldValue("city", city.id);
  }

  const fetchData = async () => {
    if (loading) {
      await api.get(`/api/auth/patient/${user.child_id}/`, {
        headers: {
          Authorization: `Bearer ${authData?.access}`
        }
      })
        .then(async (res) => {
          setUsr(res.data);

          const {
            province,
            city,
          } = res.data;

          if (res.data.user?.first_name) {
            formik.setFieldValue("first_name", res.data.user.first_name);
          }
          if (res.data.user?.last_name) {
            formik.setFieldValue("last_name", res.data.user.last_name);
          }

          if (province) {
            const provinceObj = provinces.find(prov => prov.name === province);
            if (provinceObj) {
              setCitiesByProvince(provinceObj.id);
              setProvince(provinceObj.id);
              formik.setFieldValue("province", provinceObj.id);
            }
          }

          if (city && citiesToShow.length > 0) {
            const cityObj = citiesToShow.find(cty => cty.name === city);
            if (cityObj) {
              setCity(cityObj.id);
              formik.setFieldValue("city", cityObj.id);
            }
          }
          if (res.data.code_melli) {
            formik.setFieldValue("social_number", res.data.code_melli);
          }
          if (res.data.phone_number) {
            formik.setFieldValue("phone_number", res.data.phone_number);
          }

          if (res.data.birth_day) {
            let date = res.data.birth_day.split("-");
            formik.setFieldValue("birth_day", res.data.birth_day);
            setBirthDay({ day: parseInt(date[2]), month: parseInt(date[1]), year: parseInt(date[0]) });
          }

          if (res.data.gender != null) {
            formik.setFieldValue("sex", res.data.gender)
          }
          setLoading(false);
        })
    }

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      setProvincesToShow(provinces);
      fetchData();
    }

  }, [loading, usr, birthDay, fetchData])

  function handleDatePicker(e) {
    setBirthDay(e);
    formik.setFieldValue("birth_day", `${e.year}-${e.month}-${e.day}`);
  }

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values) => {

      api.put(`/api/auth/patient/${user.child_id}/`, {
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
        },
        province: values.province,
        city: values.city,
        code_melli: values.social_number,
        phone_number: values.phone_number,
        birth_day: values.birth_day,
      }, {
        headers: {
          Authorization: `Bearer ${authData?.access}`
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
          marginTop: "50px",
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
            <FormControl fullWidth>
              <InputLabel>استان</InputLabel>
              <SSelect
                value={province}
                onChange={handleProvince}
                label="استان"
                error={formik.errors["province"] && formik.touched["province"]}
              >
                {provincesToShow.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>شهر</InputLabel>
              <SSelect
                value={city}
                onChange={handleCity}
                label="شهر"
                error={formik.errors["city"] && formik.touched["city"]}
              >
                {citiesToShow.map(({ id, name }) => (
                  <MenuItem key={id} value={id}>
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
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
              onChange={handleDatePicker}
              shouldHighlightWeekends
              locale="fa"
              calendarPopperPosition='bottom'
              calendarSelectedDayClassName='selected-day'
              calendarClassName='custom-calendar'
              formatInputText={() => `تاریخ تولد: ${birthDay.year}/${birthDay.month}/${birthDay.day}`}
            />
          </Grid>
          <Grid item xs={6} md={6}>
            {toShow}
          </Grid>
          <Grid item md={12} xs={12} sx={{
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
