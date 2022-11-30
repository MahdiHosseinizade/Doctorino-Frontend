import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './components/HotelCard';

function Hotels(prop) {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        getHotels()
    }, [])


    let getHotels = async () => {
        let response = await axios.get('http://127.0.0.1:8000/api/hotel/')

        if (response.status === 200) {
            setHotels(response.data)
            console.log(response.data)
        } else {
            alert("Something went wrong")
        }
    }

    return (
        <Container>
            <Grid container sx={{ m: 3 }}>
                {hotels.map((hotel, index) => (
                    <Grid item key={index} xs={12} md={12} lg={12} xl={12}>
                        <HotelCard hotel={hotel} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Hotels;