//schedule time
import React, { useState, useEffect } from 'react';
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
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';
import { useParams } from "react-router-dom";


const steps = [

    "1 فروردین", "2 فروردین", "3 فروردین", "4 فروردین", "5 فروردین", "6 فروردین", "7 فروردین", "8 فروردین", "9 فروردین", "10 فروردین", "11 فروردین", "12 فروردین", "13 فروردین", "14 فروردین", "15 فروردین", "16 فروردین", "17 فروردین", "18 فروردین", "19 فروردین", "20 فروردین", "21 فروردین", "22 فروردین", "23 فروردین", "24 فروردین", "25 فروردین", "26 فروردین", "27 فروردین", "28 فروردین", "29 فروردین", "30 فروردین", "31 فروردین",
    "1 اردیبهشت", "2 اردیبهشت", "3 اردیبهشت", "4 اردیبهشت", "5 اردیبهشت", "6 اردیبهشت", "7 اردیبهشت", "8 اردیبهشت", "9 اردیبهشت", "10 اردیبهشت", "11 اردیبهشت", "12 اردیبهشت", "13 اردیبهشت", "14 اردیبهشت", "15 اردیبهشت", "16 اردیبهشت", "17 اردیبهشت", "18 اردیبهشت", "19 اردیبهشت", "20 اردیبهشت", "21 اردیبهشت", "22 اردیبهشت", "23 اردیبهشت", "24 اردیبهشت", "25 اردیبهشت", "26 اردیبهشت", "27 اردیبهشت", "28 اردیبهشت", "29 اردیبهشت", "30 اردیبهشت", "31 اردیبهشت",
    "1 خرداد", "2 خرداد", "3 خرداد", "4 خرداد", "5 خرداد", "6 خرداد", "7 خرداد", "8 خرداد", "9 خرداد", "10 خرداد", "11 خرداد", "12 خرداد", "13 خرداد", "14 خرداد", "15 خرداد", "16 خرداد", "17 خرداد", "18 خرداد", "19 خرداد", "20 خرداد", "21 خرداد", "22 خرداد", "23 خرداد", "24 خرداد", "25 خرداد", "26 خرداد", "27 خرداد", "28 خرداد", "29 خرداد", "30 خرداد", "31 خرداد",
    "1 تیر", "2 تیر", "3 تیر", "4 تیر", "5 تیر", "6 تیر", "7 تیر", "8 تیر", "9 تیر", "10 تیر", "11 تیر", "12 تیر", "13 تیر", "14 تیر", "15 تیر", "16 تیر", "17 تیر", "18 تیر", "19 تیر", "20 تیر", "21 تیر", "22 تیر", "23 تیر", "24 تیر", "25 تیر", "26 تیر", "27 تیر", "28 تیر", "29 تیر", "30 تیر", "31 تیر",
    "1 مرداد", "2 مرداد", "3 مرداد", "4 مرداد", "5 مرداد", "6 مرداد", "7 مرداد", "8 مرداد", "9 مرداد", "10 مرداد", "11 مرداد", "12 مرداد", "13 مرداد", "14 مرداد", "15 مرداد", "16 مرداد", "17 مرداد", "18 مرداد", "19 مرداد", "20 مرداد", "21 مرداد", "22 مرداد", "23 مرداد", "24 مرداد", "25 مرداد", "26 مرداد", "27 مرداد", "28 مرداد", "29 مرداد", "30 مرداد", "31 مرداد",
    "1 شهریور", "2 شهریور", "3 شهریور", "4 شهریور", "5 شهریور", "6 شهریور", "7 شهریور", "8 شهریور", "9 شهریور", "10 شهریور", "11 شهریور", "12 شهریور", "13 شهریور", "14 شهریور", "15 شهریور", "16 شهریور", "17 شهریور", "18 شهریور", "19 شهریور", "20 شهریور", "21 شهریور", "22 شهریور", "23 شهریور", "24 شهریور", "25 شهریور", "26 شهریور", "27 شهریور", "28 شهریور", "29 شهریور", "30 شهریور", "31 شهریور",
    "1 مهر", "2 مهر", "3 مهر", "4 مهر", "5 مهر", "6 مهر", "7 مهر", "8 مهر", "9 مهر", "10 مهر", "11 مهر", "12 مهر", "13 مهر", "14 مهر", "15 مهر", "16 مهر", "17 مهر", "18 مهر", "19 مهر", "20 مهر", "21 مهر", "22 مهر", "23 مهر", "24 مهر", "25 مهر", "26 مهر", "27 مهر", "28 مهر", "29 مهر", "30 مهر",
    "1 آبان", "2 آبان", "3 آبان", "4 آبان", "5 آبان", "6 آبان", "7 آبان", "8 آبان", "9 آبان", "10 آبان", "11 آبان", "12 آبان", "13 آبان", "14 آبان", "15 آبان", "16 آبان", "17 آبان", "18 آبان", "19 آبان", "20 آبان", "21 آبان", "22 آبان", "23 آبان", "24 آبان", "25 آبان", "26 آبان", "27 آبان", "28 آبان", "29 آبان", "30 آبان",
    "1 آذر", "2 آذر", "3 آذر", "4 آذر", "5 آذر", "6 آذر", "7 آذر", "8 آذر", "9 آذر", "10 آذر", "11 آذر", "12 آذر", "13 آذر", "14 آذر", "15 آذر", "16 آذر", "17 آذر", "18 آذر", "19 آذر", "20 آذر", "21 آذر", "22 آذر", "23 آذر", "24 آذر", "25 آذر", "26 آذر", "27 آذر", "28 آذر", "29 آذر", "30 آذر",
    "1 دی", "2 دی", "3 دی", "4 دی", "5 دی", "6 دی", "7 دی", "8 دی", "9 دی", "10 دی", "11 دی", "12 دی", "13 دی", "14 دی", "15 دی", "16 دی", "17 دی", "18 دی", "19 دی", "20 دی", "21 دی", "22 دی", "23 دی", "24 دی", "25 دی", "26 دی", "27 دی", "28 دی", "29 دی", "30 دی",
    "1 بهمن", "2 بهمن", "3 بهمن", "4 بهمن", "5 بهمن", "6 بهمن", "7 بهمن", "8 بهمن", "9 بهمن", "10 بهمن", "11 بهمن", "12 بهمن", "13 بهمن", "14 بهمن", "15 بهمن", "16 بهمن", "17 بهمن", "18 بهمن", "19 بهمن", "20 بهمن", "21 بهمن", "22 بهمن", "23 بهمن", "24 بهمن", "25 بهمن", "26 بهمن", "27 بهمن", "28 بهمن", "29 بهمن", "30 بهمن",
    "1 اسفند", "2 اسفند", "3 اسفند", "4 اسفند", "5 اسفند", "6 اسفند", "7 اسفند", "8 اسفند", "9 اسفند", "10 اسفند", "11 اسفند", "12 اسفند", "13 اسفند", "14 اسفند", "15 اسفند", "16 اسفند", "17 اسفند", "18 اسفند", "19 اسفند", "20 اسفند", "21 اسفند", "22 اسفند", "23 اسفند", "24 اسفند", "25 اسفند", "26 اسفند", "27 اسفند", "28 اسفند", "29 اسفند", "30 اسفند",

];

const availableTimes = [
    "15", "15:30", "16", "16:30", "17", "17:30", "18", "18:30", "19", "19:30",
    "20", "20:30", "21", "21:30", "22", "22:30", "23", "23:30",
]

// doctor	
// '1'
// day	
// '0'
// from_time	
// '15'
// to_time	
// '20'
// _save	
// 'Save'


export default function ScheduleTime(props) {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    // const [times, setTimes] = useState([]);

    // useEffect(() => {
    //     getTimes()
    // }, [])

    // const { id } = useParams();
    // let getTimes = async () => {
    //     let response = await axios.put(`http://188.121.113.74/api/doctor/workday/${id}`)

    //     if (response.status === 200) {
    //         setTimes(response.data)
    //         console.log(response.data)
    //     } else {
    //         alert("Something went wrong")
    //     }
    // }

    // console.log(props.scheduleTime["from_time"].substring(0,2))
    // console.log(props.scheduleTime.from_time.substring(0,2))
    // let availableTimes = []
    // let start = Number(props.scheduleTime.from_time.substring(0,2));
    // let end = Number(props.scheduleTime.to_time.substring(0,2));
    // console.log(props.scheduleTime.from_time.substring(0,2), props.scheduleTime.to_time.substring(0,2))
    // for (let t = start ; t < end ; t++)
    // {
    //     availableTimes.push(t)  
    // }

    return (
        <Card
            // sx={{
            //     display: 'flex',
            //     alignItems: 'center',
            //     pl: 2,
            //     bgcolor: 'background.default',

            //     // example
            //     justifyContent: "center",
            //     height: "auto",
            //     width: "auto",
            // }}
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
                        <Typography> {steps[activeStep]}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack>
                        <MobileStepper
                            variant="none"
                            steps={maxSteps}
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
                            sx={{

                            }}>
                            <Grid container spacing={1}>
                                {availableTimes.map((time) =>
                                (
                                    <Grid item xs={6} sm={4} md={3} lg={2} >
                                        <button><Typography textAlign="center">{time}</Typography></button>
                                    </Grid>
                                ))}
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