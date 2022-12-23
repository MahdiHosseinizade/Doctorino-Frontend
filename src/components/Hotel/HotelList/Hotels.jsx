import { Container, Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HotelCard from './components/HotelCard';
import { baseURL } from '../../../utils/useAxios';

function Hotels(prop) {
    // const result = ages.filter(checkAdult);
    // const props = prop.copy();
    

    // const props = structuredClone(prop);
    // let  props = JSON.parse(JSON.stringify(prop))
    // console.log(props.map(item => ( item = [2]
    //     // console.log(item.city)
        
       
    // )))


    // const currentCar = this.props.cars.find((car) => car.carId === currentId)
    // console.log(prop.city.find((city) => city != null))
    
    // const kir = [1,2,3]
    // const res = kir.filter(cos);
    // console.log(res)
    // function cos(){
    //     return true
    // }

    // const ages = [32, 33, 16, 40];
    // const result = prop.filter(checkAdult);

    // function checkAdult(age) {
    //     return age == 18;
    // }

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        getHotels()
    }, [])


    let getHotels = async () => {
        let response = await axios.get(`${baseURL}/api/hotel/`)

        if (response.status === 200) {

            setHotels(response.data)
            response.data.map(item => console.log(item.city))
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