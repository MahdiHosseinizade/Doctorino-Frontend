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


const STextField = styled(TextField)({
    "& .MuiFilledInput-root": {
        background: "#fefefe"
    },
    "& .MuiOutlinedInput-root": {
        background: "#fefefe"
    },
    spellCheck: false,
})

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

    let { user, authTokens, logoutUser } = useContext(AuthContext);
    let api = useAxios();

    const [hotel, setHotel] = useState([]);
    const [stars, setStars] = useState();
    const [availableFeatures, setAvailableFeatures] = useState([]);
    const [features, setFeatures] = React.useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/hotel/feature/")
            .then(res => setAvailableFeatures(res.data))
            .catch(err => console.log(err));
    }, [])

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

        // const formData = new FormData();
        // formData.append('file', file);

        // console.log(formData.get('file'));

        api.post('/api/hotel/new/',
            {
                "hotel_name": hotel.hotel_name,
                "stars": hotel.stars,
                "address": hotel.address,
                "features": features,
                "hotel_description": hotel.description,
                "trade_code": hotel.trade_code,

                // "cover_image": formData
            },
            {
                headers:
                {
                    Authorization: `Bearer ${authTokens.access}`
                }
            }
        )
            .then(res => toast.success('هتل با موفقیت ایجاد شد', {
                position: "top-right",
                autoClose: 2000,
            }))
            .catch(err => toast.success('مشکلی پیش آمده', {
                position: "top-right",
                autoClose: 2000,
            }))
    }

    function handle(e) {
        setFile(e.target.files[0]);
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
                    <Grid item xs={12} md={6}>
                        <STextField
                            fullWidth
                            error={formik.errors["hotel_name"] && formik.touched["hotel_name"]}
                            variant='filled'
                            label="نام هتل"
                            name='hotel_name'
                            type="text"
                            helperText={formik.errors["hotel_name"]}
                            {...formik.getFieldProps('hotel_name')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <STextField
                            fullWidth
                            error={formik.errors["phone_number"] && formik.touched["phone_number"]}
                            variant='filled'
                            label="شماره تماس هتل"
                            name='phone_number'
                            type="text"
                            helperText={formik.errors["phone_number"]}
                            {...formik.getFieldProps('phone_number')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <STextField
                            fullWidth
                            error={formik.errors["address"] && formik.touched["address"]}
                            variant='filled'
                            label="آدرس هتل"
                            name='address'
                            type="text"
                            helperText={formik.errors["address"]}
                            {...formik.getFieldProps('address')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <STextField
                            fullWidth
                            error={formik.errors["trade_code"] && formik.touched["trade_code"]}
                            variant='filled'
                            label="کد صنفی"
                            name='trade_code'
                            type="text"
                            helperText={formik.errors["trade_code"]}
                            {...formik.getFieldProps('trade_code')}
                        />
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <STextField
                            fullWidth
                            error={formik.errors["hotel_description"] && formik.touched["hotel_description"]}
                            variant='outlined'
                            label="توضیحات"
                            name="hotel_description"
                            type="text"
                            helperText={formik.errors["hotel_description"]}
                            multiline
                            rows={4}
                            {...formik.getFieldProps('hotel_description')}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
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
                                    <MenuItem key={id} value={id}>
                                        <Checkbox checked={features.indexOf(id) > -1} />
                                        <ListItemText primary={title} />
                                    </MenuItem>
                                ))}
                            </SSelect>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
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
                                <MenuItem value={1}>یک ستاره</MenuItem>
                                <MenuItem value={2}>دو ستاره</MenuItem>
                                <MenuItem value={3}>سه ستاره</MenuItem>
                                <MenuItem value={4}>چهار ستاره</MenuItem>
                                <MenuItem value={5}>پنج ستاره</MenuItem>
                            </SSelect>
                        </FormControl>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button
                            fullWidth
                            variant="outlined"
                            component="label"
                        // {...formik.getFieldProps('rules')}
                        >
                            {"فایل قوانین هتل"}
                            {/* <Input
                                style={{ display: 'none' }}
                                name="rules"
                                type="file"
                                {...formik.getFieldProps('rules')}
                            /> */}
                            <input
                                type="file"
                                name='rules'
                                style={{ display: 'none' }}
                                onChange={(e) => handle(e)}
                            />
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button type="submit" disabled={!(formik.isValid)} variant="contained">اضافه کردن</Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}
