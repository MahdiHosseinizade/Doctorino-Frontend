import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CardActions,
  Container,
  Grid,
  Typography,
  TextField,
  Rating,
  Button,
} from "@mui/material";
import './Hotel.css';
import AvailableRooms from "./AvailableRooms";
import AdapterJalali from "@date-io/date-fns-jalali";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Hotel.css";
import { Box } from "@mui/system";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
// import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// import VerifiedIcon from "@mui/icons-material/Verified";
import { Star } from "@mui/icons-material";
import { MdPool } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdDinnerDining } from "react-icons/md";
import { BiCoffeeTogo, BiWifi } from "react-icons/bi";
import { FaChild } from "react-icons/fa";
import { RiBilliardsFill } from "react-icons/ri";
import { AiFillSafetyCertificate } from "react-icons/ai";
import NavBar from "../../NavBar/newNavBar";
import theme from "../../../assets/theme/defaultTheme"
import NotFound from "../../../pages/NotFoundPage";
import * as Yup from "yup";
import { useFormik } from "formik";
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import useAxios from '../../../utils/useAxios';
import AuthContext from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import ReviewCard from './ReviewCard';

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    marginBottom: "40px",
  },
  featureCard: {
    width: "100%",
    height: "100%",
    display: "flex",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  reviewCard: {
    display: 'fix',
    marginBottom: "20px",
  },
  reviewFormCard: {
    width: "100%",
    height: "100%",
  },
  availableRoomsCard: {
    textAlign: "center",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  hotel_image: {
    right: "5px",
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


const formValue = {
  score: 0,
  text: "",
};

const validationSchema = Yup.object({
  score: Yup.number().required("امتیاز را وارد کنید."),
  text: Yup.string().required("نظر خود را وارد کنید."),
});


const Hotel = () => {
  // let date = new Date();
  // date = moment(date).locale("fa").format("YYYY/MM/DD").split("/");
  // console.log("the date", date.split("/"));
  // console.log("this is the day", date.jDay());
  // const [fromTime, setFromTime] = useState({day: 9, month: 10, year: 1401});
  // const [fromTime, setFromTime] = useState({day: date[2], month: date[1], year: date[0]});
  // const [toTime, setToTime] = useState({day: date[2], month: date[1], year: date[0]});
  // const [toTime, setToTime] = useState({day: 10, month: 10, year: 1401});
  // const [selectedDayRange, setSelectedDayRange] = useState({
  //   fromTime: null,
  //   toTime: null,
  // });
  const classes = useStyles();
  const [fromTime, setFromTime] = useState(new Date());
  const [toTime, setToTime] = useState(new Date());
  const [availableRooms, setAvailableRooms] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const { id } = useParams();
  const [hotel, setHotel] = useState();
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = useAxios();
  const { user, authData } = useContext(AuthContext);

  useEffect(() => {
    if (loading && id) {
      api.get(`/api/hotel/${id}/reviews/?page_size=5`)
        .then(res => {
          setNextPageUrl(res.data.links.next);
          setReviews(res.data.results);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });

      getHotel();
    }
  }, [loading, reviews]);

  const getHotel = () => {
    axios
      .get(`http://188.121.113.74/api/hotel/${id}/`)
      .then((res) => {
        setHotel({ ...res.data });
        setHotel({ ...res.data });
      })
      .catch((err) => {
        if (err.response.status === 404) {
          setLoaded(false);
        }
        console.log(err)
      });
  };

  const handleMoreReviews = () => {
    if (nextPageUrl) {
      axios.get(nextPageUrl,
        {
          headers: {
            Authorization: `Bearer ${authData?.access}`
          }
        }
      ).then(res => {
        console.log("next page", res.data);
        setNextPageUrl(res.data.links.next);
        setReviews([...reviews, ...res.data.results]);
      }).catch(err => console.log(err))
    } else {
      toast.info("موردی برای نمایش وجود ندارد.");
    }
  }

  const formik = useFormik({
    initialValues: formValue,

    onSubmit: (values) => {
      api.post("/api/hotel/reviews/", {
        hotel: id,
        voter: user.id,
        score: values.score,
        text: values.text,
      }, {
        headers: {
          Authorization: `Bearer ${authData?.access}`
        }
      }).then((res) => {
        console.log("haha", res.data);
        setReviews([...reviews, {
          hotel: id,
          voter: {
            first_name: user.first_name,
            last_name: user.last_name,
          },
          score: values.score,
          text: values.text,
        }]);

        toast.success("نظر شما با موفقیت ثبت شد.", {
          position: "top-right",
          autoClose: 5000,
        });
        formik.resetForm();
      }).catch((err) => {
        toast.error("مشکلی در ثبت نظر پیش آمد.", {
          position: "top-right",
          autoClose: 5000,
        });
      });
    },
    validationSchema: validationSchema,
  });

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
    await axios
      .get(
        `http://188.121.113.74/api/hotel/${id}/${fromTime.toISOString().split("T")[0]
        }/${toTime.toISOString().split("T")[0]}/available_rooms/`
      )
      .then((response) => {
        console.log(
          "the response from fetching the available rooms: ",
          response.data
        );
        setAvailableRooms(response.data);
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      {loaded ?
        <Container className={classes.container}>
          <NavBar bgColor={theme.palette.hotel} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Card className={classes.card}>
                <Grid container sx={{ marginTop: "10px" }}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sx={{
                      display: "flex",
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
                  <Grid item xs={12} md={8}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <CardContent>
                      <Grid container rowSpacing={3.5}>
                        <Grid item xs={12} md={12}>
                          {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "20px" }}
                          >
                            {`آدرس `}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "18px",
                              marginTop: "5px",
                            }}
                          >
                            <PlaceOutlinedIcon
                              color="warning"
                              sx={{ marginBottom: "-7px" }}
                            /> <span>    </span>
                            {hotel?.address}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "18px" }}
                          >
                            {`نام هتل `}
                          </Typography>

                          <Typography
                            variant="body2"
                            sx={{
                              fontSize: "18px",
                              marginTop: "5px",
                            }}
                          >
                            <VerifiedIcon
                              color="warning"
                              sx={{ marginBottom: "-7px" }}
                            /> <span>    </span>
                            {hotel?.hotel_name}
                          </Typography>
                        </Grid>

                        <Grid item xs={12} md={12}>
                          <Typography
                            variant="subtitle2"
                            sx={{ fontSize: "18px", display: "inline" }}
                          >
                            <Star color="warning" sx={{ marginBottom: "-7px" }} /> <span>    </span>
                          </Typography>

                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: "17px",
                              display: "inline",
                            }}
                          >
                            <b>{hotel?.hotel_stars}</b> <span>  </span>
                            ستاره
                          </Typography>

                        </Grid>
                      </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Card className={classes.featureCard}>
                <div>
                  <CardHeader
                    title="امکانات و ویژگی ها"
                    className="h2_emkanat"
                    sx={{ fontSize: "20px" }}
                  />
                  <CardContent>
                    <Typography
                      noWrap
                      variant="subtitle2"
                      sx={{
                        fontSize: "18px",
                      }}
                    >
                      {hotel?.features &&
                        hotel?.features.map((item, index) => {
                          return iconsFeatures.map((icon, index) => {
                            if (item.title === icon.title) {
                              return (
                                <div className="features_hotel" key={index}>
                                  <div className="features_icon">{icon.icon}</div>{" "}
                                  {item.title}
                                </div>
                              );
                            }
                          });
                        })}
                    </Typography>
                  </CardContent>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card className={classes.availableRoomsCard}>
                <form onSubmit={handleSubmit}>
                  <CardContent>
                    <LocalizationProvider dateAdapter={AdapterJalali}>
                      <DatePicker
                        label="تاریخ ورود"
                        mask="____/__/__"
                        value={fromTime}
                        onChange={(newValue) => setFromTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>

                    <Grid item xs={6} md={6}>
                      <br />
                    </Grid>

                    <LocalizationProvider
                      dateAdapter={AdapterJalali}
                      sx={{ marginTop: "20px" }}
                    >
                      <DatePicker
                        label="تاریخ خروج"
                        mask="____/__/__"
                        value={toTime}
                        onChange={(newValue) => setToTime(newValue)}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {/* <Grid item xs={6} md={6}> */}
                    {/* <DatePicker
                  inputPlaceholder="تاریخ ورود"
                  value={fromTime}
                  colorPrimary="#3f51b5"
                  colorPrimaryLight="#757ce8"
                  // onChange={(newValue) => setFromTime(newValue)}
                  onChange={setFromTime}
                  shouldHighlightWeekends
                  locale="fa"
                  calendarPopperPosition="bottom"
                  calendarSelectedDayClassName="selected-day"
                  calendarClassName="custom-calendar"
                />
                <DatePicker
                  inputPlaceholder="تاریخ خروج"
                  value={toTime}
                  colorPrimary="#3f51b5"
                  colorPrimaryLight="#757ce8"
                  // onChange={(newValue) => setToTime(newValue)}
                  onChange={setToTime}
                  shouldHighlightWeekends
                  locale="fa"
                  calendarPopperPosition="bottom"
                  calendarSelectedDayClassName="selected-day"
                  calendarClassName="custom-calendar"
                /> */}
                    {/* </Grid> */}
                  </CardContent>
                  <CardActions>
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
              {availableRooms && (
                <AvailableRooms
                  availableRooms={availableRooms}
                  fromTime={fromTime}
                  toTime={toTime}
                />
              )}
            </Grid>

            <Grid item xs={12} md={12}>
              <Card className={classes.rulesCard}>
                <div>
                  <CardHeader
                    title="قوانین هتل"
                    className="h2_emkanat"
                    sx={{ fontSize: "20px" }}
                  />
                  <CardContent>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={6}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "18px", whiteSpace: "pre-line" }}
                        >
                          {hotel?.rules}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </div>
              </Card>
            </Grid>

            <Grid item xs={12} md={12} sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <Card className={classes.reviewFormCard}>
                <Box
                  component="form"
                  onSubmit={formik.handleSubmit}
                >
                  <Grid container spacing={2} sx={{
                    padding: "10px",
                  }}>
                    <Grid item xs={12} md={12}>
                      <Grid item xs={12} md={12}>
                        <Rating
                          name="score"
                          label="امتیاز"
                          defaultValue={0}
                          value={formik.getFieldProps("score").value}
                          onChange={(event, newValue) => {
                            formik.setFieldValue("score", newValue);
                          }}
                          icon={<ThumbUpAlt fontSize="inherit" />}
                          emptyIcon={<ThumbDownAltOutlinedIcon fontSize="inherit" />}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          fullWidth
                          className={classes.textField}
                          error={
                            formik.errors["text"] &&
                            formik.touched["text"]
                          }
                          variant="outlined"
                          label="نظر"
                          name="text"
                          type="text"
                          helperText={formik.touched["text"] && formik.errors["text"]}
                          multiline
                          rows={3}
                          {...formik.getFieldProps("text")}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12} md={12} sx={{
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                      marginBottom: "20px",
                    }}>
                      <Button disabled={!(formik.dirty && formik.isValid && formik.values["score"] > 0)} color="primary" type="submit" variant="contained">
                        ثبت نظر
                      </Button>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      {reviews.map(({ id, voter, score, text }) => (
                        <Card className={classes.reviewCard} key={id}>
                          <ReviewCard key={id} voter={voter} score={score} text={text} />
                        </Card>
                      ))}
                      <Button color="primary" variant="contained" onClick={handleMoreReviews}>
                        نظرات بیشتر
                      </Button>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Container>
        :
        <NotFound />
      }
    </>
  );
};

export default Hotel;
