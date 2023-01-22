import { useFormik } from "formik";
import theme from "../../assets/theme/defaultTheme";
import NavBar from "../NavBar/newNavBar";
import * as Yup from "yup";
import styled from "styled-components";
import { TextField } from "@mui/material";
import './change.css'
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
const STextField = styled(TextField)({
    "& .MuiFilledInput-root": {
      background: "#fefefe",
    },
    "& .MuiOutlinedInput-root": {
      background: "#fefefe",
    },
    spellCheck: false,
  });

const ChangePassword = () => {
    
    const history = useHistory();
    const formik = useFormik({
        initialValues: { password: "" },
        onSubmit: (values) => {
            changePassword(values.password);
        },
        validationSchema : Yup.object({ 
            password: Yup.string().required("رمز عبور را وارد کنید"),
        }),
        validateOnMount: true,

    })
    const location = useLocation();
    const changePassword = async (password) => {
        try {
            await axios.post("http://188.121.113.74/api/auth/change-password/set-password/",{
                password: password,
                email: location.state.email,
            })
            toast.success("رمز عبور شما با موفقیت تغییر کرد");
            history.push("/login")
        }
        catch (error) {
            
        }
    }

    return (
        <div className="signUpPage" >
            <div>
                <nav>
                    <NavBar bgColor={theme.palette.doctor}/>
                </nav>
                <div className="formControllogin forget" >
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="signUpTitle">رمز جدید </h2>
                        <hr />
                        <div className="input">
                            <div className="emailInput mb4">
                                <STextField 
                                    fullWidth
                                    error={formik.errors["password"] && formik.touched["password"]}
                                    variant="outlined"
                                    label="رمز عبور جدید"
                                    name="password"
                                    type="password"
                                    helperText={
                                      formik.errors["password"] &&
                                      formik.touched["password"] &&
                                      formik.errors["password"]
                                    }
                                    {...formik.getFieldProps("password")}
                                />
                            </div>
                        </div>
                        <button disabled={!(formik.dirty)} className="btn forgetbtnnn btn-primary" type="submit">تایید</button>
                    </form>
                </div>
            </div>

        </div>
    );
}
 
export default ChangePassword;