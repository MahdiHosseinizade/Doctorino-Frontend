import "./signUp.css";
import { useFormik } from "formik";
import {  useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import DoctorRegister from "../Doctor/Registration/DoctorRegistration";
import SickRegister from "../Sick/sickRegister";
import { RadioGroup ,FormControlLabel,Radio, Typography } from '@mui/material';
// import Hotelregister from "../Hotel/Register/HotelRegister";
import Hotelregister from "../Hotel/Register/HotelRegister";
import NavBar from "../NavBar/newNavBar";


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
    <div className="signUp">
      <nav>
        <NavBar />
      </nav>
      <div className="signUpPage">
      <div className="signUpBox">
        <div className="signUpBoxForm">
        <div className="formControl" >
        <h2 className="signUpTitle">ثبت نام</h2>
        <hr />
        {doctor  ? <DoctorRegister/> : sick ? <SickRegister/> : hotel ? <Hotelregister/> : <SickRegister/>}
        <h2 className="h2text">
          آیا حساب کاربری دارید ؟
          <Link className="link" to="/login">
            ورود
          </Link>
        </h2>
      </div>
        </div>
        <div className="signUpimgcontainer">
          <h3 className="roleSignUpTitle">ثبت نام در سایت به عنوان</h3>
          <div className="roleSignUp">
          <RadioGroup className="radioGroup"  name="use-radio-group" defaultValue="بیمار">
              <FormControlLabel  className="radio"  onChange={sickHandler} value="بیمار" label={<Typography style={{fontFamily : 'IranYekan'}} >بیمار</Typography>} control={<Radio />} />
              <FormControlLabel className="radio" onChange={doctorHandler} value="دکتر" label={<Typography style={{fontFamily : 'IranYekan'}} >دکتر</Typography>} control={<Radio />} />
              <FormControlLabel className="radio" onChange={hotelHandler} value="هتل" label={<Typography style={{fontFamily : 'IranYekan'}} >هتل دار</Typography>} control={<Radio />} />
          </RadioGroup>
          {/* <input onChange={sickHandler} type="radio" id="1" name="sclae" value="بیمار" />
          <label htmlFor="1">بیمار</label>
          <input onChange={doctorHandler} type="radio" id="0" name="sclae" value="دکتر" />
          <label htmlFor="0">دکتر</label>
          <input onChange={hotelHandler} type="radio" id="2" name="sclae" value="هتل دار" />
          <label htmlFor="2">هتل دار</label> */}
          </div> 
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default SignUp;