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

export default function DoctorCard({ doctor }) {
  const history = useHistory();

  console.log(doctor)

  return (
    <Card
      sx={{
        m: 2,
        backgroundColor: "#efefef",
        display: "flex",
        borderRadius: "10px",
        maxWidth: "80%",
      }}
    >
      <Grid container>
        <Grid item md={3}>
          <a href="/list-of-doctors">
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                height: "100%",
                padding: "10px",
                borderRadius: "20px",
              }}
              image={doctor?.image}
              alt="profile-picture"
            />
          </a>
        </Grid>
        <Grid item md={6}>
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
                    دکتر {doctor?.user.first_name} {doctor?.user.last_name}
                  </Typography>
                </a>
              </Box>

              {/* <Rating
                size="small"
                name="doctorRating"
                value={doctor?.rating}
                readOnly
              />
              <hr width="100%" /> */}
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
                آدرس مطب: {doctor?.province}، {doctor?.city}،{" "}
                {doctor?.clinic_address}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item md={3} sm={12} xs={12} sx={{
          padding: "5px",
          pr: 2,
          py: 2,
          display: 'flex',
          flexDirection: "column",
          justifyContent: "end",
        }}>

          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "5px",
            }}
            onClick={() => history.push("/list-of-doctors")}
          >
            رزرو
          </Button>

        </Grid>
      </Grid>
    </Card>
  );
}
