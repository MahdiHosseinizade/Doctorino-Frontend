import { makeStyles } from '@mui/styles';
import { Card, Container, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import './HotelReservation.css'

const useStyles = makeStyles({
    container: {
      marginTop: "20px",
      paddingTop: "30px",
    },
    card: {
      // display: "fix",
      width: "100%",
      height: "150px",
      position: "relative",
      display: "flex",
      flexDirection: "row",
      paddingInline: "13px",
      marginBottom: "40px",
    },
    card2: {
      width: "100%",
      height: "500px",
      display: "fix",
      paddingInline: "13px",
      marginBottom: "20px",
    },
    card3: {
      width: "100%",
      height: "100px",
      display: "fix",
      paddingInline: "13px",
      marginBottom: "50px",
    },
  });

const HotelReservation = () => {
    
    const classes = useStyles();
    
    return (
        <Container className={classes.container} >
            <Card className={classes.card} >
                <Grid container sx={{marginTop:"10px"}} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <div>
                            <h1 className='HotelName' >هتل آسمان هشتم</h1>
                        </div>
                        <div className='HotelReservationInfo'>
                            <div className='HotelStars'>
                                <div>4ستاره</div>
                            </div>
                            <div className='HotelLocation'>
                                <div><span>آدرس : </span><span className='Adr'>مشهد خیابان داربی شهرک غرب</span></div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
            <Card className={classes.card2}>
                <Grid container sx={{marginTop:"10px"}} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <FormControl>
                        <InputLabel id="demo-simple-select-label">جنسیت</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={age}
                                label="جنسیت"
                                sx={{width:"900px"}}
                                // onChange={handleChange}
                            >
                              <MenuItem value={'male'}>مرد</MenuItem>
                              <MenuItem value={'female'}>زن</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            sx={{width:"900px" , marginTop:"20px"}}
                            fullWidth
                            variant="outlined"
                            label="نام"
                            name="first_name"
                            type="text"
                        />
                        <TextField
                            sx={{width:"900px" , marginTop:"20px"}}
                            fullWidth
                            variant="outlined"
                            label="نام خانوادگی"
                            name="last_name"
                            type="text"
                        />
                        <TextField
                            sx={{width:"900px" , marginTop:"20px"}}
                            fullWidth
                            variant="outlined"
                            label="کد ملی"
                            name="national_code"
                            type="text"
                        />
                        <TextField
                            sx={{width:"900px" , marginTop:"20px"}}
                            fullWidth
                            variant="outlined"
                            label="شماره تلفن همراه"
                            name="mobile"
                            type="tel"
                        />
                    </Grid>
                </Grid>
            </Card>
            <Card className={classes.card3}>
                <Grid container sx={{marginTop:"10px"}} >
                    <Grid item xs={12} sm={6} md={6} lg={6} xl={6} >
                        <div className='PricenAndButton'>
                            <div className='Price'>
                                <div className='PriceTitle'> قیمت نهایی : <span>18505000 ریال </span></div>
                            </div>
                            <div className='Button'>
                                <button className='ButtonReserve' > رزرو و تایید نهایی</button> 
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Card>
        </Container>
    );
}
 
export default HotelReservation;