import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../../common/Input";
import { Grid, TextField } from "@mui/material";
import styled from "@emotion/styled";
// import useHistory from "react-router-dom";

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
};

const validationSchema = Yup.object({
  name: Yup.string().required("نام ضروری است"),
  family: Yup.string().required("نام خانوادگی ضروری است"),
  email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل ضروری است"),
  pass: Yup.string().required("کلمه عبور ضروری است"),
  rPass: Yup.string()
    .required("تکرار کلمه عبور ضروری است")
    .oneOf([Yup.ref("pass"), null], "کلمه عبور همخوانی ندارد"),
});

const Hotelregister = () => {
  // const history = useHistory();
  const [user, setUser] = useState([]);

  const formik = useFormik({
    initialValues: formValue,
    onSubmit: (values) => setUser([...user, values]),
    validationSchema: validationSchema,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} method="post">
        <Grid container spacing={1}>
          <Grid item md={6} xs={6}>
            <STextField
              // id="first_name"
              fullWidth
              error={
                formik.errors["first_name"] && formik.touched["first_name"]
              }
              variant="outlined"
              label="نام"
              name="first_name"
              type="text"
              helperText={
                formik.errors["first_name"] &&
                formik.touched["first_name"] &&
                formik.errors["first_name"]
              }
              {...formik.getFieldProps("first_name")}
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
              error={formik.errors["last_name"] && formik.touched["last_name"]}
              variant="outlined"
              label="نام خانوادگی"
              name="last_name"
              type="text"
              helperText={
                formik.errors["last_name"] &&
                formik.touched["last_name"] &&
                formik.errors["last_name"]
              }
              {...formik.getFieldProps("last_name")}
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
