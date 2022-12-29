import React, { useContext } from "react";
import {
  Container,
  Grid,
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Checkbox,
  ListItemText,
  Typography,
  Tab,
  Tabs,
  Fab,
  Zoom,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { styled } from "@mui/system";
import useAxios from "../../../../../utils/useAxios";
import { useEffect } from "react";
import AuthContext from "../../../../../context/AuthContext";
import { toast } from "react-toastify";
import Dropzone from '../../../../common/Dropzone';
import RoomCard from "./components/RoomCard";
import theme from '../../../../../assets/theme/defaultTheme';
import PropTypes from 'prop-types';
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

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

const STextField = styled(TextField)({

  "& .MuiInputLabel-root": {
    color: theme.palette.grey[500],
  },
  "& .MuiFilledInput-root": {
    background: theme.palette.background.paper,
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
    "&:hover fieldset": {
      borderColor: theme.palette.hotel.main,
    }
  },
  // style when focused
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.hotel.main,
  },

  spellCheck: false,
});

const SSelect = styled(Select)({
  background: "#fefefe",
});

const formValue = {
  stars: "",
  hotel_name: "",
  phone_number: "",
  hotel_description: "",
  address: "",
  rules: "",
  features: [],
  trade_code: "",
  hotel_id: "",
};

const validationSchema = Yup.object({
  stars: Yup.number(),
  hotel_name: Yup.string(),
  phone_number: Yup.string(),
  hotel_description: Yup.string(),
  rules: Yup.string(),
  address: Yup.string(),
  features: Yup.array(),
  trade_code: Yup.string(),
  hotel_id: Yup.number().required("هتل باید انتخاب شود"),
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
        <Box sx={{ p: 3 }}>
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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function HotelProfileCompletion() {
  const { authData } = useContext(AuthContext);
  // const [availableRooms, setAvailableRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState('');
  const [stars, setStars] = useState("");
  const [features, setFeatures] = useState([]);
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [isExpanded, setExpanded] = useState(false);
  const [showRoomForm, setShowRoomForm] = useState();

  const api = useAxios();

  function fetchData() {
    api
      .get("/api/hotel/owner/hotel-list/", {
        headers: {
          Authorization: `Bearer ${authData.access}`,
        },
      })
      .then((res) => {
        setAvailableHotels(res.data)
      })
      .catch((err) => console.error(err));

    api
      .get("/api/hotel/feature/")
      .then((res) => setAvailableFeatures(res.data))
      .catch((err) => console.error(err));

    api
      .get("/api/hotel/room/")
      .then((res) => setAvailableFeatures(res.data))
      .catch((err) => console.error(err));

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 500000);

    return () => clearInterval(id);

  }, [availableHotels, availableFeatures, loading]);

  const handleFeatures = (event) => {
    const value = event.target.value;
    let feat = typeof value === "string" ? value.split(",") : value;
    setFeatures(feat);
    formik.setFieldValue("features", feat);
  };

  const handleStars = (event) => {
    const value = event.target.value;
    setStars(value);
    formik.setFieldValue("stars", value);
  }

  const handleHotels = (event) => {

    let hotel_id = event.target.value;


    api.get(`/api/hotel/${hotel_id}/`)
      .then(res => {
        const {
          hotel_name,
          hotel_description,
          address,
          rules,
          features: resievedFeats,
          trade_code,
          cover_image,
          stars,
        } = res.data;

        formik.resetForm();

        setHotel(hotel_id);

        formik.setFieldValue("hotel_id", hotel_id);

        if (hotel_name) {
          formik.setFieldValue("hotel_name", hotel_name);
        }
        if (hotel_description) {
          formik.setFieldValue("hotel_description", hotel_description);
        }
        if (address) {
          formik.setFieldValue("address", address);
        }
        if (rules) {
          formik.setFieldValue("rules", rules);
        }
        if (resievedFeats) {
          setFeatures(resievedFeats.map(feat => feat.id));
          formik.setFieldValue("features", features);
        }
        if (trade_code) {
          formik.setFieldValue("trade_code", trade_code);
        }
        if (cover_image) {
          setCoverImage(cover_image);
        }
        if (stars) {
          console.log(stars);
          setStars(stars);
          formik.setFieldValue("stars", stars);
        }
      })
      .catch(err => console.error(err))

    api.get(`/api/hotel/${hotel_id}/room/`)
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => console.error(err))
  };

  const deleteHotel = () => {
    let hotel_id = formik.getFieldProps("hotel_id").value;

    api.delete(`/api/hotel/${hotel_id}/`, {
      headers: {
        Authorization: "Bearer " + authData?.access,
      }
    })
      .then(res => {
        toast.success("هتل با موفقیت حذف شد", {
          position: "top-right",
          autoClose: 2000,
        })

        formik.resetForm();
        setLoading(true);
      })
      .catch(err => {
        toast.error("خطایی رخ داده است", {
          position: "top-right",
          autoClose: 2000,
        })
      })
  }

  const formik = useFormik({
    initialValues: formValue,

    onReset: () => {
      setFeatures([]);
      setCoverImage(null);
      setHotel('');
    },

    onSubmit: (values) => {
      if (!values.hotel_id) {
        toast.error("هتل انتخاب نشده است.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const data = new URLSearchParams();
        let formData = new FormData();

        // formData.append("cover_image", values.cover_image, "cover_image.jpg");
        formData.append("hotel_name", values.hotel_name);
        formData.append("trade_code", values.trade_code);
        formData.append("hotel_description", values.hotel_description);
        formData.append("address", values.address);
        formData.append("rules", values.rules);
        formData.append("stars", values.stars);
        console.log("values: ", values.cover_image)
        console.log("coverImage: ", coverImage)

        values.features.forEach(feat => {
          formData.append("features", feat);
        })

        for (var pair of formData.entries()) {
          data.append(pair[0], pair[1]);
        }
        api.put(`/api/hotel/${values.hotel_id}/`, data, {
          headers: {
            "Authorization": "Bearer " + authData?.access,
          }
        }).then(res => {
          toast.success("هتل با موفقیت ویرایش شد", {
            position: "top-right",
            autoClose: 2000,
          })
        }).catch(err => {
          toast.error("خطایی رخ داده است", {
            position: "top-right",
            autoClose: 2000,
          })
        })
        formik.resetForm();
        setLoading(true);
      }
    },
    validationSchema: validationSchema,
  });

  function handleCoverImage(files) {
    let file = files[0];

    setCoverImage(URL.createObjectURL(file));

    formik.setFieldValue("cover_image", file);
  }


  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  function AddRoomAccordion(props) {
    console.log('AddRoomAccordion')
    console.log(props)
    setRooms(perv => (
      [
        ...perv,
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>اتاق نوع {rooms.length + 1}</Typography>
          </AccordionSummary>
          <AccordionDetails>

          </AccordionDetails>
        </Accordion>
      ]
    ))

  }


  const deleteRoom = (id) => {
    console.log(id)
    // api.delete(`/api/hotel/${}/`, {
    //   headers: {
    //     Authorization: "Bearer " + authData?.access,
    //   }
    // })
    //   .then(res => {
    //     toast.success("هتل با موفقیت حذف شد", {
    //       position: "top-right",
    //       autoClose: 2000,
    //     })

    //     formik.resetForm();
    //     setLoading(true);
    //   })
    //   .catch(err => {
    //     toast.error("خطایی رخ داده است", {
    //       position: "top-right",
    //       autoClose: 2000,
    //     })
    //   })
  }


  return (
    <Container>
      <Box
        sx={{
          marginTop: "50px",
          bgcolor: "rgb(245, 246, 248)",
          border: "1px solid #ccc",
          marginBottom: "50px",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0.5 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
        onSubmit={formik.handleSubmit}
        component="form"
      >
        {/* <Typography
          sx={{
            textAlign: "center",
            margin: "10px",
          }}
          variant="h5"
        >
          تکمیل اطلاعات هتل
        </Typography> */}
        <Box sx={{ width: '100%' }}>
          <Box sx={{ marginLeft: '10px', borderBottom: 0, borderColor: 'divider' }}>
            <Tabs sx={{
              marginBottom: '10px',
              '& .MuiTab-root': {
                color: theme.palette.grey[700],
              },
              '& .Mui-selected': {
                color: theme.palette.hotel.dark,
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.hotel.dark,
              },
            }} value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab sx={{ width: 'auto' }} label="اطلاعات مشترک هتل" {...a11yProps(0)} />
              <Tab sx={{ width: 'auto' }} label="اطلاعات اتاق ها" {...a11yProps(1)} />
              <Tab sx={{ width: 'auto' }} label="اتاق جدید" {...a11yProps(2)} />
              <Tab sx={{ width: 'auto' }} label="گالری تصاویر" {...a11yProps(3)} />
            </Tabs>
          </Box>

          <hr width="100%"
            style={{
              backgroundColor: "#000",
              marginBottom: "1rem",
              marginTop: "1rem",
            }}
          />

          <Grid container spacing={2} sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
          }}>
            <Grid container spacing={2}>

              <Grid item xs={12} md={4}>
                <Box sx={{
                  marginTop: { xs: "10px", md: "10px" },
                  borderRadius: "10px",
                  padding: 1,
                }}>
                  <SFormControl fullWidth>
                    <InputLabel>هتل ها</InputLabel>
                    <SSelect
                      value={hotel}
                      label="هتل ها"
                      onChange={handleHotels}
                      error={formik.errors["hotel_id"] && formik.touched["hotel_id"]}
                    >
                      {availableHotels?.map(
                        ({ id, hotel_name }, ind) =>
                          ind >= 0 && (
                            <SMenuItem key={id} value={id}>
                              <ListItemText primary={hotel_name} />
                            </SMenuItem>
                          )
                      )}
                    </SSelect>
                  </SFormControl>

                  <Box component="img" src={coverImage ? coverImage : "https://media.radissonhotels.net/image/metropolitan-hotel-sofia-a-member-of-radisson-individuals/exteriorview/16256-145921-f72742573_3xl.jpg?impolicy=Card&gravity=North"}
                    sx={{
                      width: "100%",
                      marginTop: 2,
                      height: { xs: "300px", md: "450px" },
                      objectFit: "fill",
                      borderRadius: "10px",
                      border: `5px solid ${theme.palette.hotel.main}`,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <TabPanel value={value} index={0}>
                  <Box
                    sx={{
                      color: theme.palette.hotel.dark,
                      marginTop: { xs: "20px", md: "20px" },
                      bgcolor: "rgb(245, 246, 248)",
                      border: "1px solid #ccc",
                      marginBottom: "50px",
                      borderRadius: "10px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                    }}
                    onSubmit={formik.handleSubmit}
                    component="form"
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      variant="h5"
                    >
                      تکمیل اطلاعات مشترک هتل
                    </Typography>

                    <hr width="100%"
                      style={{
                        backgroundColor: theme.palette.hotel.dark,
                        marginBottom: "1rem",
                        marginTop: "1rem",
                      }}
                    />

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={12}>
                        <Dropzone CssBaseLine={true} handleFile={handleCoverImage} iconColor={'hotel'} />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <STextField
                          fullWidth
                          error={
                            formik.errors["hotel_name"] && formik.touched["hotel_name"]
                          }
                          variant="outlined"
                          label="نام هتل"
                          name="hotel_name"
                          type="text"
                          helperText={formik.touched["hotel_name"] && formik.errors["hotel_name"]}
                          {...formik.getFieldProps("hotel_name")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <STextField
                          fullWidth
                          error={
                            formik.errors["phone_number"] && formik.touched["phone_number"]
                          }
                          variant="outlined"
                          label="شماره تماس هتل"
                          name="phone_number"
                          type="text"
                          helperText={formik.touched["phone_number"] && formik.errors["phone_number"]}
                          {...formik.getFieldProps("phone_number")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <STextField
                          fullWidth
                          error={formik.errors["address"] && formik.touched["address"]}
                          variant="outlined"
                          label="آدرس هتل"
                          name="address"
                          type="text"
                          helperText={formik.touched["address"] && formik.errors["address"]}
                          {...formik.getFieldProps("address")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <STextField
                          fullWidth
                          error={
                            formik.errors["trade_code"] && formik.touched["trade_code"]
                          }
                          variant="outlined"
                          label="کد صنفی"
                          name="trade_code"
                          type="text"
                          helperText={formik.touched["trade_code"] && formik.errors["trade_code"]}
                          {...formik.getFieldProps("trade_code")}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <STextField
                          fullWidth
                          error={
                            formik.errors["hotel_description"] &&
                            formik.touched["hotel_description"]
                          }
                          variant="outlined"
                          label="توضیحات"
                          name="hotel_description"
                          type="text"
                          helperText={formik.touched["hotel_description"] && formik.errors["hotel_description"]}
                          multiline
                          rows={4}
                          {...formik.getFieldProps("hotel_description")}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <STextField
                          fullWidth
                          error={
                            formik.errors["rules"] &&
                            formik.touched["rules"]
                          }
                          variant="outlined"
                          label="قوانین هتل"
                          name="rules"
                          type="text"
                          helperText={formik.touched["rules"] && formik.errors["rules"]}
                          multiline
                          rows={4}
                          {...formik.getFieldProps("rules")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SFormControl fullWidth>
                          <InputLabel>امکانات</InputLabel>
                          <SSelect
                            renderValue={(selected) => selected.join(", ")}
                            error={formik.errors["features"] && formik.touched["features"]}
                            multiple
                            value={features}
                            onChange={handleFeatures}
                            input={<OutlinedInput label="امکانات" />}
                          >
                            {availableFeatures.map(({ id, title }) => (
                              <SMenuItem key={id} value={id}>
                                <Checkbox color="hotel" checked={features.indexOf(id) > -1} />
                                <ListItemText primary={title} />
                              </SMenuItem>
                            ))}
                          </SSelect>
                        </SFormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SFormControl fullWidth>
                          <InputLabel>ستاره</InputLabel>
                          <SSelect
                            value={stars}
                            onChange={handleStars}
                            label="ستاره"
                            error={formik.errors["stars"] && formik.touched["stars"]}
                          >
                            <SMenuItem value={1}>یک ستاره</SMenuItem>
                            <SMenuItem value={2}>دو ستاره</SMenuItem>
                            <SMenuItem value={3}>سه ستاره</SMenuItem>
                            <SMenuItem value={4}>چهار ستاره</SMenuItem>
                            <SMenuItem value={5}>پنج ستاره</SMenuItem>
                          </SSelect>
                        </SFormControl>
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <Button type="button" variant='outlined' color="hotel" onClick={deleteHotel}>حذف هتل</Button>
                      </Grid>
                      <Grid item md={6} xs={6}>
                        <Button color="hotel" type="submit" variant="contained">
                          ذخیره
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Box
                    sx={{
                      color: theme.palette.hotel.dark,
                      marginTop: { xs: "20px", md: "20px" },
                      bgcolor: "rgb(245, 246, 248)",
                      border: "1px solid #ccc",
                      marginBottom: "50px",
                      borderRadius: "10px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                    }}
                    onSubmit={formik.handleSubmit}
                    component="form"
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      variant="h5"
                    >
                      اتاق های فعال
                    </Typography>

                    <hr width="100%"
                      style={{
                        backgroundColor: theme.palette.hotel.dark,
                        marginBottom: "1rem",
                        marginTop: "1rem",
                      }}
                    />

                    <Grid container spacing={2}>
                      {console.log(rooms)}
                      <Grid container spacing={1} sx={{ marginTop: '10px' }}>
                        {rooms.map((room, index) => {
                          return (
                            <Grid key={room.id} item xs={12} md={12}>
                              <Accordion sx={{ width: "70%", justifyContent: 'center', right: '-20%', margin: "0px 0px 0px 0px" }}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`aria${room.id}`}
                                  id={`id${room.id}`}
                                >
                                  {console.log(rooms)}
                                  <Typography>اتاق نوع { }</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                  <Typography sx={{ marginBottom: '7px' }}>اتاق {room.bed_count} خوابه</Typography>
                                  <Typography sx={{ marginBottom: '7px' }}>قیمت هر واحد: {room.price_per_night}</Typography>
                                  <Typography sx={{ marginBottom: '7px' }}>تعداد اتاق های این دسته: {room.quantity}</Typography>
                                  <Button sx={{ marginTop: '10px' }} type="button" variant='outlined' color="hotel" onClick={() => {
                                    api.delete(`/api/hotel/room/${room.id}/`, {
                                      headers: {
                                        Authorization: "Bearer " + authData?.access,
                                      }
                                    })
                                      .then(res => {
                                        toast.success("اتاق با موفقیت حذف شد", {
                                          position: "top-right",
                                          autoClose: 2000,
                                        })

                                        formik.resetForm();
                                        setLoading(true);
                                      })
                                      .catch(err => {
                                        toast.error("خطایی رخ داده است", {
                                          position: "top-right",
                                          autoClose: 2000,
                                        })
                                      })
                                    { window.location.reload(false); }
                                  }}>حذف اتاق</Button>
                                </AccordionDetails>
                              </Accordion>
                            </Grid>
                          );
                        }
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  Add Room
                </TabPanel>

                <TabPanel value={value} index={3}>
                  Picture Gallery
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box >
    </Container >
  );
}