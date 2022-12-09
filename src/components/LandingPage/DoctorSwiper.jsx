import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./DoctorSwiperStyles.css";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../utils/useAxios';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import DoctorCard from './DoctorCard';





const DoctorSwiper = () => {

    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            axios.get(`${baseURL}/api/doctor/`)
                .then(res => setDoctors(res.data))
                .catch(err => console.error(err));

            setLoading(false);
        }
    }, [doctors, loading])


    return (
        <>
            <Swiper
                modules={[Navigation, Pagination]}
                pagination={{
                    clickable: true,
                }}
                spaceBetween={-40}
                navigation
                loop
                speed={800}
                breakpoints={{
                    600: {
                        slidesPerView: 2,
                    },
                    900: {
                        slidesPerView: 4,
                    },
                    1200: {
                        slidesPerView: 5,
                    }
                }}
            >
                {doctors?.map((doctor, index) => (
                    <SwiperSlide key={index}>
                        <DoctorCard doctor={doctor} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}

export default DoctorSwiper
