//schedule time
import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Card,
  Button,
  Box,
  Typography,
  Grid,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import MobileStepper from "@mui/material/MobileStepper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import axios from "axios";
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
import { useFormik } from "formik";
import * as Yup from "yup";
import Provinces from "../../../db/Provinces";

export default function ScheduleTime({ doctor, ...props }) {
  const formValue = {
    date_reserved: "",
    from_time: "",
    to_time: "",
    patient_name: "",
    national_code: "",
    doctorID: -1,
    patient: -1,
  };

  const validationSchema = Yup.object({
    date_reserved: Yup.string(),
    from_time: Yup.string(),
    to_time: Yup.string(),
    patient_name: Yup.string(),
    national_code: Yup.string(),
    doctorID: Yup.number(),
    patient: Yup.number(),
  });

  const day = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

  const days = {
    0: "شنبه",
    1: "یکشنبه",
    2: "دوشنبه",
    3: "سه شنبه",
    4: "چهارشنبه",
    5: "پنجشنبه",
    6: "جمعه",
  };

  let full_times = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  let scedule_time = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
  };

  let show_time = [];
  const [open, setOpen] = React.useState(false);
  const [openHotelOffer, setOpenHotelOffer] = React.useState(false);
  const history = useHistory();
  const [_from_time, set_from_time] = useState("");
  const [_to_time, set_to_time] = useState("");
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = day.length;
  const [flag, setFlag] = useState(true);
  const [deleteValue, setDalateValue] = useState("");
  var today = new Date();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };

  const [reservation, setReservation] = useState([]);
  const handleReservation = (event) => {
    setReservation(event);
    console.log(event.outerText);
  };

  const data = doctor?.work_periods;
  for (let time in data) {
    full_times[data[time].day].push([data[time].from_time, data[time].to_time]);
  }

  for (let time in data) {
    full_times[time].sort();
  }

  const api = useAxios();

  for (let [start, end] of full_times[0]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[0].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }

  for (let [start, end] of full_times[1]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[1].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }
  for (let [start, end] of full_times[2]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[2].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }
  for (let [start, end] of full_times[3]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[3].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }
  for (let [start, end] of full_times[4]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[4].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }
  for (let [start, end] of full_times[5]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[5].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }
  for (let [start, end] of full_times[6]) {
    // console.log(start, end)
    let shour = Number(start.substring(0, 2));
    let smin = Number(start.substring(3, 5));
    let ehour = Number(end.substring(0, 2));
    let emin = Number(end.substring(3, 5));
    if (smin == 0) smin = 0;
    else if (smin <= 15) smin = 15;
    else if (smin <= 30) smin = 30;
    else if (smin <= 45) smin = 45;
    else if (smin <= 60) {
      smin = 0;
      shour++;
    }
    if (emin >= 45) emin = 45;
    else if (emin >= 30) emin = 30;
    else if (emin >= 15) emin = 15;
    else if (emin >= 0) emin = 0;
    // console.log(shour,smin,ehour,emin)
    while (!(shour === ehour && smin === emin)) {
      scedule_time[6].push(`${shour}:${smin == 0 ? "00" : smin}`);
      smin += 15;
      if (smin === 60) {
        smin = 0;
        shour++;
      }
    }
  }

  for (let i = 0; i < 7; i++) {
    show_time.push([days[i], scedule_time[i]]);
  }

  const [form, setForm] = useState("");
  const { authData } = useContext(AuthContext);
  const { user, authTokens, logoutUser } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: formValue,

    onReset: () => {
      setForm("");
    },

    onSubmit: (values) => {
      // today.setDate(today.getDate() + activeStep);

      console.log({
        date_reserved: today
          .toLocaleDateString("fa-IR-u-nu-latn")
          .replaceAll("/", "-"),
        from_time: _from_time,
        to_time: _to_time,
        patient_name: `${authData["first-name"] + " " + authData["last-name"]}`,
        national_code: "0987654321",
        doctor: doctor?.id,
        patient: authData.id,
      });

      api
        .post(
          `/api/doctor/appointment/`,
          {
            date_reserved: today
              .toLocaleDateString("fa-IR-u-nu-latn")
              .replaceAll("/", "-"),
            from_time: _from_time,
            to_time: _to_time,
            patient_name: authData["first-name"] + " " + authData["last-name"],
            national_code: "0987654321",
            doctor: doctor?.id,
            patient: authData.id,
          },
          {
            headers: {
              Authorization: "Bearer " + authData?.access,
            },
          }
        )
        .then((res) => {
          delete show_time[activeStep][
            show_time[activeStep].indexOf(_from_time)
          ];
          toast.success("نوبت شما با موفقیت رزرو شد", {
            position: "top-right",
            autoClose: 2000,
          });
          setOpenHotelOffer(true);
          // window.setTimeout(reload, 1000)
        })
        .catch((err) => {
          toast.error("این زمان قبلا رزرو شده است", {
            position: "top-right",
            autoClose: 2000,
          });
        });
      formik.resetForm();
      // setLoading(true);
    },
    validationSchema: validationSchema,
  });

console.log(today.getUTCDate())
  let doctorTodayTimes = [];
  function GetAvailableTimes()
  { 
    if (doctor?.id) {
      // console.log('now', now.getUTCDate(),now
      // .toLocaleDateString("fa-IR-u-nu-latn")
      // .replaceAll("/", "-"),)
      // let add_day = activeStep + now.getUTCDate() > 6 ? (activeStep + now.getUTCDate())%7 : activeStep + now.getUTCDate()
      // now.setDate(today.getDate() + add_day);
      // console.log(now)

      if (today.getUTCDate() < activeStep){
        today.setDate(today.getDate() + activeStep - today.getUTCDate());
      }
      else if (today.getUTCDate() > activeStep){
        today.setDate(today.getDate() + activeStep - today.getUTCDate() + 7);
      }

      today.setDate(today.getDate());

      api
        .post(`/api/doctor/times/`, {
          doctor: doctor?.id,
          date: today
            .toLocaleDateString("fa-IR-u-nu-latn")
            .replaceAll("/", "-"),
        })
        .then((res) => {
          doctorTodayTimes = res.data
          console.log('data set', doctorTodayTimes)
        })
        .catch((err) => {
          console.log('error in setting data reservation')
        })
    }
  }

  function HotelOffer() {
    return (
      <Box>
        <DialogContent>
          <DialogContentText
            id="hotel-offer"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography sx={{ justifyItems: 'right' }}>
              شما می تولنید در صورت تمایل نزدیک ترین اقامتگاه نزدیک بیمارستان یا مطب پزشک مورد نظر خود را نیز رزرو کنید
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            axios
              .post("http://188.121.113.74/api/hotel/search/", {
                province: Provinces.filter(pro => pro.value === doctor?.province)[0]?.id,
              })
              .then((response) => {
                if (response.data.length !== 0) {
                  console.log("the response of found hotels: ", response.data);
                  history.push("/found-hotels", { hotels: response.data });
                } else {
                  toast.error("هیچ هتلی یافت نشد");
                  setOpenHotelOffer(false);
                }
              })
              .catch((err) => {
                toast.error(err.response.data.message);
              });
          }
          } autoFocus>
            انتخاب هتل
          </Button>
          <Button
            onClick={() => {
              setOpenHotelOffer(false)
              history.push(
                user?.role === "patient" ? "/patient-panel" : "/"
              )
            }}
          >
            رد کردن
          </Button>
        </DialogActions>
      </Box>
    );
  }


  function ReservePopUp() {
    return (
      <Box onSubmit={formik.handleSubmit} component="form">
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              justifyContent: "center",
              fontWeight: '700px',
            }}
          >
            <Typography sx={{ justifyItems: 'right' }}>
              جهت ثبت نهایی نوبت برای دکتر {doctor?.user.first_name + ' ' + doctor?.user.last_name} در روز {days[activeStep]} از ساعت {_from_time} تا ساعت {_to_time} لطفا روی تایید نهایی رزرو کلیک کنید
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose} autoFocus>
            تایید نهایی رزرو
          </Button>
        </DialogActions>
      </Box>
    );
  }

  function logInPopUp() {
    return (
      <div>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            جهت ثبت نهایی نوبت خود ابتدا باید به دکترینو وارد شوید
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              history.push("/login", { destination: window.location.pathname });
            }}
          >
            &nbsp;ورود
          </Button>
          <Button
            onClick={() => {
              history.push("/signup");
            }}
          >
            &nbsp;&nbsp;&nbsp;عضویت
          </Button>
        </DialogActions>
      </div>
    );
  }
  function reload() {
    window.location.reload()
  }

  return (
    <Card
      sx={{
        marginTop: "100px",
        display: "sticky",
        paddingInline: "13px",
        marginBottom: "20px",
        height: "auto",
        width: "auto",
        paddingTop: "15px",
        paddingBottom: "15px",
      }}
    >
      <Grid container>
        <Grid item xs={12}>
          <Stack
            sx={{
              display: "flex",
              alignItems: "center",
              height: "auto",
              justifyContent: "center",
            }}
            mb={1}
          >
            <Typography>{day[activeStep]}</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack>
            <MobileStepper
              variant="none"
              day={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button
                  size="small"
                  onClick={handleNext}
                  disabled={activeStep === maxSteps - 1}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </Button>
              }
              backButton={
                <Button
                  size="small"
                  onClick={handleBack}
                  disabled={activeStep === 0}
                >
                  {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                </Button>
              }
            />
          </Stack>
          {GetAvailableTimes()}
        </Grid>
        <hr style={{ width: "100%", color: "black" }} />
        <Grid item>
          <Stack>
            <Box sx={{}}>
              <Grid container spacing={1}>
                {show_time
                  .filter((item) => item[0] == day[activeStep])[0][1]
                  .map((time, index) => {
                    return (
                      <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                        <Button
                          type="submit"
                          variant="outlined"
                          id={`${time}`}
                          className={`${time}`}
                          // disabled='true'
                          // color={(flag && Button.id == `${time}`) ? "primary" : 'error'}
                          sx={{
                            borderRadius: "15px",
                          }}
                          onClick={() => {
                            set_from_time(time + ":00");
                            set_from_time(time + ":00");
                            if (
                              time.substring(
                                time.indexOf(":") + 1,
                                time.indexOf(":") + 3
                              ) == "45"
                            ) {
                              set_to_time(
                                `${Number(time.substring(0, time.indexOf(":"))) +
                                1
                                }:00:00`
                              );
                            } else {
                              set_to_time(
                                `${Number(
                                  time.substring(0, time.indexOf(":"))
                                )}:${Number(
                                  time.substring(
                                    time.indexOf(":") + 1,
                                    time.indexOf(":") + 3
                                  )
                                ) + 15
                                }:00`
                              );
                            }
                            // setFlag(!flag)
                            // console.log(_from_time, _to_time)
                          }}
                        >
                          <Typography textAlign="center">{time}</Typography>
                        </Button>
                      </Grid>
                    );
                  })}
                {show_time.filter((item) => item[0] == day[activeStep])[0][1]
                  .length === 0 && (
                    <Grid
                      item
                      xs={12}
                      md={12}
                      sx={{ justifyContent: "center", display: "flex" }}
                    >
                      <Box
                        sx={{
                          diasplay: "flex",
                          width: "100%",
                        }}
                      >
                        <Typography
                          textAlign="center"
                          sx={{
                            fontWeight: "550",
                            fontSize: "14px",
                            justifyContent: "center",
                            display: "flex",
                            marginTop: "50px",
                            marginBottom: "40px",
                          }}
                        >
                          متاسفانه زمانی برای نمایش وجود ندارد
                        </Typography>
                      </Box>
                    </Grid>
                  )}
              </Grid>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ diasplay: "flex" }}>
            <Box
              sx={{
                fontWeight: "500",
                justifyContent: "center",
                display: _from_time ? "flex" : "none",
                marginTop: "15px",
                marginBottom: "10px",
              }}
            >
              <hr style={{ width: "100%" }} />
            </Box>
            <Typography
              sx={{
                fontWeight: "500",
                justifyContent: "center",
                display: _from_time ? "flex" : "none",
              }}
            >
              زمان رزرو پزشک
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                justifyContent: "center",
                display: _from_time ? "flex" : "none",
                marginTop: "15px",
              }}
            >
              {day[activeStep]}
            </Typography>
            <Typography
              sx={{
                fontWeight: "700",
                justifyContent: "center",
                display: _from_time ? "flex" : "none",
              }}
            >
              {_from_time} تا {_to_time}
            </Typography>
            <br />
            <Button
              sx={{
                width: "100%",
                backgroundColor: "primary",
              }}
              onClick={handleClickOpen}
            >
              رزرو کنید
            </Button>
          </Box>
        </Grid>
        <Dialog
          open={open}
          onClose={handleClose}
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
              {"رزرو نهایی"}
            </Typography>
          </DialogTitle>
          {user && ReservePopUp()}
          {!user && logInPopUp()}
        </Dialog>

        <Dialog
          open={openHotelOffer}
          onClose={() => setOpenHotelOffer(false)}
          aria-labelledby="alert-hotel-offer"
          aria-describedby="hotel-offer"
        >
          <DialogTitle id="alert-hotel-offer">
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              {"رزرو هتل"}
            </Typography>
          </DialogTitle>
          {HotelOffer()}
        </Dialog>

      </Grid>
    </Card>
  );
}
