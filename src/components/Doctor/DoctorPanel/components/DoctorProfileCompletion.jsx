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
  const { authTokens } = useContext(AuthContext);

  // const handleSpecilaities = (e) => {
  //   setAvailableSpecilaities([...availableSpecilaities, e.target.value]);
  //   setValues({
  //     ...values,
  //     specialties: availableSpecilaities,
  //   });
  // };

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
    // else if (name === "specialties") {
    //   console.log("in specialties if statement");
    //   setValues({
    //     ...values,
    //     [name]: availableSpecilaities.map((item) => item.id === value),
    //   });
    //   console.log("values: ", values);
    // }
  };

  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    // console.log("in validate func: ", fieldValues);
    // console.log("user firstname: ", fieldValues.user["first_name"]);
    // console.log("temp", temp.user);
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
    // if ("phone_number" in fieldValues)
    //   temp.phone_number =
    //     fieldValues.phone_number.length > 11 && fieldValues.phone_number.length < 11 ? "" : "شماره موبایل وارد شده معتبر نیست.";
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
    // if ("departmentId" in fieldValues)
    //   temp.departmentId =
    //     fieldValues.departmentId.length !== 0 ? "" : "This field is required.";
    setErrors({
      ...temp,
    });

    // console.log("This is the fieldValues: ", fieldValues);
    if (fieldValues === values) {
      // console.log("going out of validate func:");
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
      });
    }

    function fetchData() {
      // console.log(
      //   "this the user's id before anything goes wrong: ",
      //   user.user_id
      // );
      // console.log("this is the user: ", user);

      // Fetching available specialties from the database
      API.get(`http://188.121.113.74/api/doctor/specialties/`, {
        headers: {
          Authorization: `Bearer ${authData.access}`,
        },
      })
        .then((response) => {
          console.log("this is the response of specialties", response.data);
          setAvailableSpecilaities(response.data);
          // console.log("this is the available specialties: ", availableSpecilaities);
        })
        .catch((error) => {
          console.log("Error returned from fetching specialties: ", error);
        });

      // Fetching user's information from the database
      API.get(`/api/doctor/user_id_to_doctor_id/${user.user_id}/`, {
        headers: {
          Authorization: `Bearer ${authTokens.access}`,
        },
      })
        .then((response) => {
          // console.log("this is the response of doctor id", response.data);
          API.get(`/api/doctor/${response.data.id}/`, {
            headers: {
              Authorization: `Bearer ${authData.access}`,
            },
          })
            .then((response) => {
              console.log("the response of doctor", response.data);
              setProvinceInfo({
                ...provinceInfo,
                id: provinces.filter((province) => {
                  if (province.name === response.data.province) {
                    return province.id;
                  }
                })[0]["id"],
              });
              const temp = educations.map((education) => {
                if (education.name === response.data.education) {
                  return education.id;
                }
              });
              console.log("this is the temp in useEffect: ", temp);
              const tempFind = educations.filter((education) => {
                if (education.name === response.data.education) {
                  return education.id;
                }
              })[0]["id"];
              // console.log("this is the tempFind in useEffect: ", tempFind);
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
                // education: response.data.education,
                education: educations.filter((education) => {
                  if (education.name === response.data.education) {
                    return education.id;
                  }
                })[0]["id"],
                // education: educations.find((education) => education.name === response.data.education),
                // specialties: response.data.specialties[0].id,
                specialties: availableSpecilaities.filter((specialty) => {
                  if (specialty.name === response.data.specialties[0].name) {
                    return specialty.id;
                  }
                })[0]["id"],
                // specialties: availableSpecilaities.find((specialty) => specialty.name === response.data.specialties[0].name),
                // province: response.data.province,
                province: provinces.filter((province) => {
                  if (province.name === response.data.province) {
                    return province.id;
                  }
                })[0]["id"],
                // province: provinces.find((province) => province.name === response.data.province),
                // city: response.data.city,
                city: cities.filter((city) => {
                  if (city.name === response.data.city) {
                    return city.id;
                  }
                })[0]["id"],
                // city: cities.find((city) => city.name === response.data.city),
                clinic_address: response.data.clinic_address,
                work_periods: response.data.work_periods,
                description: response.data.description,
                // image: response.data.image,
              });
              // console.log("this is the response.data.province: ", response.data.province);
              // console.log("this is the response.data.province_name: ", response.data.province_name);
              // setProvinceInfo({
              //   id: response.data.province,
              //   name: response.data.province_name,
              // });
              // console.log("this is the values of doctor", values);
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
    authTokens.access,
    user.user_id,
    values,
    provinceInfo,
    citiesList,
    availableSpecilaities,
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // console.log("values while in handle submit & validated: ", values);
      // console.log("the list of education: ", educations);
      // const temp = educations.map((education) => {
      //   if (education.id === values.education) {
      //     return education.name;
      //   }
      // })[values.education - 1];
      // console.log("the temp: ", temp);

      const sendingList = {
        ...values,
        id: values.id,
        user: {
          first_name: values.first_name,
          last_name: values.last_name,
          username: values.username,
          id: values.inner_id,
          email: values.email,
        },
        // specialties: values.specialties,
        specialties: [
          // {
          //   id: values.specialties,
          //   name: availableSpecilaities.map((specialty) => {
          //     if (specialty.id === values.specialties) {
          //       return specialty.name;
          //     }
          //   })[0],
          // },
          values.specialties,
        ],
        medical_system_number: Number(values.medical_system_number),
        is_active: true,
        gender: 2,
        // province: values.province,
        province: provinces.map((province) => {
          if (province.id === values.province) {
            console.log(
              "this is the province in values while in if statement --------> ",
              values.province
            );
            return province.name;
          }
        })[values.province - 1],
        // city: values.city,
        city: cities.map((city) => {
          if (city.id === values.city) {
            return city.name;
          }
        })[values.city - 1],
        // image: values.image,
        clinic_address: values.clinic_address,
        // education: values.education,
        education: educations.map((education) => {
          if (education.id === values.education) {
            return education.name;
          }
        })[values.education - 1],
        national_code:
          values.national_code.length === 10 ? values.national_code : "",
        phone_number:
          values.phone_number.length === 11 ? values.phone_number : "",
        office_number:
          values.office_number.length === 11 ? values.office_number : "",
        // license_proof: null,
        // location: {
        //   type: "",
        //   coordinates: [0, 0],
        // },
      };
      console.log("sendingList: ", sendingList);
      axios
        .put(`http://188.121.113.74/api/doctor/${values.id}/`, sendingList, {
          headers: {
            Authorization: `Bearer ${authTokens.access}`,
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

      // console.log("Values after changing: ", values);
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

          <Grid item xs={12} md={12}>
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
