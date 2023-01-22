import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import React from 'react';
import { baseURL } from '../../../utils/useAxios';
import './ImageGallerySwiperCss.css';


function ImageGallerySwiper({ images, ...props }) {
    
    return (
        <Swiper
            modules={[Navigation]}
            pagination={{
                clickable: true,
            }}
            navigation
            loop
            speed={800}
        >
            {images?.map(({image}, index) => (
                <SwiperSlide key={index}>
                    <img src={baseURL + image} alt={"hotel image"} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}

export default ImageGallerySwiper;
