import { makeStyles } from "@mui/styles";
import {
  Card,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import "./HotelReservation.css";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useState, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import useAxios from "../../../utils/useAxios";
import { toast } from "react-toastify";
import { useHistory } from "react-router";


const useStyles = makeStyles({
  container: {
    marginTop: "20px",
    paddingTop: "30px",
  },
  card: {
    // display: "fix",
    width: "100%",
    height: "150px",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingInline: "13px",
    marginBottom: "40px",
  },
  card2: {
    width: "100%",
    height: "500px",
    display: "fix",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  card3: {
    width: "100%",
    height: "100px",
    display: "fix",
    paddingInline: "13px",
    marginBottom: "50px",
  },
});

const HotelReservation = () => {
  const location = useLocation();
  const { room, fromTime, toTime, finalPrice } = location.state;
  const [hotel, setHotel] = useState({});
  const [loading, setLoading] = useState(true);
  const [from_time, setFromTime] = useState(
    fromTime.toISOString().split("T")[0]
  );
  const [to_time, setToTime] = useState(toTime.toISOString().split("T")[0]);

  const api = useAxios();
  const { user, authData } = useContext(AuthContext);

  const history = useHistory();

  useEffect(() => {
    if (loading) {
      api
        .get(`api/hotel/${room.hotel}/`)
        .then((res) => {
          setHotel(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
  }, [loading, finalPrice]);

  const reserveRoom = () => {
    console.log(user);

    api
      .post(
        `api/hotel/hotel_reserve/`,
        {
          from_date: from_time,
          to_date: to_time,
          customer: user.id,
          hotel_room: room.id,
        },
        {
          headers: {
            Authorization: "Bearer " + authData?.access,
          },
        }
      )
      .then((res) => {
        toast.success("هتل با موفقیت رزرو شد", {
          position: "top-right",
          autoClose: 5000,
        });

        history.push("/");
      })
      .catch((err) => {
        toast.error("مشکلی پیش آمده است", {
          position: "top-right",
          autoClose: 5000,
        });
      });
  };

  const classes = useStyles();

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <div>
              <h1 className="HotelName">{hotel.hotel_name}</h1>
            </div>
            <div className="HotelReservationInfo">
              <div className="HotelStars">
                <div>{hotel.hotel_stars} ستاره</div>
              </div>
              <div className="HotelLocation">
                <div>
                  <span>آدرس : </span>
                  <span className="Adr">
                    {hotel.province} {hotel.city} {hotel.address}
                  </span>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
      <Card className={classes.card3}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <div className="PricenAndButton">
              <div className="Price">
                <div className="PriceTitle">
                  {" "}
                  قیمت نهایی : <span>{finalPrice}</span>
                </div>
              </div>
              <div className="Button">
                <button className="ButtonReserve" onClick={reserveRoom}>
                  {" "}
                  رزرو و تایید نهایی
                </button>
              </div>
            </div>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default HotelReservation;
