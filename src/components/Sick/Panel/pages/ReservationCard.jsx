import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../../../utils/useAxios";
import AuthContext from "../../../../context/AuthContext";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { makeStyles } from "@mui/styles";
import moment from "jalali-moment";
import theme from "../../../../assets/theme/defaultTheme";

const useStyles = makeStyles({
  card: {
    display: "fix",
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
  },
});

const AppointmentCard = ({ reservation, deleteReservation }) => {

  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState(null);
  const [room, setRoom] = useState(null);
  const { user, authData } = useContext(AuthContext);
  const api = useAxios();

  useEffect(() => {
    if (loading) {
      api
        .get(`/api/hotel/room/`)
        .then((res) => {
          const hotelRoom = res.data.find((hotelRoom) => {
            return hotelRoom.id === reservation.hotel_room;
          });
          setRoom(hotelRoom);
          api
            .get(`api/hotel/${hotelRoom.hotel}/`)
            .then((response) => {
              setHotel(response.data);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
  }, [loading,
    reservation.hotel_room,
    api,
  ]);

  // function getTime(time) {
  //   const hour = parseInt(time.split(":")[0]);
  //   const minute = time.split(":")[1];

  //   return `${hour}:${minute}`;
  // }

  function getDate(date) {
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
      12: "اسفند",
    };

    const newDate = moment(date);
    const month = month_map[newDate.month() + 1];
    return `${newDate.format("DD")} ${month} ${newDate.year()}`;
  }

  function validateDate(is_from) {
    let date = moment(reservation?.to_time);
    if (is_from) 
      date = moment(reservation?.from_time);
    const newDate = moment(date);

    const now = moment();

    now.locale("fa");

    if (newDate.format("YYYY/MM/DD") < now.format("YYYY/MM/DD")) {
      return false;
    } else {
      return true;
    }
  }

  const classes = useStyles();

  return (
    <Card
      className={classes.card}
      sx={{
        backgroundColor: "#bfdbfe",
        border: "1px solid darkblue",
        borderRadius: "10px",
        boxShadow: "0 0 5px 0 rgba(0,0,0,0.2)",
      }}
    >
      <Grid container sx={{ marginTop: "10px" }}>
        {/* <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", position: "sticky", justifyContent: "center" }}
        >
          <CardMedia
            component="img"
            className={classes.doctor_image}
            image={room?.image}
            alt="doctor image"
          />
        </Grid> */}
        <Grid item xs={12} md={9}>
          <CardContent>
            <Box>
              <Grid container spacing={3.5}>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontSize: "30px", display: "flex" }}
                  >
                    هتل {hotel?.hotel_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography
                    variant="subtitle1"
                    color={"text.secondary"}
                    sx={{
                      fontSize: 20,
                    }}
                  >
                    {room?.room_title}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                  <Typography variant="body2" sx={{ fontSize: "15px" }}>
                    <PlaceOutlinedIcon
                      sx={{ marginBottom: "-7px", color: "darkblue" }}
                    />
                    <span> </span>
                    {hotel?.province} - {hotel?.city}: {hotel?.address}
                    {/* <span> </span>
                    {room?.clinic_address} */}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{ display: "flex", flexDirection: "row" }}
                >
                  <Typography variant="body2" sx={{ fontSize: "20px" }}>
                    <CalendarMonthIcon
                      sx={{
                        marginBottom: "-7px",
                        color: validateDate(true) ? "darkblue" : "darkred",
                      }}
                    />
                    <span> </span>
                    از تاریخ {getDate(reservation?.from_date)}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="body2" sx={{ fontSize: "20px" }}>
                    <CalendarMonthIcon
                      sx={{
                        marginBottom: "-7px",
                        color: validateDate(false) ? "darkblue" : "darkred",
                      }}
                    />
                    <span> </span>
                    تا تاریخ {getDate(reservation?.to_date)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Grid>
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button
            variant="contained"
            onClick={() => deleteReservation(reservation.id)}
            sx={{
              marginBottom: "15px",
              marginLeft: "15px",
              color: "#fff",
              backgroundColor: "darkblue",
              borderRadius: "7px",
              fontSize: "20px",
            }}
          >
            لغو رزرو
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
};

export default AppointmentCard;
