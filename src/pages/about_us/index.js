import React from 'react'
import { useTranslation } from "react-i18next";
import Axios from 'axios'
// import { makeStyles } from '@mui/styles';
import { thousandsSeparator, RedirectToDemoAccount, RedirectToRealAccount } from 'utilities'
import TopBanner from 'components/TopBanner'
import AwardCarousel from 'components/AwardCarousel'
import OpenAccount from 'components/OpenAccount'

import topbanner from 'assets/images/about_us/topbanner.jpg'
import part3image from 'assets/images/about_us/part3image.png'
import earth from 'assets/images/about_us/earth.png'

import certificate_1 from 'assets/images/icons/certificate_1.png'
import rate_decrease_1 from 'assets/images/icons/rate_decrease_1.png'
import balance_1 from 'assets/images/icons/balance_1.png'
import cs_1 from 'assets/images/icons/cs_1.png'
import secure_1 from 'assets/images/icons/secure_1.png'
import twentyFour_1 from 'assets/images/icons/twentyFour_1.png'
import money_quick_1 from 'assets/images/icons/money_quick_1.png'

// Section1
const Section1 = () => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid py-5">
            <div className="container">
                <h2 className="fw-bold text-dark text-center">{`${t('WHO WE ARE')}`}</h2>
                <p className="card-text text-secondary">{`${t('For over a decade, HXFX Global has been constantly striving to provide the best secured Forex and Commodities trading platform for our clients, alongside innovative trading technology. Our products enable clients to leverage trade globally with competitive spreads and zero commission. Trusted by millions of clients worldwide.')}`}</p>
            </div>
        </section>
    )
}

// Section2
const Section2 = () => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid" style={{ background: '#F1F1F1' }}>
            <div className="container py-5 col-12 col-lg-6">
                <h2 className="fw-bold text-dark text-center">{t('How we protect your funds')}</h2>
                <h5 className="my-4 text-primary">{t('One of the fundamental concerns of online traders is the safety of their funds and we are dedicated to keep our clients’ funds secured as follows:')}</h5>
                <ul className={`list-group list-tick`}>
                    <li className="text-secondary mb-3">{t("All of your money is held in segregated client bank (independent trust) accounts at regulated banks.")}</li>
                    <li className="text-secondary mb-3">{t("Your money and assets (for example: shares) are never merged with HXFXglobal’s own money or assets")}</li>
                    <li className="text-secondary mb-3">{t("HXFXglobal has advanced encryption transmission and dynamic encryption of your data.")}</li>
                    <li className="text-secondary mb-3">{t("HXFXglobal does not use your money for any business activities, including for hedging or investments.")}</li>
                </ul>
            </div>
        </section>
    )
}

const history_context = [
    {
        name: "2010 - 2014", content: [
            'Online trading terminals were launched',
            'A professional customer service team was set up to provide professional investment Q&A services',
            'The platform launched a news function to keep abreast of market dynamics',
            'Official Web 2.0 was upgraded'
        ]
    },
    {
        name: "2015 - 2017", content: [
            'The number of user exceeded 300K', 'Partnership with ACB bank and DONGA Bank',
            'Launched the internal Testing Edition Mobile App',
            'Officially launched the natural gas and European share index contract notice',
            'Won the best innovation silver industry Asia Pacific Stevie Silver Award']
    },
    {
        name: "2018", content: [
            'The mobile app was officially launched',
            'Won the "Hong Kong Most Valuable Enterprise Award"',
            'Won the title of "ERB Talent Enterprise"',
            'Won the "Golden Bridge Award"',
            'Won the 2018 financial growth company in the United States'
        ]
    },
    {
        name: "2019 - 2020", content: [
            'The number of users exceeded 300K',
            'Increased 24 Share (Hong Kong stocks / US stocks) product contracts',
            'Officially launched an upgraded mobile trading APP——FX Trade',
            'Brand new upgrade',
            'Our glory will be continued'
        ]
    },
]

const History = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState("2015 - 2017");

    const toggleTabs = (e, tab) => {
        setActiveTab(tab);
    }
    return (
        <section className="container-fluid">
            <h2 className="fw-bold py-5 text-dark text-center">{`${t('HISTORY & MIILESTONES OF HXFX GLOBAL')}`}</h2>
            <div className="container mb-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col col-12 col-lg-6 text-center">
                        <img src={part3image} alt="" width="100%" height="100%" />
                    </div>
                    <div className="col col-12 col-lg-6">

                        <ul className={`nav nav-tabs my-3 text-secondary`}>
                            {history_context.map(tab => (
                                <li className={`mx-3 nav-item`} onClick={e => toggleTabs(e, tab.name)} role="button" key={tab.name}>
                                    {t(tab.name)}
                                </li>
                            ))}
                        </ul>

                        {history_context.map(tab => (
                            tab.name === activeTab
                                ? <div className={`container`} id={tab.name} key={tab.name}>
                                    <h2>{tab.name}</h2>
                                    <div data-aos="fade-left">
                                        <ul className={`list-group text-secondary`}>
                                            {tab.content.map(p =>
                                                <li className="mb-3" key={p}>{t(p)}</li>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                : ''
                        ))}
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const WhyChoose = () => {
    const why_context = [
        { icon: secure_1, title: 'Negative Balance Protection' },
        { icon: rate_decrease_1, title: '0% Commission' },
        { icon: balance_1, title: 'Competitive Spread' },
        { icon: twentyFour_1, title: '5/24 Online Support' },
        { icon: certificate_1, title: 'Authorized & Regulated' },
        { icon: money_quick_1, title: "Quick Withdrawal (30')" },
        { icon: cs_1, title: 'Extensive Product Range' },
    ]
    const { t } = useTranslation();
    return (
        <section className="container-fluid py-5" style={{ background: '#F1F1F1' }}>
            <h2 className="fw-bold text-dark text-center mb-5">{t('Why Choose HXFX')}</h2>

            <div className="container d-flex flex-wrap justify-content-evenly">
                {why_context.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-6 col-lg-4 p-4 m-2" key={t(card.title)} style={{ width: '300px' }}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2">{t(card.title)}</h5>
                    </div>
                )}
            </div>
        </section>
    )
}

// OperationalData
const OperationalData = () => {
    const { t } = useTranslation();
    const [dataObj, setDataObj] = React.useState({})

    const useStyle = {
        minHeight: '166px'
    }

    React.useEffect(() => {
        const getOperational = async () => {
            const result = await (await Axios.get(`${process.env.REACT_APP_OPENAPI_HOST}/tools/?service=Operationaldata.getOperational`)).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setDataObj(result.data[0])
        }
        getOperational()
    }, [])

    return (
        <section className="container-fluid">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center">
                    <div className="col col-12 col-lg-5 text-center">
                        <img src={earth} alt="" width="100%" height="100%" />
                    </div>
                    <div className="col col-12 col-lg-7">
                        <h2 className="fw-bold text-dark text-center">{t('Operational Data')}</h2>
                        <div className="d-flex justify-content-evenly">
                            <h3 className="fw-bold text-dark text-center">{t('Safe Operation')}</h3>
                            <h2 className="fw-bold text-primary text-center" data-aos="fade-down" data-aos-delay="300">{thousandsSeparator(dataObj.ope_year)}</h2>
                            <h2 className="fw-bold text-dark text-center">{t('Year')}</h2>
                            <h2 className="fw-bold text-primary text-center" data-aos="fade-down" data-aos-delay="500">{thousandsSeparator(dataObj.ope_day)}</h2>
                            <h2 className="fw-bold text-dark text-center">{t('Day')}</h2>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center align-item-stretch">
                            <div className={`feature-card card text-center col-5 m-3`} style={useStyle}>
                                <h2 className="card-title text-primary" data-aos="zoom-out" data-aos-delay="100">{thousandsSeparator(dataObj.count_investment)}</h2>
                                <h6 className="card-text text-dark">{t('Number of clients')}</h6>
                            </div>
                            <div className={`feature-card card text-center col-5 m-3`} style={useStyle}>
                                <h2 className="card-title text-primary" data-aos="zoom-out" data-aos-delay="300">{thousandsSeparator(dataObj.count_order)}</h2>
                                <h6 className="card-text text-dark">{t("Customer's withdraw amount")}</h6>
                            </div>
                            <div className={`feature-card card text-center col-5 m-3`} style={useStyle}>
                                <h2 className="card-title text-primary" data-aos="zoom-out" data-aos-delay="500">{thousandsSeparator(dataObj.count_trade)}</h2>
                                <h6 className="card-text text-dark">{t('Transaction amount')}</h6>
                            </div>
                            <div className={`feature-card card text-center col-5 m-3`} style={useStyle}>
                                <h2 className="card-title text-primary" data-aos="zoom-out" data-aos-delay="700">{thousandsSeparator(dataObj.count_hand)}</h2>
                                <h6 className="card-text text-dark">{t('Bonus amount')}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const About_us = () => (
    <>
        <TopBanner
            background={topbanner}
            titles={["Trade with HXFX"]}
            subtitles={["Your Reliable Trading Partner", "At HXFXglobal, we help investors to maximize the value of Investment and keep our clients’ finance safe."]}
            buttons={[
                { color: 'btn-secondary', text: "Open Demo Account", callback: RedirectToDemoAccount },
                { color: 'btn-warning', text: "Open Real Account", callback: RedirectToRealAccount }
            ]} />
        <Section1 />
        <Section2 />
        <History />
        <WhyChoose />
        <OperationalData />
        <OpenAccount />
        <AwardCarousel />
    </>
)
export default About_us
