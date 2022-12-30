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
import theme from "../../assets/theme/defaultTheme";
import { makeStyles } from "@mui/styles";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';



const useStyles = makeStyles({
  doctorImage: {
    width: "100%",
    height: "100%",
    border: `6px solid ${theme.palette.secondary.light}`,
    borderRadius: "120px",
    maxHeight: "120px",
    maxWidth: "120px",
    marginTop: "20px",
  },
});



export default function DoctorCard({ doctor }) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Card
      sx={{
        m: 2,
        display: "flex",
        borderRadius: "10px",
        maxWidth: "80%",
      }}
    >
      <Grid container>
        <Grid item sm={12} xs={12} md={12} sx={{ display: "flex", justifyContent: "center" }}>
          <a href={`/list-of-doctors/${doctor?.id}`}>
            <CardMedia
              component="img"
              className={classes.doctorImage}
              image={doctor?.image}
              alt="profile-picture"
            />
          </a>
        </Grid>
        <Grid item sm={12} xs={12} md={12}>
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
                sx={{
                  marginBottom: "10px",
                }}
              >
                <a
                  style={{
                    color: theme.palette.text.primary,
                    textDecoration: "none",
                  }}
                  href={`/list-of-doctors/${doctor?.id}`}
                >
                  <Typography
                    noWrap
                    component="div"
                    variant="h6"
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

              <Typography variant="body2" sx={{ fontSize: "15px", marginBottom: "10px" }}>
                <PlaceOutlinedIcon color='primary' sx={{ marginBottom: "-7px" }} /><span>     </span>{doctor?.city}
              </Typography>

              <Typography
                component="div"
                variant="caption"
                color="text.secondary"
                sx={{
                  fontSize: "15px",
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 1,
                  overflow: "hidden",
                }}
              >
                تخصص {doctor?.specialties.map(({ id, name }, index) => {
                  if (index === doctor?.specialties.length - 1) {
                    return name;
                  } else {
                    return name + " و "
                  }
                })}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item sm={12} xs={12} md={12} sx={{
          padding: "0px 10px 10px 10px",
          display: "flex",
          justifyContent: "center"
        }}>

          <Button
            variant="outlined"
            color="secondary"
            endIcon={<KeyboardArrowLeftIcon />}
            sx={{
              borderRadius: "5px",
            }}
            onClick={() => history.push(`/list-of-doctors/${doctor?.id}`)}
          >
            نوبت بگیرید
          </Button>

        </Grid>
      </Grid>
    </Card>
  );
}
