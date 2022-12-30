import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Button,
  Container,
  Grid,
  Typography,
  TextField,
} from "@mui/material";
import AvailableRooms from "./AvailableRooms";
import AuthContext from "../../../context/AuthContext";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Hotel.css";
import { Box } from "@mui/system";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Star } from "@mui/icons-material";
import { MdPool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdDinnerDining } from "react-icons/md";
import { BiCoffeeTogo, BiWifi } from "react-icons/bi";
import { FaChild } from "react-icons/fa";
import { RiBilliardsFill } from "react-icons/ri";
import { AiFillSafetyCertificate } from "react-icons/ai";

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    // display: "fix",
    width: "100%",
    height: "200px",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    paddingInline: "13px",
    marginBottom: "40px",
  },
  featureCard: {
    width: "750px",
    height: "100%",
    display: "fix",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  availableRoomsCard: {
    textAlign: "center",
    width: "350px",
    height: "95%",
    display: "fix",
    paddingInline: "13px",
    marginBottom: "20px",
    marginRight: "215px",
  },
  hotel_image: {
    position: "absolute",
    right: "5px",
    width: "90%",
    height: "90%",
    marginBottom: "30px",
    border: "2px solid #ccc",
    borderRadius: "10%",
    maxHeight: "250px",
    maxWidth: "250px",
  },
  toTimeDatePicker: {
    marginTop: "20px",
  },
  button: {
    width: "80%",
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  rulesCard: {
    marginBottom: "20px",
    width: "100%",
  },
});
const Hotel = () => {
  const classes = useStyles();
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);

  const { authTokens } = useContext(AuthContext);
  const { id } = useParams();
  const [hotel, setHotel] = useState();
  console.log(hotel);

  useEffect(() => {
    getHotel();
  }, []);

  const getHotel = () => {
    axios
      .get(`http://188.121.113.74/api/hotel/${id}/`)
      .then((res) => {
        setHotel({ ...res.data });
      })
      .catch((err) => console.log(err));
  };
  // I want to implement features of hotel with icons

  const iconsFeatures = [
    { icon: <MdPool />, title: "استخر" },
    { icon: <CgGym />, title: "سالن بدن سازی" },
    { icon: <MdDinnerDining />, title: "سلف سرویس" },
    { icon: <BiCoffeeTogo />, title: "کافی شاپ" },
    { icon: <FaChild />, title: "اتاق کودک" },
    { icon: <BiWifi />, title: "وای فای رایگان" },
    { icon: <RiBilliardsFill />, title: "سالن بیلیارد" },
    { icon: <AiFillSafetyCertificate />, title: "صندوق امانت" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("fromTime: ", fromTime.toISOString().split("T")[0]);
    console.log("toTime: ", toTime.toISOString().split("T")[0]);
    // console.log("test time: ", fromTime.toISOString().split("T")[0]);
    await axios
      .get(
        `http://188.121.113.74/api/hotel/${id}/${fromTime.toISOString().split("T")[0]}/${toTime.toISOString().split("T")[0]}/available_rooms/`,
        // {
        //   headers: {
        //     Authorization: `Bearer ${authTokens.access}`,
        //   },
        // }
      )
      .then((response) => {
        console.log("the response from fetching the available rooms: ", response.data);
        setAvailableRooms(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card className={classes.card}>
            <Grid container sx={{ marginTop: "10px" }}>
              <Grid
                item
                xs={12}
                lg={6}
                sx={{
                  display: "flex",
                  // position: "sticky",
                  top: "0",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <CardMedia
                  // sx={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px",marginRight: "20px"}}
                  component="img"
                  className={classes.hotel_image}
                  image={hotel?.cover_image}
                  alt="hotel image"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <CardContent sx={{ marginTop: "20px" }}>
                  <Box>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={12}>
                        {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "20px", display: "flex" }}
                        >
                          <PlaceOutlinedIcon
                            color="warning"
                            sx={{ marginBottom: "-2px" }}
                          />
                          <span> آدرس : </span>
                          {hotel?.address}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ fontSize: "18px", display: "inline" }}
                      >
                        <VerifiedIcon
                          color="warning"
                          sx={{ marginBottom: "-7px" }}
                        />
                        <span> </span> هتل
                      </Typography>

                      <Typography
                        noWrap
                        variant="subtitle1"
                        sx={{
                          fontSize: "17px",
                          display: "inline",
                          marginLeft: "10px",
                        }}
                      >
                        {hotel?.hotel_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Typography
                        noWrap
                        variant="subtitle2"
                        sx={{ fontSize: "18px", display: "inline" }}
                      >
                        <Star color="warning" sx={{ marginBottom: "-7px" }} />
                      </Typography>

                      <Typography
                        noWrap
                        variant="subtitle1"
                        sx={{
                          fontSize: "17px",
                          display: "inline",
                          marginLeft: "10px",
                        }}
                      >
                        {hotel?.hotel_stars}
                        <span> </span> ستاره
                      </Typography>
                    </Grid>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.featureCard}>
            <div>
              {/* <h2 className="h2_emkanat">امکانات و ویژگی ها</h2> */}
              <CardHeader
                title="امکانات و ویژگی ها"
                className="h2_emkanat"
                sx={{ fontSize: "20px" }}
              />
              <CardContent>
                {/* امکانات و ویژگی ها */}
                {/* show feature of hotels */}
                {/* <Grid container spacing={2}>
                  <Grid item xs={12} md={6}> */}
                <Typography
                  noWrap
                  variant="subtitle2"
                  sx={{
                    fontSize: "18px",
                    // display: "inline"
                  }}
                >
                  {/* {console.log(hotel?.features)} */}
                  {hotel?.features &&
                    hotel?.features.map((item, index) => {
                      return iconsFeatures.map((icon, index) => {
                        if (item.title === icon.title) {
                          return (
                            <p className="features_hotel" key={index}>
                              <div className="features_icon">{icon.icon}</div>{" "}
                              {item.title}
                            </p>
                          );
                        }
                      });
                      // <p className="features_hotel" key={index}>{item.title}</p>
                    })}
                </Typography>
                {/* </Grid>
                </Grid> */}
              </CardContent>
            </div>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card className={classes.availableRoomsCard}>
            <form onSubmit={handleSubmit}>
              {/* <h2 className="roomReservation">مشاهده اتاق های موجود</h2> */}
              {/* <CardHeader
                title="مشاهده اتاق های موجود"
                className="roomReservation"
                sx={{ fontSize: "20px" }}
              /> */}
              <CardContent>
                <LocalizationProvider dateAdapter={AdapterJalali}>
                  <DatePicker
                    // sx={{marginButtom: "20px"}}
                    label="تاریخ ورود"
                    mask="____/__/__"
                    value={fromTime}
                    onChange={(newValue) => setFromTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <LocalizationProvider
                  dateAdapter={AdapterJalali}
                  sx={{ marginTop: "20px" }}
                >
                  <DatePicker
                    label="تاریخ خروج"
                    // className={classes.toTimeDatePicker}
                    // sx={{marginTop: "20px"}}
                    mask="____/__/__"
                    value={toTime}
                    onChange={(newValue) => setToTime(newValue)}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </CardContent>
              <CardActions>
                {/* <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClick}
                  sx={{ width: "100%" }}
                >
                  مشاهده اتاق ها
                </Button> */}
                <Grid item md={12} xs={12}>
                  <button className={classes.button} type="submit">
                    مشاهده اتاق های موجود
                  </button>
                </Grid>
              </CardActions>
            </form>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
            {availableRooms && <AvailableRooms availableRooms={availableRooms} fromTime={fromTime} toTime={toTime}/> }
        </Grid>
        <Grid item xs={12} md={12}>
          <Card className={classes.rulesCard}>
            <div>
              {/* <h2 className="h2_emkanat">قوانین هتل</h2> */}
              <CardHeader
                title="قوانین هتل"
                className="h2_emkanat"
                sx={{ fontSize: "20px" }}
              />
              <CardContent>
                <Grid container spacing={3.5}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      noWrap
                      variant="subtitle2"
                      sx={{ fontSize: "18px", display: "inline" }}
                    >
                      <p className="hotel_rules">{hotel?.rules}</p>
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Hotel;
