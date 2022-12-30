import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../common/Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import AuthContext from '../../../context/AuthContext';
import { Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
import { useState } from "react";
// import useHistory from "react-router-dom";

const baseURL = "http://188.121.113.74"

const STextField = styled(TextField)({
  "& .MuiFilledInput-root": {
    background: "#fefefe",
  },
  "& .MuiOutlinedInput-root": {
    background: "#fefefe",
  },
  spellCheck: false,
});

const formValue = {
    name: "",
    family: "",
    email: "",
    pass: "",
    rPass: "",
}

const validationSchema = Yup.object({
    name: Yup.string().required("نام ضروری است"),
    family: Yup.string().required("نام خانوادگی ضروری است"),
    email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل ضروری است"),
    pass: Yup.string().required("کلمه عبور ضروری است"),
    rPass: Yup.string().required("تکرار کلمه عبور ضروری است")
        .oneOf([Yup.ref("pass"), null], "کلمه عبور همخوانی ندارد"),
})


const Hotelregister = () => {
  // const history = useHistory();
  const [user, setUser] = useState([]);

    const { loginUser } = useContext(AuthContext);

    function posthotelHandler(hotel) {

        axios.post(
            `${baseURL}/api/hotel/owner/new/`,
            {
                "user" : {
                    "password": hotel.pass,
                    "email": hotel.email,
                    "first_name": hotel.name,
                    "last_name": hotel.family,
                    "is_hotel_owner": true
                }
            }
        )
            .then((res) => {
                toast.success(
                    `ثبت نام ${res.data.user.first_name} ${res.data.user.last_name} با موفقیت انجام شد`,
                    {
                        position: "top-right",
                        autoClose: 2000,
                    }
                )
                loginUser(hotel.email, hotel.pass);
            })
            .catch(
                (err) => {
                    console.log(err);
                    toast.error(
                        'مشکلی پیش آمده است',
                        {
                            position: "top-right",
                            autoClose: 2000,
                        }
                    )
                }
            );
    }


    const formik = useFormik({
        initialValues: formValue,
        onSubmit: (values) => {
            posthotelHandler(values);
        },
        validationSchema: validationSchema,
        validateOnMount: true,

    })
    console.log(formik.values);

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
            <STextField
              // id="first_name"
              fullWidth
              error={
                formik.errors["name"] && formik.touched["name"]
              }
              variant="outlined"
              label="نام"
              name="name"
              type="text"
              helperText={
                formik.errors["name"] &&
                formik.touched["name"] &&
                formik.errors["name"]
              }
              {...formik.getFieldProps("name")}
            />
            {/* <Input label="نام" name="name" formik={formik} type="text" /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              label="نام خانوادگی"
              name="family"
              formik={formik}
              type="text"
            /> */}
            <STextField
              fullWidth
              error={formik.errors["family"] && formik.touched["family"]}
              variant="outlined"
              label="نام خانوادگی"
              name="family"
              type="text"
              helperText={
                formik.errors["family"] &&
                formik.touched["family"] &&
                formik.errors["family"]
              }
              {...formik.getFieldProps("family")}
            />
          </Grid>
          <Grid item md={12} xs={12}>
            <STextField
              // id="first_name"
              fullWidth
              error={formik.errors["email"] && formik.touched["email"]}
              variant="outlined"
              label="ایمیل"
              name="email"
              type="email"
              helperText={
                formik.errors["email"] &&
                formik.touched["email"] &&
                formik.errors["email"]
              }
              {...formik.getFieldProps("email")}
            />
            {/* <Input label="ایمیل" name="email" formik={formik} type="email" /> */}
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              label="رمز عبور"
              name="pass"
              formik={formik}
              type="password"
            /> */}
            <STextField
              // id="first_name"
              fullWidth
              error={formik.errors["pass"] && formik.touched["pass"]}
              variant="outlined"
              label="کلمه عبور"
              name="pass"
              type="password"
              helperText={
                formik.errors["pass"] &&
                formik.touched["pass"] &&
                formik.errors["pass"]
              }
              {...formik.getFieldProps("pass")}
            />
          </Grid>
          <Grid item md={6} xs={6}>
            {/* <Input
              label="تکرار رمز عبور"
              name="rPass"
              formik={formik}
              type="password"
            /> */}
            <STextField
              fullWidth
              error={formik.errors["rPass"] && formik.touched["rPass"]}
              variant="outlined"
              label="تکرار کلمه عبور"
              name="tPass"
              type="password"
              helperText={
                formik.errors["rPass"] &&
                formik.touched["rPass"] &&
                formik.errors["rPass"]
              }
              {...formik.getFieldProps("rPass")}
            />
          </Grid>
          <br />
          <Grid item md={12} xs={12}>
            <button disabled={!(formik.isValid && formik.dirty)} type="submit">
              ثبت نام
            </button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Hotelregister;
