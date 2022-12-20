import React from 'react'
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Box, Button, Container, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { styled } from '@mui/system';

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
  identity_number: "", // shomare shenasname
  social_number: "", // code meli
  sex: "",
  phone_number: "", // شماره موبایل
  email: "", // شماره تلفن ثابت
  birth_day: "",
  birth_year: "",
  birth_month: "",
};

const validationSchema = Yup.object({
  first_name: Yup.string(),
  last_name: Yup.string(),
  father_name: Yup.string(),
  identity_number: Yup.string(),
  social_number: Yup.string(),
  sex: Yup.string(),
  phone_number: Yup.string(),
  email: Yup.string(),
  birth_day: Yup.string(),
  birth_month: Yup.string(),
  birth_year: Yup.string(),
});


const Profile = () => {

  const [gender, setGender] = useState("");

  function handleGender(e) {
    setGender(e.target.value);
    formik.setFieldValue("sex", e.target.value);
    console.log(formik.getFieldProps("sex"));
  }

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values) => { },
    validationSchema: validationSchema,
  });

  // const day = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
  const years = [
    '1400','1399','1398','1397','1396','1395','1394','1393','1392','1391','1390','1389','1388','1387','1386','1385','1384',
    '1383','1382','1381','1380','1379','1378','1377','1376','1375','1374','1373','1372','1371','1370','1369','1368','1367','1366','1365',
    '1364','1363','1362','1361','1360','1359','1358','1357','1356','1355','1354','1353','1352','1351','1350','1349','1348','1347','1346','1345',
    '1344','1343','1342','1341','1340','1339','1338','1337','1336','1335','1334','1333','1332','1331','1330','1329','1328','1327','1326','1325',
    '1324', '1323', '1322', '1321', '1320', '1319', '1318', '1317',
    '1316', '1315', '1314', '1313', '1312', '1311', '1310', '1309', '1308', '1307', '1306', '1305', '1304', '1303', '1302', '1301', '1300']

  return (
    <Container>
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
                <MenuItem value={1}>
                  <ListItemText primary="مونث" />
                </MenuItem>
                <MenuItem value={2}>
                  <ListItemText primary="مذکر" />
                </MenuItem>
                <MenuItem value={3}>
                  <ListItemText primary="سایر" />
                </MenuItem>
              </SSelect>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <STextField
              fullWidth
              error={
                formik.errors["identity_number"] && formik.touched["identity_number"]
              }
              variant="outlined"
              label="شماره شناسنامه"
              name="identity_number"
              type="text"
              helperText={
                formik.touched["identity_number"] &&
                formik.errors["identity_number"]
              }
              {...formik.getFieldProps("identity_number")}
            />
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
                formik.errors["email"] && formik.touched["email"]
              }
              variant="outlined"
              label="تلفن ثابت"
              name="email"
              type="text"
              helperText={
                formik.touched["email"] &&
                formik.errors["email"]
              }
              {...formik.getFieldProps("email")}
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
          <Grid item md={12}>
            <Button variant='outlined' onClick={() => {
              console.log(formik.getFieldProps("birth_day"))
              console.log(formik.getFieldProps("birth_month"))
              console.log(formik.getFieldProps("birth_year"))
            }}>
              چاپ
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default Profile;
