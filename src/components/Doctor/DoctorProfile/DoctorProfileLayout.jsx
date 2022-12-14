import React from "react";
import { Container, CssBaseline, Grid, Paper } from "@mui/material";
import DoctorProfile from "./Profile";
import ScheduleTime from "./scheduleTable";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavBar from "../../NavBar/newNavBar"
import { Schedule } from "@mui/icons-material";

export default function DoctorProfileLayout() {

    const { id } = useParams();
    const [doctor, setDoctor] = useState();
    const [scheduleTime, setScheduleTime] = useState();
    const [loading, setLoading] = useState(true);

    function fetchData1() {
        axios.get(`http://188.121.113.74/api/doctor/${id}/?`)
            .then(res => {
                setDoctor(res.data);
            })
            .catch(err => console.log(err))

        setLoading(false);
    }

    function fetchData2() {
        axios.get(`http://188.121.113.74/api/doctor/${id}/workday/?`)
            .then(res => {
                setScheduleTime(res.data);
            })
            .catch(err => console.log(err))

        setLoading(false);
    }
    // console.log(`it's that -> ${"\n"} ${console.log(scheduleTime)}`)
    useEffect(() => {

        if (loading) {
            fetchData1();
            fetchData2();
        }

    }, [loading, doctor, scheduleTime]);


    return (
        <Container>
            <NavBar />
            <CssBaseline />
            <Grid container spacing={4}>
                <Grid

                    xs={7}
                    md={7}
                    lg={7}
                    item
                    sx={{
                        Width: "100%",
                        display: "static",
                        height: "auto",
                        alignItems: "center",
                        boxSizing: " border-box"
                    }}
                >
                    <DoctorProfile doctor={doctor} />
                </Grid>

                <Grid
                    item

                    xs={4.5}
                    md={4.5}
                    lg={4.5}
                    sx={{
                        mr: "10px",
                        Width: "100%",
                        display: "static",
                        position: "static",
                        flexDirection: "row",
                        height: "auto",
                        alignItems: "center",
                        boxSizing: " border-box"
                    }}
                >
                    <ScheduleTime scheduleTime={[scheduleTime, doctor]}/>
                </Grid>
            </Grid>
        </Container >
    );
}
