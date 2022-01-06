import React from 'react'
import { useTranslation } from "react-i18next";

import Commoditiesitem from 'assets/images/products/Commoditiesitem.png'
import forexitem from 'assets/images/products/forexitem.png'
import indexitem from 'assets/images/products/indexitem.png'

const MightBeInterested = () => {
    const { t } = useTranslation();
    const context = [
        { icon: Commoditiesitem, title: 'Forex', subtitle: "Trade major, minor and exotic currency pair with a global, trusted broker" },
        { icon: forexitem, title: 'Commodities', subtitle: 'Diversify your portfolio by trading the world most popular soft commodities' },
        { icon: indexitem, title: 'Index', subtitle: "Discover your trading opportunity with popular stock indexes" },
    ]
    return (
        <section className="container-fluid text-center py-5" style={{ background: '#F1F1F1' }}>
            <h2 className="fw-bold text-dark mb-5">{t('You might be interested in')}</h2>
            <div className="d-flex flex-wrap justify-content-center">
                {context.map(item =>
                    <div className="col-12 col-lg-3 mx-3" key={item.title}>
                        <img src={item.icon} alt={item.title} />
                        <h5 className="text-primary" style={{ fontFamily: 'Exo2-ExtraBold' }}>{t(item.title)}</h5>
                        <p className="text-secondary">{t(item.subtitle)}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MightBeInterested
