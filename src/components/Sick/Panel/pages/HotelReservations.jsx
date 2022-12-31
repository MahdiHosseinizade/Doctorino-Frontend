import { Container, Grid } from "@mui/material";
import React, { useEffect, useContext, useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../../context/AuthContext";
import useAxios from "../../../../utils/useAxios";
import ReservationCard from "./ReservationCard";

const HotelReservations = () => {
  const { user, authData } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState([]);
  const api = useAxios();

  useEffect(() => {
    console.log("user id: " + user.id);
    if (loading) {
      api
        .get(`/api/hotel/${user.id}/user_reservations/`, {
          headers: {
            Authorization: `Bearer ${authData?.access}`,
          },
        })
        .then((res) => {
          console.log("this is the res form hotel reservations:", res.data);
          setReservations(res.data);
        })
        .catch((err) => {
          console.log(err);
        });

      setLoading(false);
    }
  }, [loading]);

  function deleteReservation(id) {
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
            {reservations &&
                reservations.map((r, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <ReservationCard
                    appointment={r}
                    deleteReservation={deleteReservation}
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

export default HotelReservations;
