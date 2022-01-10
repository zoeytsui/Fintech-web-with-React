import React from 'react'
import { useTranslation } from "react-i18next";
import { RedirectToDemoAccount, RedirectToRealAccount } from 'utilities'

import step1 from 'assets/images/home/step1.png'
import step2 from 'assets/images/home/step2.png'
import step3 from 'assets/images/home/step3.png'

import phone_3 from 'assets/images/home/phone_3.gif'

import payment_icon from 'assets/images/paymenticon_white.png'


const OpenAccount = () => {
    const { t } = useTranslation();
    const [time, setTime] = React.useState(0)

    const animated = {
        opacity: '25%',
        transition: 'opacity .5s ease'
    }
    React.useEffect(() => {
        let steps = Array.from(document.getElementById('openaccount-steps').children);
        (async () => {
            try {
                if (time >= 5) {
                    steps.map(ele => ele.style.opacity = '25%')
                    setTime(0)
                }

                steps[time].style.opacity = '100%'

                await new Promise(res => setTimeout(() => {
                    res(setTime(val => val += 1))
                }, 2000))

            } catch (error) {}
        })()
    })
    return (
        <section className="container-fluid" style={{ background: 'linear-gradient(90deg, #60A720 0%, #83BF4B 35%, #A6E26E 100%)' }}>
            <div className={`container py-4`}>

                <div className="row flex-wrap justify-content-center align-items-center text-white">
                    <div className="col col-12 col-lg-8">
                        <h3 className="fw-bold my-3 text-center">{t('Open an account for free now')}</h3>
                        <h5 className="fw-bold my-3 text-center">{t('30 seconds to have an account')}</h5>
                        <div id="openaccount-steps" className="d-flex flex-wrap justify-content-center align-items-center text-center my-4">
                            <div className="col-12 col-md-2" style={{ ...animated }}>
                                <img src={step1} width="100%" style={{ maxWidth: '142px' }} alt="" />
                                <p className='my-2'>{t('Open an account for free')}</p>
                            </div>

                            <hr className="col-1" style={{ ...animated, border: '2px solid #fff', borderRadius: '20px' }} />

                            <div className="mx-2 col-12 col-md-2" style={{ ...animated }}>
                                <img src={step2} width="100%" style={{ maxWidth: '142px' }} alt="" />
                                <p className='my-2'>{t('Top up your account')}</p>
                            </div>

                            <hr className="col-1" style={{ ...animated, border: '2px solid #fff', borderRadius: '20px' }} />

                            <div className="mx-2 col-12 col-md-2" style={{ ...animated }}>
                                <img src={step3} width="100%" style={{ maxWidth: '142px' }} alt="" />
                                <p className='my-2'>{t('Start trading')}</p>
                            </div>
                        </div>
                        <div className="d-flex justify-content-evenly my-4">
                            <button type="button" onClick={() => RedirectToDemoAccount()} className="btn btn-secondary px-4 py-2">{t('Open Demo Account')}</button>
                            <button type="button" onClick={() => RedirectToRealAccount()} className="btn btn-warning px-4 py-2">{t('Open Real Account')}</button>
                        </div>
                    </div>
                    <div className="col col-12 col-lg-4 text-center">
                        <img src={phone_3} style={{ maxWidth: '280px' }} alt='' />
                    </div>
                </div>

                <div className='row'>
                    <span className="col-3 col-lg-5 col-md-4" style={{ borderBottom: '2px solid #fff', position: 'relative', bottom: '10px' }} />
                    <span className="col-6 col-lg-2 col-md-4 text-white text-center">{t('We Welcome')}</span>
                    <span className="col-3 col-lg-5 col-md-4" style={{ borderBottom: '2px solid #fff', position: 'relative', bottom: '10px' }} />
                </div>
                <img className="my-3" src={payment_icon} width="100%" alt=""></img>
                <p className="text-white text-center">{t('Is Coming…')}</p>
            </div>
        </section>
    )
}

export default OpenAccount
