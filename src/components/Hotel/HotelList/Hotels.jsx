import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './components/HotelCard';
import { baseURL } from '../../../utils/useAxios';


function Hotels(prop) {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        getHotels()
    }, [])


    let getHotels = async () => {
        let response = await axios.get(`${baseURL}/api/hotel/`)

        if (response.status === 200) {
            setHotels(response.data)
            console.log(response.data)
        } else {
            console.log('error')
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