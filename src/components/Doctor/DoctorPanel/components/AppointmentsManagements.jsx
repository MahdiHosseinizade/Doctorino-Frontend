import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Stack from "@mui/material/Stack";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker/TimePicker";
// import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
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
    marginTop: "7%",
    marginBottom: "1%",
    marginLeft: "10%",
    marginRight: "22.5%",
    bgcolor: "rgb(245, 246, 248)",
    width: "45%",
    height: "100%",
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
  timePicker: {
    direction: "ltr",
    marginTop: "1rem",
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
  id: 0,
  day: "",
  fromTime: "",
  toTime: "",
  doctorId: 0,
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
  const [endTime, setEndTime] = React.useState(dayjs("2014-08-18T21:11:54"));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    console.log("in validate func: ", fieldValues);
    if ("day" in fieldValues) {
      temp.day = fieldValues.day ? "" : "روز موردنظر را وارد کنید.";
    }
    if ("fromTime" in fieldValues) {
      temp.fromTime = fieldValues.fromTime
        ? ""
        : "ساعت شروع نوبت دهی را وارد کنید.";
    }
    if ("toTime" in fieldValues) {
      temp.toTime = fieldValues.toTime
        ? ""
        : "ساعت پایان نوبت دهی را وارد کنید.";
    }
    setErrors({
      ...temp,
    });

    console.log("This is the fieldValues: ", fieldValues);
    if (fieldValues === values) {
      console.log("going out of validate func:");
      // return Object.values(temp).every((x) => x === "");
      return true;
    }
  };

  useEffect(() => {
    function fetchData() {
      API.get(`/api/doctor/user_id_to_doctor_id/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((res) => {
          // API.get(`http://188.121.113.74/api/doctor/workday/`, {
          //   headers: {
          //     Authorization: `Bearer ${authTokens.access}`,
          //   },
          // })
          //   .then((response) => {
          //     console.log("the user id: ", res.data.id);
          //     console.log("values: ", values);
          //     console.log("this is the response of workday: ", response.data);
          //     response.data.map((item) => {
          //       console.log("this is the item in useEffect", item);
          //       if (
          //         item.doctor === res.data.id &&
          //         item.day === values.day
          //       ) {
          //         console.log("in useEffect condition");
          //         setValues({
          //           ...values,
          //           id: item.id,
          //           day: item.day,
          //           fromTime: item.from_time,
          //           toTime: item.to_time,
          //           doctorId: item.doctor,
          //         });
          //       }
          //     });
          //   })
          //   .catch((error) => {
          //     console.log("this is the error of specialties", error);
          //   });
          setLoading(false);
          setValues({
            ...values,
            doctorId: res.data.id,

          })
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
      console.log("in submit func: ", values);
      axios.post(
        // `http://188.121.113.74/api/doctor/workday/${values.id}/`,
        `http://188.121.113.74/api/doctor/workday/`,
        {
          // ...values,
          // from_time: startTime,
          // to_time: endTime,
          // from_time: `{values.fromTime.$H}:${values.fromTime.$m}:00`,
          from_time: values.fromTime.$H + ":" + values.fromTime.$m + ":00",
          // to_time: `{values.toTime.$H}:${values.toTime.$m}:00`,
          to_time: values.toTime.$H + ":" + values.toTime.$m + ":00",
          day: values.day,
          doctor: values.doctorId,
          id: values.id,
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${authTokens.access}`,
        //   },
        // }
      )
        .then((response) => {
          toast.success(`زمان موردنظر با موفقیت ثبت شد.`, {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error("مشکلی پیش آمده است", {
            position: "top-right",
            autoClose: 2000,
          });
        });
      setLoading(true);
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
            روز و زمان مورد نظر خود را انتخاب کنید
          </Typography>
        </Grid>

        <hr className={classes.breakLine} />

        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            // md={6}
          >
            <FormControl fullWidth>
              <InputLabel>روز هفته</InputLabel>
              <Select
                fullwidth
                label="روز هفته"
                name="day"
                value={values.day}
                onChange={handleInputChange}
                error={errors.day ? true : false}
                helperText={errors.day ? errors.day : null}
              >
                {weekdays.map((weekday) => (
                  <MenuItem key={weekday.id} value={weekday.id}>
                    {weekday.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            // md={6}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  // className={classes.timePicker}
                  ampm={false}
                  fullWidth
                  label="از ساعت"
                  value={values.fromTime}
                  onChange={(newValue) => {
                    console.log("this is the new fromTime value: ", newValue);
                    setValues({ ...values, fromTime: newValue });
                    setStartTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  error={errors.fromTime ? true : false}
                  helperText={errors.fromTime ? errors.fromTime : null}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>
          <Grid
            item
            xs={12}
            // md={6}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <TimePicker
                  ampm={false}
                  label="تا ساعت"
                  value={values.toTime}
                  onChange={(newValue) => {
                    setValues({ ...values, toTime: newValue });
                    setEndTime(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                  error={errors.toTime ? true : false}
                  helperText={errors.toTime ? errors.toTime : null}
                />
              </Stack>
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={12}
            // md={6}
          >
            <button className={classes.button} type="submit">
              ذخیره اطلاعات
            </button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
