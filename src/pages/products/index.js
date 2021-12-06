import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import {
    RedirectToDemoAccount,
    RedirectToRealAccount,
    RedirectToUcenter
} from 'utilities'

import Calculate from './Calculate'
import TopBanner from 'components/TopBanner'
import MightBeInterested from 'components/MightBeInterested'
import MarketPrice from 'components/MarketPrice'
// import FeatureCard from 'components/FeatureCard'
import TradePlatform from 'components/TradePlatform'
import OpenAccount from 'components/OpenAccount'
import AwardCarousel from 'components/AwardCarousel'

import Forextopbanner from 'assets/images/products/Forextopbanner.jpg'
import commodity_topbanner from 'assets/images/products/commodity_topbanner.jpg'
import Stockindexitopbanner from 'assets/images/products/Stockindexitopbanner.jpg'
import lowest_commission_topbanner from 'assets/images/products/lowest_commission_topbanner.png'

import rate_decrease_1 from 'assets/images/icons/rate_decrease_1.png'
import coins_decrease_1 from 'assets/images/icons/coins_decrease_1.png'
import balance_1 from 'assets/images/icons/balance_1.png'
import certificate_1 from 'assets/images/icons/certificate_1.png'
import mutiplatform_1 from 'assets/images/icons/mutiplatform_1.png'
import cs_1 from 'assets/images/icons/cs_1.png'


const FeatureCard = () => {
    const { t } = useTranslation();
    const useStyles = makeStyles({
        outlineBtn: {
            "& :hover": {
                color: '#fff'
            }
        }
    })

    return (
        <section className="container d-flex flex-wrap justify-content-center py-4" style={{ position: 'relative', top: '-10%' }}>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={rate_decrease_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Lowest Commission Up to USD 0')}</h5>
                    <a href='/Products/Lowest-Commission' type="button" className="btn btn-outline-primary">{t('Details')}</a>
                </div>
            </div>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={coins_decrease_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Low Spreads Starting from 1.4 pips')}</h5>
                    <button type="button" onClick={() => RedirectToRealAccount()} className="btn btn-outline-secondary">{t('Open Demo Account')}</button>
                </div>
            </div>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={balance_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Small Capital Profit Leverage 1 :200')}</h5>
                    <a href={`${window.location.pathname}/Detail`} type="button" className={`${useStyles.outlineBtn} btn btn-outline-primary`}>{t('Details')}</a>
                </div>
            </div>
        </section>
    )
}

const ProductTable = ({ title, id }) => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid text-center py-5" style={{ background: '#F1F1F1' }}>
            <h2 className="fw-bold text-dark mb-5">{t(title)}</h2>

            <MarketPrice id={id} />

            <a href={`${window.location.pathname}/Detail`} className="btn btn-primary text-white mt-5">
                {t('Contract details')}
            </a>
        </section>
    )
}

const Forex = () => (
    <>
        <TopBanner
            background={Forextopbanner}
            titles={["Forex Trading"]}
            subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
            buttons={[{ color: 'btn-warning', text: "Trade Now", callback: RedirectToUcenter }]} />
        <FeatureCard />
        <ProductTable title="Currency Pair" id="Forex" />
        <WhyChoose />
        <MightBeInterested />
    </>
)
const Commodities = () => (
    <>
        <TopBanner
            background={commodity_topbanner}
            titles={["Commodity Trading"]}
            subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
            buttons={[{ color: 'btn-warning', text: "Trade Now", callback: RedirectToUcenter }]} />
        <FeatureCard />
        <ProductTable title="Commodity" id="Commodity" />
        <WhyChoose />
        <MightBeInterested />
    </>
)
const Indices = () => (
    <>
        <TopBanner
            background={Stockindexitopbanner}
            titles={["Stock Index"]}
            subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
            buttons={[{ color: 'btn-warning', text: "Trade Now", callback: RedirectToUcenter }]} />
        <FeatureCard />
        <ProductTable title="Index" id="Index" />
        <WhyChoose />
        <MightBeInterested />
    </>
)

const LowestCommission = () => {
    const { t } = useTranslation();
    const useStyles = makeStyles({
        featureCard: {
            border: 0,
            background: '#F7F7F7',
            boxShadow: '0px 1px 3px #0000001A',
            minHeight: '240px',
            borderRadius: '20px',
            '&:hover': {
                background: '#ffffff',
                boxShadow: '0px 4px 12px #00000033',
                transition: 'all .15s linear',
                transform: 'scale(1.05)',
                borderBottom: '4px solid #60A720'
            }
        }
    })()
    return (
        <>
            <TopBanner
                background={lowest_commission_topbanner}
                titles={["Lowest Commission Forex Broker"]}
                subtitles={["Create and account today and enjoy trading with 0 commission"]}
                buttons={[
                    { color: 'btn-secondary', text: "Open Demo Account", callback: RedirectToDemoAccount },
                    { color: 'btn-warning', text: "Open Real Account", callback: RedirectToRealAccount }]} />

            <section className="container my-5">
                <div className="row justify-content-center align-item-stretch">
                    <div className="col col-11 col-md-6 col-lg-4">
                        <div className={`${useStyles.featureCard} card mb-3`}>
                            <div className="row g-0">
                                <div className="col col-12 col-md-3">
                                    <img src={rate_decrease_1} className="img-fluid rounded-start" alt={t('No Intermediaries')} />
                                </div>
                                <div className="col col-12 col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{t('No Intermediaries')}</h5>
                                        <p className="card-text text-secondary">{t('Trading on the HXFX Platform, without an IB (Introducing Broker) intermediary, so that customers can enjoy the lowest price offers with the best service.')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-11 col-md-6 col-lg-4">
                        <div className={`${useStyles.featureCard} card mb-3`}>
                            <div className="row g-0">
                                <div className="col col-12 col-md-3">
                                    <img src={certificate_1} className="img-fluid rounded-start" alt={t('Regulated')} />
                                </div>
                                <div className="col col-12 col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{t('Regulated')}</h5>
                                        <p className="card-text text-secondary">{t('HXFX is regulated by Authorities such as Vanuatu Financial Services Commission.')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col col-11 col-md-6 col-lg-4">
                        <div className={`${useStyles.featureCard} card mb-3`}>
                            <div className="row g-0">
                                <div className="col col-12 col-md-3">
                                    <img src={mutiplatform_1} className="img-fluid rounded-start" alt={t('Platform Independent')} />
                                </div>
                                <div className="col col-12 col-md-9">
                                    <div className="card-body">
                                        <h5 className="card-title">{t('Platform Independent')}</h5>
                                        <p className="card-text text-secondary">{t('FX Trade was developed by HXFX itself by adjusting the needs and trading patterns of customers.')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <TradePlatform />
        </>
    )
}

const WhyChoose = () => {
    const why_context = [
        { icon: certificate_1, title: 'Negative Balance Protection' },
        { icon: rate_decrease_1, title: '0% Commission' },
        { icon: balance_1, title: 'Competitive Spread' },
        { icon: cs_1, title: '5/24 Online Support' },
    ]
    const { t } = useTranslation();
    return (
        <section className="container text-center py-5">
            <h2 className="fw-bold text-dark text-center mb-5">{t('Why Choose HXFX')}</h2>

            <div className="container col-12 d-flex flex-wrap justify-content-evenly">
                {why_context.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-3 p-4 m-2" key={t(card.title)} style={{ width: '300px' }}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2">{`${t(card.title)}`}</h5>
                    </div>
                )}
            </div>
            <button className="btn btn-warning my-4 text-white" onClick={() => RedirectToUcenter()}>{t('Trade Now')}</button>
        </section>
    )
}

const Products = () => (
    <>
        <Router basename={'/Products'}>
            <Switch>
                <Route exact path="/Forex">
                    <Forex />
                </Route>
                <Route exact path="/Commodities">
                    <Commodities />
                </Route>
                <Route exact path="/Indices">
                    <Indices />
                </Route>
                <Route exact path="/Calculate" component={Calculate} />
                <Route exact path="/Lowest-Commission" component={LowestCommission} />
            </Switch>

            <OpenAccount />
            <AwardCarousel />
        </Router>
    </>
)

export default Products
