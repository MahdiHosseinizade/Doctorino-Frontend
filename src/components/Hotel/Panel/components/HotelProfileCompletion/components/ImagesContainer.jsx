import React from 'react';
import './ImagesContainerStyles.css'
import { Grid } from "@mui/material";


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
            {images?.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <img src={URL.createObjectURL(image)}
                        alt="hotel image"
                        className="hotel-image"
                        onClick={() => deleteImage(image)}
                    />
                </Grid>
            ))}
        </Grid>
    )
}

export default ImagesSwiper
