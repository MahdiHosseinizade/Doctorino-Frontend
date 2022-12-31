import { makeStyles } from "@mui/styles";
import { Container, Grid, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import NavBar from "../NavBar/newNavBar";
import DoctorCard from "./DoctorCard";
import queryString from "query-string";
import { Box } from "@mui/system";

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
  navBar: {
    marginBottom: "100px",
  },
});

const SearchDoctorResponse = () => {
  const location = useLocation();
  const { contact } = location.state;
  const query = queryString.parse(location.search);
  console.log(location);
  const classes = useStyles();

  return (
    <div>
      {contact.length === 0 ? (
        <div>
          <Container>
            <Grid className={classes.navBar}>
              <NavBar />
            </Grid>
            <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'space-between',marginTop:'100px'}}>
            <Typography sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                دکتری با مشخصات وارد شده یافت نشد
             </Typography>
             <Typography >
                <Link to='/'>
                    بازگشت به صفحه اصلی
                </Link>
             </Typography>
            </Box>
          </Container>
        </div>
      ) : (
        <div>
          <Container>
            <Grid className={classes.navBar}>
              <NavBar />
            </Grid>
            <Grid container className={classes.container} sx={{ m: 3 }}>
              {contact.map((doctor, index) => (
                <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
                  <DoctorCard doctor={doctor} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      )}
    </div>
  );
};

export default SearchDoctorResponse;
