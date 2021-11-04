import React from 'react'
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import step1 from 'assets/images/home/step1.png'
import step2 from 'assets/images/home/step2.png'
import step3 from 'assets/images/home/step3.png'

import phone_3 from 'assets/images/home/phone_3.png'
import payment_icon from 'assets/images/paymenticon_white.png'

const OpenAccount = () => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid" style={{ background: 'linear-gradient(90deg, #60A720 0%, #83BF4B 35%, #A6E26E 100%)' }}>
            <div className={`container py-4`}>
                <div className="row text-white justify-content-center align-items-center">
                    <div className="col col-12 col-lg-7">
                        <h3 className="fw-bold my-3 text-center">{`${t('Open an account for free now')}`}</h3>
                        <h5 className="fw-bold my-3 text-center">{`${t('30 seconds to have an account')}`}</h5>
                        <div className="d-flex justify-content-center flex-wrap text-center my-4">
                            <div className="mx-2 col-12 col-md-3">
                                <img src={step1} width="142px" height="140px" alt="" />
                                <p>{t('Open an account for free')}</p>
                            </div>
                            <div className="mx-2 col-12 col-md-3">
                                <img src={step2} width="142px" height="140px" alt="" />
                                <p>{t('Top up your account')}</p>
                            </div>
                            <div className="mx-2 col-12 col-md-3">
                                <img src={step3} width="142px" height="140px" alt="" />
                                <p>{t('Start trading')}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly">
                            <Link type="button" to="/" className="btn btn-secondary text-white px-4 py-2">{t('Open Demo Account')}</Link>
                            <Link type="button" to="/" className="btn btn-warning text-white px-4 py-2">{t('Open Real Account')}</Link>
                        </div>
                    </div>
                    <div data-aos="zoom-in" className="col col-12 col-lg-5 text-center">
                        <img src={phone_3} style={{ maxWidth: '338px' }} width="100%" height="100%" alt=""></img>
                    </div>
                </div>
                <div className='row'>
                    <span className="col-3 col-lg-5 col-md-4" style={{ borderBottom: '2px solid #fff', position: 'relative', bottom: '10px' }} />
                    <span className="col-6 col-lg-2 col-md-4 text-white text-center">{t('WE ACCEPT')}</span>
                    <span className="col-3 col-lg-5 col-md-4" style={{ borderBottom: '2px solid #fff', position: 'relative', bottom: '10px' }} />
                </div>
                <img className="my-3" src={payment_icon} width="100%" alt=""></img>
            </div>
        </section>
    )
}

export default OpenAccount
