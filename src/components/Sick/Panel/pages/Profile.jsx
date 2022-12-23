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
  birth_day: "",
  birth_year: "",
  birth_month: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  father_name: Yup.string(),
  social_number: Yup.string(),
  sex: Yup.string(),
  phone_number: Yup.string(),
  birth_day: Yup.string(),
  birth_month: Yup.string(),
  birth_year: Yup.string(),
});


const Profile = () => {

  const { authTokens, user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [usr, setUsr] = useState(null);
  const api = useAxios();

  useEffect(() => {
    if (loading) {
      api.get(`/api/auth/new-user/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens?.access}`
        }
      })
        .then(res => {
          setUsr(res.data);

          if (res.data.first_name) {
            formik.setFieldValue("first_name", res.data.first_name);
          }
          if (res.data.last_name) {
            formik.setFieldValue("last_name", res.data.last_name);
          }
          if (res.data.code_melli) {
            formik.setFieldValue("social_number", res.data.code_melli);
          }
          if (res.data.birth_day) {
            formik.setFieldValue("birth_day", parseInt(res.data.birth_day.split("-")[2]));
          }
          if (res.data.birth_month) {
            formik.setFieldValue("birth_month", res.data.birth_day.split("-")[1]);
          }
          if (res.data.birth_year) {
            formik.setFieldValue("birth_year", res.data.birth_day.split("-")[0]);
          }
          if (res.data.phone_number) {
            formik.setFieldValue("phone_number", res.data.phone_number);
          }

          if (res.data.gender) {
            formik.setFieldValue("sex", res.data.gender)
          }
          setLoading(false);
        })
    }
  }, [loading, usr])

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values) => {
      setUsr((prev) => (
        {
          ...prev,
          "first_name": values.first_name,
          "last_name": values.last_name,
          "code_melli": values.social_number,
          "birth_day": ["2013", "2017", "2000", "1980"][Math.floor(Math.random() * 4)] + "-" + ((months.indexOf(values.birth_month) + 1) || "8") + "-" + values.birth_day,
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

  const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
  const years = [
    '1400', '1399', '1398', '1397', '1396', '1395', '1394', '1393', '1392', '1391', '1390', '1389', '1388', '1387', '1386', '1385', '1384',
    '1383', '1382', '1381', '1380', '1379', '1378', '1377', '1376', '1375', '1374', '1373', '1372', '1371', '1370', '1369', '1368', '1367', '1366', '1365',
    '1364', '1363', '1362', '1361', '1360', '1359', '1358', '1357', '1356', '1355', '1354', '1353', '1352', '1351', '1350', '1349', '1348', '1347', '1346', '1345',
    '1344', '1343', '1342', '1341', '1340', '1339', '1338', '1337', '1336', '1335', '1334', '1333', '1332', '1331', '1330', '1329', '1328', '1327', '1326', '1325',
    '1324', '1323', '1322', '1321', '1320', '1319', '1318', '1317',
    '1316', '1315', '1314', '1313', '1312', '1311', '1310', '1309', '1308', '1307', '1306', '1305', '1304', '1303', '1302', '1301', '1300']

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
                  <ListItemText primary="مذکر" />
                </MenuItem>
                <MenuItem value={1}>
                  <ListItemText primary="مونث" />
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
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>روز تولد</InputLabel>
              <SSelect
                error={formik.errors["birth_day"] && formik.touched["birth_day"]}
                {...formik.getFieldProps('birth_day')}
                input={<OutlinedInput label="روز تولد" />}
              >
                {days.map((day, index) => (
                  <MenuItem key={index} value={day}>
                    <ListItemText primary={day} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>ماه تولد</InputLabel>
              <SSelect
                error={formik.errors["birth_month"] && formik.touched["birth_month"]}
                {...formik.getFieldProps('birth_month')}
                input={<OutlinedInput label="ماه تولد" />}
              >
                {months.map((month, index) => (
                  <MenuItem key={index} value={month}>
                    <ListItemText primary={month} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>سال تولد</InputLabel>
              <SSelect
                error={formik.errors["birth_year"] && formik.touched["birth_year"]}
                {...formik.getFieldProps('birth_year')}
                input={<OutlinedInput label="سال تولد" />}
              >
                {years.map((year, index) => (
                  <MenuItem key={index} value={year}>
                    <ListItemText primary={year} />
                  </MenuItem>
                ))}
              </SSelect>
            </FormControl>
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
