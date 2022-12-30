import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@mui/styles";
import { provinces, educations, specialties } from "./Information";
import AuthContext from "../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../utils/useAxios";
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
  Typography,
} from "@mui/material";

const useStyles = makeStyles({
  button: {
    backgroundColor: "#3b82f6",
    contrastText: "#fff",
  },
  formHeader: {
    marginBottom: "1rem",
  },
  breakLine: {
    marginBottom: "1rem",
    marginTop: "1rem",
    backgroundColor: "#000",
  },
});

const formValue = {
  firstName: "",
  lastName: "",
  idNumber: "",
  medicalSystemCode: "",
  phoneNumber: "",
  officeNumber: "",
  education: "",
  specialty: "",
  province: "",
  city: "",
  address: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string().required("نام خود را وارد کنید."),
  lastName: Yup.string().required("نام خانوادگی خود را وارد کنید."),
  idNumber: Yup.string().required("وارد کردن کد ملی الزامیست."),
  medicalSystemCode: Yup.string().required("وارد کردن کد نظام پزشکی الزامیست."),
  phoneNumber: Yup.string().required("شماره موبایل خود را وارد کنید."),
  officeNumber: Yup.string().required("وارد کردن شماره مطب الزامیست."),
  education: Yup.string().required("تحصیلات خود را مشخص کنید."),
  specialty: Yup.string().required("تخصص خود را مشخص کنید."),
  province: Yup.string().required("استان مورد نظر را انتخاب کنید."),
  city: Yup.string().required("شهر مورد نظر را انتخاب کنید."),
  address: Yup.string().required("وارد کردن آدرس مطب ضروری است."),
});

export default function DoctorProfileCompletion() {
  const { user } = useContext(AuthContext);
  const { authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const api = useAxios();
  const history = useHistory();
  const classes = useStyles();
  const [doctor, setDoctor] = useState({ ...formValue });
  const [listOfDoctors, setListOfDoctors] = useState([]);
  // const []
  // const [doctor, setDoctor] = useState([]);
  // const [education, setEducation] = useState();
  // const [specialty, setSpecialty] = useState();
  // const [province, setProvince] = useState();
  // const [city, setCity] = useState([]);

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values, e) => {
      setDoctor({ ...values });
      history.push("/");
      console.log(doctor);
      console.log(values);
      // postuserHandler(values);
      e.preventDefault();
    },
    validationSchema: validationSchema,
    // validateOnMount: true,
  });

  // useEffect(() => {
  //   fetch("http://127.0.0.1:8000/api/auth/token/")
  //     .then((res) => res.json())
  //     .then((data) => setDoctor({ ...data}))
  //     .then(() => console.log(doctor));
  // }, []);

  // useEffect(() => {
  //   // fetch("http://localhost:8000/doctors")
  //   fetch("http://127.0.0.1:8000/api/doctor/")
  //     .then((res) => res.json())
  //     .then((data) => setListOfDoctors(data));
  // }, []);

  useEffect(() => {
    function getUserId() {
      console.log(listOfDoctors);
      listOfDoctors.map((doctor) => {
        if (doctor.user === user.user_id) {
          return doctor.id;
        }
      });
    }

    const getUserIdHandler = () => {
      const userId = getUserId();
      console.log("This is the user's id: ", userId);
      const { data } = axios
        // .get(`http://127.0.0.1:8000/api/doctor/${user.user_id}`)
        .get(`http://127.0.0.1:8000/api/doctor/${userId}`)
        // http://127.0.0.1:8000/api/doctor/user_id_to_doctor_id/{user_id}/
        .then((res) => setDoctor({ data }))
        // .then(() => console.log(user))
        .catch((err) => console.log(err));
      setLoading(false);
      console.log("This is the doctor: ", doctor);
    };

    if (loading) {
      console.log(user);
      const getData = async () => {
        const response = await fetch(`http://127.0.0.1:8000/api/doctor/`);
        const newData = await response.json();
        // setData(newData)
        console.log(newData);
        setListOfDoctors(newData);
      };
      getData();
      getUserIdHandler(user);
    }

    // fetch("http://127.0.0.1:8000/api/doctor/")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log("this is the data when fetched: ", data);
    //     setListOfDoctors([...data]);
    //     console.log("data after setting: ", listOfDoctors);
    //   });
    // console.log("data after setting: ", listOfDoctors)
    // getUserIdHandler(user);

    const id = setInterval(() => {}, 200000);
    // setLoading(false);
    return () => clearInterval(id);
  }, [user, listOfDoctors]);

  // function handleListOfDoctors = () => {}
  // function fetchData() {
  //   api
  //     .get("/api/hotel/owner/hotel-list/", {
  //       headers: {
  //         Authorization: `Bearer ${authData.access}`,
  //       },
  //     })
  //     .then((res) => setAvailableHotels(res.data))
  //     .catch((err) => console.error(err));

  //   api
  //     .get("/api/hotel/feature/")
  //     .then((res) => setAvailableFeatures(res.data))
  //     .catch((err) => console.error(err));

  //   setLoading(false);
  // }

  // useEffect(() => {
  //   if (loading) {
  //     fetchData();
  //   }

  //   const id = setInterval(() => {
  //     fetchData();
  //   }, 200000);

  //   return () => clearInterval(id);
  // }, [availableHotels, availableFeatures, loading]);

  // let loginUser = async (email, pwd) => {
  //   let response = await fetch("http://127.0.0.1:8000/api/auth/token/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email: email, password: pwd }),
  //   });

  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setAuthTokens(data);
  //     setUser(jwt_decode(data.access));
  //     localStorage.setItem("authData", JSON.stringify(data));

  //     toast.success(`با موفقیت وارد شدید`, {
  //       position: "top-right",
  //       autoClose: 2000,
  //     });
  //   } else {
  //     alert("Something went wrong!");
  //   }
  // };

  const postuserHandler = (user) => {
    axios
      .post("http://127.0.0.1:8000/api/auth/token/", {
        firstName: user.firstName,
        lastName: user.lastName,
        idNumber: user.idNumber,
        medicalSystemCode: user.medicalSystemCode,
        phoneNumber: user.phoneNumber,
        officeNumber: user.officeNumber,
        education: user.education,
        specialty: user.specialty,
        province: user.province,
        city: user.city,
        address: user.address,
      })
      .then((res) => {
        setDoctor(res.data);
        document.cookie = `token=${res.data.access}`;
        document.cookie = `refresh=${res.data.refresh}`;
        toast.success("اطلاعات شما با موفقیت ثبت شد.", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      // add style to toast
      .catch((err) => {
        toast.error("مشکلی پیش آمده", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  };

  // function handleChanges(event) {
  //   const { name, value } = event.target;
  //   if (name === "education") {
  //     setEducation(value);
  //   } else if (name === "specialty") {
  //     setSpecialty(value);
  //   } else if (name === "province") {
  //     setProvince(value);
  //   } else if (name === "city") {
  //     setCity(value);
  //   }
  // }
  // function handleChanges(event) {
  //   const { name, value } = event.target;
  //   setDoctor((prevValue) => {
  //     return {
  //       ...prevValue,
  //       [name]: value,
  //     };
  //   });
  //   // if (name === "province") {
  //   //   setCities(provinces.find((province) => province.name === value).cities);
  //   // }
  //   if (name === "province") {
  //     // setCities(provinces.find((province) => province.name === value).cities);
  //     console.log(doctor);
  //   }
  // }

  // function handleSubmit(event) {
  //   // event.preventDefault();
  //   // console.log(doctor);
  //   postuserHandler(doctor);
  //   event.preventDefault();
  // }

  return (
    <Container
      sx={{
        marginBottom: "3rem",
      }}
    >
      <Box
        sx={{
          marginTop: "100px",
          bgcolor: "rgb(245, 246, 248)",
          height: "87%",
          border: "1px solid black",
          borderRadius: "10px",
          padding: "20px",
          "& .MuiTextField-root": { m: 0 },
          boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
        }}
        onSubmit={formik.handleSubmit}
        component="form"
      >
        {/* <form
          noValidate
          autoComplete="off"
          //  onSubmit={formik.handleSubmit}
          onSubmit={handleSubmit}
        > */}
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
              name="firstName"
              type="text"
              fullWidth
              error={formik.errors["firstName"] && formik.touched["firstName"]}
              helperText={formik.errors["firstName"]}
              {...formik.getFieldProps("firstName")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="نام خانوادگی"
              name="lastName"
              type="text"
              fullWidth
              error={formik.touched["lastName"] && formik.errors["lastName"]}
              helperText={formik.errors["lastName"]}
              {...formik.getFieldProps("lastName")}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد ملی"
              name="idNumber"
              fullWidth
              error={formik.touched["idNumber"] && formik.errors["idNumber"]}
              helperText={formik.errors["idNumber"]}
              {...formik.getFieldProps("idNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="کد نظام پزشکی"
              name="medicalSystemCode"
              fullWidth
              error={
                formik.touched["medicalSystemCode"] &&
                formik.errors["medicalSystemCode"]
              }
              helperText={formik.errors["medicalSystemCode"]}
              {...formik.getFieldProps("medicalSystemCode")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره موبایل"
              name="phoneNumber"
              fullWidth
              error={
                formik.touched["phoneNumber"] && formik.errors["phoneNumber"]
              }
              helperText={formik.errors["phoneNumber"]}
              {...formik.getFieldProps("phoneNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              variant="outlined"
              label="شماره تلفن مطب"
              name="officeNumber"
              fullWidth
              error={
                formik.touched["officeNumber"] && formik.errors["officeNumber"]
              }
              helperText={formik.errors["officeNumber"]}
              {...formik.getFieldProps("officeNumber")}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>تحصیلات پزشک</InputLabel>
              <Select
                label="تحصیلات پزشک"
                error={
                  formik.touched["education"] && formik.errors["education"]
                }
                helperText={formik.errors["education"]}
                {...formik.getFieldProps("education")}
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
                name="specialty"
                error={
                  formik.touched["specialty"] && formik.errors["specialty"]
                }
                helperText={formik.errors["specialty"]}
                {...formik.getFieldProps("specialty")}
              >
                <MenuItem value={1}>آسیب شناسی</MenuItem>
                <MenuItem value={2}>جراحی کودکان</MenuItem>
                <MenuItem value={3}>سونوگرافی</MenuItem>
                <MenuItem value={4}>ارتوپدی کودکان</MenuItem>
                <MenuItem value={5}>نفرولوژی</MenuItem>
                <MenuItem value={6}>جراحی سر و گردن</MenuItem>
                <MenuItem value={7}>جراحی سرطان</MenuItem>
                <MenuItem value={8}>زنان، زایمان و نازایی</MenuItem>
                <MenuItem value={9}>بهداشت خانواده</MenuItem>
                <MenuItem value={10}>سایر</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>استان</InputLabel>
              <Select
                // onChange={(e) => {
                //   setDoctor({
                //     ...doctor,
                //     province: provinces.find((p) => {
                //       if (p.id === e.target.value) {
                //         return p.name;
                //       }
                //     })["name"],
                //   });
                // }}
                // onChange={(e) => {
                //   setDoctor({
                //     ...doctor,
                //     province: provinces.find((p) => p.id === e.target.value),
                //   });
                // }}

                name="province"
                label="استان"
                error={formik.touched["province"] && formik.errors["province"]}
                helperText={formik.errors["province"]}
                {...formik.getFieldProps("province")}
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
                // onChange={(e) => {
                //   setDoctor({ ...doctor, city: e.target.value });
                // }}
                label="شهر"
                name="city"
                // error={formik.touched["city"] && formik.errors["city"]}
                // helperText={formik.errors["city"]}
                // {...formik.getFieldProps("city")}
                
              ><MenuItem value={1}>تهران</MenuItem></Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <TextField
              // onChange={(e) => {
              //   setDoctor({ ...doctor, address: e.target.value });
              // }}
              variant="outlined"
              label="آدرس مطب"
              name="address"
              type="text"
              multiline
              rows={2}
              fullWidth
              error={formik.errors["address"] && formik.touched["address"]}
              helperText={formik.errors["address"]}
              {...formik.getFieldProps("address")}
            />
          </Grid>

          <Grid item md={12} xs={12}>
            <Button
              className={classes.button}
              type="submit"
              variant="contained"
              onClick={() => {
                history.push("/doctor-panel");
              }}
            >
              ذخیره اطلاعات
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
