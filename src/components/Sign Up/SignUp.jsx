import "./signUp.css";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { GrKey } from "react-icons/gr";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const value = {
  email: "",
  password: "",
  passwordconfrim: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("email is Required"),
  password: Yup.string()
    .required("password is Required")
    // .min(8, "password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  passwordconfrim: Yup.string()
    .required("password confrimation is Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const SignUp = () => {
  const [user, setUser] = useState([]);



  const formik = useFormik({
    initialValues: value,
    onSubmit: (values) => setUser([...user, values]),
    validationSchema: validationSchema,
  });
 

  // const postuserHandler = () =>{
  //     axios.post("http://localhost:3001/users",{...user})
  //     .then((res) => setUser(res.data))
  //     .catch((err) => console.log(err));
  // }

  // async function  getUsers() {
  //   try {
  //     const res = await axios.get("http://localhost:3001/users");
  //     setUser(res.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect (() =>{
  //     getUsers();
  // },[])

  return (
    <div>
      <form className="formControl" onSubmit={formik.handleSubmit}>
        <h2>SignUp</h2>
        <hr />
        <div className="input">
          <div className="emailInput mb4">
            <label >email</label>
            <div className="icon-email">
              <input
                className="email"
                type="text"
                placeholder="Email"
                name="email"
                {...formik.getFieldProps("email")}
              />
              {formik.errors.email && formik.touched.email && (
                <div className="error">{formik.errors.email}</div>
              )}
              <AiOutlineMail className="icon" />
            </div>
          </div>
          <div className="mb4">
            <label >password</label>
            <div className="icon-password">
              <input
                className="password"
                type="password"
                placeholder="Password"
                name="password"
                {...formik.getFieldProps("password")}
              />
              {formik.errors.password && formik.touched.password && (
                <div className="error">{formik.errors.password}</div>
              )}
              <GrKey className="icon2" />
            </div>
          </div>
          <div className="re-enter mb4">
            <label >re-enter password</label>
            <div className="icon-password">
              <input
                className="password"
                type="password"
                placeholder="Password confrimation"
                name="passwordconfrim"
                {...formik.getFieldProps("passwordconfrim")}
              />
              {formik.errors.passwordconfrim && formik.touched.passwordconfrim && (
                <div className="error">{formik.errors.passwordconfrim}</div>
              )}
              {/* <GrKey className="icon2" /> */}
            </div>
          </div>
        </div>
        <button  type="submit">Submit</button>
        <h2 className="h2text">
          Already have an account?
          <Link className="link" to="/">
            login
          </Link>
        </h2>
      </form>
    </div>
  );
};

export default SignUp;