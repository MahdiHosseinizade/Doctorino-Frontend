import "./landingPage.css";
import React, { useContext, useEffect } from "react";
import NavBar from "../NavBar/newNavBar";
import { makeStyles } from "@mui/styles";
import AuthContext from "../../context/AuthContext";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdPlace } from "react-icons/md";
// import Map from "./Map";
import axios from "axios";
import { toast } from "react-toastify";
import DoctorSwiper from "./DoctorSwiper";
import { FormControl, InputLabel, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { cities } from "../../db/cities";
import Select from "react-select";



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
  
  const [resDoctor, setResDoctor] = useState([]);
  const [city , setCity] = useState("");
  const [cityId , setCityId] = useState("");
  const [speciality , setSpeciality] = useState("");
  // const [search, setSearch] = useState({
  //   input: "",
  //   scale: 0,
  // });
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
  // console.log(formik.values);

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
  // const specialitieHandler = (e) => {
  //   setSpeciality(e.target.value);
  // }
  // const cityHandler = (e) => {
  //   setCity(e.target.value)
  // }
  const searchDoctor = () => {
    // console.log(formik.values);
    // axios
    //   .post("http://188.121.113.74/api/doctor/search/", {
    //     specialty: speciality,
    //     name: city,
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.message);
    //   });
  };

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
    // get all doctors with specialitie id
    console.log(id);
  };

  const findIndexFunction = (id) => {
    const index = specialitie.findIndex((item) => item.id === id);
    setFindIndex(index + 1);
    goSPecialitieSearch(findIndex);
  };
  const cityHandler = (e) =>{
    setCity(e.name)
    setCityId(e.id)
    // console.log(city, cityId)
  }

  return (
    <>
      <div className="ContainerLandingPage">
        <NavBar />
        <form onSubmit={formik.handleSubmit} >
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
                {/* <InputLabel id="demo-simple-select-label">شهر</InputLabel> */}
                {/* <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="city"
                  name="city"
                  {...formik.getFieldProps("city")}
                  // onChange = {(e) => cityHandler(e)}
                >
                  {cities.map((item) => {
                    return (
                      <MenuItem  value = {item.slug} key={item.id}>
                        {item.name}
                      </MenuItem>
                    )
                  })}
                </Select> */}
                <Select
                  // value={city}
                  onChange={(e) =>cityHandler(e)}
                  options={cities}
                />
                {/* {cities.map((item) => {
                    return (
                      <MenuItem  value = {item.slug} key={item.id}>
                        {item.name}
                      </MenuItem>
                    )
                  })} */}
                {/* </Select> */}
              </FormControl>
            </div>
          </div>
          <div className="vl"></div>
          <div className="searchScale">
            <div className="typeScale">
              <h1>تخصص : </h1>
              <input
                // onChange={(e) =>specialitieHandler(e)}
                type="text"
                className="scaleInput"
                name="specialities"
                placeholder="تخصص مورد نظرخود را وارد کنید "
                {...formik.getFieldProps("specialities")}
              />
            </div>
            <button type="submit"  onClick={searchDoctor} className="ZareBin">
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
        {/* pass id of onClicked item to goSpecialitiesearch  */}
        {filteredScale &&
          filteredScale.map((item, index) => (
            <a
              href={`/specialist/${+findIndex + 1}`}
              className="doctorScale"
              onClick={() => findIndexFunction(index)}
              key={index}
            >
              {item.name}
            </a>
          ))}
      </div>
      <DoctorSwiper />
    </>
  );
}
