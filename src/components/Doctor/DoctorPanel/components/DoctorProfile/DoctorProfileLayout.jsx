import React from "react";
import { Container, CssBaseline, Grid } from "@mui/material";
import DoctorProfile from "./Profile";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import axios from "axios";
import { useEffect } from "react";
import AuthContext from "../../../../../context/AuthContext";
import { useContext } from "react";
import useAxios from "../../../../../utils/useAxios";

const formValues = {
  city: "",
  clinic_address: "",
  education: "",
  gender: 2,
  id: 0,
  image: null,
  is_active: false,
  license_proof: null,
  // location: {
  //   type: "",
  //   coordinates: [0, 0],
  // },
  work_periods: [],
  description: null,
  medical_system_number: "",

  // User Info
  first_name: "",
  email: "",
  last_name: "",
  username: "",
  inner_id: 0,

  national_code: "",
  office_number: "",
  phone_number: "",
  specialties: "",
  province: "",
};

export default function DoctorProfileLayout() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState({ ...formValues });
  const { user } = useContext(AuthContext);
  const { authData } = useContext(AuthContext);
  const API = useAxios();


  //   const [scheduleTime, setScheduleTime] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // function fetchData1() {
    //   console.log("this is the id recieved: ", id);
    //   axios
    //     .get(`http://188.121.113.74/api/doctor/${id}/`)
    //     .then((res) => {
    //       setDoctor({ ...res.data });
    //     })
    //     .catch((err) => console.log(err));

    //   setLoading(false);
    // }

    // function fetchData2() {
    //   axios
    //     .get(`http://188.121.113.74/api/doctor/workday/${id}/`)
    //     .then((res) => {
    //       setScheduleTime(res.data);
    //     })
    //     .catch((err) => console.log(err));

    //   setLoading(false);
    // }

    function fetchData1() {
        API.get(
          `/api/doctor/user_id_to_doctor_id/${user.user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${authData.access}`,
            },
          }
        )
          .then((response) => {
            API.get(`/api/doctor/${response.data.id}/`, {
              headers: {
                Authorization: `Bearer ${authData.access}`,
              },
            })
              .then((response) => {
                setDoctor({
                  ...response.data,
                  first_name: response.data.user.first_name,
                  last_name: response.data.user.last_name,
                  email: response.data.user.email,
                  username: response.data.user.username,
                  inner_id: response.data.user.id,
                  id: response.data.id,
                  national_code: response.data.national_code,
                  medical_system_number: response.data.medical_system_number,
                  phone_number: response.data.phone_number,
                  office_number: response.data.office_number,
                  education: response.data.education,
                  specialties: response.data.specialties[0].id,
                  province: response.data.province,
                  city: response.data.city,
                  clinic_address: response.data.clinic_address,
                  work_periods: response.data.work_periods,
                  description: response.data.description,
                });
                setLoading(false);
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error);
          });
      }

    if (loading) {
      fetchData1();
      //   fetchData2();
    }
  }, [loading, doctor, id, user.user_id, authData.access, API]);

  return (
    <Container>
      <CssBaseline />
      <Grid container spacing={4}>
        <DoctorProfile doctor={doctor} />
      </Grid>
    </Container>
  );
}
