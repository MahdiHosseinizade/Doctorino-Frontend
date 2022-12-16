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
} from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { styled } from "@mui/system";
import useAxios from "../../../../../utils/useAxios";
import { useEffect } from "react";
import AuthContext from "../../../../../context/AuthContext";
import { toast } from "react-toastify";
import Dropzone from '../../../../common/Dropzone';
import './HotelProfileCompletion.css';

const STextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    background: "#fefefe",
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
  },
  spellCheck: false,
});

const SSelect = styled(Select)({
  background: "#fefefe",
});

const formValue = {
  // stars: "",
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
  // stars: Yup.number(),
  hotel_name: Yup.string(),
  phone_number: Yup.string(),
  hotel_description: Yup.string(),
  rules: Yup.string(),
  address: Yup.string(),
  features: Yup.array(),
  trade_code: Yup.string(),
  hotel_id: Yup.number().required("هتل باید انتخاب شود"),
});

export default function HotelProfileCompletion() {
  const { authTokens } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [hotel, setHotel] = useState('');
  // const [stars, setStars] = useState();
  const [features, setFeatures] = useState([]);
  const [availableFeatures, setAvailableFeatures] = useState([]);
  const [availableHotels, setAvailableHotels] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const api = useAxios();

  function fetchData() {
    api
      .get("/api/hotel/owner/hotel-list/", {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
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

    setLoading(false);
  }

  useEffect(() => {
    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(id);

  }, [availableHotels, availableFeatures, loading]);

  const handleFeatures = (event) => {
    const value = event.target.value;
    let feat = typeof value === "string" ? value.split(",") : value;
    setFeatures(feat);
    formik.setFieldValue("features", feat);
  };

  const handleHotels = (event) => {

    let hotel_id = event.target.value;

    setHotel(hotel_id);

    api.get(`/api/hotel/${hotel_id}/`)
      .then(res => {
        const {
          hotel_name,
          hotel_description,
          address,
          rules,
          features,
          trade_code,
        } = res.data;

        formik.resetForm();

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
        if (features) {
          setFeatures(features.map(feat => feat.id));
          formik.setFieldValue("features", features);
        }
        if (trade_code) {
          formik.setFieldValue("trade_code", trade_code);
        }
        if (res.data.cover_image) {
          setCoverImage(res.data.cover_image);
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
        Authorization: "Bearer " + authTokens?.access,
      }
    })
      .then(res => {
        toast.success("هتل با موفقیت حذف شد", {
          position: "top-right",
          autoClose: 2000,
        })

        // reset the form
        formik.resetForm();

        // reset the hotel id
        setLoading(true);
        formik.setFieldValue("hotel_id", '');
        setHotel('');
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

    onSubmit: (values) => {
      if (!values.hotel_id) {
        toast.error("هتل انتخاب نشده است.", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        let data = {};

        if (values.hotel_name) {
          data["hotel_name"] = values.hotel_name;
        }
        if (values.trade_code) {
          data["trade_code"] = values.trade_code;
        }
        // if (values.stars) {
        //   data["stars"] = values.stars;
        // }
        if (values.hotel_description) {
          data["hotel_description"] = values.hotel_description;
        }
        if (values.address) {
          data["address"] = values.address;
        }
        if (features.length) {
          data["features"] = features;
        }
        if (values.rules) {
          data["rules"] = values.rules;
        }

        api
          .put(`/api/hotel/${values.hotel_id}/`, data, {
            headers: {
              Authorization: "Bearer " + authTokens.access,
            },
          })
          .then((res) =>
            toast.success(`تغیر هتل با موفقیت انجام شد`, {
              position: "top-right",
              autoClose: 2000,
            })
          )
          .catch((err) =>
            toast.error("مشکلی پیش آمده است", {
              position: "top-right",
              autoClose: 2000,
            })
          );

        setLoading(true);
      }
    },
    validationSchema: validationSchema,
  });

  function handleCoverImage(e) {
    let file = e.target.files[0];
    setCoverImage(file);
  }

  return (
    <Container>
      <Box
        sx={{
          marginTop: "100px",
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
          تکمیل اطلاعات هتل
        </Typography>

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
          <Grid item md={4} xs={12}>
            <Grid container>
              <Grid item md={12} xs={12}>
                {/* drop zone */}
                <Dropzone image={coverImage} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
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
                          <MenuItem key={id} value={id}>
                            <ListItemText primary={hotel_name} />
                          </MenuItem>
                        )
                    )}
                  </SSelect>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <STextField
                  fullWidth
                  error={
                    formik.errors["hotel_name"] && formik.touched["hotel_name"]
                  }
                  variant="filled"
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
                  variant="filled"
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
                  variant="filled"
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
                  variant="filled"
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
              <Grid item xs={12} md={12}>
                <FormControl fullWidth>
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
                      <MenuItem key={id} value={id}>
                        <Checkbox checked={features.indexOf(id) > -1} />
                        <ListItemText primary={title} />
                      </MenuItem>
                    ))}
                  </SSelect>
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>ستاره</InputLabel>
              <SSelect
                value={stars}
                defaultValue={0}
                label="ستاره"
                onChange={handleStars}
                error={formik.errors["stars"] && formik.touched["stars"]}
                {...formik.getFieldProps("stars")}
              >
                <MenuItem value={1}>یک ستاره</MenuItem>
                <MenuItem value={2}>دو ستاره</MenuItem>
                <MenuItem value={3}>سه ستاره</MenuItem>
                <MenuItem value={4}>چهار ستاره</MenuItem>
                <MenuItem value={5}>پنج ستاره</MenuItem>
              </SSelect>
            </FormControl>
          </Grid> */}
              <Grid item md={6} xs={6}>
                <Button type="button" variant='outlined' color="error" onClick={deleteHotel}>حذف هتل</Button>
              </Grid>
              <Grid item md={6} xs={6}>
                <Button type="submit" variant="contained">
                  ذخیره
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
