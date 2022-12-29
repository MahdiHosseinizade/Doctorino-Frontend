// //dr prof layout
// import React from "react";
// import { Container, CssBaseline, Grid, Paper } from "@mui/material";
// import DoctorProfile from "./Profile";
// import ScheduleTime from "./scheduleTable";
// import { useParams } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";
// import { useEffect } from "react";
// import NavBar from "../../NavBar/newNavBar"
// import { Schedule } from "@mui/icons-material";

// export default function DoctorProfileLayout() {

//     const { id } = useParams();
//     const [doctor, setDoctor] = useState();
//     // const [scheduleTime, setScheduleTime] = useState();
//     const [loading, setLoading] = useState(true);

//     function fetchData1() {
//         axios.get(`http://188.121.113.74/api/doctor/${id}/`)
//             .then(res => {
//                 setDoctor(res.data);
//             })
//             .catch(err => console.log(err))

//         setLoading(false);
//     }

//     // function fetchData2() {
//     //     axios.get(`http://188.121.113.74/api/doctor/workday/${id}/`)
//     //         .then(res => {
//     //             setScheduleTime(res.data);
//     //         })
//     //         .catch(err => console.log(err))

//     //     setLoading(false);
//     // }

//     useEffect(() => {

//         if (loading) {
//             fetchData1();
//             // fetchData2();
//         }

//     }, [loading, doctor, setLoading, setDoctor,
//         //  scheduleTime, scheduleTime
//         ])

//     return (
//         <Container>
//             <NavBar />
//             <CssBaseline />
//             <Grid container spacing={4}>
//                 <Grid
//                     xs={7}
//                     md={7}
//                     lg={7}
//                     item
//                     sx={{
//                         Width: "100%",
//                         display: "static",
//                         height: "auto",
//                         alignItems: "center",
//                         boxSizing: " border-box"
//                     }}
//                 >
//                     <DoctorProfile doctor={doctor} />
//                 </Grid>

  useEffect(() => {
    function fetchData() {
      // Fetching available specialties from the database
      API.get(`http://188.121.113.74/api/doctor/specialties/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((response) => {
          setTimeout(() => {
            console.log("this is the response of specialties", response.data);
            setAvailableSpecilaities(response.data);
            console.log(
              "this is the available specialties: ",
              availableSpecilaities
            );
          }, 5000);
        })
        .catch((error) => {
          console.log("Error returned from fetching specialties: ", error);
        });

      // Fetching doctor's information from the database
      API.get(`/api/doctor/user_id_to_doctor_id/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((response) => {
          API.get(`/api/doctor/${response.data.id}/`, {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          })
            .then((response) => {
              console.log("the response of doctor", response.data);
              const temp = availableSpecilaities.filter((specialty) => {
                if (specialty.name === response.data.specialties[0].name) {
                  return specialty.name;
                }
              });
              console.log("specialty temp: ", temp);
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
                education: educations.filter((education) => {
                  if (education.name === response.data.education) {
                    return education.name;
                  }
                })[0]["name"],
                specialties: availableSpecilaities.filter((specialty) => {
                  if (specialty.name === response.data.specialties[0].name) {
                    return specialty.name;
                  }
                })[0]["name"],
                province: provinces.filter((province) => {
                  if (province.name === response.data.province) {
                    return province.name;
                  }
                })[0]["name"],
                city: cities.filter((city) => {
                  if (city.name === response.data.city) {
                    return city.name;
                  }
                })[0]["name"],
                clinic_address: response.data.clinic_address,
                work_periods: response.data.work_periods,
                description: response.data.description,
                image: response.data.image,
                // image: response.data.image ? response.data.image : <img src="./src/assets/img/DoctorProfilePhoto.jpg" alt="doctor" />,
              });
              setLoading(false);
            })
            .catch((error) => {
              console.log("Error from fetching doctor's info: ", error);
              console.log("availableSpecilaities: ", availableSpecilaities);
              // const temp = availableSpecilaities.filter((specialty) => {
              //   if (specialty.name === response.data.specialties) {
              //     return specialty.name;
              //   }
              // })[0]["name"];
              // console.log("temp: ", temp);
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
    user.user_id,
    authTokens.access,
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
    // if (validate()) {
    //   const sendingList = {
    //     ...doctor,
    //     description: doctor.description,
    //   };
    //   console.log("sendingList: ", sendingList);
    //   axios
    //     .put(`http://188.121.113.74/api/doctor/${doctor.id}/`, sendingList, {
    //       headers: {
    //         Authorization: `Bearer ${authTokens.access}`,
    //       },
    //     })
    //     .then((response) => {
    //       toast.success(`تکمیل اطلاعات با موفقیت انجام شد.`, {
    //         position: "top-right",
    //         autoClose: 2000,
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //       toast.error("مشکلی پیش آمده است", {
    //         position: "top-right",
    //         autoClose: 2000,
    //       });
    //     });
    //   setLoading(false);
    // }

    if (profilePhoto) {
      console.log("in profilePhoto if statement, the photo is: ", profilePhoto);
      const formData = new FormData();
      formData.append("id", doctor.id);
      formData.append("user", {
        id: doctor.inner_id,
        first_name: doctor.first_name,
        last_name: doctor.last_name,
        email: doctor.email,
        username: doctor.username,
      });
      // console.log("availableSpecilaities: ", availableSpecilaities);
      // console.log("the doctor: ", doctor);
      // const temp = availableSpecilaities.filter((specialty) => {
      //   if (specialty.name === doctor.specialties) {
      //     return specialty.id;
      //   }
      // })[0]["id"];
      // console.log("temp: ", temp);

      formData.append("specialties", [
        availableSpecilaities.filter((specialty) => {
          if (specialty.name === doctor.specialties) {
            return specialty.id;
          }
        })[0]["id"],
      ]);
      formData.append("medical_system_number", doctor.medical_system_number);
      formData.append("is_active", true);
      formData.append("image", profilePhoto);
      formData.append("national_code", doctor.national_code);
      formData.append("phone_number", doctor.phone_number);
      formData.append("office_number", doctor.office_number);
      formData.append("education", doctor.education);
      formData.append("province", doctor.province);
      formData.append("city", doctor.city);
      formData.append("clinic_address", doctor.clinic_address);
      formData.append("work_periods", doctor.work_periods);
      formData.append("description", doctor.description);
      // console.log("profilePhoto", profilePhoto);

      // console.log("the doctor id: ", doctor.id);

      axios
        .put(`http://188.121.113.74/api/doctor/${doctor.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${authTokens.access}`,
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
      window.location.reload();
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
                lg={6}
                sx={{
                  display: "flex",
                  position: "sticky",
                  justifyContent: "center",
                }}
              >
                {/* <Card> */}
                <CardMedia
                  component="img"
                  className={classes.doctor_image}
                  image={doctor?.image}
                  alt="doctor image"
                />
                <CardActions className={classes.uploadPhotoButton}>
                  {/* <form onSubmit={handleSubmit}> */}
                  <Button
                    variant="contained"
                    color="primary"
                    component="label"
                    // type="submit"
                    // onClick={thiredHandleChange}
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
                  {/* </form> */}
                </CardActions>
                {/* </Card> */}
              </Grid>

              <Grid item xs={12} lg={6}>
                <CardContent sx={{ marginTop: "20px" }}>
                  <Box>
                    <Grid container spacing={3.5}>
                      <Grid item xs={12} md={12}>
                        {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
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
                          {/* {props.doctor?.city} شهر */}
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
                        // label="درباره پزشک"
                        name="description"
                        type="text"
                        value={doctor?.description}
                        defaultValue={doctor?.description}
                        onChange={handleInputChange}
                        // error={errors.clinic_address ? true : false}
                        // helperText={
                        //   errors.clinic_address ? errors.clinic_address : null
                        // }
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
