import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f5f5f5",
    },
    searchBox: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: "500px",
        height: "100%",
        maxHeight: "300px",

        "& input": {
            width: "100%",
            height: "50px",
            padding: "0 20px",
            border: "none",
            outline: "none",
            borderRadius: "5px 0 0 5px",
            fontSize: "1.2rem",
        },
        "& button": {
            width: "50px",
            height: "50px",
            border: "none",
            outline: "none",
            borderRadius: "0 5px 5px 0",
            backgroundColor: "#f5f5f5",
            cursor: "pointer",
            "& svg": {
                fontSize: "1.5rem",
            },
        },
    },
});

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