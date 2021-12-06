import React from 'react'
import { useTranslation } from "react-i18next";

import phone_2 from 'assets/images/home/phone_2.png'
import MT4_img from 'assets/images/home/MT4.png'
import applestore from 'assets/images/applestore.png'
import googleplay from 'assets/images/googleplay.png'
import mobile_ios from 'assets/images/mobile_btn_img1.png'
import mobile_andriod from 'assets/images/mobile_btn_img2.png'
import windows_btn from 'assets/images/windows_btn.png'

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
                [
                    { src: mobile_ios, width: "59px", height: "55px", style: 'qrcode-mt4', link: 'https://apps.apple.com/cn/app/metatrader-4/id496212596' },
                    { src: mobile_andriod, width: "134px", height: "55px", style: 'qrcode-mt4', link: 'https://soft.hxfxglobal.com/MT4/MetaTrader4.apk' }
                ],
                { src: windows_btn, width: "193px", height: "55px", style: '', link: 'https://soft.hxfxglobal.com/MT4/MetaTrader4.exe' }
            ]
        },
        {
            name: "FX Trade",
            img: { src: phone_2, width: "100%", height: "100%" },
            features: [
                'Tailor-made for professional investors',
                'Order execution speed in millisecond level',
                'Advanced chart analysis',
                'Comprehensive technical indicators',
                'Global real-time update of market information and financial calendar'
            ],
            buttons: [
                { src: googleplay, width: "193px", height: "55px", style: 'qrcode-hxfx', link: "https://soft.hxfxglobal.com/MT4/HXFXTrade.apk" },
                { src: applestore, width: "193px", height: "55px", style: 'qrcode-hxfx', link: "https://apps.apple.com/vn/app/id1474767285" },
            ]
        }
    ]
}

const TradePlatform = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = React.useState("FX Trade");

    const toggleTabs = (e, tab) => {
        setActiveTab(tab);
    }

    return (
        <section id="section4" className="container-fluid" style={{ background: '#F1F1F1' }}>
            <div className="container py-5 d-flex flex-column align-items-center">
                <h3 className="fw-bold my-3 text-dark">{t(context.title)}</h3>
                <h5 className="fw-bold my-3 text-primary">{t(context.subtitle)}</h5>

                <ul className={`nav tab-slider--tabs my-3 ${activeTab === "MT4" ? "slide" : ""}`}>
                    <li className={`tab-slider--trigger ${activeTab === "MT4" ? "active" : ""}`} onClick={e => toggleTabs(e, context.tabs[0].name)}>{t(context.tabs[0].name)}</li>
                    <li className={`tab-slider--trigger ${activeTab === "FX Trade" ? "active" : ""}`} onClick={e => toggleTabs(e, context.tabs[1].name)}>{t(context.tabs[1].name)}</li>
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
                                            Array.isArray(btn)
                                                ? btn.map((b, i) =>
                                                    <a href={b.link} key={i} className={b.style} target="_blank" rel="noreferrer">
                                                        <img className="mt-3" src={b.src} width={b.width} height={b.height} alt={t(context.title)} />
                                                    </a>
                                                )
                                                : <a href={btn.link} key={index} className={btn.style} target="_blank" rel="noreferrer">
                                                    <img className="mt-3 mx-1" src={btn.src} width={btn.width} height={btn.height} alt={t(context.title)} />
                                                </a>
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
