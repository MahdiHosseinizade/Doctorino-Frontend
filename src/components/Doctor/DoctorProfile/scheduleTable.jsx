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



export default function ScheduleTime({doctor, ...props}) {

    const days = [
        [0,'شنبه'],
        [1,'یکشنبه'],
        [2,'دوشنبه'],
        [3,'سه شنبه'],
        [4,'چهارشنبه'],
        [5,'پنجشنبه'],
        [6,'جمعه'],
    ];
    
    let full_times =
    {0: [],1: [],2: [],3: [],4: [],5: [],6: [],}

    const [fullTimes, setFullTimes] = useState({0: [],1: [],2: [],3: [],4: [],5: [],6: [],})
    console.log(doctor?.work_periods)
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = days.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    let data = {}

    for (let time in doctor?.work_periods) {
        ///
        // console.log(time.from_time, time.to_time)
        // let final_time = `${Number(time.to_time.substring(0,2))-Number(time.from_time.substring(0,2)) == 0 ? "00" : Number(time.to_time.substring(0,2))-Number(time.from_time.substring(0,2)) }:${Number(time.to_time.substring(3,5))-Number(time.from_time.substring(3,5)) == 0 ? "00" : Number(time.to_time.substring(3,5))-Number(time.from_time.substring(3,5))}:${Number(time.to_time.substring(7,9))-Number(time.from_time.substring(7,9)) == 0 ? '00' : Number(time.to_time.substring(7,9))-Number(time.from_time.substring(7,9))}`;
        // console.log(final_time)
        setFullTimes((perv) => {
            let date = {}
        })
        // full_times[0].push([time.from_time, time.to_time])
        // data[time]
    }
    console.log(full_times);

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
                        <Typography> {days[activeStep]}</Typography>
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack>
                        <MobileStepper
                            variant="none"
                            days={maxSteps}
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
                                {/* {full_times.map((time) =>
                                (
                                    <Grid item xs={6} sm={4} md={3} lg={2} >
                                        <button><Typography textAlign="center">{time}</Typography></button>
                                    </Grid>
                                ))} */}
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