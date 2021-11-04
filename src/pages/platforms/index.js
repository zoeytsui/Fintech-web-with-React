import React from 'react'
// import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
// import { makeStyles } from '@mui/styles';
import TopBanner from 'components/TopBanner'
import TradePlatform from 'components/TradePlatform'
import AwardCarousel from 'components/AwardCarousel'
import OpenAccount from 'components/OpenAccount'

import topbanner from 'assets/images/platforms/topbanner.jpg'
import slider_banner_1 from 'assets/images/platforms/slider_banner_1.png'
import slider_banner_2 from 'assets/images/platforms/slider_banner_2.png'
import part3image from 'assets/images/platforms/part3image.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const Section1 = () => {
    return (
        <section className="container-fluid">
            <Swiper
                slidesPerGroup={1}
                slidesPerView={1}
                loop={true}
                navigation={true}
                pagination={{ "clickable": true }}
                autoplay={{
                    "delay": 3000,
                    "disableOnInteraction": false
                }}
                className={`text-secondary py-4 col-9`}>
                <SwiperSlide className="d-flex flex-column align-items-center my-4">
                    <img src={slider_banner_1} className="card-img-top p-2" alt="" />
                </SwiperSlide>
                <SwiperSlide className="d-flex flex-column align-items-center my-4">
                    <img src={slider_banner_2} className="card-img-top p-2" alt="" />
                </SwiperSlide>
            </Swiper>
        </section>
    )
}

const Section2 = () => {
    const { t } = useTranslation();
    return (
        <section className="container my-5">
            <div className="row justify-content-center align-items-center">
                <div data-aos="fade-right" data-aos-offset="300" className="col col-12 col-lg-6 text-center">
                    <img src={part3image} width="100%" height="100%" alt={t('Explore the CFD Market')} />
                </div>
                <div data-aos="fade-left" data-aos-offset="300" className="col col-12 col-lg-6">
                    <h2 className="fw-bold text-dark mb-3 pt-4">{t('Explore the CFD Market')}</h2>
                    <h5 className="fw-bold mb-3 text-primary">{t('Learn the advantages of trading CFDs and get started with us')}</h5>
                    {/* list */}
                    <ul className={`list-group mb-3 list-tick`} style={{ listStylePosition: 'inside' }}>
                        <li className="text-secondary mb-3">{t('Leverage up to 1:200')}</li>
                        <li className="text-secondary mb-3">{t('Access to wider market')}</li>
                        <li className="text-secondary mb-3">{t('Lowest Commission')}</li>
                        <li className="text-secondary mb-3">{t('Traders can choose to sell or buy for all position')}</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

const Platforms = () => {
    return (
        <>
            <TopBanner
                background={topbanner}
                titles={["Powerful Trading Platform"]}
                subtitles={["We provide practical and user friendly applications for you to trade anywhere and anytime"]} />

            <Section1 />
            <TradePlatform />
            <Section2 />
            <OpenAccount />
            <AwardCarousel />
        </>
    )
}

export default Platforms
