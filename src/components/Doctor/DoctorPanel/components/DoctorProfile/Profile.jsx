// import React, { useState } from "react";
// import {
//   Container,
//   Card,
//   CardContent,
//   CardActions,
//   CardMedia,
//   Grid,
//   Typography,
//   Box,
//   FormControlLabel,
//   Collapse,
//   Button,
//   TextField,
// } from "@mui/material";
// import Tabs from "@mui/material/Tabs";
// import PropTypes from "prop-types";
// import Tab from "@mui/material/Tab";
// import { makeStyles } from "@mui/styles";
// import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
// import VerifiedIcon from "@mui/icons-material/Verified";
// import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import axios from "axios";
// import {toast} from "react-toastify";

// // show the directory to the use with <basic breadcrums (mui)>

// const useStyles = makeStyles({
//   container: {
//     marginTop: "69px",
//     paddingTop: "30px",
//   },
//   card: {
//     display: "fix",
//     paddingInline: "13px",
//     marginBottom: "20px",
//   },
//   doctor_image: {
//     width: "100%",
//     height: "100%",
//     margin: "20px",
//     border: "7px solid #ccc",
//     borderRadius: "250px",
//     maxHeight: "250px",
//     maxWidth: "250px",
//     position: "static",
//     display: "inline-table",
//   },
//   button: {
//     backgroundColor: "#3b82f6",
//     marginRight: "2px",
//     contrastText: "#fff",
//     "&:hover": {
//       backgroundColor: "#2563eb",
//     },
//   },
// });

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 5 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     "aria-controls": `simple-tabpanel-${index}`,
//   };
// }

// const Profile = (props) => {
//   const classes = useStyles();
//   const [value, setValue] = React.useState(0);
//   const [checked, setChecked] = React.useState(false);
//   const [errors, setErrors] = useState({ ...props.doctor });

//   const handleProfilePhoto = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       // setProfilePhoto(reader.result);
//       props.doctor.setDoctor({
//         ...props.doctor,
//         image: reader.result,
//       });
//     };
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     props.doctor.setDoctor({
//       ...props.doctor,
//       [name]: value,
//     });
//   };

//   const secondaryHandleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const thiredHandleChange = () => {
//     setChecked((prev) => !prev);
//   };

//   const validate = (fieldValues = props.doctor) => {
//     let temp = { ...errors };
//     if ("description" in fieldValues)
//       temp.description = fieldValues.description
//         ? ""
//         : "وارد کردن این اطلاعات ضروری است.";
//     setErrors({
//       ...temp,
//     });

//     if (fieldValues === props.doctor) {
//       return true;
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validate()) {
//       axios
//         .put(
//           `http://localhost:8000/api/doctor/${props.doctor.id}/`,
//           {
//             ...props.doctor,
//             description: props.doctor.description,
//           },
//           {
//             headers: {
//               Authorization: `Bearer ${props.authTokens.access}`,
//             },
//           }
//         )
//         .then((response) => {
//           toast.success(`تکمیل اطلاعات با موفقیت انجام شد.`, {
//             position: "top-right",
//             autoClose: 2000,
//           });

//         })
//         .catch((error) => {
//           console.log(error);
//           toast.error("مشکلی پیش آمده است", {
//             position: "top-right",
//             autoClose: 2000,
//           });
//         });
//       props.setLoading(false);
//     }
//   };

//   return (
//     <Container className={classes.container}>
//       <Card className={classes.card}>
//         <Grid container sx={{ marginTop: "10px" }}>
//           <Grid
//             item
//             xs={12}
//             lg={6}
//             sx={{
//               display: "flex",
//               position: "sticky",
//               justifyContent: "center",
//             }}
//           >
//             {/* <Card> */}
//             <CardMedia
//               component="img"
//               className={classes.doctor_image}
//               image={props.doctor?.image}
//               alt="doctor image"
//             />
//             <CardActions>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 component="label"
//                 // onClick={thiredHandleChange}
//               >
//                 <Typography variant="subtitle2" sx={{ fontSize: "15px" }}>
//                   تغییر
//                 </Typography>
//                 <input
//                   type="file"
//                   name="profile-photo"
//                   style={{ display: "none" }}
//                   onChange={(e) => handleProfilePhoto(e)}
//                 />
//               </Button>
//             </CardActions>
//             {/* </Card> */}
//           </Grid>

//           <Grid item xs={12} lg={6}>
//             <CardContent sx={{ marginTop: "20px" }}>
//               <Box>
//                 <Grid container spacing={3.5}>
//                   <Grid item xs={12} md={12}>
//                     {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
//                     <Typography
//                       variant="subtitle2"
//                       sx={{ fontSize: "30px", display: "flex" }}
//                     >
//                       دکتر {props.doctor?.first_name} {props.doctor?.last_name}
//                     </Typography>
//                   </Grid>
//                   <Grid
//                     item
//                     xs={12}
//                     md={12}
//                     sx={{ marginTop: "-20px", marginBottom: "20px" }}
//                   >
//                     <Typography
//                       variant="subtitle1"
//                       color={"text.secondary"}
//                       sx={{
//                         fontSize: 20,
//                       }}
//                     >
//                       متخصص {props.doctor?.specialties}
//                       <br />
//                       <br />
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//               <Box>
//                 <Grid container spacing={3.5}>
//                   <Grid item xs={12} md={12}>
//                     <Typography variant="body2" sx={{ fontSize: "20px" }}>
//                       <PlaceOutlinedIcon
//                         color="primary"
//                         sx={{ marginBottom: "-7px" }}
//                       />
//                       <span> </span>
//                       {props.doctor?.province}، {props.doctor?.city}
//                       {/* {props.doctor?.city} شهر */}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={12} md={12}>
//                     <Typography
//                       noWrap
//                       variant="subtitle2"
//                       sx={{ fontSize: "18px", display: "inline" }}
//                     >
//                       <VerifiedIcon
//                         color="primary"
//                         sx={{ marginBottom: "-7px" }}
//                       />
//                       <span> </span> کد نظام پزشکی
//                     </Typography>

//                     <Typography
//                       noWrap
//                       variant="subtitle1"
//                       color={"text.secondary"}
//                       sx={{
//                         fontSize: "17px",
//                         display: "inline",
//                         marginLeft: "15px",
//                       }}
//                     >
//                       {props.doctor?.medical_system_number}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </CardContent>
//           </Grid>
//         </Grid>
//       </Card>

//       <Card>
//         <Box sx={{ width: "100%" }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs
//               variant="scrollable"
//               scrollButtons="auto"
//               value={value}
//               onChange={secondaryHandleChange}
//               aria-label="basic tabs example"
//             >
//               <Tab
//                 label="درباره پزشک"
//                 {...a11yProps(0)}
//                 sx={{ width: "auto" }}
//               />
//               <Tab
//                 label="اطلاعات تماس"
//                 {...a11yProps(1)}
//                 sx={{ width: "auto" }}
//               />
//               {/* <Tab
//                 label="نظرات و امتیاز"
//                 {...a11yProps(2)}
//                 sx={{ width: "auto" }}
//               /> */}
//             </Tabs>
//           </Box>

//           <TabPanel value={value} index={0}>
//             <form
//               onSubmit={handleSubmit}
//               className={classes.box}
//               autoComplete="off"
//             >
//               {/* <Box
//                 sx={{
//                   "& > :not(style)": {
//                     display: "flex",
//                     justifyContent: "space-around",
//                     height: "auto",
//                     width: "auto",
//                     marginBottom: "10px",
//                   },
//                 }}
//               > */}
//               <Grid container spacing={2}>
//                 <Grid item xs={12} md={12}>
//                   <TextField
//                     variant="outlined"
//                     label="درباره پزشک"
//                     name="description"
//                     type="text"
//                     value={props?.description}
//                     onChange={handleInputChange}
//                     // error={errors.clinic_address ? true : false}
//                     // helperText={
//                     //   errors.clinic_address ? errors.clinic_address : null
//                     // }
//                     multiline
//                     rows={4}
//                     fullWidth
//                   />
//                 </Grid>
//                 {/* </Box> */}
//                 {/* <Box sx={{ height: "auto" }}> */}
//                 {/* how to mv it to left? */}
//                 {/* <Grid item xs={12} md={12}>
//                   <FormControlLabel
//                     control={
//                       <Button
//                         className={classes.button}
//                         onClick={handleInputChange}
//                         variant="contained"
//                         label=""
//                       >
//                         ثبت تغییرات
//                       </Button>
//                     }
//                   />
//                 </Grid> */}
//                 <Grid item md={3} xs={12}>
//                   <button className={classes.button} type="submit">
//                     ذخیره اطلاعات
//                   </button>
//                 </Grid>
//                 {/* </Box> */}
//               </Grid>
//             </form>
//           </TabPanel>

//           <TabPanel value={value} index={1}>
//             <h4 style={{ marginBottom: "15px" }}> شماره تماس</h4>
//             <p>
//               <PhoneEnabledIcon
//                 fontSize="small"
//                 style={{ marginBottom: "-5px", marginLeft: "5px" }}
//               />
//               {props.doctor?.office_number}
//             </p>
//             <br />
//             <h4 style={{ marginBottom: "15px" }}> نشانی مطب</h4>
//             <p>
//               <LocationOnIcon
//                 fontSize="small"
//                 style={{ marginBottom: "-5px", marginLeft: "5px" }}
//               />
//               {/* {`${props.doctor?.province}، ${props.doctor?.city}، ${props.doctor?.clinic_address}`} */}
//               {props.doctor?.clinic_address}
//             </p>
//           </TabPanel>
//           <TabPanel value={value} index={2}>
//             نظرات و امتیاز
//           </TabPanel>
//         </Box>
//       </Card>
//       <br />
//       <br />
//       <br />
//       <br />
//     </Container>
//   );
// };

// export default Profile;
