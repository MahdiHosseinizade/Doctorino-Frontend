import './landingPage.css';
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import otagh from '../../assets/img/otagh.jpg'
import { useState } from 'react';
// import NeshanMap from 'react-neshan-map-leaflet'
import {CiSearch} from 'react-icons/ci'
import {MdPlace} from 'react-icons/md'


const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f5f5f5",
  },
});

export default function LandingPage() {
  const [input,setInput] = useState("");
  const [location,setLocation] = useState({
    lat: 0,
    lng: 0,
  });
  console.log(input);
  const { user} = useContext(AuthContext)
  const classes = useStyles();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    });
  }, []);

  const chnageHandler = (e) => {
    setInput(e.target.value)
  }

  return (
    <div className={classes.root}>
      <NavBar />
      <div className="landingPage">
        <div className="searchBar">
          <div className="search">
            <input onChange={chnageHandler} className="searchDoctor" type="text" placeholder="جستجوی پزشک و تخصص ..." />
            <div className="IconSelect">
              <div className='place'>
                <h6 >انتخاب مکان</h6>
                <button className='placeIcon'>{<MdPlace/>}</button>
              </div>
              <button className='searchIcon' >{<CiSearch/>}</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
