import { makeStyles } from "@mui/styles";
import { Container,Grid } from "@mui/material";
import { useLocation } from "react-router-dom";
import NavBar from "../NavBar/newNavBar";
import DoctorCard from "./DoctorCard";
import queryString from "query-string";

const useStyles = makeStyles({
    container: {
      marginTop: "100px",
    },
    navBar: {
      marginBottom: "100px",
    },
  });

const SearchDoctorResponse = () => {
    const location = useLocation()
    const { contact } = location.state;
    const query = queryString.parse(location.search)
    console.log(location)
    const classes = useStyles();

    return (
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
    );
}
 
export default SearchDoctorResponse;