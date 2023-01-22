import { Container, Grid, Typography } from "@mui/material";
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

    if (loading) {
      api
        .get(`/api/hotel/${user.id}/user_reservations/`, {
          headers: {
            Authorization: `Bearer ${authData?.access}`,
          },
        })
        .then((res) => {
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
      .delete(`api/hotel/hotel_reserve/${id}/`, {
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
        marginTop: "2%",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
            {reservations?.length > 0 ?
              reservations.map((r, index) => (
                <Grid item key={index} xs={12} sm={12} md={12} lg={12}>
                  <ReservationCard
                    reservation={r}
                    deleteReservation={deleteReservation}
                  />
                </Grid>
              ))
              :
              (
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Typography variant="h6" align="center"><b>
                    هیچ رزروی برای شما ثبت نشده است.
                  </b></Typography>
                </Grid>
              )
            }
          </Grid>
        </Grid>
        <Grid item xs={12} md={12}></Grid>
      </Grid>
    </Container>
  );
};

export default HotelReservations;
