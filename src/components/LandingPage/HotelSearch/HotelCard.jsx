import { Box, Button, ButtonGroup, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import theme from '../../../../assets/theme/defaultTheme';
import theme from '../../../assets/theme/defaultTheme';


const marginBottom = "10px";
 
function HotelCard ({ hotel }) {

    const history = useHistory();

    return (
        <Card sx={{ m: 2, backgroundColor: "#efefef", display: "flex", borderRadius: "10px", maxWidth: "75%" }}>
            <Grid container>
                {/* <Link to={`/hotel/${hotel.id}`}/> */}
                <Grid item md={3} sm={5} xs={12}>
                    <a href='/hotels'>
                        <CardMedia
                            // Link react router dom to hotel page
                            component="img"
                            sx={{ width: "100%", height: "100%", padding: "10px", borderRadius: "20px" }}
                            image={hotel.id % 2 ? "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg": "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}
                            // image={hotel.cover_image}
                            alt="hotel image"
                        />
                    </a>
                </Grid>
                <Grid item md={6} sm={7} xs={12}>
                    <CardContent>
                        <Box
                            style={{
                                marginBottom: marginBottom,
                            }}
                        >
                            <a style={{ color: theme.palette.text.primary, textDecoration: "none" }} href="/hotels">
                                <Typography
                                    component="div"
                                    variant="h5"
                                    sx={{
                                        display: "inline",
                                    }}
                                >
                                    {hotel.hotel_name}
                                </Typography>
                            </a>
                        </Box>

                        <Rating
                            sx={{
                                marginBottom: marginBottom,
                            }}
                            size="small"
                            name="hotel_rating"
                            value={hotel.hotel_stars}
                            readOnly
                        />

                        <Typography
                            component="div"
                            variant="subtitle2"
                            sx={{
                                marginBottom: marginBottom,
                            }}
                        >
                            {hotel.address}
                        </Typography>

                        {/* <Box
                            sx={{
                                borderRadius: "5px",
                                height: "30px",
                                backgroundColor: "#c1c1c1",
                                display: "inline-block",
                                padding: "5px",
                            }}
                        >
                            <Typography
                                component="div"
                                variant="caption"
                                color="text.secondary"
                                sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 1,
                                    overflow: "hidden",
                                    marginBottom: marginBottom,
                                }}
                            >
                                {hotel.description}
                            </Typography>
                        </Box> */}
                        <br />
                        <ButtonGroup sx={{
                            flexWrap: "wrap",
                        }}>
                            {hotel.features.map(({id, title}) => (
                                <Box
                                    component="span"
                                    key={id}
                                    sx={{
                                        border: "1px solid gray",
                                        borderRadius: "5px",
                                        padding: "5px",
                                        marginLeft: "5px",
                                    }}
                                >
                                    <Typography variant="caption">
                                        {title}
                                    </Typography>
                                </Box>
                            ))}
                        </ButtonGroup>
                    </CardContent>
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
                            borderRadius: "10px",
                        }}
                        onClick={() => history.push(`/hotel/${hotel.id}`)}
                    >
                        رزرو
                    </Button>

                </Grid>
            </Grid>
        </Card >
    );
}

export default HotelCard;