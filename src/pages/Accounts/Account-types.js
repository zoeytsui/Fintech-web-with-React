import React from 'react'
import { useTranslation } from "react-i18next";
// import { makeStyles } from '@mui/styles';
import TopBanner from 'components/TopBanner'

import accountTypesTopbanner from 'assets/images/accounts/accountTypesTopbanner.jpg'
import topblock from 'assets/images/accounts/topblock.png'
import REadytoTrade_image from 'assets/images/accounts/REadytoTrade_image.png'

import secure_1 from 'assets/images/icons/secure_1.png'
import fourty_1 from 'assets/images/icons/fourty_1.png'
import profile_1 from 'assets/images/icons/profile_1.png'
import coins_decrease_1 from 'assets/images/icons/coins_decrease_1.png'
import balance_1 from 'assets/images/icons/balance_1.png'


const WhyChoose = () => {
    const why_context = [
        { icon: secure_1, title: 'Safety', subtitle: 'Major trading licenses' },
        { icon: fourty_1, title: 'More Products', subtitle: '40+ Trading products' },
        { icon: profile_1, title: 'Free Account Opening', subtitle: 'Account opening fee' },
        { icon: coins_decrease_1, title: 'Low Threshold', subtitle: '0.01 Minimum lot size' },
        { icon: balance_1, title: 'High Leverage', subtitle: '500 Maximum leverage' },
    ]
    const { t } = useTranslation();
    return (
        <section className="container-fluid py-5" style={{ background: '#F1F1F1' }}>
            <h2 className="fw-bold text-dark text-center mb-5">{t('Trading in HXFX Global')}</h2>

            <div className="container col-12 d-flex flex-wrap justify-content-evenly">
                {why_context.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-4 px-4 m-3" key={t(card.title)} style={{ width: '300px' }}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2">{`${t(card.title)}`}</h5>
                        <p className="text-secondary mx-2">{`${t(card.subtitle)}`}</p>
                    </div>
                )}
            </div>
            <div className="container col-12 d-flex flex-wrap justify-content-center">
                <button className="btn btn-outline-warning m-2">{t('Open Demo Account')}</button>
                <button className="btn btn-warning text-white m-2">{t('Open Real Account')}</button>
            </div>
        </section>
    )
}

const BannerOverlay = () => {
    const { t } = useTranslation()
    return (
        <div className="container col-9 my-4">
            <div className="card border-0">
                <img src={topblock} className="card-img" alt="..." />
                <div className="card-img-overlay d-flex flex-column justify-content-center px-5">
                    <h1 className="card-title text-dark">{t('Transaction Cost Savings of')}</h1>
                    <h1 className="card-title text-warning">{t('40%')}</h1>
                </div>
            </div>
        </div>
    )
}

const ReadyToTrade = () => {
    const { t } = useTranslation()
    return (
        <section className="container-fluid">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col col-12 col-lg-6">
                        <h2 className="fw-bold text-dark text-center">{`${t('Ready to Trade ?')}`}</h2>
                        <p className="card-text text-secondary">{`${t('Trade with Smiler amount , open account in less than ONE minute')}`}</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            <button className="btn btn-secondary text-white m-2">{t('Open Demo Account')}</button>
                            <button className="btn btn-warning text-white m-2">{t('Open Real Account')}</button>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-5 text-center m-2">
                        <img src={REadytoTrade_image} alt="" width="100%" height="100%" />
                    </div>
                </div>
            </div>
        </section>
    )
}

const AccountTypes = () => {
    return (
        <>
            <TopBanner
                background={accountTypesTopbanner}
                titles={["Trade with us"]}
                subtitles={["Invest your wealth in a wide-range of trading products.", "Join the world leading HXFX Global today and trade the most popular products with ultra-low spreads."]}
                buttons={[{ color: 'btn-warning', text: "Create Account" }]} />

            <BannerOverlay />
            <WhyChoose />

            <ReadyToTrade />
        </>
    )
}

export default AccountTypes
