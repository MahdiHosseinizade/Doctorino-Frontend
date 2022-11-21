import { useFormik} from "formik";
import Input from "../common/Input";
import  styles from './doctor.module.css';
import * as Yup from "yup";
import Select from 'react-select';
import { useState } from "react";

const value = {
    email: "",
    password: "",
    passwordConfrim: "",
    scale: "",
    code : ""
}

// const option = [
//     {value: "1", label: "پزشک عمومی"},
//     {value: "2", label: "دندانپزشک"},
//     {value: "3", label: "پزشک پوست"},
//     {value: "4", label: "پزشک اطفال"},
//     {value: "5", label: "پزشک اورولوژی"},
//     {value: "6", label: "پزشک اعصاب"},
//     {value: "7", label : "پزشک ختنه " }
// ]

const validationSchema = Yup.object({
    email : Yup.string().email("ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
    password : Yup.string().required("کلمه عبور را وارد کنید"),
    passwordConfrim : Yup.string().required("تایید کلمه عبور را وارد کنید")
    .oneOf([Yup.ref("password"), null], "کلمه عبور مطابقت ندارد"),
    scale : Yup.string().required("تخصص را وارد کنید"),
    code : Yup.string().required("کد نظام پزشکی را وارد کنید"),
})


const DoctorRegister = () => {
    const [scale, setscale] = useState("");
    
    const formik = useFormik({
        initialValues: value,
        onSubmit: (values) => console.log(values),
        validationSchema : validationSchema,
        validateOnMount: false,
    })
    console.log(formik.values);
    // set scale value for select 
    
    const setScale = (e) => {
        setscale(e.value);
    }


    // const changehandlerSelect = (e) =>{
    //     formik.setFieldValue("scale",e.value);
    // }

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className= {styles.doctorRegisterForm}>
                    <div className="doctorEmail">
                        <Input label="ایمیل" name="email" formik={formik} type="email" />
                    </div>
                    <div className="doctorCode">
                        <Input label="کد نظام پزشکی" name="code" formik={formik} type="text" />
                    </div>
                    <div className="doctorPassword">
                        <Input label="رمز عبور" name="password" formik={formik} type="password" />
                    </div>
                    <div className="doctorPasswordConfrim">
                        <Input label="تایید رمز عبور " name="passwordConfrim" formik={formik} type="password" />
                    </div>
                    <div className="doctorScale">
                        
                        <select onChange={setScale} className= {styles.selectDocotorOption} name="code" id="code" formik={formik}>
                            <option value="1">پزشک عمومی</option>
                            <option value="2">دندانپزشک</option>
                            <option value="3">پزشک پوست</option>
                            <option value="4">پزشک اطفال</option>
                            <option value="5">پزشک اورولوژی</option>
                        </select> 
                        {/* <Select className={styles.doctorslectstyles}  onChange={changehandlerSelect} options={option}  name="scale" id="scale" formik={formik} /> */}
                    </div>
                    
                </div>
                    <button className="registerDoctor" disabled={!(formik.isValid && formik.dirty)}   type="submit">ثبت نام</button>
            </form>
        </div>
    );
}
 
export default DoctorRegister;