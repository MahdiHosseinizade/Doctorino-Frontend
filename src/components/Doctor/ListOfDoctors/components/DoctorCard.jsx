import {
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
import { useHistory } from "react-router-dom";
import theme from "../../../../assets/theme/defaultTheme";
import {makeStyles} from "@mui/styles";

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
  const classes = useStyles();

  return (
    <Card
      sx={{
        m: 2,
        backgroundColor: "#efefef",
        display: "flex",
        borderRadius: "10px",
        maxWidth: "80%",
        maxHeight: "85%",
      }}
      // className={classes.card}
    >
      <Grid container>
        <Grid item md={3} sm={4} xs={12}>
          <a href="/list-of-doctors">
            <CardMedia
              component="img"
              sx={{
                width: "85%",
                height: "90%",
                padding: "10px",
                borderRadius: "20px",
              }}
              image={doctor.image}
              alt="profile-picture"
            />
          </a>
        </Grid>
        <Grid item md={9} sm={8} xs={12}>
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
                <a
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                  href="/list-of-doctors"
                >
                  <Typography
                    component="div"
                    variant="h5"
                    sx={{
                      display: "inline",
                    }}
                  >
                    دکتر {doctor.user.first_name} {doctor.user.last_name}
                  </Typography>
                </a>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: "150px",
                    float: "right",
                  }}
                  onClick={() =>
                    history.push(
                      "/doctor/" + doctor.firstName + "-" + doctor.lastName
                    )
                  }
                >
                  مشاهده اطلاعات
                </Button>
              </Box>

              {/* <Rating
                size="small"
                name="doctorRating"
                value={doctor.rating}
                readOnly
              /> */}
              <hr width="100%" />
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
                آدرس مطب: 
                {doctor.province}، {doctor.city}،{" "}
                {doctor.clinic_address}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}
