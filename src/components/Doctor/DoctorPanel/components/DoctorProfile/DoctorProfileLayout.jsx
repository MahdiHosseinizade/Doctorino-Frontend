import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import AuthContext from "../../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../../utils/useAxios";
import provinces from "../LocationInfo/Provinces";
import cities from "../LocationInfo/Cities";
import educations from "../EducationInfo/Education";
import Tabs from "@mui/material/Tabs";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import VerifiedIcon from "@mui/icons-material/Verified";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import { toast } from "react-toastify";
import theme from "../../../../../assets/theme/defaultTheme";
import Dropzone from "../../../../common/Dropzone";

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    display: "fix",
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
  button: {
    backgroundColor: "#3b82f6",
    marginRight: "2px",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  uploadPhotoButton: {
    marginTop: "200px",
    contrastText: "#fff",
  },
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
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
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const formValues = {
  // User Info
  first_name: "",
  email: "",
  last_name: "",
  username: "",
  inner_id: 0,

  id: 0,
  gender: 2,
  national_code: "",
  medical_system_number: "",
  is_active: false,
  phone_number: "",
  office_number: "",
  specialties: "",
  education: "",
  description: "",
  image: null,
  province: "",
  city: "",
  clinic_address: "",

  // work_periods: [],
  // license_proof: null,
  // location: {
  //   type: "",
  //   coordinates: [0, 0],
  // },
};

const provinceValues = {
  id: 0,
  name: "",
};

export default function DoctorProfileLayout() {
  const classes = useStyles();
  const [doctor, setDoctor] = useState({ ...formValues });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({ ...formValues });
  const [availableSpecilaities, setAvailableSpecilaities] = useState([]);
  const [doctorImage, setDoctorImage] = useState(null);
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { authData } = useContext(AuthContext);
  const API = useAxios();

  useEffect(() => {
    function fetchData() {
      // Fetching available specialties from the database
      API.get(`http://188.121.113.74/api/doctor/specialties/`, {
        headers: {
          Authorization: `Bearer ${authData?.access}`,
        },
      })
        .then((response) => {
          setTimeout(() => {
            setAvailableSpecilaities(response.data);
          }, 1000);
        })
        .catch((error) => {
        });

      // Fetching doctor's information from the database
      API.get(`/api/doctor/user_id_to_doctor_id/${user.id}/`, {
        headers: {
          Authorization: `Bearer ${authData?.access}`,
        },
      })
        .then((response) => {
          API.get(`/api/doctor/${response.data.id}/`, {
            headers: {
              Authorization: `Bearer ${authData?.access}`,
            },
          })
            .then((response) => {
              const temp = availableSpecilaities.filter((specialty) => {
                if (specialty.name === response.data.specialties[0].name) {
                  return specialty.name;
                }
              });
              setDoctorImage(response.data.image);
              setDoctor({
                ...response.data,
                first_name: response.data.user.first_name,
                last_name: response.data.user.last_name,
                email: response.data.user.email,
                username: response.data.user.username,
                inner_id: response.data.user.id,
                id: response.data.id,
                national_code: response.data.national_code,
                medical_system_number: response.data.medical_system_number,
                phone_number: response.data.phone_number,
                office_number: response.data.office_number,
                education:
                  response.data.education !== "تعیین نشده" ||
                  response.data.education
                    ? response.data.education
                    : "تعیین نشده",
                specialties: availableSpecilaities.filter((specialty) => {
                  if (specialty.name === response.data.specialties[0].name) {
                    return specialty.name;
                  }
                })[0]["name"],
                province:
                  response.data.province !== "تعیین نشده"
                    ? provinces.filter((province) => {
                        if (province.name === response.data.province) {
                          return province.name;
                        }
                      })[0]["name"]
                    : "تعیین نشده",
                city:
                  response.data.city !== "تعیین نشده"
                    ? cities.filter((city) => {
                        if (city.name === response.data.city) {
                          return city.name;
                        }
                      })[0]["name"]
                    : 0,

                clinic_address: response.data.clinic_address,
                work_periods: response.data.work_periods,
                description: response.data.description,
                image: response.data.image,
              });
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error from fetching doctor's info: ", error);
            });
        })
        .catch((error) => {
          console.log("Error from fetching doctor's ID: ", error);
        });
    }

    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [
    loading,
    doctor,
    id,
    user.id,
    authData?.access,
    API,
    availableSpecilaities,
    profilePhoto,
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoctor({
      ...doctor,
      [name]: value,
    });
  };

  function handleCoverImage(files) {
    let file = files[0];

    setDoctorImage(URL.createObjectURL(file));

    // formik.setFieldValue("cover_image", file);
    setDoctor({
      ...doctor,
      image: file,
    });
  }

  const handleProfilePhoto = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const secondaryHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const thiredHandleChange = () => {
    setChecked((prev) => !prev);
  };

  const validate = (fieldValues = doctor) => {
    let temp = { ...errors };
    if ("description" in fieldValues)
      temp.description = fieldValues.description
        ? ""
        : "وارد کردن این اطلاعات ضروری است.";
    setErrors({
      ...temp,
    });

    if (fieldValues === doctor) {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (doctorImage) {
      const temp = {
        // ...doctor,
        id: doctor.id,
        user: {
          id: doctor.inner_id,
          first_name: doctor.first_name,
          last_name: doctor.last_name,
          email: doctor.email,
          username: doctor.username,
        },
        specialties: [
          availableSpecilaities.filter((specialty) => {
            if (specialty.name === doctor.specialties) {
              return specialty.id;
            }
          })[0]["id"],
        ],
        medical_system_number: doctor.medical_system_number,
        is_active: true,
        city: cities.filter((city) => {
          if (city.name === doctor.city) {
            return city.id;
          }
        })[0]["id"],
        province: provinces.filter((province) => {
          if (province.name === doctor.province) {
            return province.id;
          }
        })[0]["id"],
        national_code: doctor.national_code,
        phone_number: doctor.phone_number,
        office_number: doctor.office_number,
        education: doctor.education,
        clinic_address: doctor.clinic_address,
        // work_periods: doctor.work_periods,
        description: doctor.description,
        image: doctorImage,
      };

      const formData = new FormData();
      formData.append("id", doctor.id);
      formData.append("user", {
        id: doctor.inner_id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        username: doctor.username,
      });

      formData.append("specialties", [
        availableSpecilaities.filter((specialty) => {
          if (specialty.name === doctor.specialties) {
            return specialty.id;
          }
        })[0]["id"],
      ]);
      formData.append("medical_system_number", doctor.medical_system_number);
      formData.append("is_active", true);
      // formData.append("image", profilePhoto);
      formData.append("national_code", doctor.national_code);
      formData.append("phone_number", doctor.phone_number);
      formData.append("office_number", doctor.office_number);
      formData.append("education", doctor.education);
      formData.append(
        "province",
        provinces.filter((province) => {
          if (province.name === doctor.province) {
            return province.id;
          }
        })[0]["id"]
      );
      formData.append(
        "city",
        cities.filter((city) => {
          if (city.name === doctor.city) {
            return city.id;
          }
        })[0]["id"]
      );
      formData.append("clinic_address", doctor.clinic_address);
      // formData.append("work_periods", doctor.work_periods);
      formData.append("description", doctor.description);
      // if (doctor.cover_image) {
      formData.append("image", doctor.image);
      // }

      API.put(`/api/doctor/${doctor.id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authData?.access}`,
        },
      })
        .then((response) => {
          toast.success(`تکمیل اطلاعات با موفقیت انجام شد.`, {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          console.log(error);
          toast.error("مشکلی پیش آمده است", {
            position: "top-right",
            autoClose: 2000,
          });
        });
      // setTimeout(window.location.reload(), 3000);
      // window.location.reload();
      setLoading(false);
    }
  };

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={4}>
        <Container className={classes.container}>
          <Card className={classes.card}>
            <Grid container sx={{ marginTop: "10px" }}>
              <Grid
                item
                xs={12}
                sm={12}
                md={6}
                lg={6}
                sx={{
                  display: "flex",
                  // position: "sticky",
                  justifyContent: "center",
                  // flexDirection: "column",
                }}
              >
                {/* <CardMedia
                  component="img"
                  className={classes.doctor_image}
                  image={doctor?.image}
                  alt="doctor image"
                />
                <CardActions className={classes.uploadPhotoButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                  >
                    <Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
                      <AddAPhotoIcon />
                    </Typography>
                    <input
                      type="file"
                      name="profile-photo"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleProfilePhoto}
                    />
                  </Button>
                </CardActions> */}
                {/* <Grid
                  item
                  xs={12}
                  md={12}
                  sx={{ justifyContent: "center", display: "flex" }}
                > */}
                <Box
                  component="img"
                  src={
                    doctorImage
                      ? doctorImage
                      : "http://188.121.113.74/media/doctor-image/DoctorProfilePhoto_Ymp68AL.jpg"
                  }
                  style={{
                    display: {
                      xs: "none",
                      md: "flex",
                    },
                    minWidth: "250px",
                    maxWidth: "250px",
                    width: "50%",
                    marginTop: 3,
                    height: "85%",
                    objectFit: "fill",
                    borderRadius: "50%",
                    // border: `4px solid ${theme.palette.doctor.main}`,
                    border: `2px solid #B2B2B2`,
                  }}
                />
                {/* </Grid>
                <Grid item xs={12} md={6}> */}
                <Dropzone
                  // imageToShow={doctorImage}
                  CssBaseLine={true}
                  handleFile={handleCoverImage}
                  iconColor={"doctor"}
                  BaseStyle={{
                    width: "60px",
                    height: "60px",
                    marginTop: 200,
                    marginRight: "20px",
                    objectFit: "fill",
                    borderRadius: "80%",
                    // border: `2px solid ${theme.palette.doctor.main}`,
                    border: `1px solid #B2B2B2`,
                  }}
                />
                {/* </Grid> */}
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <CardContent sx={{ marginTop: "20px" }}>
                  <Box>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={12}>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "30px", display: "flex" }}
                        >
                          دکتر {doctor?.first_name} {doctor?.last_name}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        sx={{ marginTop: "-20px", marginBottom: "20px" }}
                      >
                        <Typography
                          variant="subtitle1"
                          color={"text.secondary"}
                          sx={{
                            fontSize: 20,
                          }}
                        >
                          متخصص {doctor?.specialties}
                          <br />
                          <br />
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={12}>
                        <Typography variant="body2" sx={{ fontSize: "20px" }}>
                          <PlaceOutlinedIcon
                            color="primary"
                            sx={{ marginBottom: "-7px" }}
                          />
                          <span> </span>
                          {doctor?.province}، {doctor?.city}
                        </Typography>
                      </Grid>

                      <Grid item xs={12} md={12}>
                        <Typography
                          noWrap
                          variant="subtitle2"
                          sx={{ fontSize: "18px", display: "inline" }}
                        >
                          <VerifiedIcon
                            color="primary"
                            sx={{ marginBottom: "-7px" }}
                          />
                          <span> </span> کد نظام پزشکی
                        </Typography>

                        <Typography
                          noWrap
                          variant="subtitle1"
                          color={"text.secondary"}
                          sx={{
                            fontSize: "17px",
                            display: "inline",
                            marginLeft: "15px",
                          }}
                        >
                          {doctor?.medical_system_number}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
              </Grid>
            </Grid>
          </Card>

          <Card>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  variant="scrollable"
                  scrollButtons="auto"
                  value={value}
                  onChange={secondaryHandleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label="درباره پزشک"
                    {...a11yProps(0)}
                    sx={{ width: "auto" }}
                  />
                  <Tab
                    label="اطلاعات تماس"
                    {...a11yProps(1)}
                    sx={{ width: "auto" }}
                  />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <form
                  onSubmit={handleSubmit}
                  className={classes.box}
                  autoComplete="off"
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                      <TextField
                        variant="outlined"
                        name="description"
                        type="text"
                        value={doctor?.description}
                        defaultValue={doctor?.description}
                        onChange={handleInputChange}
                        multiline
                        rows={4}
                        fullWidth
                      />
                    </Grid>
                    <Grid item md={3} xs={12}>
                      <button className={classes.button} type="submit">
                        ذخیره اطلاعات
                      </button>
                    </Grid>
                  </Grid>
                </form>
              </TabPanel>

              <TabPanel value={value} index={1}>
                <h4 style={{ marginBottom: "15px" }}> شماره تماس</h4>
                <p>
                  <PhoneEnabledIcon
                    fontSize="small"
                    style={{ marginBottom: "-5px", marginLeft: "5px" }}
                  />
                  {doctor?.office_number}
                </p>
                <br />
                <h4 style={{ marginBottom: "15px" }}> نشانی مطب</h4>
                <p>
                  <LocationOnIcon
                    fontSize="small"
                    style={{ marginBottom: "-5px", marginLeft: "5px" }}
                  />
                  {doctor?.clinic_address}
                </p>
              </TabPanel>
            </Box>
          </Card>
          <br />
          <br />
          <br />
          <br />
        </Container>
      </Grid>
    </Container>
  );
}
