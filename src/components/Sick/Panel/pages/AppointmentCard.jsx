import React, { useState, useEffect, useContext } from 'react'
import useAxios from '../../../../utils/useAxios';
import AuthContext from '../../../../context/AuthContext';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { makeStyles } from "@mui/styles";
import moment from "jalali-moment";


const useStyles = makeStyles({
    card: {
        display: 'fix',
        paddingInline: "13px",
        marginBottom: "20px",
    },
    doctor_image: {
        width: "250px",
        height: "250px",
        margin: "20px",
        border: "7px solid darkblue",
        borderRadius: "50%",
        maxHeight: "250px",
        maxWidth: "250px",
        position: "static",
        display: "inline-table",
        objectFit: "cover",
    }
});



const AppointmentCard = ({ appointment, deleteAppointment }) => {

    const [loading, setLoading] = useState(true);
    const [doctor, setDoctor] = useState(null);

    const { user, authData } = useContext(AuthContext);
    const api = useAxios();

    useEffect(() => {
        if (loading) {
            api.get(`/api/doctor/${appointment.doctor}/`)
                .then(res => {
                    setDoctor(res.data)
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })

            setLoading(false)
        }
    }, [loading])

    function getTime(time) {

        const hour = parseInt(time.split(":")[0]);
        const minute = time.split(":")[1];

        return `${hour}:${minute}`
    }

    function getDate() {

        const month_map = {
            1: "فروردین",
            2: "اردیبهشت",
            3: "خرداد",
            4: "تیر",
            5: "مرداد",
            6: "شهریور",
            7: "مهر",
            8: "آبان",
            9: "آذر",
            10: "دی",
            11: "بهمن",
            12: "اسفند"
        }

        const date = moment(appointment?.date_reserved);

        const month = month_map[date.month() + 1];

        return `${date.format("DD")} ${month} ${date.year()}`
    }

    function validateDate() {

        const date = moment(appointment?.date_reserved);
        const time = appointment?.from_time;

        const now = moment();

        now.locale("fa");

        if (date.format("YYYY/MM/DD") < now.format("YYYY/MM/DD")) {
            return false
        } else if (date.format("YYYY/MM/DD") === now.format("YYYY/MM/DD")) {
            if (getTime(time) < now.format("HH:mm:ss")) {
                return false
            } else {
                return true
            }
        } else {
            return true
        }
    }

    const classes = useStyles();

    return (
        <Card className={classes.card} sx={{
            backgroundColor: "#fff",
            border: "1px solid darkblue",
            borderRadius: "10px",
            boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)",
        }}>
            <Grid container sx={{ marginTop: "10px" }}>
                <Grid item xs={6} md={4} sx={{ display: 'flex', position: "sticky", justifyContent: 'center' }}>
                    <CardMedia
                        component="img"
                        className={classes.doctor_image}
                        image={doctor?.image}
                        alt="doctor image"
                    />
                </Grid>
                <Grid item xs={6} md={6}>
                    <CardContent>
                        <Box>
                            <Grid container spacing={3.5}>
                                <Grid item xs={12} md={12} >
                                    <Typography variant="subtitle2" sx={{ fontSize: "30px", display: "flex" }}>
                                        دکتر {doctor?.user.first_name} {doctor?.user.last_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <Typography
                                        variant="subtitle1"
                                        color={'text.secondary'}
                                        sx={{
                                            fontSize: 20,
                                        }}
                                    >
                                        {doctor?.education} {doctor?.specialties.map(({ id, name }, index) => {
                                            if (index !== doctor?.specialties.length - 1) {
                                                return name + "، "
                                            } else {
                                                return name
                                            }
                                        })}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12} >
                                    <Typography variant="body2" sx={{ fontSize: "15px", }}>
                                        <PlaceOutlinedIcon sx={{ marginBottom: "-7px", color: "darkblue" }} /><span>     </span>{doctor?.city}
                                        <span>     </span>{doctor?.clinic_address}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="body2" sx={{ fontSize: "20px", }}>
                                        <CalendarMonthIcon sx={{ marginBottom: "-7px", color: validateDate() ? "darkblue" : "darkred" }} /><span>     </span>
                                        {getDate()}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Typography variant="body2" sx={{ fontSize: "20px", }}>
                                        <AccessTimeIcon sx={{ marginBottom: "-7px", color: validateDate() ? "darkblue" : "darkred" }} /><span>     </span>
                                        از ساعت <b>{appointment && getTime(appointment?.from_time)}
                                        </b> تا <b>{appointment && getTime(appointment?.to_time)}</b>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Grid>
                <Grid item xs={12} md={2} sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                }}>
                    <Button
                        variant="contained"
                        onClick={() => deleteAppointment(appointment.id)}
                        sx={{
                            marginBottom: "15px",
                            marginLeft: "15px",
                            color: "#fff",
                            backgroundColor: "darkblue",
                            borderRadius: "7px",
                            fontSize: "20px",
                        }}
                    >
                        لغو نوبت
                    </Button>
                </Grid>
            </Grid>
        </Card >
    )
}

export default AppointmentCard
