//profile
import React from 'react'
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
  FormControlLabel,
  Collapse,
  Button,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import PropTypes from 'prop-types';
import Tab from '@mui/material/Tab';
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import PhoneEnabledIcon from '@mui/icons-material/PhoneEnabled';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { flexbox } from '@mui/system';


// show the directory to the use with <basic breadcrums (mui)>

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    display: 'fix',
    paddingInline: "13px",
    marginBottom: "20px",
  },
  doctor_image: {
    width: "100%",
    height: "100%",
    margin: "20px",
    border: "7px solid #ccc",
    borderRadius: "250px",
    maxHeight: "250px",
    maxWidth: "250px",
    position: "static",
    display: "inline-table",
  }
});



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




const Profile = (props) => {

  const [value, setValue] = React.useState(0);
  
  const secondaryHandleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [checked, setChecked] = React.useState(false);

  const thiredHandleChange = () => {
    setChecked((prev) => !prev);
  };

  const classes = useStyles();

  return (
    <Container className={classes.container} >
      <Card className={classes.card}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid item xs={12} lg={6} sx={{ display: 'flex', position: "sticky", justifyContent: 'center' }}>
            <CardMedia
              component="img"
              className={classes.doctor_image}
              image={props.doctor?.image}
              alt="doctor image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CardContent sx={{ marginTop: "20px" }}>
              <Box>
                <Grid container spacing={3.5}>
                  <Grid item xs={12} md={12} >
                    {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                    <Typography variant="subtitle2" sx={{ fontSize: "30px", display: "flex" }}>
                      دکتر {props.doctor?.user.first_name} {props.doctor?.user.last_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{marginTop: "-20px", marginBottom: "20px"}}>
                    <Typography
                      variant="subtitle1"
                      color={'text.secondary'}
                      sx={{
                        fontSize: 20,
                      }}
                    >
                      {/* متخصص {props.doctor?.specialties.name} */}
                      <br /><br />

                    </Typography>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <Grid container spacing={3.5} >
                  <Grid item xs={12} md={12} >
                    <Typography variant="body2" sx={{ fontSize: "20px",}}>
                      <PlaceOutlinedIcon color='primary' sx={{ marginBottom: "-7px" }} /><span>     </span>{props.doctor?.city}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                    <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                      <VerifiedIcon color='primary' sx={{ marginBottom: "-7px" }} />
                      <span>     </span> کد نظام پزشکی
                    </Typography>

                    <Typography noWrap variant='subtitle1' color={'text.secondary'} sx={{ fontSize: "17px", display: 'inline', marginLeft: '15px' }} >
                      {props.doctor?.medical_system_number}
                    </Typography>

                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card >
      <Card>
        <Box sx={{ width: '100%', }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="scrollable" scrollButtons="auto" value={value} onChange={secondaryHandleChange} aria-label="basic tabs example" >
              <Tab label="درباره پزشک" {...a11yProps(0)} sx={{ width: "auto" }} />
              <Tab label="اطلاعات تماس" {...a11yProps(1)} sx={{ width: "auto" }} />
              <Tab label="نظرات و امتیاز" {...a11yProps(2)} sx={{ width: "auto" }} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <h4 style={{ marginBottom: "10px" }}>درباره پزشک</h4>
            {/* info about doctor from back-end */}
            <Box>

              <Box
                sx={{
                  "& > :not(style)": {
                    display: "flex",
                    justifyContent: "space-around",
                    height: "auto",
                    width: "auto",
                    marginBottom: "10px",
                  }
                }}
              >
                  <Collapse in={checked} collapsedSize={40}>
                    <Typography>{props.doctor?.description}</Typography>
                  </Collapse>

              </Box>

              {/* <Box sx={{height: "auto", display:'flex'}}>
                <FormControlLabel
                  control={<Button sx={{ left :'10%'}} onClick={thiredHandleChange} label="▾بیشتر">بیشتر▾</Button>}
                />
              </Box> */}

            </Box>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <h4 style={{ marginBottom: "15px" }}>  شماره تماس</h4>
            <Typography>
              <PhoneEnabledIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {props.doctor?.office_number}
            </Typography>
            <br />
            <h4 style={{ marginBottom: "15px" }}> نشانی مطب</h4>
            <Typography>
              <LocationOnIcon fontSize="small" style={{ marginBottom: "-5px", marginLeft: "5px" }} />
              {`${props.doctor?.province}، ${props.doctor?.city}، ${props.doctor?.clinic_address}`}
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2}>
            نظرات و امتیاز
          </TabPanel>
        </Box>
      </Card>
      <br /><br /><br /><br />
    </Container >
  )
}

export default Profile;