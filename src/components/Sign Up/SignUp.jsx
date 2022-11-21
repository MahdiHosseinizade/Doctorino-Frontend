import "./signUp.css";
import { useFormik } from "formik";
import {  useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import DoctorRegister from "../Doctor/doctorRegister";
import SickRegister from "../Sick/sickRegister";
import Hotelregister from "../Hotel/hotelRegister";
import { RadioGroup ,FormControlLabel,Radio, Typography } from '@mui/material';


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
      gender: Yup.string().required("لطفا یکی از گزینه ها را انتخاب کنید"),
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
          <RadioGroup  name="use-radio-group" defaultValue="مریض">
              <FormControlLabel className="mamad"  onChange={sickHandler} value="مریض" label={<Typography style={{fontFamily : 'IranYekan'}} >مریض</Typography>} control={<Radio />} />
              <FormControlLabel className="mamad" onChange={doctorHandler} value="دکتر" label={<Typography style={{fontFamily : 'IranYekan'}} >دکتر</Typography>} control={<Radio />} />
              <FormControlLabel className="mamad" onChange={hotelHandler} value="هتل" label={<Typography style={{fontFamily : 'IranYekan'}} >هتل دار</Typography>} control={<Radio />} />
          </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;