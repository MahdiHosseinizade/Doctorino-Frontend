import "./landingPage.css";
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdPlace } from "react-icons/md";
import Map from "./Map";
import axios from "axios";
import { toast } from "react-toastify";

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
  const [input, setInput] = useState("");
  const [resDoctor, setResDoctor] = useState([]);
  console.log(resDoctor);
  const [search, setSearch] = useState({
    input: "",
    scale: 0,
  });
  // console.log(search);
  const [specialitie, setSpecialitie] = useState([]);
  const [map, setMap] = useState(false);

  const { user } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    getdoctor();
  }, []);

  const getdoctor = async () => {
    try {
      const { data } = await axios.get(
        "http://188.121.113.74/api/doctor/specialties/"
      );
      setSpecialitie(data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchDoctor = () => {
    axios
      .post("http://188.121.113.74/api/doctor/search/", {
        specialty: search.scale,
        name: search.input,
        lat: 35.6892,
        lng: 51.389,
        // 37.699739,51.338097
      })
      .then((res) => {
        setResDoctor(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const searchDoctorNameHandler = () => {
    const findDoctor = resDoctor.filter((item) => item.name === input);
    setResDoctor(findDoctor);
  };

  const inputHandler = (e) => {
    setSearch({
      ...search,
      input: e.target.value,
    });
  };

  const changeHandler = (e) => {
    setSearch({
      ...search,
      scale: e.target.value,
    });
  };

  return (
    <>
      {map && <Map />}
      <div className={classes.root}>
        <NavBar />
        <div className="landingPage">
          <div className="searchBar">
            <div className="search">
              <input
                onChange={inputHandler}
                className="searchDoctor"
                type="text"
                placeholder="جستجوی پزشک   ..."
              />
              <div className="IconSelect">
                <select
                  onChange={(e) => changeHandler(e)}
                  className="selectScale"
                >
                  {specialitie &&
                    specialitie.map((item, index) => (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                </select>
                <div onClick={() => setMap(!map)} className="place">
                  <h6>انتخاب مکان</h6>
                  <button className="placeIcon">{<MdPlace />}</button>
                </div>
                <button onClick={searchDoctor} className="searchIcon">
                  {<BiSearch />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
