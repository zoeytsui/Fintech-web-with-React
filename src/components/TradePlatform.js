import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import phone_2 from 'assets/images/home/phone_2.png'
import MT4_img from 'assets/images/home/MT4.png'
import applestore from 'assets/images/home/applestore.png'
import googleplay from 'assets/images/home/googleplay.png'
import mobile_btn from 'assets/images/home/mobile_btn.png'
import windows_btn from 'assets/images/home/windows_btn.png'

const context = {
    title: 'Trade anytime, anywhere',
    subtitle: 'HXFX Global is available in different forms on various platforms, which gives you no limitation on when and where.',
    tabs: [
        {
            name: "MT4",
            img: { src: MT4_img, width: "100%", height: "100%" },
            features: [
                'Tailor-made for professional investors',
                'Order execution speed in millisecond level',
                'Advanced chart analysis',
                'Comprehensive technical indicators',
                'Global real-time update of market information and financial calendar'
            ],
            buttons: [
                { src: mobile_btn, width: "193px", height: "55px" },
                { src: windows_btn, width: "193px", height: "55px" }
            ]
        },
        {
            name: "HXFX Trade",
            img: { src: phone_2, width: "100%", height: "100%" },
            features: [
                'Tailor-made for professional investors',
                'Order execution speed in millisecond level',
                'Advanced chart analysis',
                'Comprehensive technical indicators',
                'Global real-time update of market information and financial calendar'
            ],
            buttons: [
                { src: googleplay, width: "193px", height: "55px" },
                { src: applestore, width: "193px", height: "55px" },
            ]
        }
    ]
}

const TradePlatform = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState("HXFX Trade");

    const toggleTabs = (e, tab) => {
        setActiveTab(tab);
    }

    return (
        <section id="section4" className="container-fluid" style={{ background: '#F1F1F1' }}>
            <div className="container py-5 d-flex flex-column align-items-center">
                <h3 className="fw-bold my-3 text-dark">{`${t(context.title)}`}</h3>
                <h5 className="fw-bold my-3 text-primary">{`${t(context.subtitle)}`}</h5>

                <ul className={`nav tab-slider--tabs my-3 ${activeTab === "MT4" ? "slide" : ""}`}>
                    <li className={`tab-slider--trigger ${activeTab === "MT4" ? "active" : ""}`} onClick={e => toggleTabs(e, context.tabs[0].name)}>{t(context.tabs[0].name)}</li>
                    <li className={`tab-slider--trigger ${activeTab === "HXFX Trade" ? "active" : ""}`} onClick={e => toggleTabs(e, context.tabs[1].name)}>{t(context.tabs[1].name)}</li>
                </ul>

                {context.tabs.map(tab => (
                    tab.name === activeTab
                        ? <div className={`container`} id={tab.name} key={tab.name}>
                            <div className="row justify-content-center align-items-center">
                                <div data-aos="fade-right" className="col col-12 col-lg-6 text-center">
                                    <img src={tab.img.src} width={tab.img.width} height={tab.img.height} alt={t(context.title)}></img>
                                </div>
                                <div data-aos="fade-left" className="col col-12 col-lg-6">
                                    <ul className={`list-group text-secondary list-tick`}>
                                        {tab.features.map((feature, index) =>
                                            <li className="mb-3" key={index}><span>{t(feature)}</span></li>
                                        )}
                                    </ul>
                                    <div className="d-flex flex-wrap">
                                        {tab.buttons.map((btn, index) =>
                                            <Link to='#' key={index}><img className="mt-3 mx-1" src={btn.src} width={btn.width} height={btn.height} alt={`${t(context.title)}`} /></Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <div key={null}></div>
                ))}

            </div>
        </section>
    )
}

export default TradePlatform
