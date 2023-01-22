import React, { useState, useEffect } from "react";
import "./AppointmentsManagements.css";
import { toast } from "react-toastify";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import theme from "../../../../assets/theme/defaultTheme";
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
  Tab,
  Tabs,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  Button,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";


const useStyles = makeStyles({
  boxContainer: {
    marginBottom: "3rem",
  },
  box: {
    alignment: "center",
    marginTop: "1%",
    marginBottom: "1%",
    marginLeft: "10%",
    marginRight: "25%",
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
  table: {
    justifyContent: "center",
    marginTop: "5rem",
    marginBottom: "1rem",
    marginLeft: "50%",
    marginRight: "50%",
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
  fromTime: new Date(0, 0, 0),
  toTime: new Date(0, 0, 0),
  doctorId: 0,
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function AppointmentReports() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [tabValue, setTabValue] = React.useState(0);
  const [values, setValues] = useState({ ...formValues });
  const [errors, setErrors] = useState({ ...formValues });
  const [flag, setFlag] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { authData } = useContext(AuthContext);
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

  const handleTabValueChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleDeleteTime = (time) => {
    API.delete(`/api/doctor/workday/${time.id}/`, {
      headers: {
        Authorization: "Bearer " + authData?.access,
      },
    })
      .then((res) => {
        toast.success("زمان موردنظر با موفقیت حذف شد", {
          position: "top-right",
          autoClose: 2000,
        });
        // formikRoom.resetForm();
        // setLoading(true);
      })
      .catch((err) => {
        toast.error("خطایی رخ داده است", {
          position: "top-right",
          autoClose: 2000,
        });
      });
    setAvailableTimes(
      availableTimes.filter((availableTime) => availableTime.id !== time.id)
    );
    setOpen(false);
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
    const fetchData = async () => {
      // Fetching the doctor id from the user id
      await API.get(`/api/doctor/user_id_to_doctor_id/${user.id}/`, {
        headers: {
          Authorization: `Bearer ${authData.access}`,
        },
      })
        .then(async (res) => {
          console.log("recieved doctor ID: ", res.data.id);
          setValues({
            ...values,
            doctorId: res.data.id,
          });
          // console.log("this is the values: ", values);
          API.get(`http://188.121.113.74/api/doctor/${res.data.id}/workday/`, {
            headers: {
              Authorization: `Bearer ${authData.access}`,
            },
          })
            .then(async (response) => {
              setTimeout(() => {
                setAvailableTimes(response.data);
                // try {
                //   // setLoading(true);
                //   console.log(
                //     "this is the response of workday: ",
                //     response.data
                //   );
                //   const temptimes = response.data.filter((item) => {
                //     if (item.doctor === res.data.id) {
                //       console.log(
                //         "in useEffect condition setting availableTimes"
                //       );
                //       return {
                //         id: item.id,
                //         day: item.day,
                //         fromTime: item.from_time,
                //         toTime: item.to_time,
                //         doctorId: item.doctor,
                //       };
                //     }
                //   });
                //   console.log("this is the temptimes: ", temptimes);
                //   setAvailableTimes([...temptimes]);
                //   console.log("this is the availableTimes: ", availableTimes);
                // } catch (error) {
                //   console.log("this is the error of availableTimes: ", error);
                // }
              }, 1);
            })
            .catch((error) => {
              console.log("this is the error of workday", error);
            })
            .finally(() => {
              setLoading(false);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (loading) {
      try {
        console.log("loading: ", loading);
        fetchData();
        console.log("this is the availableTimes: ", availableTimes);
      } catch (error) {
        console.log("this is the error of availableTimes: ", error);
      } finally {
        console.log("setting the loading to false");
        setLoading(false);
      }
    }
    console.log("loading after if statement: ", loading);
    setLoading(false);
    console.log("loading after setting to false: ", loading);
    console.log(
      "this is the availableTimes after if statement in useeffect: ",
      availableTimes
    );
    // console.log("this is the rows: ", row)

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [loading, API, authData.access, user.id, values, availableTimes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("in submit func: ", values);
      console.log("fromTime checking: ", typeof values.fromTime.$H);
      const temp = {
        from_time:
          (String(values.fromTime.$H).length !== 2
            ? `0${values.fromTime.$H}`
            : values.fromTime.$H) +
          ":" +
          (String(values.fromTime.$m).length !== 2
            ? `0${values.fromTime.$m}`
            : values.fromTime.$m) +
          ":00",
        to_time:
          (String(values.toTime.$H).length !== 2
            ? `0${values.toTime.$H}`
            : values.toTime.$H) +
          ":" +
          (String(values.toTime.$m).length !== 2
            ? `0${values.toTime.$m}`
            : values.toTime.$m) +
          ":00",
        day: values.day,
        doctor: values.doctorId,
        id: values.id,
      };
      console.log("this is the temp values when sending the time: ", temp);
      axios
        .post(
          `http://188.121.113.74/api/doctor/workday/`,
          {
            from_time:
              (String(values.fromTime.$H).length !== 2
                ? `0${values.fromTime.$H}`
                : values.fromTime.$H) +
              ":" +
              (String(values.fromTime.$m).length !== 2
                ? `0${values.fromTime.$m}`
                : values.fromTime.$m) +
              ":00",
            to_time:
              (String(values.toTime.$H).length !== 2
                ? `0${values.toTime.$H}`
                : values.toTime.$H) +
              ":" +
              (String(values.toTime.$m).length !== 2
                ? `0${values.toTime.$m}`
                : values.toTime.$m) +
              ":00",
            day: values.day - 1,
            doctor: values.doctorId,
            id: values.id,
          },
          {
            headers: {
              Authorization: `Bearer ${authData.access}`,
            },
          }
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
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "65%",
          bgcolor: "rgb(245, 246, 248)",
          border: "1px solid #ccc",
          margin: "auto",
          marginTop: "100px",
          marginBottom: "50px",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0.5 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
          minWidth: "368px",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
              marginLeft: "10px",
              borderBottom: 0,
              borderColor: "divider",
            }}
          >
            <Tabs
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                width: "100%",
                marginBottom: "10px",
                "& .MuiTab-root": {
                  color: theme.palette.grey[700],
                },
                "& .Mui-selected": {
                  color: theme.palette.doctor.dark,
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: theme.palette.doctor.dark,
                },
              }}
              value={tabValue}
              onChange={handleTabValueChange}
              aria-label="basic tabs example"
            >
              <Tab
                sx={{ width: "50%" }}
                label="انتخاب روز و زمان"
                {...a11yProps(0)}
              />
              <Tab
                sx={{ width: "50%" }}
                label="زمان های مشخص شده"
                {...a11yProps(1)}
              />
            </Tabs>
          </Box>

          <hr
            width="100%"
            style={{
              backgroundColor: "#000",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />

          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <TabPanel value={tabValue} index={0}>
                  <Grid container spacing={3} sx={{ marginBottom: "4%" }}>
                    {/** Time Selection */}
                    <Grid
                      item
                      xs={12}
                      sx={{
                        marginTop: "5%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <form
                        style={{ width: "90%", margin: "auto" }}
                        onSubmit={handleSubmit}
                        className={classes.box}
                        autoComplete="off"
                      >
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
                                    <MenuItem
                                      key={weekday.id}
                                      value={weekday.id}
                                    >
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
                                      console.log(
                                        "this is the new fromTime value: ",
                                        newValue
                                      );
                                      setValues({
                                        ...values,
                                        fromTime: newValue,
                                      });
                                      setStartTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                    error={errors.fromTime ? true : false}
                                    helperText={
                                      errors.fromTime ? errors.fromTime : null
                                    }
                                  />
                                </Stack>
                              </LocalizationProvider>

                              {/* <TimePicker
                                // onFocusChange={this.onFocusChange.bind(this)}
                                // onTimeChange={this.onTimeChange.bind(this)}
                                value={values.fromTime}
                                onChange={(newValue) => {
                                  console.log(
                                    "this is the new fromTime value: ",
                                    newValue
                                  );
                                  setValues({
                                    ...values,
                                    fromTime: newValue,
                                  });
                                  setStartTime(newValue);
                                }}
                                rend
                              /> */}
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
                                      setValues({
                                        ...values,
                                        toTime: newValue,
                                      });
                                      setEndTime(newValue);
                                    }}
                                    renderInput={(params) => (
                                      <TextField {...params} />
                                    )}
                                    error={errors.toTime ? true : false}
                                    helperText={
                                      errors.toTime ? errors.toTime : null
                                    }
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
                    </Grid>
                  </Grid>
                  {/* </Box> */}
                </TabPanel>

                <TabPanel value={tabValue} index={1}>
                  <Box
                    sx={{
                      color: theme.palette.doctor.dark,
                      marginTop: { xs: 1, md: "20px" },
                      border: `2px solid ${theme.palette.doctor.dark}`,
                      borderRadius: "5px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
                      // minWidth: "368px",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid
                        container
                        // xs={12}
                        // sm={12}
                        // md={12}
                        spacing={1}
                        sx={{
                          marginTop: "10px",
                          // display: "flex",
                          // justifyContent: "center",
                        }}
                      >
                        {/* {console.log(rooms)} */}
                        {availableTimes.length !== 0 ? (
                          availableTimes
                            .sort((a, b) => a.day - b.day)
                            .sort((a, b) => a.fromTime - b.fromTime)
                            .map((time, index) => {
                              return (
                                <Grid key={time.id} item xs={12} md={12}>
                                  <Accordion
                                    sx={{
                                      width: "70%",
                                      justifyContent: "center",
                                      right: "-20%",
                                      margin: "0px 0px 0px 0px",
                                    }}
                                  >
                                    <AccordionSummary
                                      expandIcon={<ExpandMoreIcon />}
                                      aria-controls={`aria${time.id}`}
                                      id={`id${time.id}`}
                                    >
                                      <Typography>
                                        روز{" "}
                                        {
                                          weekdays.find(
                                            (day) => day.id - 1 === time.day
                                          ).name
                                        }
                                        {":"}
                                        {time.from_time.slice(0, 5)} تا{" "}
                                        {time.to_time.slice(0, 5)}
                                      </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      {/* <Typography sx={{ marginBottom: "7px" }}>
                                    از ساعت: {time.from_time}
                                  </Typography>
                                  <Typography sx={{ marginBottom: "7px" }}>
                                    تا ساعت: {time.to_time}
                                  </Typography> */}
                                      <Button
                                        sx={{ marginTop: "10px" }}
                                        type="button"
                                        variant="outlined"
                                        color="doctor"
                                        onClick={() => {
                                          // setFlag(true);
                                          // setOpen(true);
                                          // DeleteTimePopUp(time);
                                          handleDeleteTime(time);

                                          // API.delete(
                                          //   `/api/doctor/workday/${time.id}/`,
                                          //   {
                                          //     headers: {
                                          //       Authorization:
                                          //         "Bearer " + authData?.access,
                                          //     },
                                          //   }
                                          // )
                                          //   .then((res) => {
                                          //     setAvailableTimes(
                                          //       time.filter(
                                          //         (rm) => rm.id !== time.id
                                          //       )
                                          //     );
                                          //     toast.success(
                                          //       "زمان موردنظر با موفقیت حذف شد",
                                          //       {
                                          //         position: "top-right",
                                          //         autoClose: 2000,
                                          //       }
                                          //     );
                                          //     // formikRoom.resetForm();
                                          //     setLoading(true);
                                          //   })
                                          //   .catch((err) => {
                                          //     toast.error("خطایی رخ داده است", {
                                          //       position: "top-right",
                                          //       autoClose: 2000,
                                          //     });
                                          //   });
                                        }}
                                      >
                                        حذف زمان موردنظر
                                      </Button>
                                      {/* <Dialog
                                        open={open}
                                        onClose={() => setOpen(false)}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                      >
                                        <DialogTitle id="alert-dialog-title">
                                          <Typography
                                            sx={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            {"حذف زمان انتخاب شده"}
                                          </Typography>
                                        </DialogTitle>
                                        {flag && DeleteTimePopUp(time)}
                                      </Dialog> */}
                                    </AccordionDetails>
                                  </Accordion>
                                </Grid>
                              );
                            })
                        ) : (
                          <Typography
                            sx={{ textAlign: "center", marginTop: "10px" }}
                            variant="h6"
                          >
                            زمانی برای نمایش وجود ندارد
                          </Typography>
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
