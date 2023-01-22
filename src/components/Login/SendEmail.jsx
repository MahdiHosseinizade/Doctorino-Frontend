import { useFormik } from "formik";
import theme from "../../assets/theme/defaultTheme";
import NavBar from "../NavBar/newNavBar";
import * as Yup from "yup";
import styled from "@emotion/styled";
import { Button, Dialog, TextField } from "@mui/material";
import "./SendEmail.css"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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

const EmailForgotPassword = () => {
    const [open, setOpen] = useState(false);
    const [error , setError] = useState(false);
    const [code, setCode] = useState("");
    const handleClickOpen = () => { 
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const formik = useFormik({
        initialValues: { email: "" },
        onSubmit: (values) => {
            postEmail(values.email);
        },
        validationSchema: Yup.object({
            email: Yup.string().email("ایمیل معتبر نیست").required("ایمیل را وارد کنید"),
        }),
        validateOnMount: true,
    });
    
    
    const postEmail = async (email) => {
        try {
            await axios.post("http://188.121.113.74/api/auth/change-password/send-code/", {email: email})
            handleClickOpen();
            // toast.success("کد تایید به ایمیل شما ارسال شد")
        } catch (error) {
            setError(true);
        }
    }
    const checkedEmail = () => {
        if (error === true) {
            toast.error("هیچ کاربری با این ایمیل ثبت نشده است")
        } else {
            toast.success("کد تایید به ایمیل شما ارسال شد")
            handleClickOpen();
        }
    }
    console.log(code);
    // const Setcode = () => {
    //     setCode
    // }
    const history = useHistory();

    const handleClosePost = async() => {
        setOpen(false);
        
        await axios.post("http://188.121.113.74/api/auth/change-password/verify/",{
        email: formik.values.email,
        code: code
    })
        history.push({
            pathname: "/change-password",
            state: { email: formik.values.email }
        });
    }
    
    return (
        <div className="signUpPage">
            <div>
                <nav>
                    <NavBar bgColor={theme.palette.doctor}/>
                </nav>
                <div className="formControllogin Forget ">
                    <form onSubmit={formik.handleSubmit}>
                        <h2 className="signUpTitle">فراموشی رمز </h2>
                        <hr />
                        <div className="input">
                            <div className="emailInput mb4">
                                <STextField 
                                    fullWidth
                                    error={formik.errors["email"] && formik.touched["email"]}
                                    variant="outlined"
                                    label="ایمیل"
                                    name="email"
                                    type="text"
                                    helperText={
                                      formik.errors["email"] &&
                                      formik.touched["email"] &&
                                      formik.errors["email"]
                                    }
                                    {...formik.getFieldProps("email")}
                                />
                            </div>
                        </div>
                        <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle  >ثبت کد تایید</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        کد تایید به ایمیل شما ارسال شد
                    </DialogContentText>
                    <TextField 
                        autoFocus
                        margin="dense"
                        id="code"
                        label="کد تایید"
                        type="text"
                        fullWidth
                        onChange={(e) => setCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    {/* button to set code  */}
                    {/* <Button onClick={Setcode} >تایید </Button> */}
                    <Button onClick={() => setOpen(false)} color="error">انصراف</Button>
                    <Button onClick={handleClosePost} color="primary" variant="outlined">
                        ارسال کد 
                    </Button>
                </DialogActions>
            </Dialog>
                        <button onClick={checkedEmail} disabled={!(formik.isValid && formik.dirty)} className="btn btn-primary forget-btn" type="submit">ارسال</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
 
export default EmailForgotPassword;