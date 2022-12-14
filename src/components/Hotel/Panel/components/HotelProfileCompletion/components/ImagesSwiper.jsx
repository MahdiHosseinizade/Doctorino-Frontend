import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";

const ImagesSwiper = ({ images }) => {
    return (
        <>
            <Swiper
                modules={[Pagination]}
                pagination={{
                    clickable: true,
                }}
            >
                {images?.map((image, index) => (
                    <SwiperSlide key={index}>
                        {/* show the images */ }

                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default ImagesSwiper
