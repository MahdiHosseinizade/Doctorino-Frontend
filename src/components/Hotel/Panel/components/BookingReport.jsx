import React, { useContext, useState, useEffect } from 'react';
import useAxios from '../../../../utils/useAxios';
import AuthContext from '../../../../context/AuthContext';
import { Box, Button, Card, CardContent, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, Typography } from '@mui/material';
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import theme from '../../../../assets/theme/defaultTheme';
import { Calendar } from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import './BookingReportCss.css';
import { makeStyles } from "@mui/styles";
import moment from 'jalali-moment';
import PersonIcon from '@mui/icons-material/Person';
import FeedIcon from '@mui/icons-material/Feed';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';


const useStyles = makeStyles({
    reserveCard: {
        margin: "7px",
        border: `1px solid ${theme.palette.hotel.main}`,
    },
});


const SFormControl = styled(FormControl)({
    "& .MuiOutlinedInput-root": {
        // set the color of the input when focused
        "&:hover fieldset": {
            borderColor: theme.palette.hotel.main,
        }
    },

    // focused style
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.hotel.main,
        borderWidth: "1px",
    },
    // set the label color when focused
    "& .MuiInputLabel-root": {
        color: theme.palette.grey[500],
    },
    // style the dropdown icon
    "& .MuiSelect-icon": {
        color: theme.palette.hotel.contrastText,
        backgroundColor: theme.palette.hotel.main,
        borderRadius: "50%",
    },
});

const SSelect = styled(Select)({
    background: "#fefefe",
});

const SMenuItem = styled(MenuItem)({
    "&:hover": {
        backgroundColor: theme.palette.hotel.light,
    },
    // style when selected
    "&.Mui-selected": {
        backgroundColor: theme.palette.hotel.light,
    },
    "&.Mui-selected:hover": {
        backgroundColor: "transparent",
    }
})

const now = moment();
now.locale("fa");

export default function BookingReport(props) {

    const [loading, setLoading] = useState(true);
    const [hotel, setHotel] = useState("");
    const [askHotelIdDialog, setAskHotelIdDialog] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [date, setDate] = useState({ day: now.jDay() + 1, month: now.jMonth() + 1, year: now.jYear() });
    const [reservations, setReservations] = useState([]);

    const { user, authData } = useContext(AuthContext);

    const classes = useStyles();

    const api = useAxios();

    function getReservations() {

        if (hotel != null && hotel != "" && typeof hotel === "number") {
            api.get(`/api/hotel/${hotel}/${date.year}/${date.month}/${date.day}/reservations/`, {
                "headers": {
                    "Authorization": "Bearer " + authData?.access
                }
            }).then(res => {
                setReservations(res.data);
            }).catch(err => {
                toast.error("مشکلی در دریافت اطلاعات رزرو پیش آمده.", {
                    position: "top-right",
                    autoClose: 5000,
                })
            })
        } else {
            toast.warning("لطفا هتل مورد نظر خود را انتخاب کنید.", {
                position: "top-right",
                autoClose: 3000,
            })

            setAskHotelIdDialog(true);
        }
    }

    function handleHotel(event) {
        setHotel(event.target.value);
    }

    function getDate(date) {
        let [day, month, year] = date.split("-");
        return day + "/" + month + "/" + year;
    }

    function fetchData() {
        api
            .get("/api/hotel/owner/hotel-list/", {
                headers: {
                    Authorization: `Bearer ${authData.access}`,
                },
            })
            .then((res) => {
                setHotels(res.data)
                setAskHotelIdDialog(true);
            })
            .catch((err) => console.error(err));

        setLoading(false);
    }

    useEffect(() => {
        if (loading) {
            fetchData()
        }
    }, [loading, hotels, askHotelIdDialog]);

    return (
        <Container sx={{
            marginTop: "20px",
            marginLeft: "20px",
        }}>
            <Box>
                <Box>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Calendar
                                width="100%"
                                value={date}
                                colorPrimary="#3f51b5"
                                colorPrimaryLight='#757ce8'
                                onChange={setDate}
                                shouldHighlightWeekends
                                locale="fa"
                            />
                        </Grid>

                        <Grid item xs={12} md={12}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                sx={{
                                    width: { md: "60%", xs: "80%" },
                                    bgcolor: "#3f51b5",
                                    maxWidth: "350px",
                                }}
                                onClick={getReservations}
                                variant="contained"
                            >
                                نمایش
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={12}
                            sx={{
                                display: "flex",
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                sx={{
                                    width: { md: "60%", xs: "80%" },
                                    maxWidth: "350px",
                                }}
                                variant="contained"
                                color="hotel"
                                onClick={() => setAskHotelIdDialog(true)}
                            >
                            انتخاب هتل
                            </Button>
                        </Grid>
                    </Grid>
                </Box>


                <Box sx={{
                    marginTop: "50px",
                    marginBottom: "50px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    overflowY: "scroll",
                    maxHeight: "500px",
                    minHeight: "200px",
                    '&::-webkit-scrollbar': { display: 'none' }
                }}>
                    {reservations?.map((reserve, index) => (
                        <Card key={index} className={classes.reserveCard}>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={1} md={1}>
                                        {reserve.id}
                                    </Grid>
                                    <Grid item xs={12} md={5.5}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box
                                                    ml={1}
                                                    sx={{
                                                        borderBottom: 1,
                                                        boredrColor: `${theme.palette.hotel.main}`,
                                                        width: "20%",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Typography variant="body1">
                                                        اطلاعات شخص
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <PersonIcon />
                                                {reserve.customer.first_name + " " + reserve.customer.last_name}
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <FeedIcon />
                                                {reserve.customer["national-code"]}
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                <PhoneEnabledIcon />
                                                {reserve.customer["phone-number"]}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} md={5.5}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <Box
                                                    ml={1}
                                                    sx={{
                                                        borderBottom: 1,
                                                        boredrColor: `${theme.palette.hotel.main}`,
                                                        width: "20%",
                                                        display: "flex",
                                                    }}
                                                >
                                                    <Typography variant="body1">
                                                        اطلاعات اتاق
                                                    </Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                از تاریخ {getDate(reserve.from_date)}
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                تا تاریخ {getDate(reserve.to_date)}
                                            </Grid>
                                            <Grid item xs={12} md={12}
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center'
                                                }}
                                            >
                                                شماره اتاق {reserve.hotel_room}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
            </Box>

            <Dialog open={askHotelIdDialog} onClose={() => setAskHotelIdDialog(false)}>
                <DialogTitle>هتل مورد نظر را انتخاب کنید.</DialogTitle> <br />
                <DialogContent>
                    <SFormControl fullWidth>
                        <InputLabel>هتل ها</InputLabel>
                        <SSelect
                            value={hotel}
                            label="هتل ها"
                            onChange={handleHotel}
                        >
                            {hotels?.map(
                                ({ id, hotel_name }, ind) =>
                                    ind >= 0 && (
                                        <SMenuItem key={id} value={id}>
                                            <ListItemText primary={hotel_name} />
                                        </SMenuItem>
                                    )
                            )}
                        </SSelect>
                    </SFormControl>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="hotel"
                        onClick={() => {
                            if (hotel != null && hotel != "" && typeof hotel == "number") {
                                setAskHotelIdDialog(false);
                            } else {
                                toast.info("لطفا هتل را انتخاب کنید.", {
                                    position: "top-right",
                                    autoClose: 5000,
                                })
                            }
                        }}>ادامه</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}