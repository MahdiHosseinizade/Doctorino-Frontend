import './landingPage.css';
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import otagh from '../../assets/img/otagh.jpg'
import { useState } from 'react';


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
  console.log(input);
  const { user} = useContext(AuthContext)
  const classes = useStyles();

  useEffect(() => {
    console.log(user);
  }, [user]);

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
          </div>
        </div>
      </div>
    </div>
  );
}
