import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import provinces from "./LocationInfo/Provinces";
import cities from "./LocationInfo/Cities";
import educations from "./EducationInfo/Education";
import AuthContext from "../../../../context/AuthContext";
import useAxios from "../../../../utils/useAxios";
import "./DoctorProfileCompletion.css";
import { makeStyles } from "@mui/styles";
import {
  Container,
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
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
    backgroundColor: "#B2B1B9",
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
  description: null,
  image: null,
  province: "",
  city: "",
  clinic_address: "",

  work_periods: [],
};

const provinceValues = {
  id: 0,
  name: "",
};

function stringContainsNumber(_string) {
  return /\d/.test(_string);
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
  const { authData } = useContext(AuthContext);
  const API = useAxios();
  // const { authData } = useContext(AuthContext);

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
      });
    }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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

    if ("gender" in fieldValues)
      temp.gender = fieldValues.gender ? "" : "وارد کردن جنسیت الزامیست.";

    setErrors({
      ...temp,
    });
    if (fieldValues === values) {
      return true;
    }
  };

  useEffect(() => {
    function handleCities() {
      console.log("provinceInfo", provinceInfo);
      cities.map((city) => {
        if (city.province_id === provinceInfo.id) {
          setCitiesList([...citiesList, city]);
        }
      });
    }

    function fetchData() {
      // Fetching available specialties from the database
      API.get(`http://188.121.113.74/api/doctor/specialties/`, {
        headers: {
          Authorization: `Bearer ${authData.access}`,
        },
      })
        .then((response) => {
          setAvailableSpecilaities(response.data);
        })
        .catch((error) => {
          console.log("Error returned from fetching specialties: ", error);
        });

      // Fetching user's information from the database
      API.get(`/api/doctor/user_id_to_doctor_id/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authData?.access}`,
        },
      })
        .then((response) => {
          API.get(`/api/doctor/${response.data.id}/`, {
            headers: {
              Authorization: `Bearer ${authData.access}`,
            },
          })
            .then((response) => {
              console.log("the response of doctor", response.data);
              console.log("availableSpecilaities", availableSpecilaities);
              if (response.data.province !== "تعیین نشده") {
                setProvinceInfo({
                  ...provinceInfo,
                  id: provinces.filter((province) => {
                    if (province.name === response.data.province) {
                      return province.id;
                    }
                  })[0]["id"],
                });
              } else {
                setProvinceInfo({
                  ...provinceInfo,
                  id: 0,
                });
              }
              // const temp = provinces.filter((province) => {
              //   if (province.name === response.data.province) {
              //     return province.id;
              //   }
              // });
              // console.log("the temp", temp);
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
                education: educations.filter((education) => {
                  if (education.name === response.data.education) {
                    return education.id;
                  }
                })[0]["id"],
                specialties: availableSpecilaities.filter((specialty) => {
                  if (specialty.name === response.data.specialties[0].name) {
                    return specialty.id;
                  }
                })[0]["id"],
                province:
                  response.data.province !== "تعیین نشده"
                    ? provinces.filter((province) => {
                        if (province.name === response.data.province) {
                          return province.id;
                        }
                      })[0]["id"]
                    : 0,
                city:
                  response.data.city !== "تعیین نشده"
                    ? cities.filter((city) => {
                        if (city.name === response.data.city) {
                          return city.id;
                        }
                      })[0]["id"]
                    : 0,
                // city: cities.filter((city) => {
                //   if (city.name === response.data.city) {
                //     return city.id;
                //   }
                // })[0]["id"],
                clinic_address: response.data.clinic_address,
                work_periods: response.data.work_periods,
                description: response.data.description,
              });
              handleCities();
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
    API,
    authData?.access,
    user.user_id,
    values,
    provinceInfo,
    citiesList,
    availableSpecilaities,
    
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("user", {
        id: values.inner_id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        username: values.username,
      });
      formData.append("specialties", [
        availableSpecilaities.filter((specialty) => {
          if (specialty.id === values.specialties) {
            return specialty.id;
          }
        })[0]["id"],
      ]);
      if (Number(values.medical_system_number)) {
        formData.append("medical_system_number", values.medical_system_number);
      }
      formData.append("is_active", true);
      formData.append("gender", values.gender);
      formData.append(
        "province",
        provinces.map((province) => {
          if (province.id === values.province) {
            return province.id;
          }
        })[values.province - 1]
      );
      formData.append(
        "city",
        cities.map((city) => {
          if (city.id === values.city) {
            return city.id;
          }
        })[values.city - 1]
      );
      formData.append(
        "education",
        educations.map((education) => {
          if (education.id === values.education) {
            return education.name;
          }
        })[values.education - 1]
      );
      if (values.national_code.length === 10)
        formData.append("national_code", values.national_code);

      if (values.phone_number.length === 11)
        formData.append("phone_number", values.phone_number);
      if (values.office_number.length === 11)
        formData.append("office_number", values.office_number);
      formData.append("clinic_address", values.clinic_address);
      formData.append("work_periods", values.work_periods);
      formData.append("description", values.description);

      axios
        .put(`http://188.121.113.74/api/doctor/${values.id}/`, formData, {
          headers: {
            Authorization: `Bearer ${authData?.access}`,
          },
        })
        .then((response) => {
          toast.success(`تکمیل اطلاعات با موفقیت انجام شد.`, {
            position: "top-right",
            autoClose: 2000,
          });
          console.log("the values are: ", values);
        })
        .catch((error) => {
          if (stringContainsNumber(values.first_name)) {
            toast.error("نام نمی تواند شامل عدد باشد", {
              position: "top-right",
              autoClose: 2000,
            });
          } else if (stringContainsNumber(values.last_name)) {
            toast.error("نام خانوادگی نمی تواند شامل عدد باشد", {
              position: "top-right",
              autoClose: 2000,
            });
          } else if (values.national_code.length !== 10) {
            toast.error("کد ملی باید 10 رقم باشد", {
              position: "top-right",
              autoClose: 2000,
            });
          } else if (values.phone_number.length !== 11) {
            toast.error("شماره تلفن همراه باید 11 رقم باشد", {
              position: "top-right",
              autoClose: 2000,
            });
          } else if (values.office_number.length !== 11) {
            toast.error("شماره تلفن ثابت باید 11 رقم باشد", {
              position: "top-right",
              autoClose: 2000,
            });
          } else {
            toast.error("مشکلی پیش آمده است", {
              position: "top-right",
              autoClose: 2000,
            });
          }
        });
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
            تکمیل اطلاعات فردی
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
              type="number"
              onWheel={(e) => e.target.blur()}
              value={values.national_code}
              onChange={handleInputChange}
              fullWidth
              error={errors.national_code ? true : false}
              helperText={errors.national_code ? errors.national_code : null}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              className="input"
              variant="outlined"
              label="کد نظام پزشکی"
              name="medical_system_number"
              type="number"
              onWheel={(e) => e.target.blur()}
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
              type="number"
              onWheel={(e) => e.target.blur()}
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
              type="number"
              onWheel={(e) => e.target.blur()}
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
                defaultValue={values.education}
                onChange={handleInputChange}
                error={errors.education ? true : false}
                helperText={errors.education ? errors.education : null}
              >
                {educations.map((education) => (
                  <MenuItem value={education.id}>{education.name}</MenuItem>
                ))}
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
                defaultValue={values.specialties}
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
                defaultValue={values.province}
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
                defaultValue={values.city}
                onChange={handleInputChange}
                error={errors.city ? true : false}
                helperText={errors.city ? errors.city : null}
              >
                {cities
                  .filter((city) => city.province_id === provinceInfo.id)
                  .map((city) => (
                    <MenuItem value={city.id}>{city.name}</MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="آدرس کامل مطب"
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

          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel>جنسیت</FormLabel>
              <RadioGroup
                row
                value={values.gender}
                onChange={handleInputChange}
                name="gender"
                error={errors.gender ? true : false}
                helperText={errors.gender ? errors.gender : null}
                fullWidth
              >
                <FormControlLabel value={0} control={<Radio />} label="مرد" />
                <FormControlLabel value={1} control={<Radio />} label="زن" />
              </RadioGroup>
            </FormControl>
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
