import React from "react";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Container, Grid } from "@mui/material";
import NavBar from "../../NavBar/newNavBar";
import HotelCard from "./HotelCard";

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
  navBar: {
    marginBottom: "100px",
  },
});

export default function FoundHotels() {
  const location = useLocation();
  const { hotels } = location.state;
  const classes = useStyles();

  return (
    <div>
      <Container>
        <Grid className={classes.navBar}>
          <NavBar />
        </Grid>
        <Grid container className={classes.container} sx={{ m: 3 }}>
          {hotels.map((hotel, index) => (
            <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
              <HotelCard hotel={hotel} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}
