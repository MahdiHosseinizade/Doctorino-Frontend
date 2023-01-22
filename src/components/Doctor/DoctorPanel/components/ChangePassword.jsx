import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState, useContext } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { styled } from '@mui/system';
import theme from '../../../../assets/theme/defaultTheme';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthContext from '../../../../context/AuthContext';
import { useHistory } from 'react-router';
import useAxios from "../../../../utils/useAxios";
import { toast } from 'react-toastify';


const STextField = styled(TextField)({

    "& .MuiInputLabel-root": {
        color: theme.palette.grey[500],
    },
    "& .MuiFilledInput-root": {
        background: theme.palette.background.paper,
    },
    "& .MuiOutlinedInput-root": {
        background: "#fefefe",
        "&:hover fieldset": {
            borderColor: theme.palette.hotel.main,
        }
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.hotel.main,
    },

    spellCheck: false,
});

const formValue = {
    new_pass: "",
    repeat_pass: "",
}

const validationSchema = Yup.object({
    new_pass: Yup.string().required("رمز عبور جدید ضروری است."),
    repeat_pass: Yup.string().required("تکرار رمز عبور جدید ضروری است.")
        .oneOf([Yup.ref("new_pass"), null], "کلمه عبور مطابقت ندارد"),
})

export default function ChangePassword() {

    const [showPassword, setShowPassword] = useState(false);

    const { logOut, user } = useContext(AuthContext);
    const history = useHistory();
    const api = useAxios();

    const formik = useFormik({
        initialValues: formValue,

        onSubmit: (values) => {
            api.post("/api/auth/change-password/set-password/",
                {
                    'email': user.email,
                    'password': values.new_pass,
                }
            ).then(res => {
                console.log(res)
                toast.success("رمز با موفقیت تغییر یافت.", {
                    position: "top-right",
                    autoClose: 5000,
                })

                logOut();
                history.push("/login", { destination: "/hotel-panel/profile-completion" })
            })
            .catch(err => {
                console.log(err)
                toast.error(err.response.data.error, {
                    position: "top-right",
                    autoClose: 5000,
                })
            })
        },
        validationSchema: validationSchema,
    })

    return (
        <Container>
            <Box
                sx={{
                    marginTop: "50px",
                    marginBottom: "50px",
                    bgcolor: 'rgb(245, 246, 248)',
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                    '& .MuiTextField-root': { m: 0.5 },
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                }}
                onSubmit={formik.handleSubmit}
                component="form"
            >
                <Typography
                    sx={{
                        textAlign: 'center',
                        margin: '10px',
                    }}
                    variant="h5"
                >
                    تغییر رمز
                </Typography>

                <hr width="100%" style={{ margin: 10 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <STextField
                            fullWidth
                            error={formik.errors["new_pass"] && formik.touched["new_pass"]}
                            variant="outlined"
                            label="کلمه عبور"
                            name="new_pass"
                            type={showPassword ? "text" : "password"}
                            helperText={formik.touched["new_pass"] && formik.errors["new_pass"]}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            {...formik.getFieldProps("new_pass")}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <STextField
                            fullWidth
                            error={formik.errors["repeat_pass"] && formik.touched["repeat_pass"]}
                            variant="outlined"
                            label="تکرار رمز عبور"
                            name="repeat_pass"
                            type={showPassword ? "text" : "password"}
                            helperText={formik.touched["repeat_pass"] && formik.errors["repeat_pass"]}
                            {...formik.getFieldProps("repeat_pass")}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button type="submit" color="doctor" disabled={!(formik.isValid)} variant="contained">ذخیره کردن</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}