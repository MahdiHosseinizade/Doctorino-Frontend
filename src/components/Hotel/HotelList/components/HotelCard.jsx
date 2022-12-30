import { Chip, Box, Button, Card, CardContent, CardMedia, Grid, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import theme from '../../../../assets/theme/defaultTheme';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const marginBottom = "10px";

function HotelCard({ hotel }) {
    console.log(hotel)

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };
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
                            image={hotel.id % 2 ? "https://cdn.britannica.com/96/115096-050-5AFDAF5D/Bellagio-Hotel-Casino-Las-Vegas.jpg" : "https://media-cdn.tripadvisor.com/media/photo-s/16/1a/ea/54/hotel-presidente-4s.jpg"}
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
                        <Box sx={{height: '20px'}}></Box>

                        <Box sx={{ flexWrap: "wrap", }} >
                            {hotel.features.map(({ id, title }) =>
                            (
                                <Chip variant="outlined" key={id} label={title} sx={{ marginRight: '2px', marginBottom: '2px' }} />
                            ))}
                        </Box>
                        <Box sx={{ marginBottom: '-20px', marginTop: '7px' }}>
                            <ListItemButton varient='text' size='small' sx={{ fontSize: '1px', color: 'blue', paddingTop: '-5px', position: 'sticky' }} onClick={handleClick}>
                                <ListItemText sx={{}} > جزئیات بیشتر </ListItemText>
                                {open ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                        </Box>

                    </CardContent>
                </Grid>

                <Grid item md={3} sx={{
                    padding: "5px",
                    pr: 2,
                    py: 2,
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <Box sx={{ display: { xs: "none", md: "flex" }, borderLeft: 1, marginTop: "10px", paddingLeft: '8px', height: "100%", flexDirection: "column", justifyContent: "end", }}>
                        <Box>
                            <Typography variant='p' ml={0.7}>قیمت برای هر شب</Typography>
                        </Box>

                        <Box sx={{ height: '80%', marginTop: "30px", }}>
                            <Typography variant='h6' ml={0.7}>  { } ریال </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                display: 'flex',
                                width: '100%',
                                borderRadius: "10px",
                                // paddingBottom:'5px',
                                justifySelf: "end",
                            }}
                            onClick={() => history.push("/hotels")}
                        >
                            مشاهده و رزرو
                        </Button>
                    </Box>

                </Grid>


                <Grid item md={3} xs={12} sx={{
                    display: 'flex',
                    flexDirection: "column",
                    justifyContent: "end",
                }}>
                    <Box sx={{ display: { md: "none", xs: "flex" }, padding: "5px", marginBlockEnd: '10px', marginLeft: '5px', marginRight: '5px', height: "100%", flexDirection: "column", justifyContent: "end", }}>
                        <Box>
                            <Typography variant='p' ml={0.5}>قیمت برای هر شب</Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: "10px",
                                justifySelf: "end",
                            }}
                            onClick={() => history.push("/hotels")}
                        >
                            مشاهده و رزرو
                        </Button>
                    </Box>
                </Grid>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Box
                        sx={{ pl: 3 }}
                    >
                        <Typography sx={{ fontSize: '16px', marginBottom: '7px' }}
                            component="div"
                            variant="subtitle2">
                            آدرس
                        </Typography>
                        <Typography sx={{ fontSize: '14px', marginBottom: '15px' }}
                            component="p"
                        >
                            {hotel.address}
                        </Typography>

                    </Box>
                </Collapse>
            </Grid>
        </Card >
    );
}

export default HotelCard;