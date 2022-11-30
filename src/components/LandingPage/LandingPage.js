import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";

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
  const { user} = useContext(AuthContext)
  const classes = useStyles();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className={classes.root}>
      <NavBar />
      <h1
      //   className={classes.root}
      >
        landing page
      </h1>
    </div>
  );
}
