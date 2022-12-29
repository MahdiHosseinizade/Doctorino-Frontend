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
import { styled, border } from '@mui/system';
import useAxios from '../../../../utils/useAxios';
import AuthContext from '../../../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { baseURL } from '../../../../utils/useAxios';



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

export default function ManagerProfile(props) {

    const [hotel, setHotel] = useState([]);
    const [genders, setGenders] = useState([]);
    const [day, setDay] = useState([]);
    const [month, setMonth] = useState([]);
    const [year, setYear] = useState([]);

    let { user, authData, logoutUser } = useContext(AuthContext);
    let api = useAxios();

    const handleGender = (event) => {
        const {
            target: { value },
        } = event;
        setGenders(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const reHandleGender = (e) => {
        setGenders(e.target.value);
    };

    const handleDay = (event) => {
        const {
            target: { value },
        } = event;
        setDay(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const reHandleDay = (e) => {
        setDay(e.target.value);
    };

    const handleMonth = (event) => {
        const {
            target: { value },
        } = event;
        setMonth(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const reHandleMonth = (e) => {
        setMonth(e.target.value);
    };

    const handleYear = (event) => {
        const {
            target: { value },
        } = event;
        setYear(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const reHandleYear = (e) => {
        setYear(e.target.value);
    };


    const formValue = {
        firstName: "",
        lastName: "",
        fatherName: "",
        identityNumber: "", // shomare shenasname
        socialNumber: "", // code meli
        sex: [],
        firstPhoneNumber: "",
        secondPhoneNumber: "",
        areaCode: "", // code telephone shahrestan 
        telephoneNumber: "", // telephone sabet
        address: "",
        birthYear: [],
        birthMonth: [],
        birthDay: [],
        shaba: "",
    }


    const validationSchema = Yup.object({
        firstName: Yup.string().required("نام ضروری است"),
        lastName: Yup.string().required("نام خانوادگی ضروری است"),
        fatherName: Yup.string().required("نام پدر ضروری است"),
        identityNumber: Yup.string().required("شماره شناسنامه ضروری است"),
        socialNumber: Yup.string().required("کد ملی ضروری است"),
        sex: Yup.string().required("جنسیت ضروری است"),
        firstPhoneNumber: Yup.string().required("تلفن همراه ضروری است"),
        secondPhoneNumber: Yup.string(),
        areaCode: Yup.string(),
        telephoneNumber: Yup.string(),
        address: Yup.string(),
        birthYear: Yup.string().required("سال تولد ضروری است"),
        birthMonth: Yup.string().required("ماه تولد ضروری است"),
        birthDay: Yup.string().required("روز تولد ضروری است"),
        shaba: Yup.string().required("شماره شبا ضروری است"),
    })

    const gender = ["مونث", "مذکر"]
    const days = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"]
    const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"]
    const years = ["1300", "1301", "1302", "1303", "1304", "1305", "1306", "1307", "1308", "1309", "1310", "1311", "1312", "1313", "1314", "1315", "1316", "1317", "1318", "1319", "1320", "1321", "1322", "1323", "1324", "1325", "1326", "1327", "1328", "1329", "1330", "1331", "1332", "1333", "1334", "1335", "1336", "1337", "1338", "1339", "1340", "1341", "1342", "1343", "1344", "1345", "1346", "1347", "1348", "1349", "1350", "1351", "1352", "1353", "1354", "1355", "1356", "1357", "1358", "1359", "1360", "1361", "1362", "1363", "1364", "1365", "1366", "1367", "1368", "1369", "1370", "1371", "1372", "1373", "1374", "1375", "1376", "1377", "1378", "1379", "1380", "1381"]

    const formik = useFormik({
        initialValues: formValue,
        onSubmit: (values) => postHotel([...hotel, values]),
        validationSchema: validationSchema,
    })


    function postHotel(hotel) {
        let formData = new FormData();

        formData.append('firstName', hotel.firstName);
        formData.append('lastName', hotel.lastName);
        formData.append('fatherName', hotel.fatherName);
        formData.append('identityNumber', hotel.identityNumber);
        formData.append('socialNumber', hotel.socialNumber);
        formData.append('sex', hotel.sex);
        formData.append('firstPhoneNumber', hotel.firstPhoneNumber);
        formData.append('secondPhoneNumber', hotel.secondPhoneNumber); formData.append('firstName', hotel.firstName);
        formData.append('areaCode', hotel.areaCode);
        formData.append('telephoneNumber', hotel.telephoneNumber);
        formData.append('address', hotel.address);
        formData.append('birthYear', hotel.birthYear);
        formData.append('birthMonth', hotel.birthMonth);
        formData.append('birthDay', hotel.birthDay);
        formData.append('shaba', hotel.shaba);


        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1])
        }

        api.post('/api/hotel/new/',
            formData,
            {
                // set the type of the request to multipart/form-data
                // so that the server can handle the request properly
                // features: array of integers
                // cover_image: image file
                // stars: integer
                // other fields: string

                headers:
                {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${authData.access}`
                }
            }
        )
            .then(res => toast.success('هتل با موفقیت ایجاد شد', {
                position: "top-right",
                autoClose: 2000,
            }))
            .catch(err => toast.error('مشکلی پیش آمده', {
                position: "top-right",
                autoClose: 2000,
            }))
    }



    return (
        <Container>
            <Box
                onSubmit={formik.handleSubmit}
                component="form"
                autoComplete="off"
                mt={5}
                sx={{
                    bgcolor: 'rgb(245, 246, 248)',
                    height: '80%',
                    width: "100%",
                    border: '1px solid #ccc',
                    borderRadius: '10px',
                    padding: '20px',
                    '& .MuiTextField-root': { m: 0.5 },
                    boxShadow: "0 0 10px 0 rgba(0,0,0,0.5)",
                }}
                
            >
                <Typography
                    sx={{
                        textAlign: 'center',
                        margin: '10px',
                    }}
                    variant="h5"
                >
                    پروفایل کاربری
                </Typography>

                <hr width="100%" style={{ margin: 10 }} />



                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Box ml={1} sx={{ borderBottom: 1, boredrColor: "error.main", width: '20%', display: 'flex' }}>
                            <p>
                                مشخصات فردی&nbsp;&nbsp;&nbsp;
                            </p>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={4} >
                        <STextField
                            fullWidth
                            error={formik.errors["firstName"] && formik.touched["firstName"]}
                            variant='filled'
                            label="نام"
                            name='firstName'
                            type="text"
                            helperText={formik.errors["firstName"]}
                            {...formik.getFieldProps('firstName')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} >
                        <STextField
                            fullWidth
                            error={formik.errors["lastName"] && formik.touched["lastName"]}
                            variant='filled'
                            label="نام خانوادگی"
                            name='lastName'
                            type="text"
                            helperText={formik.errors["lastName"]}
                            {...formik.getFieldProps('lastName')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4} >
                        <STextField
                            fullWidth
                            error={formik.errors["fatherName"] && formik.touched["fatherName"]}
                            variant='filled'
                            label="نام پدر"
                            name='fatherName'
                            type="text"
                            helperText={formik.errors["fatherName"]}
                            {...formik.getFieldProps('fatherName')}
                        />
                    </Grid>


                    <Grid item xs={12} md={6} lg={4} >
                        <FormControl fullWidth>
                            <InputLabel>جنسیت</InputLabel>
                            <SSelect
                                required
                                defaultValue={0}
                                value={gender}
                                label='جنسیت'
                                onChange={reHandleDay}
                                error={formik.errors["sex"] && formik.touched["sex"]}
                                {...formik.getFieldProps('gender')}
                            >
                                {gender.map((feat, ind) => (
                                    <MenuItem key={ind} value={feat}>
                                        {/* <Checkbox checked={genders.indexOf(feat) > -1} /> */}
                                        <ListItemText primary={feat} />
                                    </MenuItem>
                                ))}
                            </SSelect>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} md={6} lg={4} >
                        <STextField
                            fullWidth
                            error={formik.errors["identityNumber"] && formik.touched["identityNumber"]}
                            variant='filled'
                            label="شماره شناسنامه"
                            name='identityNumber'
                            type="text"
                            helperText={formik.errors["identityNumber"]}
                            {...formik.getFieldProps('identityNumber')}
                        />
                    </Grid>


                    <Grid item xs={12} md={6} lg={4} >
                        <STextField
                            fullWidth
                            error={formik.errors["socialNumber"] && formik.touched["socialNumber"]}
                            variant='filled'
                            label="کد ملی"
                            name='socialNumber'
                            type="text"
                            helperText={formik.errors["socialNumber"]}
                            {...formik.getFieldProps('socialNumber')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <STextField
                            fullWidth
                            error={formik.errors["firstPhoneNumber"] && formik.touched["firstPhoneNumber"]}
                            variant='filled'
                            label="تلفن همراه اول"
                            name='firstPhoneNumber'
                            type="text"
                            helperText={formik.errors["firstPhoneNumber"]}
                            {...formik.getFieldProps('firstPhoneNumber')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <STextField
                            fullWidth
                            error={formik.errors["secondPhoneNumber"] && formik.touched["secondPhoneNumber"]}
                            variant='filled'
                            label="تلفن همراه دوم"
                            name='secondPhoneNumber'
                            type="text"
                            helperText={formik.errors["secondPhoneNumber"]}
                            {...formik.getFieldProps('secondPhoneNumber')}
                        />
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth>
                            <InputLabel>روز تولد</InputLabel>
                            <SSelect
                                required
                                defaultValue={0}
                                value={day}
                                label="روز تولد"
                                onChange={reHandleDay}
                                error={formik.errors["birthDay"] && formik.touched["birthDay"]}
                                {...formik.getFieldProps('day')}
                            >
                                {days.map((feat, ind) => (
                                    <MenuItem key={ind} value={feat}>
                                        {/* <Checkbox checked={days.indexOf(feat) > -1} /> */}
                                        <ListItemText primary={feat} />
                                    </MenuItem>
                                ))}
                            </SSelect>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth>
                            <InputLabel>ماه تولد</InputLabel>
                            <SSelect
                                required
                                defaultValue={0}
                                value={month}
                                label="ماه تولد"
                                onChange={reHandleMonth}
                                error={formik.errors["birthMonth"] && formik.touched["birthMonth"]}
                                {...formik.getFieldProps('month')}
                            >
                                {months.map((feat, ind) => (
                                    <MenuItem key={ind} value={feat}>
                                        {/* <Checkbox checked={months.indexOf(feat) > -1} /> */}
                                        <ListItemText primary={feat} />
                                    </MenuItem>
                                ))}
                            </SSelect>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} md={4} >
                        <FormControl fullWidth>
                            <InputLabel>سال تولد</InputLabel>
                            <SSelect

                                required
                                defaultValue={0}
                                value={year}
                                label="سال تولد"
                                onChange={reHandleYear}
                                error={formik.errors["birthYear"] && formik.touched["birthYear"]}
                                {...formik.getFieldProps('birthYear')}
                            >
                                {years.map((feat, ind) => (
                                    <MenuItem key={ind} value={feat}>
                                        {/* <Checkbox checked={years.indexOf(feat) > -1} /> */}
                                        <ListItemText primary={feat} />
                                    </MenuItem>
                                ))}
                            </SSelect>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12}>
                        <Box ml={1} sx={{ borderBottom: 1, boredrColor: "error.main", width: '20%', display: 'flex' }}>
                            <p>
                                اطلاعات محل اسکان &nbsp;&nbsp;&nbsp;
                            </p>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <STextField
                            fullWidth
                            error={formik.errors["areaCode"] && formik.touched["areaCode"]}
                            variant='filled'
                            label="کد شهرستان"
                            name='areaCode'
                            type="text"
                            helperText={formik.errors["areaCode"]}
                            {...formik.getFieldProps('areaCode')}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <STextField
                            fullWidth
                            error={formik.errors["telephoneNumber"] && formik.touched["telephoneNumber"]}
                            variant='filled'
                            label="تلفن ثابت"
                            name='telephoneNumber'
                            type="text"
                            helperText={formik.errors["telephoneNumber"]}
                            {...formik.getFieldProps('telephoneNumber')}
                        />
                    </Grid>

                    <Grid item xs={12} >
                        <STextField
                            fullWidth
                            error={formik.errors["adress"] && formik.touched["adress"]}
                            variant='filled'
                            label="آدرس"
                            name='adress'
                            type="text"
                            helperText={formik.errors["adress"]}
                            {...formik.getFieldProps('adress')}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Box ml={1} sx={{ borderBottom: 1, boredrColor: "error.main", width: '20%', display: 'flex' }}>
                            <p>
                                تکمیل حساب بانکی&nbsp;&nbsp;&nbsp;
                            </p>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <STextField
                            fullWidth
                            error={formik.errors["shaba"] && formik.touched["shaba"]}
                            variant='filled'
                            label="شماره شبا"
                            name='shaba'
                            type="text"
                            helperText={formik.errors["shaba"]}
                            {...formik.getFieldProps('shaba')}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{ marginTop: '20px' }}>
                        <Button type="submit"
                            disabled={(formik.isValid)}
                            variant="contained"
                            color='hotel'
                            style={{ fontSize: '15px' }}
                        >ثبت اطلاعات
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}


// *new:
// disable button
// year,...
// map in year,...






// failiures:
// 1. sselect ha ke chackbox nadarand entekhab nemishavand
// 2. sjamare shaba ham ezafe shavad
// 3. bakhsh haye mokhtalef style bandi shavand!!