import { Container, Grid } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../../context/AuthContext";
import useAxios from "../../../../utils/useAxios";
import AppointmentCard from "./AppointmentCard";

const DoctorReservations = () => {
  const { user, authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const api = useAxios();

  useEffect(() => {
    if (loading) {
      api
        .get(`/api/doctor/${user.id}/user_appoinments/`, {
          headers: {
            Authorization: `Bearer ${authData?.access}`,
          },
        })
        .then((res) => {
          setAppointments(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
  }, [loading]);

  function deleteAppointment(id) {
    api
      .delete(`/api/doctor/appointment/${id}/`, {
        headers: {
          Authorization: `Bearer ${authData?.access}`,
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        toast.error("حذف با مشکل مواجه شد", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            {appointments &&
              appointments.map((a, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <AppointmentCard
                    appointment={a}
                    deleteAppointment={deleteAppointment}
                  />
                </Grid>
              ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}></Grid>
      </Grid>
    </Container>
  );
};

export default DoctorReservations;
