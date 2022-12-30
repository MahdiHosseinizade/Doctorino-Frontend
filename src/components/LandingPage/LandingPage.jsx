import "./landingPage.css";
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdPlace } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorSwiper from "./DoctorSwiper";
import { FormControl, Grid, InputLabel, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { cities } from "../../db/cities";
import Select from "react-select";
import { Link,useHistory } from "react-router-dom";



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
});


export default function LandingPage() {
  // const navigate = useNavigate();
  const history = useHistory();
  const [resDoctor, setResDoctor] = useState([]);
  const [city , setCity] = useState("");
  const [cityId , setCityId] = useState("");
  const [speciality , setSpeciality] = useState("");
  const [specialityId , setSpecialityId] = useState("");
  const [specialitie, setSpecialitie] = useState([]);
  const [searchScale, setSearchScale] = useState("");
  const [filteredScale, setFilteredScale] = useState(specialitie);
  const [findIndex, setFindIndex] = useState(null);

  const formik = useFormik({
    initialValues: {
      city: "",
      specialities: "",
     },
     onsubmit: (values) => {
        // searchDoctor(values);
     }
  })

  const specialityJson = specialitie.map((item) => {
    return {
      id: item.id,
      value: item.name,
      label: item.name,
    };
  });

  useEffect(() => {
    getSpecialites();
    filteredScaleHandler(searchScale);
  }, [specialitie]);

  const getSpecialites = async () => {
    try {
      const { data } = await axios.get(
        "http://188.121.113.74/api/doctor/specialties/"
      );
      setSpecialitie(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const searchDoctor = async (e) => {
    e.preventDefault();
    await axios
      .post("http://188.121.113.74/api/doctor/search/", {
        specialties: [speciality.id],
        province: city.id,
      })
      .then((res) => {
        history.push('/SearchDoctor',{contact:res.data})
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  console.log(resDoctor);

  const filteredScaleHandler = (search) => {
    if (!search || search === "") {
      setFilteredScale(specialitie);
      return;
    } else {
      const filtered = specialitie.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredScale(filtered);
    }
  };

  const inputHandler = (e) => {
    setSearchScale(e.target.value);
    filteredScaleHandler(e.target.value);
  };


  const goSPecialitieSearch = (id) => {
    console.log(id);
  };

  const findIndexFunction = (id) => {
    const index = specialitie.findIndex((item) => item.id === id);
    setFindIndex(index + 1);
    goSPecialitieSearch(findIndex);
  };
  const cityHandler = (e) =>{
    setCity(e)
  }
  const SpecialityHandler = (e) =>{
    setSpeciality(e)
  }
  

  return (
    <>
      <div className="ContainerLandingPage">
        <NavBar />
        <form  >
        <div className="Title">
          <h2>راه حلی مناسب برای رزرو دکتر</h2>
          <h1>دکترینو</h1>
        </div>
        <div className="SearchBar_Container">
          <div className="chooseLocation">
            <div  className="LocationIcon">
              <h2>لوکیشن</h2>
              <MdPlace className="MdPlace" />
            </div>
            <div className="EnterCity">
              <FormControl className="FormControlCity" fullWidth>
                <Select
                  value={city}
                  onChange={(e) =>cityHandler(e)}
                  options={cities}
                />
              </FormControl>
            </div>
          </div>
          <div className="vl"></div>
          <div className="searchScale">
            <div className="typeScale">
              <h1>تخصص : </h1>
              <Select 
                options={specialityJson}
                onChange={(e) => SpecialityHandler(e)}
                value={speciality}
              />
            </div>
              <button   onClick={searchDoctor} className="ZareBin">
                {<BiSearch className="ZarebinIcon" />}
              </button>
          </div>
        </div>
        <div className="landingPage">
          <div className="searchBar"></div>
        </div>
        </form>
      </div>
      <div className="showSpecialieties">
        <Grid container spacing={3} style={{justifyContent : 'space-around' }} >
          {filteredScale && filteredScale.map((item, index) => (
            <Grid item xs={6} md={4}  key={index}>
              <a 
                href={`/specialist/${+findIndex + 1}`}
                className="doctorScale"
                onClick={() => findIndexFunction(index)}
                key={index}
              >
                {item.name}
              </a>
            </Grid>
          ))}
        </Grid>
      </div>
      <DoctorSwiper />
    </>
  );
}
