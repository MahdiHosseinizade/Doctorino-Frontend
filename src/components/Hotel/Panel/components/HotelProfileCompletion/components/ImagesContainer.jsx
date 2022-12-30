import React from 'react';
import './ImagesContainerStyles.css'
import { Grid } from "@mui/material";
import { baseURL } from "../../../../../../utils/useAxios";



const ImagesSwiper = ({ images, deleteImage, ...props }) => {
    return (
        <Grid container
            sx={{
                direction: "rtl"
            }}
            className="container"
            direction="row-reverse"
            spacing={2}
        >
            {images?.map(({id, image, hotel}, index) => (
                <Grid item xs={12} sm={6} md={6} key={index}>
                    <img src={image.includes(baseURL) ? image : `${baseURL}${image}`}
                        alt="hotel image"
                        className="hotel-image"
                        onClick={() => deleteImage({id, image, hotel})}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ImagesSwiper
