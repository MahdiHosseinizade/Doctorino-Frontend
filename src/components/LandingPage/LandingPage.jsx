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
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useFormik } from "formik";

const cities = [
  // cities in persian
  {value: "Tehran", label: "تهران"},
  {value: "Mashhad", label: "مشهد"},
  {value: "Isfahan", label: "اصفهان"},
  {value: "Shiraz", label: "شیراز"},
  {value: "Tabriz", label: "تبریز"},
  {value: "Karaj", label: "کرج"},
  {value: "Qom", label: "قم"},
  {value: "Kermanshah", label: "کرمانشاه"},
  {value: "Rasht", label: "رشت"},
  {value: "Ahvaz", label: "اهواز"},
  {value: "Kerman", label: "کرمان"},
]


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
  const [search, setSearch] = useState({
    input: "",
    scale: 0,
  });
  const [specialitie, setSpecialitie] = useState([]);
  const [searchScale, setSearchScale] = useState("");
  const [filteredScale, setFilteredScale] = useState(specialitie);
  const [findIndex, setFindIndex] = useState(null);
  // console.log(findIndex);
  const [map, setMap] = useState(false);
  // console.log(specialitie);

  const formik = useFormik({
    initialValues: {
      city: "",
      specialities: "",
     },
     onsubmit: (values) => {
        console.log(values)
     }
     
  })
  // console.log(formik.values)

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

  const searchDoctor = () => {
    axios
      .post("http://188.121.113.74/api/doctor/search/", {
        specialty: search.scale,
        name: search.input,
        lat: 35.6892,
        lng: 51.389,
      })
      .then((res) => {
        setResDoctor(res.data);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
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

  const handleChangeLocation = (lat, lng) => {};
  // console.log(specialitie)

  const goSPecialitieSearch = (id) => {
    // get all doctors with specialitie id
    console.log(id);
  };

  const findIndexFunction = (id) => {
    const index = specialitie.findIndex((item) => item.id === id);
    setFindIndex(index + 1);
    goSPecialitieSearch(findIndex);
  };

  return (
    <>
      {/* {map && <AfshinMap 
        style={{width:350 , height:350 }}
        onChoose=  {handleChangeLocation}
        defaultLat={35.6892}
        defaultLng={51.389}
      />} */}
      <div className="ContainerLandingPage">
        <NavBar />
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
              {/* <input type="text" placeholder="شهر مقصد خود را انتخاب کنید ..." className="EnterCityInput" /> */}
              <FormControl className="FormControlCity" fullWidth>
                <InputLabel id="demo-simple-select-label">شهر</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Age"
                  // use fomik
                  name="city"
                  // onChange={formik.handleChange}
                  {...formik.getFieldProps("city")}
                  // onChange={handleChange}
                >
                  {cities.map((item) => (
                    <MenuItem  name value={item.value}>{item.label}</MenuItem>
                   ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="vl"></div>
          <div className="searchScale">
            <div className="typeScale">
              <h1>تخصص : </h1>
              <input
                onChange={inputHandler}
                type="text"
                className="scaleInput"
                name="specialities"
                placeholder="تخصص مورد نظرخود را وارد کنید "
                {...formik.getFieldProps("specialities")}
              />
            </div>
            <div className="ZareBin">
              {<BiSearch className="ZarebinIcon" />}
            </div>
          </div>
        </div>
        <div className="landingPage">
          <div className="searchBar"></div>
        </div>
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
