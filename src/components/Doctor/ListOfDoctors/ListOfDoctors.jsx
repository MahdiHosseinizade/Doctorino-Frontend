import { Container, Grid, Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import DoctorCard from "./components/DoctorCard";
import NavBar from "../../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
  navBar: {
    marginBottom: "100px",
  },
});

export default function Doctors() {
  const classes = useStyles();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // fetch("http://localhost:8000/doctors") 
    // fetch("http://127.0.0.1:8000/api/doctor/")
    fetch("http://188.121.113.74/api/doctor/")
      .then((res) => res.json())
      .then((data) => {
        console.log("this is the data to be replaced in doctor values: ", data)
        setDoctors(data)});
  }, []);

  return (
    <Container>
      <Grid className={classes.navBar}>
        {/* <Box> */}
          <NavBar />
        {/* </Box> */}
      </Grid>
      <Grid container className={classes.container} sx={{ m: 3 }}>
        {doctors.map((doctor, index) => (
          <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
            <DoctorCard doctor={doctor} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
