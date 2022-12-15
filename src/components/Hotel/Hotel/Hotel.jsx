import { makeStyles } from "@mui/styles";
import { Card, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Hotel.css";
import { Box } from "@mui/system";
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { Star } from "@mui/icons-material";


// const useStyles = makeStyles({
//     container: {
//       marginTop: "69px",
//       paddingTop: "30px",
//     },
//     card: {
//       display: 'fix',
//       paddingInline: "13px",
//       marginBottom: "20px",
//     },
//     doctor_image: {
//       width: "100%",
//       height: "100%",
//       margin: "20px",
//       border: "7px solid #ccc",
//       borderRadius: "250px",
//       maxHeight: "250px",
//       maxWidth: "250px",
//       position: "static",
//       display: "inline-table",
//     }
//   });

const useStyles = makeStyles({
  container: {
    marginTop: "69px",
    paddingTop: "30px",
  },
  card: {
    display: "fix",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  card2: {
    width: "600px",
    height: "300px",
    display: "fix",
    paddingInline: "13px",
    marginBottom: "20px",
  },
  hotel_image: {
    width: "100%",
    height: "100%",
    margin: "20px",
    border: "7px solid #ccc",
    borderRadius: "250px",
    maxHeight: "250px",
    maxWidth: "250px",
    position: "static",
    display: "inline-table",
  },
});
const Hotel = () => {
  const classes = useStyles();

  const { id } = useParams();
  const [hotel, setHotel] = useState();
  console.log(hotel);

  useEffect(() => {
    getHotel();
  }, []);

  const getHotel = () => {
    axios
      .get(`http://188.121.113.74/api/hotel/${id}/`)
      .then((res) => {
        setHotel({...res.data});
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container className={classes.container}>
      <Card className={classes.card}>
        <Grid container sx={{ marginTop: "10px" }}>
          <Grid
            item
            xs={12}
            lg={6}
            sx={{
              display: "flex",
              position: "sticky",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <CardMedia
              component="img"
              className={classes.hotel_image}
              image={hotel?.cover_image}
              alt="hotel image"
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CardContent sx={{ marginTop: "20px" }}>
              <Box>
                <Grid container spacing={3.5}>
                  <Grid item xs={12} md={12}>
                    {/* <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly sx={{justifyContent:"center", display:"flex", marginTop: "-10px", marginBlockEnd:"10px"}}/> */}
                    <Typography
                      variant="subtitle2"
                      sx={{ fontSize: "20px", display: "flex" }}
                    >
                       <PlaceOutlinedIcon color='warning' sx={{ marginBottom: "-2px" }} /><span>   آدرس :    </span>{hotel?.address}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                      <VerifiedIcon color='warning' sx={{ marginBottom: "-7px" }} />
                      <span>     </span>  هتل 
                    </Typography>

                    <Typography noWrap variant='subtitle1' sx={{ fontSize: "17px", display: 'inline', marginLeft: '10px' }} >
                      {hotel?.hotel_name}
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12}>
                    <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                      <Star color='warning' sx={{ marginBottom: "-7px" }} />
                       
                    </Typography>

                    <Typography noWrap variant='subtitle1' sx={{ fontSize: "17px", display: 'inline', marginLeft: '10px' }} >
                      {hotel?.hotel_stars}
                      <span>     </span>   ستاره
                    </Typography>
                  </Grid>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
      <Card className={classes.card2}>
      <div>
        <h2 className="h2_emkanat" >امکانات و ویژگی ها</h2>            
        <CardContent>
            {/* امکانات و ویژگی ها */}
            {/* show feature of hotels */}
            <Grid container spacing={3.5}>
                <Grid item xs={12} md={6}>
                    <Typography noWrap variant="subtitle2" sx={{ fontSize: "18px", display: "inline" }}>
                        {console.log(hotel?.features)}
                        {hotel?.features && hotel?.features.map((item,index) =>{
                            return(
                                <p className="features_hotel" key={index}>{item.title}</p>
                                
                            )
                        })}
                    </Typography>
                </Grid>
            </Grid>

        </CardContent>
      </div>
        
      </Card>
    </Container>
  );
};

export default Hotel;
