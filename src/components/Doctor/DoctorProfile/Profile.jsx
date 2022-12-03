import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Box,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

const useStyles = makeStyles({
  container: {
    marginTop: "100px",
  },
  card: {
    display: 'flex',
    border: '1px solid #000',
    borderRadius: '5px',
  },
  doctor_image: {
    width: "100%",
    height: "100%",
    margin: "20px",
    border: "3px solid #ccc",
    borderRadius: "250px",
    maxHeight: "250px",
    maxWidth: "250px",
  }
});

const Profile = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState();
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {

    if (loading) {
      axios.get(`http://localhost:8000/doctors/${id}`)
        .then(res => {
          setDoctor(res.data);
          console.log(res.data)
        })
        .catch(err => console.log(err))
      setLoading(false);
    }

  }, [loading, doctor])


  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CardMedia
              component="img"
              className={classes.doctor_image}
              image={doctor?.profileImage}
              alt="doctor image"
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <CardContent sx={{ marginTop: "50px" }}>
              <Typography variant="subtitle2" sx={{ fontSize: "30px" }}>
                دکتر {doctor?.firstName} {doctor?.lastName}
              </Typography>
              <Typography
                variant="subtitle1"
                color={'text.secondary'}
                sx={{
                  fontSize: 20,
                  marginTop: "20px"
                }}
              >
                متخصص {doctor?.specialty}
              </Typography>
              <Grid container sx={{ marginTop: "20px" }}>
                <Grid item xs={0.8} md={0.8}>
                  <PlaceOutlinedIcon color='secondary' fontSize="large" />

                </Grid>
                <Grid item xs={11.2} md={11.2}>
                  <Typography variant="body2" sx={{ fontSize: "20px", marginLeft: "10px" }}>
                    {doctor?.city}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  )
}

export default Profile;
