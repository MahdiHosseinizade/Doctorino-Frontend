import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
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
import ImageGallery from "./components/ImageGallery"
import theme from '../../../../../assets/theme/defaultTheme';
import PropTypes from 'prop-types';
import cities from "../../../../../assets/map_data/Cities";
import provinces from "../../../../../assets/map_data/Provinces";
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
  city: Yup.string(),
  province: Yup.string(),
});

const formRoomValue = {
  bed_count: '',
  price_per_night: '',
  number_of_room: '',
  room_title: '',
};

const validationSchemaRoom = Yup.object({
  bed_count: Yup.string().required("تعداد تخت باید انتخاب شود"),
  price_per_night: Yup.string().required("قیمت باید انتخاب شود"),
  number_of_room: Yup.string().required("تعداداتاق ها باید انتخاب شود"),
  room_title: Yup.string()
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
  const [loading, setLoading] = useState(true);
  const [loading4, setLoading4] = useState(false);
  const [hotel, setHotel] = useState('');
  const [stars, setStars] = useState("");
  const [features, setFeatures] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [provinceList, setProvinceList] = useState(provinces);
  const [cityState, setCity] = useState("");
  const [provinceState, setProvince] = useState("");
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [showForm, setRoomForm] = useState('');
  const history = useHistory();
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
      .then((res) => setRoomForm(res.data))
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

  function setCitiesByProvince(province) {
    const citiesLST = cities.filter((city) => city.province_id === province);
    setCityList(citiesLST);
  }
  
  const handleProvince = (event) => {
    const value = event.target.value;
    setProvince(value);

    const province = provinces.find((province) => province.id === value);
    formik.setFieldValue("province", province.id);

    setCitiesByProvince(value);
  }

  const handleCity = (event) => {
    const value = event.target.value;
    setCity(value);

    const city = cityList.find((city) => city.id === value);
    formik.setFieldValue("city", city.id);
  }

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
          city,
          province,
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

        setProvinceList(provinces);

        if (province) {
          const provinceObj = provinces.find(prov => prov.name === province);
          if (provinceObj) {
            setCitiesByProvince(provinceObj.id);
            setProvince(provinceObj.id);
            formik.setFieldValue("province", provinceObj.id);
          }
        }

        if (city && cityList.length > 0) {
          const cityObj = cityList.find(cty => cty.name === city);
          if (cityObj) {
            setCity(cityObj.id);
            formik.setFieldValue("city", cityObj.id);
          }
        }
      })
      .catch(err => console.error(err))

    if (value === 3) {
      setLoading4(true);
    }

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
      setProvinceList([]);
      setCityList([]);
      setProvince('');
      setCity('');
      setHotel('');
      setStars('');
    },

    onSubmit: (values) => {
      if (!values.hotel_id) {
        toast.error("هتل انتخاب نشده است.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        let formData = new FormData();

        formData.append("hotel_name", values.hotel_name);
        formData.append("trade_code", values.trade_code);
        formData.append("phone_number", values.phone_number);
        formData.append("hotel_description", values.hotel_description);
        formData.append("address", values.address);
        formData.append("rules", values.rules);
        formData.append("stars", values.stars);
        formData.append("province", values.province);
        formData.append("city", values.city);

        features.forEach(feat => {
          formData.append("features", feat)
        })

        if (values.cover_image) {
          formData.append("cover_image", values.cover_image);
        }

        api.put(`/api/hotel/${values.hotel_id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
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
    if (newValue === 3) {
      setLoading4(true);
      setLoading(false);
    }
  };


  const formikRoom = useFormik({
    initialValues: formRoomValue,

    onReset: () => {
      setRoomForm('');
    },

    onSubmit: (values) => {
      if (!hotel) {
        toast.error("هتل انتخاب نشده است.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        const roomData = new URLSearchParams();
        let roomFormData = new FormData();

        roomFormData.append("bed_count", values.bed_count);
        roomFormData.append("price_per_night", values.price_per_night);
        roomFormData.append("number_of_room", values.number_of_room);
        roomFormData.append("room_title", values.room_title);

        api.post(`/api/hotel/room/`, roomData, {
          headers: {
            "Authorization": "Bearer " + authData?.access,
          }
        }).then(res => {
          toast.success("اتاق با موفقیت اضافه شد", {
            position: "top-right",
            autoClose: 2000,
          })
        }).catch(err => {
          toast.error("خطایی رخ داده است", {
            position: "top-right",
            autoClose: 2000,
          })
        })
        formikRoom.resetForm();
        setLoading(true);
      }
    },
    validationSchema: validationSchemaRoom,
  });

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
      >
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
              <Tab sx={{ width: 'auto' }} label="اطلاعات جامع هتل" {...a11yProps(0)} />
              <Tab sx={{ width: 'auto' }} label="اتاق ها" {...a11yProps(1)} />
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

              <Grid item xs={12} md={5}>
                <Box sx={{
                  marginTop: { xs: "10px", md: "35px" },
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
                      height: "100%",
                      objectFit: "fill",
                      borderRadius: "10px",
                      border: `5px solid ${theme.palette.hotel.main}`,
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={7}>
                <TabPanel value={value} index={0}>
                  <Box
                    sx={{
                      color: theme.palette.hotel.dark,
                      marginTop: { xs: 1, md: "20px" },
                      border: `2px solid ${theme.palette.hotel.dark}`,
                      borderRadius: "5px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
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
                      تکمیل اطلاعات هتل
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
                          rows={3}
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
                          rows={3}
                          {...formik.getFieldProps("rules")}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SFormControl fullWidth>
                          <InputLabel>استان</InputLabel>
                          <SSelect
                            value={provinceState}
                            onChange={handleProvince}
                            label="استان"
                            error={formik.errors["province"] && formik.touched["province"]}
                          >
                            {provinceList.map(({ id, name }) => (
                              <SMenuItem key={id} value={id}>
                                <ListItemText primary={name} />
                              </SMenuItem>
                            ))}
                          </SSelect>
                        </SFormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <SFormControl fullWidth>
                          <InputLabel>شهر</InputLabel>
                          <SSelect
                            value={cityState}
                            onChange={handleCity}
                            label="شهر"
                            error={formik.errors["city"] && formik.touched["city"]}
                          >
                            {cityList.map(({ id, name }) => (
                              <SMenuItem key={id} value={id}>
                                <ListItemText primary={name} />
                              </SMenuItem>
                            ))}
                          </SSelect>
                        </SFormControl>
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
                      marginTop: { xs: 1, md: "20px" },
                      border: `2px solid ${theme.palette.hotel.dark}`,
                      borderRadius: "5px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
                    }}
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
                      {/* {console.log(rooms)} */}
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

                                  <Typography>اتاق نوع {rooms.indexOf(room) + 1}</Typography>
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
                                    { window.location.reload(false) }
                                  }
                                  }>حذف اتاق</Button>
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
                  <Box
                    sx={{
                      color: theme.palette.hotel.dark,
                      marginTop: { xs: 1, md: "20px" },
                      border: `2px solid ${theme.palette.hotel.dark}`,
                      borderRadius: "5px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
                    }}
                    component="form"
                    onSubmit={formikRoom.handleSubmit}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      variant="h5"
                    >
                      افزودن دسته جدید
                    </Typography>

                    <hr width="100%"
                      style={{
                        backgroundColor: theme.palette.hotel.dark,
                        marginBottom: "1rem",
                        marginTop: "1rem",
                      }}
                    />

                    <Grid container spacing={2}
                      sx={{
                        dispaly: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Grid item xs={12}
                        sx={{
                          dispaly: 'flex',
                          justifyContent: 'center',
                        }}>
                        <STextField
                          sx={{ left: '25%', minWidth: '50%' }}
                          error={
                            formikRoom.errors["room_title"] && formikRoom.touched["room_title"]
                          }
                          variant="outlined"
                          label="عنوان اتاق"
                          name="room_title"
                          type="text"
                          helperText={formikRoom.touched["room_title"] && formikRoom.errors["room_title"]}
                          {...formikRoom.getFieldProps("room_title")}
                        />
                      </Grid>
                      <br />
                      <Grid item xs={12}
                        sx={{
                          dispaly: 'flex',
                          justifyContent: 'center',
                        }}>
                        <STextField
                          sx={{ left: '25%', minWidth: '50%' }}
                          error={
                            formikRoom.errors["bed_count"] && formikRoom.touched["bed_count"]
                          }
                          variant="outlined"
                          label="تعداد تخت"
                          name="bed_count"
                          type="text"
                          helperText={formikRoom.touched["bed_count"] && formikRoom.errors["bed_count"]}
                          {...formikRoom.getFieldProps("bed_count")}
                        />
                      </Grid>
                      <br />
                      <Grid item xs={12}
                        sx={{
                          dispaly: 'flex',
                          justifyContent: 'center',
                        }} >
                        <STextField
                          sx={{ left: '25%', minWidth: '50%' }}
                          error={
                            formikRoom.errors["number_of_room"] && formikRoom.touched["number_of_room"]
                          }
                          variant="outlined"
                          label="تعداد اتاق"
                          name="number_of_room"
                          type="text"
                          helperText={formikRoom.touched["number_of_room"] && formikRoom.errors["number_of_room"]}
                          {...formikRoom.getFieldProps("number_of_room")}
                        />
                      </Grid>
                      <br />
                      <Grid item xs={12}
                        sx={{
                          dispaly: 'flex',
                          justifyContent: 'center',
                        }} >
                        <STextField
                          sx={{ left: '25%', minWidth: '50%' }}
                          error={
                            formikRoom.errors["price_per_night"] && formikRoom.touched["price_per_night"]
                          }
                          variant="outlined"
                          label="قیمت هر اتاق"
                          name="price_per_night"
                          type="text"
                          helperText={formikRoom.touched["price_per_night"] && formikRoom.errors["price_per_night"]}
                          {...formikRoom.getFieldProps("price_per_night")}
                        />
                      </Grid>
                      <br />
                      <Grid item xs={5} sx={{
                        dispaly: 'flex',
                        justifyContent: 'center',
                        marginTop: '15px',
                      }}>
                        <Button color="hotel" type="submit" variant="contained"
                          sx={{ Width: '50%', marginRight: '10px' }}>
                          ذخیره
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Button type="submit" disabled={!formikRoom.isValid} variant="outlined">test</Button> */}
                  </Box>
                </TabPanel>

                <TabPanel value={value} index={3}>
                  <Box
                    sx={{
                      color: theme.palette.hotel.dark,
                      marginTop: { xs: 1, md: "20px" },
                      border: `2px solid ${theme.palette.hotel.dark}`,
                      borderRadius: "5px",
                      padding: "20px",
                      "& .MuiTextField-root": { m: 0.5 },
                      boxShadow: "0 0 5px 0 rgba(0,0,0,0.5)",
                    }}
                  >
                    <Typography
                      sx={{
                        textAlign: "center",
                        margin: "10px",
                      }}
                      variant="h5"
                    >
                      تصاویر هتل
                    </Typography>

                    <hr width="100%"
                      style={{
                        backgroundColor: theme.palette.hotel.dark,
                        marginBottom: "1rem",
                        marginTop: "1rem",
                      }}
                    />
                    <ImageGallery hotel_id={hotel} loading={loading4} setLoading={setLoading4} />
                  </Box>
                </TabPanel>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box >
    </Container >
  );
}