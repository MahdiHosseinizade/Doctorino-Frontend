import {
  autocompleteClasses,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import theme from "../../../../assets/theme/defaultTheme";
import { makeStyles } from "@mui/styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const useStyles = makeStyles({
  card: {
    m: 2,
    backgroundColor: "#efefef",
    display: "flex",
    borderRadius: "10px",
    maxWidth: "80%",
    maxHeight: "220px",
  },
});

export default function DoctorCard({ doctor }) {
  const history = useHistory();

  // console.log(doctor)
  const { url } = useRouteMatch();
  const classes = useStyles();

  return (
    <Card
      sx={{
        m: 2,
        // margin: "auto",
        backgroundColor: "#efefef",
        display: "flex",
        borderRadius: "10px",
        maxWidth: "80%",
        maxHeight: "95%",
      }}
      // className={classes.card}
    >
      <Grid container>
        {/* image of doctor */}
        <Grid
          item
          md={3}
          sm={5}
          xs={12}
          sx={{ justifyContent: "center", display: "flex" }}
        >
          <a
            href={`${url}/${doctor.id}`}
            sx={{ justifyContent: "center", display: "flex" }}
          >
            <CardMedia
              component="img"
              sx={{
                margin: "auto",
                marginTop: "15px",
                width: "90%",
                height: "80%",
                padding: "10px",
                borderRadius: "50%",
              }}
              image={doctor.image}
              alt="profile-picture"
            />
          </a>
        </Grid>

        <Grid item md={9} sm={7} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
            elevation={2}
          >
            <CardContent
              sx={{
                flex: "1 0 auto",
              }}
            >
              <Box
                style={{
                  marginBottom: "10px",
                }}
              >
                <Grid container>
                  <Grid item md={9} sm={12} xs={12}>
                    <a
                      style={{
                        color: theme.palette.text.primary,
                        textDecoration: "none",
                      }}
                      href={`${url}/${doctor.id}`}
                    >
                      <Typography
                        component="div"
                        variant="h5"
                        sx={{
                          display: "inline",
                        }}
                      >
                        دکتر {doctor?.user.first_name} {doctor?.user.last_name}
                      </Typography>
                      <br />
                      <Typography
                        component="div"
                        variant="subtitle2"
                        sx={{
                          marginTop: "50px",
                          display: "inline",
                          color: "#7F8487",
                        }}
                      >
                        {console.log("this is the recieved doctor specialties: ", doctor.specialties)}
                        {console.log("the name of the first specialty is: ", doctor.specialties[0]?.name)}
                        {doctor.specialties.length !== 0 ? doctor.specialties[0]?.name : "ندارد"}
                      </Typography>
                      <br />
                      <Typography
                        component="div"
                        variant="subtitle2"
                        sx={{
                          display: "inline",
                        }}
                      >
                        کد نظام پزشکی: {doctor.medical_system_number}
                      </Typography>
                    </a>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    sm={12}
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        width: "150px",
                        height: "45px",
                        float: "right",
                        borderRadius: "10px",
                        marginTop: "20px",
                      }}
                      onClick={() => history.push(`${url}/` + doctor.id)}
                    >
                      نوبت بگیرید
                    </Button>
                  </Grid>
                </Grid>
              </Box>

              <hr
                width="100%"
                style={{ borderTop: "dotted 1px #7F8487", marginTop: "30px" }}
              />
              <Typography
                component="div"
                variant="subtitle1"
                color="text.secondary"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 3,
                  overflow: "hidden",
                }}
              >
                <LocationOnIcon style={{ color: theme.palette.doctor.main }} />
                {doctor.province}، {doctor.city}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
