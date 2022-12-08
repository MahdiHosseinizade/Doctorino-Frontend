import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { makeStyles } from "@mui/styles";
import provinces from "./LocationInfo/Provinces";
import cities from "./LocationInfo/Cities";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
// import { useHistory } from "react-router-dom";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
    "&:hover": {
      backgroundColor: "#2563eb",
    },
  },
  formHeader: {
    marginBottom: "1rem",
  },
  breakLine: {
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#000",
  },
  boxContainer: {
    marginBottom: "3rem",
  },
  box: {
    marginTop: "100px",
    marginBottom: "40px",
    marginLeft: "100px",
    marginRight: "100px",
    bgcolor: "rgb(245, 246, 248)",
    height: "87%",
    border: "1px solid black",
    borderRadius: "10px",
    paddingTop: "1.5rem",
    paddingBottom: "0.1rem",
    "& .MuiTextField-root": { m: 0 },
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
  },
});

const formValues = {
  city: "",
  clinic_address: "",
  education: "",
  gender: 2,
  id: 0,
  image: null,
  is_active: false,
  license_proof: null,
  // location: {
  //   type: "",
  //   coordinates: [0, 0],
  // },
  work_periods: [],
  description: null,
  medical_system_number: "",

  // User Info
  first_name: "",
  email: "",
  last_name: "",
  username: "",
  inner_id: 0,

  national_code: "",
  office_number: "",
  phone_number: "",
  specialties: "",
  province: "",
};

const provinceValues = {
  id: 0, 
  name: ""
}

export default function DoctorProfileCompletion() {
  // const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = useState({ ...formValues });
  const [errors, setErrors] = useState({ ...formValues });
  const [loading, setLoading] = useState(true);
  const [availableSpecilaities, setAvailableSpecilaities] = useState([]);
  const [provinceInfo, setProvinceInfo] = useState({ ...provinceValues });
  const [citiesList, setCitiesList] = useState([]);
  const { user } = useContext(AuthContext);
  const { authTokens } = useContext(AuthContext);
  const API = useAxios();
  // const [count, setCount] = useState(0);

  // function handleCities() {
  //   cities.map((city) => {
  //     if (city.province_id === provinceInfo.id) {
  //       setCitiesList([...citiesList, city]);
  //     }
  //   })
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    if (name === "province") {
      setProvinceInfo({
        ...provinceInfo,
        id: value,
      })
    }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    console.log("in validate func: ", fieldValues);
    console.log("user firstname: ", fieldValues.user["first_name"]);
    console.log("temp", temp.user);
    if ("first_name" in fieldValues)
      temp.first_name = fieldValues.first_name ? "" : "نام خود را وارد کنید.";
    if ("last_name" in fieldValues)
      temp.last_name = fieldValues.last_name
        ? ""
        : "نام خانوادگی خود را وارد کنید.";

    if ("national_code" in fieldValues)
      temp.national_code = fieldValues.national_code
        ? ""
        : "وارد کردن کد ملی الزامیست.";
    if ("medical_system_number" in fieldValues)
      temp.medical_system_number = fieldValues.medical_system_number
        ? ""
        : "وارد کردن کد نظام پزشکی الزامیست.";
    if ("phone_number" in fieldValues)
      temp.phone_number = fieldValues.phone_number
        ? ""
        : "شماره موبایل خود را وارد کنید.";
    if ("office_number" in fieldValues)
      temp.office_number = fieldValues.office_number
        ? ""
        : "وارد کردن شماره مطب الزامیست.";
    if ("education" in fieldValues)
      temp.education = fieldValues.education ? "" : "تحصیلات خود را مشخص کنید.";
    if ("specialties" in fieldValues)
      temp.specialties = fieldValues.specialties
        ? ""
        : "تخصص خود را مشخص کنید.";
    if ("province" in fieldValues)
      temp.province = fieldValues.province
        ? ""
        : "استان مورد نظر را انتخاب کنید.";
    if ("city" in fieldValues)
      temp.city = fieldValues.city ? "" : "شهر مورد نظر را انتخاب کنید.";
    if ("clinic_address" in fieldValues)
      temp.clinic_address = fieldValues.clinic_address
        ? ""
        : "وارد کردن آدرس مطب ضروری است.";

    // if ("email" in fieldValues)
    //   temp.email = /$^|.+@.+..+/.test(fieldValues.email)
    //     ? ""
    //     : "Email is not valid.";
    // if ("mobile" in fieldValues)
    //   temp.mobile =
    //     fieldValues.mobile.length > 9 ? "" : "Minimum 10 numbers required.";
    // if ("departmentId" in fieldValues)
    //   temp.departmentId =
    //     fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    console.log("This is the fieldValues: ", fieldValues);
    if (fieldValues === values) {
      console.log("going out of validate func:");
      // return Object.values(temp).every((x) => x === "");
      return true;
    }
  };

  useEffect(() => {
    function handleCities() {
      cities.map((city) => {
        if (city.province_id === provinceInfo.id) {
          setCitiesList([...citiesList, city]);
        }
      })
    }

    function fetchData() {
      console.log(
        "this the user's id before anything goes wrong: ",
        user.user_id
      );
      API.get(`http://188.121.113.74/api/doctor/specialties/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((response) => {
          console.log("this is the response of specialties", response.data);
          setAvailableSpecilaities(response.data);
        })
        .catch((error) => {
          console.log("this is the error of specialties", error);
        });
      API.get(
        `/api/doctor/user_id_to_doctor_id/${user.user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      )
        .then((response) => {
          console.log("this is the response of doctor id", response.data);
          API.get(`/api/doctor/${response.data.id}/`, {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          })
            .then((response) => {
              console.log("the response of doctor", response.data);
              setValues({
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
                education: response.data.education,
                specialties: response.data.specialties[0].id,
                province: response.data.province,
                city: response.data.city,
                clinic_address: response.data.clinic_address,
                work_periods: response.data.work_periods,
                description: response.data.description,
              });
              console.log("this is the values of doctor", values);
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    }

    handleCities();


    if (loading) {
      fetchData();
    }

    const id = setInterval(() => {
      fetchData();
    }, 200000);

    return () => clearInterval(id);
  }, [loading, API, authTokens.access, user.user_id, values, provinceInfo, citiesList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handle submit.");
    if (validate()) {
      axios
        .put(
          `http://188.121.113.74/api/doctor/${values.id}/`,
          {
            ...values,
            id: values.id,
            user: {
              first_name: values.first_name,
              last_name: values.last_name,
              username: values.username,
              id: values.inner_id,
              email: values.email,
            },
            specialties: values.specialties,
            license_proof: null,
            medical_system_number: values.medical_system_number,
            is_active: true,
            national_code: values.national_code,
            gender: 2,
            province: values.province,
            city: values.city,
            clinic_address: values.clinic_address,
            image: null,
            phone_number: values.phone_number,
            office_number: values.office_number,
            education: values.education,
            // location: {
            //   type: "",
            //   coordinates: [0, 0],
            // },
          },
          {
            headers: {
              Authorization: `Bearer ${authTokens.access}`,
            },
          }
        )
        .then((response) => {
          toast.success(`تکمیل اطلاعات با موفقیت انجام شد.`, {
            position: "top-right",
            autoClose: 2000,
          });
        })
        .catch((error) => {
          toast.error("مشکلی پیش آمده است", {
            position: "top-right",
            autoClose: 2000,
          });
        });
      console.log("Values after changing: ", values);
      setLoading(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={classes.box} autoComplete="off">
      <Container className={classes.boxContainer}>
        <Grid>
          <Typography
            className={classes.formHeader}
            align="center"
            variant="h5"
            component="h5"
          >
            تکمیل اطلاعات پزشک
          </Typography>
        </Grid>

        <hr className={classes.breakLine} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="نام"
              variant="outlined"
              name="first_name"
              type="text"
              value={values.first_name}
              onChange={handleInputChange}
              fullWidth
              error={errors.first_name ? true : false}
              helperText={errors.first_name ? errors.first_name : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="نام خانوادگی"
              name="last_name"
              type="text"
              value={values.last_name}
              fullWidth
              onChange={handleInputChange}
              error={errors.last_name ? true : false}
              helperText={errors.last_name ? errors.last_name : null}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد ملی"
              name="national_code"
              type="text"
              value={values.national_code}
              onChange={handleInputChange}
              fullWidth
              error={errors.national_code ? true : false}
              helperText={errors.national_code ? errors.national_code : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد نظام پزشکی"
              name="medical_system_number"
              type="text"
              value={values.medical_system_number}
              onChange={handleInputChange}
              fullWidth
              error={errors.medical_system_number ? true : false}
              helperText={
                errors.medical_system_number
                  ? errors.medical_system_number
                  : null
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره موبایل"
              name="phone_number"
              type="text"
              value={values.phone_number}
              onChange={handleInputChange}
              fullWidth
              error={errors.phone_number ? true : false}
              helperText={errors.phone_number ? errors.phone_number : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره تلفن مطب"
              name="office_number"
              type="text"
              value={values.office_number}
              onChange={handleInputChange}
              fullWidth
              error={errors.office_number ? true : false}
              helperText={errors.office_number ? errors.office_number : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>تحصیلات پزشک</InputLabel>
              <Select
                label="تحصیلات پزشک"
                name="education"
                value={values.education}
                onChange={handleInputChange}
                error={errors.education ? true : false}
                helperText={errors.education ? errors.education : null}
              >
                {/* {educations.map((education) => (
                  <MenuItem>{education}</MenuItem>
                ))} */}
                <MenuItem value={1}>عمومی</MenuItem>
                <MenuItem value={2}>متخصص</MenuItem>
                <MenuItem value={3}>فوق تخصص</MenuItem>
                <MenuItem value={4}>کارشناس</MenuItem>
                <MenuItem value={5}>مشاور</MenuItem>
                <MenuItem value={6}>کارشناس ارشد</MenuItem>
                <MenuItem value={7}>فلوشیپ</MenuItem>
                <MenuItem value={8}>دکترا</MenuItem>
                <MenuItem value={9}>سایر</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>تخصص</InputLabel>
              <Select
                label="تخصص"
                name="specialties"
                value={values.specialties}
                onChange={handleInputChange}
                error={errors.specialties ? true : false}
                helperText={errors.specialties ? errors.specialties : null}
              >
                {availableSpecilaities.map((specialty) => (
                  <MenuItem value={specialty.id}>{specialty.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>استان</InputLabel>
              <Select
                name="province"
                label="استان"
                value={values.province}
                onChange={handleInputChange}
                error={errors.province ? true : false}
                helperText={errors.province ? errors.province : null}
              >
                {provinces.map((province) => (
                  <MenuItem value={province.id}>{province.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>شهر</InputLabel>
              <Select
                label="شهر"
                name="city"
                value={values.city}
                onChange={handleInputChange}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city : null}
              >
                {cities.filter((city) => city.province_id === provinceInfo.id).map((city) => (
                  <MenuItem value={city.id}>{city.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              variant="outlined"
              label="آدرس مطب"
              name="clinic_address"
              type="text"
              value={values.clinic_address}
              onChange={handleInputChange}
              error={errors.clinic_address ? true : false}
              helperText={errors.clinic_address ? errors.clinic_address : null}
              multiline
              rows={2}
              fullWidth
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <button className={classes.button} type="submit">
              ذخیره اطلاعات
            </button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
