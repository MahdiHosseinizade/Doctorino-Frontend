import React, { useState } from "react";
import "./HotelSearch.css";
import NavBar from "../../NavBar/newNavBar";
// import { makeStyles } from "@mui/styles";
import { FormControl } from "@mui/material";
import { MdPlace } from "react-icons/md";
import { BiSearch } from "react-icons/bi";
import { cities } from "../../../db/cities";
// import { provinces } from "../../../db/Provinces.js";
// import {provinces} from "../../../db/Provinces"
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { useHistory } from "react-router-dom";
// import { alignProperty } from "@mui/material/styles/cssUtils";

// const useStyles = makeStyles({});

export default function HotelSearch() {
  // console.log("the provinces: ", provinces);
  // console.log("the city: ", cities);
  const [city, setCity] = useState("");
  // const classes = useStyles();
  const history = useHistory();

  const handleCity = (e) => {
    setCity(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("city id: ", city.id);
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
    <div className="ContainerLandingPage">
      <NavBar />
      <form>
        <div className="Title">
          <h2 className="searchBarText">راه حلی مناسب برای رزرو دکتر و هتل</h2>
          <h1 className="searchBarTitle">دکترینو</h1>
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
                  value={city.name}
                  onChange={(e) => handleCity(e)}
                  options={cities}
                  menuPortalTarget={document.body}
                  // menuPortalTarget={document.querySelector("#root > div.ContainerLandingPage > form > div.SearchBar_Container > div.chooseLocation")}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 0 }),
                    direction: "rtl",
                    marginLeft: "5000px",
                  }}
                />
              </FormControl>
            </div>
          </div>
          {/* <div className="vl"></div> */}
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
