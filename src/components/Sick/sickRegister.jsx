import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import Input from "../common/Input";
import { Link } from "react-router-dom";

const value = {
    email: "",
    password: "",
    passwordconfrim: "",
};

const validationSchema = Yup.object({
    email: Yup.string().email("ایمیلت نامعتبره").required("ایمیل ضروریه"),
    password: Yup.string()
      .required("رمزت نامعتبره")
      // .min(8, "password must be at least 8 characters")
      .matches(/[a-zA-Z]/, "رمزت باید حداقل یک حرف داشته باشه"),
    passwordconfrim: Yup.string()
      .required("تایید رمزت ضروزیه")
      .oneOf([Yup.ref("password"), null], "پسورد باید یکی باشه "),
});


const SickRegister = () => {
    const [user,setUser] = useState([]);
    
    const formik = useFormik({
        initialValues: value,
        onSubmit: (values) => setUser([...user, values]),
        validationSchema: validationSchema,
        validateOnMount: true,
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
            <div className="input">
          <div className="emailInput mb4">
            <Input label="ایمیل" name="email" formik={formik} type="email" />
          </div>
          <div className="mb4">
            <Input label="رمز عبور" name="password" formik={formik} type="password" />
          </div>
          <div className="re-enter mb4">
            <Input label="تایید رمز عبور" name="passwordconfrim" formik={formik} type="password" />
          </div>
        </div>
        <div>
        </div>
        <button  disabled={!(formik.isValid && formik.dirty)}   type="submit">ثبت نام</button>
            </form>
        </div>
    );
}
 
export default SickRegister;