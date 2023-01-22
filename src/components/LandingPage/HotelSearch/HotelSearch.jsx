import React, { useState } from "react";
import "./HotelSearch.css";
import NavBar from "../../NavBar/newNavBar";
import Footer from "../../Footer/Footer";
import { makeStyles } from "@mui/styles";
import {
  FormControl,
  Grid,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import { MdPlace } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
// import cities from "../../../db/Cities";
// import { provinces } from "../../../db/Provinces.js";
import provinces from "../../../db/Provinces";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import Autocomplete from "@mui/material/Autocomplete";
import { useHistory } from "react-router-dom";
import theme from "../../../assets/theme/defaultTheme";
// import { alignProperty } from "@mui/material/styles/cssUtils";

const useStyles = makeStyles({
  ContainerLandingPage2: {
    marginRight: "4%",
    marginLeft: "5%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "60vw",
    backgroundColor: "#f5f5f5",
  },
  Title2: {
    position: "absolute",
    top: "20%",
    right: "25%",
    color: "white",
  },
  searchBarTitle: {
    marginRight: "5px",
    color: "#000",
    fontSize: "40px",
  },
  searchBarText: {
    marginRight: "5px",
    color: "#000",
    fontSize: "20px",
  },
  searchBar2: {
    marginBottom: "60px",
    marginRight: "4%",
    marginLeft: "5%",
    backgroundColor: "#fdb713",
    width: "60vw",
    minWidth: "370px",
    height: "60vh",
    // padding: "10px",
    fontSize: "16px",
    outline: "none",
    borderRadius: "10px",
    zIndex: "-1",
  },
  ZarebinIcon: {
    cursor: "pointer",
    width: "36px",
    height: "36px",
  },
  ZareBin2: {
    cursor: "pointer",
    backgroundColor: "#fdb713",
    width: "75px",
    height: "75px",
    borderRadius: "35px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "26px 54px",
  },
});

export default function HotelSearch() {
  const [city, setCity] = useState("");
  const classes = useStyles();
  const history = useHistory();

  const handleCity = (e) => {
    setCity(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://188.121.113.74/api/hotel/search/", {
        province: city.id,
        // province: 1,
      })
      .then((response) => {
        if (response.data.length !== 0) {
          console.log("the response of found hotels: ", response.data);
          history.push("/found-hotels", { hotels: response.data });
        } else {
          toast.error("هیچ هتلی یافت نشد");
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <Container className={classes.ContainerLandingPage2}>
      <Grid className={classes.ContainerLandingPage2}>
        <NavBar bgColor={theme.palette.hotel} />
        <form>
          {/* </Grid> */}

          <Grid>
            <Grid
              container
              sx={{
                marginRight: "50%",
                marginLeft: "15%",
                display: "flex",
                width: "80%",
                minWidth: "350px",
                height: "115px",
                backgroundColor: "white",
                position: "absolute",
                bottom: "17%",
                borderRadius: "16px",
              }}
            >
              <Grid
                item
                xs={3}
                md={3}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  varient="h1"
                  sx={{
                    // color: "#000",
                    fontSize: "22px",
                  }}
                >
                  مقصد
                </Typography>
                <MdPlace
                  sx={{
                    color: "#fdb713",
                    fontSize: "30px",
                    marginRight: "20px",
                  }}
                />
              </Grid>
              <Grid
                item
                xs={6}
                md={6}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Autocomplete
                  disablePortal
                  // value={city.name}
                  onChange={(event, newValue) => handleCity(newValue)}
                  id="hotelSearch"
                  options={provinces}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="شهر" />
                  )}
                />
              </Grid>
              <Grid
                item
                xs={3}
                md={3}
                sx={{
                  minWidth: "75px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button onClick={handleSubmit} className={classes.ZareBin2}>
                  {<BiSearch className={classes.ZarebinIcon} />}
                </button>
              </Grid>
            </Grid>
            <div className={classes.searchBar2}>
              <Grid className={classes.Title2}>
                <Typography variant="h6" className={classes.searchBarText}>
                  راه حلی مناسب برای رزرو دکتر و هتل
                </Typography>
                <Typography variant="h3" className={classes.searchBarTitle}>
                  دکترینو
                </Typography>
              </Grid>
            </div>
          </Grid>
        </form>
      </Grid>
      <Grid>
        <Footer />
      </Grid>
    </Container>
  );
}
