import React, { useContext, useEffect } from 'react';
import {
    Container,
    Grid,
    Box,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    OutlinedInput,
    Checkbox,
    ListItemText,
    Typography,
    Input
} from '@mui/material';
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { styled } from '@mui/system';
import useAxios from '../../../../utils/useAxios';
import AuthContext from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../../../../utils/useAxios';
import Dropzone from '../../../common/Dropzone';
import theme from '../../../../assets/theme/defaultTheme';


const DropzoneStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "400px",
    padding: "5px",
    borderStyle: "dotted",
    borderWidth: "4px",
    borderColor: "#c5a401",
    borderRadius: "10px",
    cursor: "pointer",
}

const SMenuItem = styled(MenuItem)({
    "&:hover": {
        backgroundColor: theme.palette.hotel.light,
    },
    // style when selected
    "&.Mui-selected": {
        backgroundColor: theme.palette.hotel.light,
    },
    "&.Mui-selected:hover": {
        backgroundColor: "transparent",
    }
})

const SFormControl = styled(FormControl)({
    "& .MuiOutlinedInput-root": {
        // set the color of the input when focused
        "&:hover fieldset": {
            borderColor: theme.palette.hotel.main,
        }
    },

    // focused style
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.hotel.main,
        borderWidth: "1px",
    },
    // set the label color when focused
    "& .MuiInputLabel-root": {
        color: theme.palette.grey[500],
    },
    // style the dropdown icon
    "& .MuiSelect-icon": {
        color: theme.palette.hotel.contrastText,
        backgroundColor: theme.palette.hotel.main,
        borderRadius: "50%",
    },
});

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
    // style when focused
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.hotel.main,
    },

    spellCheck: false,
});

const SSelect = styled(Select)({
    background: "#fefefe"
})

const formValue = {
    stars: "",
    hotel_name: "",
    phone_number: "",
    hotel_description: "",
    address: "",
    rules: "",
    features: [],
    trade_code: "",
}

const validationSchema = Yup.object({
    stars: Yup.number().required("ستاره های هتل باید وارد شود"),
    hotel_name: Yup.string().required("نام هتل ضروری است"),
    phone_number: Yup.string().required("تلفن هتل ضروری است"),
    hotel_description: Yup.string(),
    rules: Yup.string(),
    address: Yup.string().required("آدرس هتل ضروری است"),
    features: Yup.array(),
    trade_code: Yup.string().required("کد صنفی ضروری است"),
})


export default function HotelProfileCompletion() {

    let { user, authData, logoutUser } = useContext(AuthContext);
    let api = useAxios();

    const [hotel, setHotel] = useState([]);
    const [stars, setStars] = useState();
    const [availableFeatures, setAvailableFeatures] = useState([]);
    const [features, setFeatures] = React.useState([]);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(true);
    const [imageToShow, setImageToShow] = useState(null);

    function handleImage(e) {
        // save the image to the state
        setFile(e.target.files[0]);
    }

    useEffect(() => {
        if (loading) {
            axios.get(`${baseURL}/api/hotel/feature/`)
                .then(res => setAvailableFeatures(res.data))
                .catch(err => console.log(err));
            setLoading(false);
        }
    }, [loading, features])

    const handleFeatures = (event) => {
        const {
            target: { value },
        } = event;
        setFeatures(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const formik = useFormik({
        initialValues: formValue,
        onSubmit: (values) => postHotel(values),
        validationSchema: validationSchema,
    })


    function handleStars(e) {
        setStars(e.target.value);
    }

    function postHotel(hotel) {

        let formData = new FormData();

        formData.append('hotel_name', hotel.hotel_name);
        formData.append('address', hotel.address);
        formData.append('stars', hotel.stars);

        if (file) {
            formData.append('cover_image', file);
        }

        features.forEach(feat => {
            formData.append("features", feat)
        })

        formData.append('phone_number', hotel.phone_number);
        formData.append('hotel_description', hotel.hotel_description);
        formData.append('rules', hotel.rules);
        formData.append('trade_code', hotel.trade_code);


        // log all the form data
        console.log("send data");
        for (var key of formData.entries()) {
            console.log(key[0] + ': ' + formData.getAll(key[0]));
        }

        api.post('/api/hotel/new/',
            formData,
            {
                headers:
                {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authData.access}`
                }
            }
        )
            .then(res => {
                console.log(res);
                toast.success("هتل با موفقیت ایجاد شد", {
                    position: "top-right",
                    autoClose: 2000,
                })
            })
            .catch(err => toast.error('مشکلی پیش آمده', {
                position: "top-right",
                autoClose: 2000,
            }))
    }

    function handleImage(files) {
        setImageToShow(URL.createObjectURL(files[0]));
        setFile(files[0]);
    }

    return (
        <Container>
            <Box
                sx={{
                    marginTop: "50px",
                    bgcolor: 'rgb(245, 246, 248)',
                    // height: '80%',
                    // width: '80%',
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
                    اضافه کردن هتل
                </Typography>

                <hr width="100%" style={{ margin: 10 }} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Dropzone
                            iconColor={"hotel"}
                            imageToShow={imageToShow}
                            CssBaseLine={true}
                            handleFile={handleImage}
                            BaseStyle={DropzoneStyle}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <STextField
                                    fullWidth
                                    error={formik.errors["hotel_name"] && formik.touched["hotel_name"]}
                                    variant='outlined'
                                    label="نام هتل"
                                    name='hotel_name'
                                    type="text"
                                    helperText={formik.touched["hotel_name"] && formik.errors["hotel_name"]}
                                    {...formik.getFieldProps('hotel_name')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <STextField
                                    fullWidth
                                    error={formik.errors["phone_number"] && formik.touched["phone_number"]}
                                    variant='outlined'
                                    label="شماره تماس هتل"
                                    name='phone_number'
                                    type="text"
                                    helperText={formik.touched["phone_number"] && formik.errors["phone_number"]}
                                    {...formik.getFieldProps('phone_number')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <STextField
                                    fullWidth
                                    error={formik.errors["address"] && formik.touched["address"]}
                                    variant='outlined'
                                    label="آدرس هتل"
                                    name='address'
                                    type="text"
                                    helperText={formik.touched['address'] && formik.errors["address"]}
                                    {...formik.getFieldProps('address')}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <STextField
                                    fullWidth
                                    error={formik.errors["trade_code"] && formik.touched["trade_code"]}
                                    variant='outlined'
                                    label="کد صنفی"
                                    name='trade_code'
                                    type="text"
                                    helperText={formik.touched["trade_code"] && formik.errors["trade_code"]}
                                    {...formik.getFieldProps('trade_code')}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <STextField
                                    fullWidth
                                    error={
                                        formik.errors["hotel_description"] &&
                                        formik.touched["hotel_description"]
                                    }
                                    variant="outlined"
                                    label="توضیحات"
                                    name="hotel_description"
                                    type="text"
                                    helperText={formik.touched["hotel_description"] && formik.errors["hotel_description"]}
                                    multiline
                                    rows={3}
                                    {...formik.getFieldProps("hotel_description")}
                                />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <STextField
                                    fullWidth
                                    error={
                                        formik.errors["rules"] &&
                                        formik.touched["rules"]
                                    }
                                    variant="outlined"
                                    label="قوانین هتل"
                                    name="rules"
                                    type="text"
                                    helperText={formik.touched["rules"] && formik.errors["rules"]}
                                    multiline
                                    rows={3}
                                    {...formik.getFieldProps("rules")}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SFormControl fullWidth>
                                    <InputLabel>امکانات</InputLabel>
                                    <SSelect
                                        {...formik.getFieldProps('features')}
                                        renderValue={(selected) => selected.join(', ')}
                                        error={formik.errors["features"] && formik.touched["features"]}
                                        multiple
                                        value={features}
                                        onChange={handleFeatures}
                                        input={<OutlinedInput label="امکانات" />}
                                    >
                                        {availableFeatures.map(({ id, title }) => (
                                            <SMenuItem key={id} value={id}>
                                                <Checkbox checked={features.indexOf(id) > -1} />
                                                <ListItemText primary={title} />
                                            </SMenuItem>
                                        ))}
                                    </SSelect>
                                </SFormControl>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SFormControl fullWidth>
                                    <InputLabel>ستاره</InputLabel>
                                    <SSelect
                                        required
                                        value={stars}
                                        defaultValue={0}
                                        label="ستاره"
                                        onChange={handleStars}
                                        error={formik.errors["stars"] && formik.touched["stars"]}
                                        {...formik.getFieldProps('stars')}
                                    >
                                        <SMenuItem value={1}>یک ستاره</SMenuItem>
                                        <SMenuItem value={2}>دو ستاره</SMenuItem>
                                        <SMenuItem value={3}>سه ستاره</SMenuItem>
                                        <SMenuItem value={4}>چهار ستاره</SMenuItem>
                                        <SMenuItem value={5}>پنج ستاره</SMenuItem>
                                    </SSelect>
                                </SFormControl>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Button type="submit" color="hotel" disabled={!(formik.isValid)} variant="contained">اضافه کردن</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
