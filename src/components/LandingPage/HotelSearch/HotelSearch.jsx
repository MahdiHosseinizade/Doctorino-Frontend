import React, { useState } from "react";
import "./HotelSearch.css";
import NavBar from "../../NavBar/newNavBar";
// import { makeStyles } from "@mui/styles";
import { FormControl } from "@mui/material";
import { MdPlace } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { cities } from "../../../db/cities";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useHistory } from "react-router-dom";

// const useStyles = makeStyles({});

export default function HotelSearch() {
  const [city, setCity] = useState("");
  // const classes = useStyles();
  const history = useHistory();

  const handleCity = (e) => {
    setCity(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://188.121.113.74/api/hotel/search/", {
        city: city.id,
      })
      .then((response) => {
        console.log("the response of found hotels: ", response.data);
        history.push("/found-hotels", { hotels: response.data });
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <div className="ContainerLandingPage">
      <NavBar />
      <form>
        <div className="Title">
          {/* <h2>راه حلی مناسب برای رزرو دکتر</h2> */}
          <h1>دکترینو</h1>
        </div>

        <div className="SearchBar_Container">
          <div className="chooseLocation">
            <div className="LocationIcon">
              <h2>مقصد</h2>
              <MdPlace className="MdPlace" />
            </div>
            <div className="EnterCity">
              <FormControl className="FormControlCity" fullWidth>
                <Select
                  value={city}
                  onChange={(e) => handleCity(e)}
                  options={cities}
                  //   menuPortalTarget={document.body}
                  //   styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </FormControl>
            </div>
          </div>
          <div className="vl"></div>
          <div className="searchScale">
            <button onClick={handleSubmit} className="ZareBin">
              {<BiSearch className="ZarebinIcon" />}
            </button>
          </div>
        </div>

        <div className="landingPage">
          <div className="searchBar"></div>
        </div>
      </form>
    </div>
  );
}

export default function HotelSearch() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <NavBar />
      <div className={classes.searchBox}>
        <div className={classes.searchBox__input}>
          <input type="text" placeholder="Search for hotels" />
          <button>
            {/* <BiSearch /> */}
          </button>
        </div>
        <div className={classes.searchBox__location}>
          {/* <MdPlace /> */}
          <input type="text" placeholder="Location" />
        </div>
      </div>
    </div>
  );
}