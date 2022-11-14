import "./signUp.css";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import images from '../../assets/img/images.jpg'
import DoctorRegister from "../Doctor.jsx/doctorLogin";
import SickRegister from "../Sick/sickRegister";
import Hotelregister from "../Hotel/hotelRegister";
import { RadioGroup ,FormControlLabel,Radio } from '@mui/material';


const value = {
  gender : ""
}

const SignUp = () => {
  const [user, setUser] = useState([]);
  const [doctor,setDoctor] = useState(false)
  const [hotel,setHotel] = useState(false)
  const [sick,setSick] = useState(false)
  
  const formik = useFormik({
    initialValues: value,
    validationSchema: Yup.object({
      gender: Yup.string().required("Required"),
    })
  })



  const sickHandler = () =>{
    setSick(true)
    setHotel(false)
    setDoctor(false)
  }
  const hotelHandler = () =>{
    setSick(false)
    setHotel(true)
    setDoctor(false)
  }
  const doctorHandler = () =>{
    setSick(false)
    setHotel(false)
    setDoctor(true)
  }
  

  return (
    <div className="signUpPage">
      <div className="signUpBox">
        <div className="signUpBoxForm">
        <form className="formControl" >
        <h2 className="signUpTitle">ثبت نام</h2>
        <hr />
        {doctor  ? <DoctorRegister/> : sick ? <SickRegister/> : hotel ? <Hotelregister/> : <SickRegister/>}
        <h2 className="h2text">
          آیا حساب کاربری دارید ؟
          <Link className="link" to="/">
            ورود
          </Link>
        </h2>
      </form>
        </div>
        <div className="signUpimgcontainer">
          <h3 className="roleSignUpTitle">ثبت نام در سایت به عنوان</h3>
          <div className="roleSignUp">
          <RadioGroup name="use-radio-group" defaultValue="مریض">
              <FormControlLabel  onChange={sickHandler} value="مریض" label="مریض" control={<Radio />} />
              <FormControlLabel  onChange={doctorHandler} value="دکتر" label="دکتر" control={<Radio />} />
              <FormControlLabel onChange={hotelHandler} value="هتل" label="هتل" control={<Radio />} />
          </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;