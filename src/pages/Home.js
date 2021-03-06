import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import { TOP_OPENAPI } from 'api';
import i18n from "i18next";

import TopBanner from 'components/TopBanner'
import MarketPrice from 'components/MarketPrice'
import TradePlatform from 'components/TradePlatform'
import AwardCarousel from 'components/AwardCarousel'
import OpenAccount from 'components/OpenAccount'
import Loading from 'components/Loading';

import phone_1 from 'assets/images/home/phone_1.png'

import section1_img1 from 'assets/images/icons/currency_2.png'
import section1_img2 from 'assets/images/icons/mutiplatform_2.png'
import section1_img3 from 'assets/images/icons/cs_2.png'
import section1_img4 from 'assets/images/icons/secure_2.png'
import section1_img5 from 'assets/images/icons/balance_2.png'
import section1_img6 from 'assets/images/icons/prize_2.png'

import flag_MY from 'assets/images/home/flag_MY.png'
import flag_VN from 'assets/images/home/flag_VN.png'
import flag_CN from 'assets/images/home/flag_CN.png'
import flag_EN from 'assets/images/home/flag_EN.png'

import step1 from 'assets/images/home/step1.png'
import step2 from 'assets/images/home/step2.png'
import step3 from 'assets/images/home/step3.png'

import article_mover from 'assets/images/home/article_mover.png'

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
    featureCard: {
        border: 0,
        background: '#F7F7F7',
        boxShadow: '0px 1px 3px #0000001A',
        minHeight: '240px',
        '&:hover': {
            background: '#ffffff',
            boxShadow: '0px 4px 12px #00000033',
            transition: 'all .15s linear',
            transform: 'scale(1.05)',
            borderBottom: '4px solid #60A720'
        }
    },
    homeSwiper: {
        "& .swiper-wrapper": { alignItems: 'center' }
    },
    articleCard: {
        '& .card': {
            background: '#fff',
            minHeight: '250px',
            borderRadius: '25px',
        },
        '& .overlay': {
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            transition: 'opacity .2s linear',
            background: `url(${article_mover}) no-repeat center`,
            backgroundSize: 'cover',
        },
        '&:hover': {
            '& .overlay': {
                opacity: 1
            },
        }
    },
    pillBtnGroup: {
        borderRadius: '30px'
    },
    noneFocusBtn: {
        "&:focus": { boxShadow: 'none' },
    }
})

const context = {
    Section1: {
        title: 'Trade the way you want',
        cards: [{
            icon: section1_img1,
            title: 'Diversified',
            content: 'We offer a wide range of trading products, including forex, indices, commodities, and cryptocurrencies.'
        },
        {
            icon: section1_img2,
            title: 'Versatile',
            content: "One account, multiple platforms. HXFX Global is available in both PC and mobile with millisecond order execution speed and user interface tailor-made for professional investors."
        },
        {
            icon: section1_img3,
            title: '24/5',
            content: 'Contact our elite customer support team anytime, anywhere on the trading days to support your investment decisions.'
        },
        {
            icon: section1_img4,
            title: 'Secure',
            content: "A top-notch data encryption technology and financial security with over 10 years of safety operation experience in the industry ensure every the safety of our client's investment."
        },
        {
            icon: section1_img5,
            title: 'Low-cost, high reward',
            content: 'Ultra-low spreads and the 1:500 leverage allow you to invest at at a lower cost while still gaining high rewards potentially.'
        },
        {
            icon: section1_img6,
            title: 'Reliable',
            content: "HXFX Global owns the most stringent regulatory license in the industry and was awarded in numerous world-class financial awards."
        }],
    },
    Section2: {
        title: 'Trade 40+ major products at ease',
        subtitle: "Join millions of investor to trade with FX Gloabl. Pick anything to start with.",
        features: [
            'Two-way trading, both buy and sell can be profitable',
            'Hedgeable risk, no limited on rise and drop',
            'Margin trading. Low entry-level, high profit',
            'Ultra-competitive spreads',
            'International general trading platform',
            'Lightning fast order execution',
            'Advanced chart analysis'
        ]
    },
    Section5: {
        title: 'Open an account for free now',
        subtitle: '30 seconds to have an account',
        steps: [
            { icon: step1, capture: 'Open an account for free' },
            { icon: step2, capture: 'Top up your account' },
            { icon: step3, capture: 'Start trading' },
        ]
    }
}

const HomepageBanner = () => {
    const { i18n } = useTranslation()
    const [adList, setAdList] = useState([])

    const getAbroList = async () => {
        try {
            const params = { companyId: "23", terminal: 'pc_website', code: 'global_index_pc', type: 'V' }
            const result = await (await TOP_OPENAPI.get(`/hx/?service=Ad.getAbroList`, { params: { ...params } })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setAdList(result.data[0].list)
        } catch (error) {}
    }

    const trans_lang = (lang) => {
        // cn,en,ms,tw,vi
        switch (lang) {
            case 'ch':
                return 'cn'
            case 'my':
                return 'ms'
            case 'vn':
                return 'vi'

            default:
                return 'en'
        }
    }

    useEffect(() => {
        getAbroList()
    }, [i18n])

    return (
        <Swiper
            slidesPerGroup={1}
            slidesPerView={1}
            loop={true}
            navigation={true}
            pagination={{ "clickable": true }}
            autoplay={{
                "delay": 3000,
                "disableOnInteraction": false
            }}>
            {adList.map(list =>
                <SwiperSlide key={list.id}>
                    <a href={list.adv_content[`${trans_lang(i18n.language)}`].jump_url}>
                        <TopBanner background={list.adv_content[`${trans_lang(i18n.language)}`].pic_url} />
                    </a>
                </SwiperSlide>
            )}
        </Swiper>
    )
}

const Section1 = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <section className="container my-5">
            <h2 className="fw-bold text-dark text-center mb-5">{t(context.Section1.title)}</h2>
            <div className="row justify-content-center align-item-stretch">
                {context.Section1.cards.map(card =>
                    <div className="col col-11 col-md-6 col-lg-4" key={t(card.title)}>
                        <div className={`${classes.featureCard} card mb-3`}>
                            <div className="row g-0">
                                <div className="col col-12 col-md-3">
                                    <img src={card.icon} className="img-fluid rounded-start" alt={card.title} />
                                </div>
                                <div className="col col-12 col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{t(card.title)}</h5>
                                        <p className="card-text text-secondary">{t(card.content)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

const Section2 = () => {
    const tabs = [
        { label: 'Forex' },
        { label: 'Commodities' },
        { label: 'Indices' },
    ]
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('Forex')
    return (
        <section className="container-fluid" style={{ background: '#F1F1F1' }}>
            <div className="container py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col col-12 col-lg-6">
                        <h2 className="fw-bold text-dark pt-4">{t(context.Section2.title)}</h2>
                        <h5 className="fw-bold text-primary">{t(context.Section2.subtitle)}</h5>
                        <ul className="list-group list-tick" style={{ listStylePosition: 'inside' }}>
                            {context.Section2.features.map((feature, index) => <li className="text-secondary mb-3" key={index}><span>{t(feature)}</span></li>)}
                        </ul>
                    </div>

                    <div className="col col-12 col-lg-6 text-center">
                        <div className="bg-white shadow-sm" data-aos="zoom-out">
                            <ul className="nav nav-pills nav-justified">
                                {tabs.map(tab =>
                                    <li className="nav-item" key={tab.label}>
                                        <button className={`nav-link ${activeTab === tab.label ? 'active' : ''}`} onClick={() => setActiveTab(tab.label)}>{t(tab.label)}</button>
                                    </li>
                                )}
                            </ul>
                            <MarketPrice id={activeTab} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Section3 = () => {
    const { t, i18n } = useTranslation();

    const Section3 = {
        features: [
            'Trade World Markets',
            'Manage Trading Accounts',
            'Variety of payment methods',
            'Latest economic events'
        ],
        codeOptions: [
            {
                value: 'en',
                code: '+60',
                src: flag_EN
            },
            {
                value: 'my',
                code: '+60',
                src: flag_MY
            },
            {
                value: 'vn',
                code: '+84',
                src: flag_VN
            },
            {
                value: 'ch',
                code: '+86',
                src: flag_CN
            },
        ]
    }
    // eslint-disable-next-line
    const [code, setCode] = useState(Section3.codeOptions.find(cur => cur.value === i18n.language).code);
    const changeCode = (code) => setCode(code);

    return (
        <section id="section3" className="container">
            <div className="row justify-content-center align-items-center">

                <div data-aos="fade-right" data-aos-offset="300" className="col col-12 col-lg-6 text-center">
                    <img src={phone_1} width="100%" height="100%" alt={t('HXFX Global Direct App')} />
                </div>
                <div data-aos="fade-left" data-aos-offset="300" className="col col-12 col-lg-6">
                    <h2 className="fw-bold text-dark mb-3 pt-4">{t('HXFX Global Direct App')}</h2>
                    <h5 className="fw-bold mb-3 text-primary">{t('Simple, Clear, Impressive Available for iOS and Android devices.')}</h5>
                    {/* list */}
                    <ol className="list-group mb-3 list-number-primary">
                        {Section3.features.map((feature, index) => <li className="text-secondary mb-3" key={index}>{t(feature)}</li>)}
                    </ol>
                    {/* input field */}
                    <form action="/" method="post" target="_blank">
                        <div className="input-group mb-4 p-2" style={{ background: '#F3F6FA', borderRadius: '10px' }}>
                            <button className="dropdown-toggle" style={{ border: 0, background: 'transparent' }} id="code" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="px-2" src={Section3.codeOptions.find(cur => cur.value === i18n.language).src} alt="" />
                                {Section3.codeOptions.find(cur => cur.value === i18n.language).code}
                            </button>

                            <ul className={`dropdown-menu`} aria-labelledby="code">
                                {Section3.codeOptions.map((option) =>
                                    <li key={option.value} className="dropdown-item text-dark" onClick={() => changeCode(option.code)}>
                                        <img className="p-2" src={option.src} alt="" />
                                        {option.code}
                                    </li>
                                )}
                            </ul>
                            <input type="tel" className="form-control border-0" aria-label="Text input with dropdown button" placeholder={t('Enter your mobile')} style={{ backgroundColor: 'transparent' }} />
                        </div>
                        {/* get sms */}
                        <button type="button" className="btn btn-primary px-4 py-2">{t('Get HXFX Global APP By SMS')}</button>
                    </form>
                </div>
            </div>
        </section>
    )
}

// CardCarousel
const ArticleCarousel = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const [newsList, setNewsList] = useState([])
    const [dataReady, setDataReady] = useState(false)
    const getList = async () => {
        try {
            let params = {
                companyId: "23",
                utmTerminal: 'app',
                url: "news-en",
                page: 1,
                pageSize: 9,
            }

            switch (i18n.language) {
                case 'vn':
                    params.url = "news-vn"
                    break;
                case 'ch':
                    params.url = "news-cn"
                    break;

                default:
                    params.url = "news-en" // no my data
                    break;
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.getList`, { params: { ...params } })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)

            setNewsList(list => [...list, ...result.data.list])
            setDataReady(true)
        }
        catch (error) {}
    }
    useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, [i18n.language])

    // clear cache
    useEffect(() => {
        setNewsList([])
        // eslint-disable-next-line
    }, [i18n.language])
    return (
        <section className="container-fluid" style={{ backgroundColor: '#F1F1F1' }}>
            {dataReady
                ? <Swiper
                    slidesPerGroup={1}
                    slidesPerView={3}
                    loop={true}
                    pagination={{ "clickable": true }}
                    // autoplay={{
                    //     "delay": 3000,
                    //     "disableOnInteraction": false
                    // }}
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
                            "slidesPerView": 3,
                            "spaceBetween": 50
                        }
                    }}
                    className={`text-secondary py-4 col-9 ${classes.homeSwiper}`}>
                    {newsList.map((article, index) =>
                        <SwiperSlide className="d-flex flex-column align-items-center my-4" key={index}>
                            <div className={classes.articleCard}>
                                <div className={`card border-0 shadow-sm`}>
                                    <img src={article.cover_img} className="card-img-top p-3" alt={article.title} />
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <p className="card-subtitle text-secondary fs-6"><small>{article.mtime.split(' ')[0]}</small></p>
                                        <h5 className="card-title text-dark"><small>{article.title}</small></h5>
                                    </div>
                                </div>
                                <div className={`overlay card text-white`}>
                                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                                        <p className="card-subtitle fs-6"><small>{article.mtime.split(' ')[0]}</small></p>
                                        <h6 className="card-title">{article.title}</h6>
                                        <Link to={`/Resources/News/${article.id}`} className="btn btn-warning text-white">{t('Read More')}</Link>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
                : <Loading />
            }
        </section>
    )
}

export default function Home() {
    return (
        <>
            <HomepageBanner />
            <Section1 />
            <Section2 />
            <Section3 />
            <TradePlatform />
            <OpenAccount />
            <AwardCarousel />
            <ArticleCarousel />
        </>
    )
};
