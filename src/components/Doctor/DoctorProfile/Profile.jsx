//profile
import React, { useContext, useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Collapse,
  Button,
  TextField,
  Rating,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import * as Yup from "yup";
import { useFormik } from "formik";
import theme from '../../../assets/theme/defaultTheme';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt';
import useAxios from '../../../utils/useAxios';
import AuthContext from '../../../context/AuthContext';
import { toast } from 'react-toastify';
import ReviewCard from './ReviewCard';
import axios from 'axios';

// show the directory to the use with <basic breadcrums (mui)>

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    display: 'fix',
    paddingInline: "13px",
    marginBottom: "20px",
  },
  doctor_image: {
    width: "100%",
    height: "100%",
    margin: "20px",
    border: "7px solid #ccc",
    borderRadius: "250px",
    maxHeight: "250px",
    maxWidth: "250px",
    position: "static",
    display: "inline-table",
  },
  textField: {
    "& .MuiInputLabel-root": {
      color: theme.palette.grey[500],
    },
    "& .MuiFilledInput-root": {
      background: theme.palette.background.paper,
    },
    "& .MuiOutlinedInput-root": {
      background: "#fefefe",
      "&:hover fieldset": {
        borderColor: theme.palette.doctor.main,
      }
    },
    // style when focused
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: theme.palette.doctor.main,
    },

    spellCheck: false,
  }
});



function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const formValue = {
  score: 0,
  text: "",
};

const validationSchema = Yup.object({
  score: Yup.number().required("امتیاز را وارد کنید."),
  text: Yup.string().required("نظر خود را وارد کنید."),
});



const Profile = (props) => {

  const [value, setValue] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checked, setChecked] = useState(false);
  const [nextPageUrl, setNextPageUrl] = useState(null);

  const secondaryHandleChange = (event, newValue) => {
    setValue(newValue);
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
      }).catch(err => {
        console.log(err);
      })
    } else {
      toast.error("موردی برای نمایش وجود ندارد.");
    }
  }

  const api = useAxios();
  const { user, authData } = useContext(AuthContext);


  useEffect(() => {
    if (loading && props.doctorId) {
      api.get(`/api/doctor/${props.doctorId}/reviews/?page_size=5`)
        .then(res => {
          setNextPageUrl(res.data.links.next);
          setReviews(res.data.results);
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
        });
    }

  }, [loading, reviews]);

  const formik = useFormik({
    initialValues: formValue,

    onReset: (e) => {
    },

    onSubmit: (values) => {
      api.post("/api/doctor/reviews/", {
        doctor: props.doctor?.id,
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
          doctor: props.doctor?.id,
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

  const classes = useStyles();

  return (
    <Container className={classes.container} >
      <Card className={classes.card}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs={12} lg={6} sx={{ display: 'flex', position: "sticky", justifyContent: 'center' }}>
            <CardMedia
              component="img"
              className={classes.doctor_image}
              image={props.doctor?.image}
              alt="doctor image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CardContent sx={{ marginTop: "20px" }}>
              <Box>
                <Grid container spacing={3.5}>
                  <Grid item xs={12} md={12} >
                    {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                    <Typography variant="subtitle2" sx={{ fontSize: "30px", display: "flex" }}>
                      دکتر {props.doctor?.user.first_name} {props.doctor?.user.last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ marginTop: "-20px", marginBottom: "20px" }}>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      sx={{
                        fontSize: 20,
                      }}
                    >

                      {props.doctor?.education} {props.doctor?.specialties.map(({ name }, index) => {
                        if (index === props.doctor?.specialties.length - 1) {
                          return name;
                        } else {
                          return name + "، ";
                        }
                      })}

                      <br /><br />

                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container spacing={3.5} >
                  <Grid item xs={12} md={12} >
                    <Typography variant="body2" sx={{ fontSize: "20px", }}>
                      <PlaceOutlinedIcon color='primary' sx={{ marginBottom: "-7px" }} /><span>     </span>{props.doctor?.province} - {props.doctor?.city}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                      <VerifiedIcon color='primary' sx={{ marginBottom: "-7px" }} />
                      <span>     </span> کد نظام پزشکی
                    </Typography>

                    <Typography noWrap variant='subtitle1' color={'text.secondary'} sx={{ fontSize: "17px", display: 'inline', marginLeft: '15px' }} >
                      {props.doctor?.medical_system_number}
                    </Typography>

                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card >
      <Card>
        <Box sx={{ width: '100%', }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={secondaryHandleChange} aria-label="basic tabs example" >
              <Tab label="درباره پزشک" {...a11yProps(0)} sx={{ width: "auto" }} />
              <Tab label="اطلاعات تماس" {...a11yProps(1)} sx={{ width: "auto" }} />
              <Tab label="نظرات و امتیاز" {...a11yProps(2)} sx={{ width: "auto" }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <h4 style={{ marginBottom: "10px" }}>درباره پزشک</h4>
            {/* info about doctor from back-end */}
            <Box>

              <Box
                sx={{
                  "& > :not(style)": {
                    display: "flex",
                    justifyContent: "space-around",
                    height: "auto",
                    width: "auto",
                    marginBottom: "10px",
                  }
                }}
              >
                <Collapse in={checked} collapsedSize={40}>
                  <Typography>{props.doctor?.description}</Typography>
                </Collapse>

              </Box>

              {/* <Box sx={{height: "auto", display:'flex'}}>
                <FormControlLabel
                  control={<Button sx={{ left :'10%'}} onClick={thiredHandleChange} label="▾بیشتر">بیشتر▾</Button>}
                />
              </Box> */}

            </Box>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <h4 style={{ marginBottom: "15px" }}>  شماره تماس</h4>
            <Typography>
              <PhoneEnabledIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {props.doctor?.office_number}
            </Typography>
            <br />
            <h4 style={{ marginBottom: "15px" }}> نشانی مطب</h4>
            <Typography>
              <LocationOnIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {`${props.doctor?.clinic_address}`}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
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
                      sx={{
                        color: theme.palette.doctor.main,
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
                  <Button disabled={!(formik.dirty && formik.isValid)} color="doctor" type="submit" variant="contained">
                    ثبت نظر
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {reviews.map(({ id, voter, score, text }) => (
              <Card className={classes.card} key={id}>
                <ReviewCard key={id} voter={voter} score={score} text={text} />
              </Card>
            ))}
            <Button color="doctor" variant="contained" onClick={handleMoreReviews}>
              نظرات بیشتر
            </Button>
          </TabPanel>
        </Box>
      </Card>
      <br /><br /><br /><br />
    </Container >
  )
}

export default Profile;