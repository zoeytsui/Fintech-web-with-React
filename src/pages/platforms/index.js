import React from 'react'
import { useTranslation } from "react-i18next";
import TopBanner from 'components/TopBanner'
import TradePlatform from 'components/TradePlatform'
import AwardCarousel from 'components/AwardCarousel'
import OpenAccount from 'components/OpenAccount'

import topbanner from 'assets/images/platforms/topbanner.jpg'
import part3image from 'assets/images/platforms/part3image.png'

import moitor from 'assets/images/platforms/moitor.png'
import analysis from 'assets/images/platforms/analysis.png'
import instrument from 'assets/images/platforms/instrument.png'
import realtime from 'assets/images/platforms/realtime.png'
import betterimagined from 'assets/images/platforms/betterimagined.png'
import deposit from 'assets/images/platforms/deposit.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import Swiper core and required modules
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);


const Section1 = () => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid">
            <Swiper
                slidesPerGroup={3}
                slidesPerView={3}
                loop={true}
                navigation={true}
                pagination={{ "clickable": true }}
                autoplay={{
                    "delay": 3000,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    "320": {
                        "slidesPerView": 1,
                        "slidesPerGroup": 1
                    },
                    "768": {
                        "slidesPerView": 2,
                        "slidesPerGroup": 2
                    },
                    "1440": {
                        "slidesPerView": 3,
                        "slidesPerGroup": 3
                    }
                }}
                className={`text-secondary py-4 col-12 col-lg-9`}>
                <SwiperSlide className='px-5'>
                    <img src={moitor} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Monitor')}</h5>
                        <p><small>{t('Keep track of your position')}</small></p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-5'>
                    <img src={analysis} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Analysis')}</h5>
                        <p><small>{t('Market Depth Information')}</small></p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-5'>
                    <img src={instrument} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Instrument')}</h5>
                        <p><small>{t('Seizing Trading Opportunity')}</small></p>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-5'>
                    <img src={realtime} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Trade in Real-time')}</h5>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-5'>
                    <img src={betterimagined} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Better than your imagined')}</h5>
                    </div>
                </SwiperSlide>
                <SwiperSlide className='px-5'>
                    <img src={deposit} className="card-img-top" alt="" />
                    <div className="carousel-caption">
                        <h5>{t('Deposit')}</h5>
                    </div>
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
                        <li className="text-secondary mb-3">{t("Leverage up to 1:2000")}</li>
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
                styled={{ "& .container > p": { maxWidth: "660px" } }}
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
