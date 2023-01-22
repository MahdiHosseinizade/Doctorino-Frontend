import { Box, Button, Container, Grid, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useState, useContext, useEffect } from 'react';
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
    confirmation: ""
}

const validationSchema = Yup.object({
    confirmation: Yup.string().required("کد تایید را باید وارد کنید.")
})

export default function VerifyEmail() {

    const [loading, setLoading] = useState(true);

    const { logOut, user } = useContext(AuthContext);
    const history = useHistory();
    const api = useAxios();

    const formik = useFormik({
        initialValues: formValue,

        onSubmit: (values) => {
            api.post("api/auth/change-password/verify/", {
                'email': user.email,
                'code': values.confirmation
            }).then(res => {
                toast.success("با موفقیت تایید شد.", {
                    position: "top-right",
                    autoClose: 2000,
                })

                history.push("/hotel-panel/change-password")
            }).catch(err => {
                if (err.code === 500) {
                    toast.error("مشکلی پیش آمده است.", {
                        position: "top-right",
                        autoClose: 5000,
                    })
                } else {
                    toast.error(err.response.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                    })
                }
            })
        },
        validationSchema: validationSchema,
    })

    useEffect(() => {
        if (loading) {
            api.post("api/auth/change-password/send-code/", {
                email: user.email,
            }).then(res => {
                console.log(res)
                toast.info(`کد تایید به ایمیل ${user.email} ارسال شد. 2 دقیقه وقت دارید ایمیل را تایید کنید.`, {
                    position: "top-right",
                    autoClose: 5000,
                })
            }).catch(err => {
                if (err.code === 500) {
                    toast.error("مشکلی پیش آمده است.", {
                        position: "top-right",
                        autoClose: 5000,
                    })
                } else {
                    toast.error(err.response.data.error, {
                        position: "top-right",
                        autoClose: 5000,
                    })
                }
            })

            setLoading(false);
        }
    }, [loading]);

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
                    تایید ایمیل 
                </Typography>

                <hr width="100%" style={{ margin: 10 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <STextField
                            fullWidth
                            error={formik.errors["confirmation"] && formik.touched["confirmation"]}
                            variant="outlined"
                            label="کد تایید"
                            name="confirmation"
                            type={"text"}
                            helperText={formik.touched["confirmation"] && formik.errors["confirmation"]}
                            {...formik.getFieldProps("confirmation")}
                        />
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button type="submit" color="hotel" disabled={!(formik.isValid)} variant="contained">تایید</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}