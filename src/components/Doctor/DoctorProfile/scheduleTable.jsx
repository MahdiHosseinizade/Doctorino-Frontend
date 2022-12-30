//schedule time
import React, { useState, useEffect, useContext } from 'react';
import {
    Container,
    Card,
    Box,
    Typography,
    Button,
    Grid,
    Stack,
} from "@mui/material"
import { useTheme } from '@mui/material/styles';
import { toast } from "react-toastify";
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
import { useFormik } from "formik";
import * as Yup from "yup";



export default function ScheduleTime({ doctor, ...props }) {
    const formValue = {
        date_reserved: '',
        from_time: '',
        to_time: '',
        patient_name: '',
        national_code: '',
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

    const day = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه',];

    const days = {
        0: 'شنبه',
        1: 'یکشنبه',
        2: 'دوشنبه',
        3: 'سه شنبه',
        4: 'چهارشنبه',
        5: 'پنجشنبه',
        6: 'جمعه',
    };

    let full_times =
    {
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
    }

    let scedule_time =
    {
        0: [], 1: [], 2: [], 3: [], 4: [], 5: [], 6: [],
    }

    let show_time = [];

    const [_from_time, set_from_time] = useState('');
    const [_to_time, set_to_time] = useState('');
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = day.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [reservation, setReservation] = useState([]);
    const handleReservation = (event) => {
        setReservation(event);
        console.log(event.outerText);
    };

    const data = doctor?.work_periods;
    for (let time in data) {

        full_times[data[time].day].push([data[time].from_time, data[time].to_time])
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
            scedule_time[0].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[1].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[2].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[3].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[4].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[5].push(`${shour}:${smin == 0 ? '00' : smin}`)
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
            scedule_time[6].push(`${shour}:${smin == 0 ? '00' : smin}`)
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

    let today = new Date().toLocaleDateString('fa-IR-u-nu-latn');
    formValue.date_reserved = `${today.substring(0, 4)}-${today.substring(5, 7)}-${today.substring(8, 9)}`;

    const [form, setForm] = useState('');
    const { authData } = useContext(AuthContext);
    

    // console.log(formValue.doctorID)
    // console.log(typeof(doctor?.id))

    const formik = useFormik({
        initialValues: formValue,

        onReset: () => {
            setForm('');
        },

        onSubmit: (values) => {
          
            // console.log(
            //     {
            //         "date_reserved": values.date_reserved,
            //         "from_time": _from_time,
            //         "to_time": _to_time,
            //         "patient_name": authData['first-name'] + authData['last-name'], //
            //         "national_code": '0987654321', //
            //         "doctorID": doctor?.id,
            //         "patient": authData['child-id'], //
            //     }
            // )

            api.post(`/api/doctor/appointment/`, 
            {
                "date_reserved": values.date_reserved,
                 "from_time": _from_time,
                "to_time": _to_time,
                "patient_name": authData['first-name'] + authData['last-name'], //
                "national_code": '0987654321', //
                "doctorID": doctor?.id,
                "patient": authData['child-id'], //
            }, {
                headers: {
                    "Authorization": "Bearer " + authData?.access,
                }
            }).then(res => {
                toast.success("اتاق با موفقیت اضافه شد", {
                    position: "top-right",
                    autoClose: 2000,
                })
            }).catch(err => {
                toast.error("خطایی رخ داده است", {
                    position: "top-right",
                    autoClose: 2000,
                })
            })
            formik.resetForm();
            // setLoading(true);

        },
        validationSchema: validationSchema,
    });








    return (
        <Card
            sx={{
                marginTop: "100px",
                display: 'sticky',
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
                            display: 'flex',
                            alignItems: 'center',
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

                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowLeft />
                                    ) : (


                                        <KeyboardArrowRight />
                                    )}
                                </Button>
                            }
                            backButton={
                                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                    {theme.direction === 'rtl' ? (
                                        <KeyboardArrowRight />
                                    ) : (
                                        <KeyboardArrowLeft />

                                    )}

                                </Button>
                            }
                        />
                    </Stack>
                </Grid>
                <hr style={{ width: "100%", color: "black", }} />
                <Grid item>
                    <Stack>
                        <Box
                            onSubmit={formik.handleSubmit}
                            component="form"
                            sx={{ }}>
                            <Grid container spacing={1}>
                                {show_time.filter((item) => (item[0] == day[activeStep]))[0][1].map((time, index) => {
                                    return (
                                        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                                            <button type="submit" id={`${time}`}
                                                onClick={() => {
                                                    set_from_time(time + ':00')
                                                    if (time.substring(3, 5) == '45') { set_to_time(`${Number(time.substring(0, 2)) + 1}:00:00`) }
                                                    else { set_to_time(`${Number(time.substring(0, 2))}:${Number(time.substring(3, 5)) + 15}:00`) }
                                                }}
                                            >
                                                <Typography textAlign="center">{time}</Typography></button>
                                        </Grid>
                                    );
                                })}

                            </Grid>
                        </Box>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <br />
                    <Button sx={{
                        width: "100%",
                        backgroundColor: "primary"
                    }}>
                        رزرو کنید
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
}

// {
//     "id": 1,
//     "date_reserved": "2022-12-19",
//     "from_time": "15:39:09",
//     "to_time": "19:00:00",
//     "patient_name": "mmd",
//     "national_code": "2520183063",
//     "patient": 7,
//     "doctor": 1
// },