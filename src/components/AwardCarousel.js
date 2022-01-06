
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';

import stevie_winner_2017 from 'assets/images/stevie_winner_2017.png'
import best_financial from 'assets/images/best_financial.png'
import best_foreign from 'assets/images/best_foreign.png'
import best_mobile from 'assets/images/best_mobile.png'
import Best_the_golden from 'assets/images/Best_the_golden.png'
import Most_foreign from 'assets/images/Most_foreign.png'
import Most_growth_brokers from 'assets/images/Most_growth_brokers.png'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
// import Swiper core and required modules
import SwiperCore, {
    Navigation, Pagination, Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const useStyles = makeStyles({
    awardImg: {
        filter: 'grayscale(1)',
        '&:hover': {
            transform: 'scale(1.1)',
            filter: 'none'
        }
    },
})

// AwardCarousel
const AwardCarousel_context = {
    title: 'An award-winning service provider',
    subtitle: "For over 10 years, HXFX Global has been providing our clients the best service and been recognised as one of the best in the industry.",
    awards: [
        { src: Best_the_golden, capture: "Golden Bridge Awards -2018 Financial Growth Enterprise \"Gold Award\"" },
        { src: stevie_winner_2017, capture: "Best innovation in the financial industry Asia Pacific Stevie Silver Award" },
        { src: best_financial, capture: "Best foreign exchange investment Service Platform" },
        { src: best_foreign, capture: "Anugerah \"Golden Bridge\"" },
        { src: best_mobile, capture: "Best mobile transaction Platform organization" },
        { src: Most_foreign, capture: "Most trustworthy Foreign exchange trading platform" },
        { src: Most_growth_brokers, capture: "Most growth brokers" },
    ]
}
const AwardCarousel = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <section className="container-fluid text-center" style={{ background: '#1A1A1A' }}>
            <h3 className="fw-bold text-white pt-4">{`${t(AwardCarousel_context.title)}`}</h3>
            <h6 className="fw-bold text-secondary my-4">{`${t(AwardCarousel_context.subtitle)}`}</h6>

            <Swiper
                // cssMode={true}
                slidesPerGroup={1}
                slidesPerView={4}
                // spaceBetween={10}
                loop={true}
                // navigation={true}
                autoplay={{
                    "delay": 3000,
                    "disableOnInteraction": false
                }}
                breakpoints={{
                    "320": {
                        "slidesPerView": 1,
                        "spaceBetween": 20
                    },
                    "375": {
                        "slidesPerView": 1,
                        "spaceBetween": 20
                    },
                    "425": {
                        "slidesPerView": 1,
                        "spaceBetween": 20
                    },
                    "768": {
                        "slidesPerView": 2,
                        "spaceBetween": 40
                    },
                    "1024": {
                        "slidesPerView": 4,
                        "spaceBetween": 50
                    }
                }}
                className={`text-secondary col-9 py-4`}>
                {AwardCarousel_context.awards.map((award, index) =>
                    <SwiperSlide className="d-flex flex-column align-items-center mt-2" key={index}>
                        <img className={classes.awardImg} src={award.src} alt={t(award.capture)} />
                        <p><small>{t(award.capture)}</small></p>
                    </SwiperSlide>
                )}
            </Swiper>
        </section>
    )
}

export default AwardCarousel