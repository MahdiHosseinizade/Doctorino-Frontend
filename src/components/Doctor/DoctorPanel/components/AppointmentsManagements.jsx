import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
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
  // root: {
  //   textAlign: "center",
  // },
  boxContainer: {
    marginBottom: "3rem",
  },
  box: {
    alignment: "center",
    marginTop: "100px",
    marginBottom: "40px",
    marginLeft: "100px",
    marginRight: "100px",
    bgcolor: "rgb(245, 246, 248)",
    width: "60%",
    height: "87%",
    border: "1px solid black",
    borderRadius: "10px",
    // padding: "20px",
    paddingTop: "1.5rem",
    paddingBottom: "0.1rem",
    "& .MuiTextField-root": { m: 0 },
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
  },
  button: {
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  breakLine: {
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#000",
  },
});

const weekdays = [
  { id: 1, name: "شنبه" },
  { id: 2, name: "یکشنبه" },
  { id: 3, name: "دوشنبه" },
  { id: 4, name: "سه شنبه" },
  { id: 5, name: "چهارشنبه" },
  { id: 6, name: "پنجشنبه" },
  { id: 7, name: "جمعه" },
];

const formValues = {
  weekday: "",
  fromTime: "",
  toTime: "",
  doctor: {},
};

export default function AppointmentReports() {
  const classes = useStyles();
  const [values, setValues] = useState({ ...formValues });
  const [errors, setErrors] = useState({ ...formValues });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
  const API = useAxios();
  const [startTime, setStartTime] = React.useState(
    dayjs("2014-08-18T21:11:54")
  );

  const handleChange = (newValue) => {
    setStartTime(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
  }

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
            زمان مورد نظر خود را انتخاب کنید
          </Typography>
        </Grid>

        <hr className={classes.breakLine} />

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel>روز هفته</InputLabel>
            <Select
              label="روز هفته"
              name="weekday"
              value={values.education}
              onChange={handleInputChange}
              // error={errors.education ? true : false}
              // helperText={errors.education ? errors.education : null}
            >
              {weekdays.map((weekday) => (
                <MenuItem key={weekday.id} value={weekday.id}>
                  {weekday.name}
                </MenuItem>
              ))}
              {/* <MenuItem value={1}>عمومی</MenuItem>
            <MenuItem value={2}>متخصص</MenuItem>
            <MenuItem value={3}>فوق تخصص</MenuItem>
            <MenuItem value={4}>کارشناس</MenuItem>
            <MenuItem value={5}>مشاور</MenuItem>
            <MenuItem value={6}>کارشناس ارشد</MenuItem>
            <MenuItem value={7}>فلوشیپ</MenuItem>
            <MenuItem value={8}>دکترا</MenuItem>
            <MenuItem value={9}>سایر</MenuItem> */}
            </Select>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12} md={6}> */}
        {/* <TimePicker
            label="از ساعت"
            value={values.fromTime}
            onChange={handleInputChange}
            renderInput={(params) => <TextField {...params} />}
          /> */}
        {/* </Grid> */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
          <Grid item xs={12} md={6}>
            <TimePicker
              fullWidth
              label="از ساعت"
              value={values.fromTime}
              onChange={handleInputChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </Grid>
            <Grid item xs={12} md={6}>
            <TimePicker
              label="تا ساعت"
              value={values.toTime}
              onChange={handleInputChange}
              renderInput={(params) => <TextField {...params} />}
            />
            </Grid>
          </Stack>
        </LocalizationProvider>
        {/* 
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام"
              variant="outlined"
              name="first_name"
              type="text"
              // value={values.first_name}
              // onChange={handleInputChange}
              // fullWidth
              // error={errors.first_name ? true : false}
              // helperText={errors.first_name ? errors.first_name : null}
            />
          </Grid> */}

        <button className={classes.button} type="submit">
          ذخیره اطلاعات
        </button>
        {/* </Grid> */}
      </Container>
    </form>
  );
}
