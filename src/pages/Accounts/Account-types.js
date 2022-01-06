import React from 'react'
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import {
    RedirectToRealAccount,
    RedirectToDemoAccount,
} from 'utilities'
import TopBanner from 'components/TopBanner'

import accountTypesTopbanner from 'assets/images/accounts/accountTypesTopbanner.jpg'
import topblock from 'assets/images/accounts/topblock.png'
import REadytoTrade_image from 'assets/images/accounts/REadytoTrade_image.png'

import secure_1 from 'assets/images/icons/secure_1.png'
import fourty_1 from 'assets/images/icons/fourty_1.png'
import profile_1 from 'assets/images/icons/profile_1.png'
import coins_decrease_1 from 'assets/images/icons/coins_decrease_1.png'
import balance_1 from 'assets/images/icons/balance_1.png'

import MiniAccountBTN from 'assets/images/accounts/MiniAccountBTN.png'
import SeniorAccountBTN from 'assets/images/accounts/SeniorAccountBTN.png'
import StandardAccountBTN from 'assets/images/accounts/StandardAccountBTN.png'

const BannerOverlay = () => {
    const { t } = useTranslation()
    React.useEffect(() => {
        let ele = document.getElementById('TransactionText');
        if (ele.innerHTML.includes('40%')) {
            ele.innerHTML = ele.innerHTML.replace('40%', "<span class='fs-1 text-warning'>40%</span>")
        }
    })
    return (
        <div className="container col-9 my-4">
            <div className="card border-0">
                <img src={topblock} className="card-img" alt="Account-Types" />
                <div className="card-img-overlay d-flex flex-column justify-content-center px-5">
                    <h2 id='TransactionText' className="card-title text-dark">{t("Transaction Cost Saving of 40%")}</h2>
                </div>
            </div>
        </div>
    )
}

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

            <div className="row col-12 col-lg-9 mx-auto flex-wrap justify-content-evenly">
                {why_context.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-12 col-lg-3 col-md-3 m-3" key={t(card.title)}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2">{`${t(card.title)}`}</h5>
                        <p className="text-secondary mx-2">{`${t(card.subtitle)}`}</p>
                    </div>
                )}
            </div>
            <div className="container col-12 d-flex flex-wrap justify-content-center">
                <button onClick={() => RedirectToDemoAccount()} className="btn btn-outline-warning m-2">{t('Open Demo Account')}</button>
                <button onClick={() => RedirectToRealAccount()} className="btn btn-warning text-white m-2">{t('Open Real Account')}</button>
            </div>
        </section>
    )
}

const AccountType = () => {
    const { t } = useTranslation()
    const styled = makeStyles({
        cards: {
            '& .card': {
                position: 'relative',
                textAlign: 'left',
                background: '#FAFAFA',
                '@media (max-width:780px)': {
                    position: 'unset',
                    margin: 'auto'
                },
                '&:hover': {
                    border: '0 !important'
                }
            },
            '& .card:nth-of-type(1)': {
                left: '20px'
            },
            '& .card:nth-of-type(2)': {
                bottom: '40px',
                zIndex: 1
            },
            '& .card:nth-of-type(3)': {
                left: '-20px'
            }
        }
    })()
    const types = [
        {
            name: 'Mini Account',
            name_color: '#88A0CC',
            pros: 'Reduced transaction costs 30%',
            descrition: 'Suitable for beginners who are just beginning to trade in foreign exchange, precious metals and other markets.',
            Minimum_deposit: '50',
            Minimum_floating_spread: '1.5',
            Order_quantity: '0.01-50',
            Leverage_up: '1-500',
        },
        {
            name: "Standard Account",
            name_color: '#CC8888',
            pros: 'Reduced transaction costs 30%',
            descrition: 'Suitable for experienced customers, hope to reach the peak of foreign exchange, precious metals and other markets.',
            Minimum_deposit: '200',
            Minimum_floating_spread: '1.3',
            Order_quantity: '0.01-50',
            Leverage_up: '1-500',
        },
        {
            rebate: true,
            tag: 'Lifetime Valid',
            name: 'Premium Account',
            name_color: '#83BF4B',
            pros: 'Reduced transaction costs 40%',
            descrition: "Suitable for beginners who are just beginning to trade in foreign exchange, precious metals and other markets.",
            Minimum_deposit: '2000',
            Minimum_floating_spread: '1.1',
            Order_quantity: '0.01-100',
            Leverage_up: '1-500',
        },
    ]
    return (
        <section className="container my-5">
            <div className={`row p-5 ${styled.cards}`}>
                {types.map(type =>
                    <div key={type.name} className="card feature-card col-12 col-lg-4 col-md-4">
                        <div className="card-body py-3">
                            {type.rebate
                                ? <RebateTag content={
                                    <div style={{ textAlign: 'center', color: '#fff' }}>
                                        <small>
                                            {`${t('Rebate')} $5 ${t("per lot")}`}
                                            <h5 style={{ color: '#FDF641', margin: 0 }}>$1500</h5>
                                            <span>{`${t('Deposit')} $3000`}</span>
                                        </small>
                                    </div>} />
                                : ''}
                            {type.tag ? <span className="badge rounded-pill bg-danger" style={{ fontSize: '1rem' }}>{t(type.tag)}</span> : ''}
                            <h2 style={{ color: type.name_color }}>{t(type.name)}</h2>
                            <p className="text-warning">{t(type.pros)}</p>
                            <p className="text-secondary">{t(type.descrition)}</p>
                            <hr />

                            <div className="d-flex justify-content-between align-items-center">
                                <div>{t('Minimum deposit')}</div>
                                <h3><span className="h6">$</span>{type.Minimum_deposit}</h3>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>{t("Minimum floating spreed")}</div>
                                <h3>{type.Minimum_floating_spread}</h3>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>{t('Order quantity')}</div>
                                <h3>{type.Order_quantity}</h3>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>{t('Leverage up')}</div>
                                <h3>{type.Leverage_up}</h3>
                            </div>
                            <hr />

                            <p className="text-secondary">{t('Applicable Products')}</p>
                            <p className="text-secondary">{t("The platform contains all products of foreign exchange, precious metals, commodities, stocks and stock indiexes.")}</p>

                            <button type="button" className="w-100 btn btn-warning" onClick={() => RedirectToRealAccount()}>{t('Create Account')}</button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    )
}

const RebateTag = ({ content }) => {
    const styled = makeStyles({
        tag: {
            position: 'absolute',
            top: '-5%',
            left: '75%',
            height: "124px",
            width: "124px",
            background: '#c92222',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '@media (max-width:780px)': {
                position: 'unset',
                margin: 'auto'
            },
        }
    })()
    return (
        <div className={`shadow ${styled.tag}`}>
            {content}
        </div>
    )
}

const AccountTabs = () => {
    const { t } = useTranslation()
    const [activeTab, setActiveTab] = React.useState('Mini Account')
    const tabs = [
        {
            name: 'Mini Account',
            name_color: '#88A0CC',
            icon: MiniAccountBTN,
            Minimum_deposit: '50',
            Reduced_transaction_costs: '30%',
            features: ['Complete account opening', "Accumulated transaction reach 1 lot or deposit $200", 'Approved', "Congratulation! Completeing the upgrade"]
        },
        {
            name: 'Standard Account',
            name_color: '#CC8888',
            icon: StandardAccountBTN,
            Minimum_deposit: '200',
            Reduced_transaction_costs: '30%',
            features: ['Complete account opening', ["Cumulative transactions ≥ 100 lots or", "Accumulated deposit of 200 USD"], 'Approved', "Congratulation! Completeing the upgrade"]
        },
        {
            name: 'Senior Account',
            name_color: '#83BF4B',
            icon: SeniorAccountBTN,
            Minimum_deposit: '2000',
            Reduced_transaction_costs: '40%',
            features: ['Upgrade to premium account', "Enjoying trading privileges for lifetime"]
        },
    ]
    return (
        <section className="container-fluid py-5" style={{ background: '#F1F1F1' }}>
            <div className="container">
                <div className="row flex-wrap justify-content-center align-items-center">
                    <div className="col col-12 col-lg-6 m-2">
                        {tabs.map(tab =>
                            <div className="card shadow-lg mx-auto" style={{ borderRadius: '20px', border: 0, maxWidth: '451px' }} key={tab.name}>
                                <div className="card-header text-white px-5 py-4" style={{ backgroundColor: tab.name_color, borderRadius: '20px 20px 0 0' }}>
                                    <h2 style={{ color: '#E9F2F2' }}>{t(tab.name)}</h2>
                                    <div className="d-flex justify-content-between">
                                        {/* <div className="d-flex justify-content-between align-items-center"> */}
                                        <div>
                                            <div>{t("Minimum floating spreed")}</div>
                                            <h2>{tab.Minimum_deposit}</h2>
                                        </div>
                                        <div>
                                            <div>{t('Reduced transaction costs')}</div>
                                            <h2>{tab.Reduced_transaction_costs}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body px-5 py-4">
                                    <ol className="list-number-black p-0">
                                        {tab.features.map(li =>
                                            Array.isArray(li)
                                                ? <li key={li}>{t(li[0]) + ' ' + t(li[1])}</li>
                                                // ? <li key={li}>{li.map(p => <p key={p}>{t(p)}</p>)}</li>
                                                : <li key={li}>{t(li)}</li>
                                        )}
                                    </ol>
                                    <SvgChart tab={activeTab} color={tab.name_color} />
                                </div>
                            </div>
                        ).filter(tab => tab.key === activeTab)}
                    </div>
                    <div className="col col-12 col-lg-5 text-center">
                        <h2 className="fw-bold text-dark text-center my-4">{t('Upgrade your account')}</h2>
                        <p className="card-text text-secondary">{t('Three levels of accounts that you can create according to your needs.')}</p>
                        <ul className="d-flex justify-content-between">
                            {tabs.map(tab =>
                                <li role="button" className={`list-unstyled ${activeTab === tab.name ? 'opacity-100' : 'opacity-25'}`} onClick={() => setActiveTab(tab.name)} key={tab.name}>
                                    <img src={tab.icon} alt={tab.name} width="100%" />
                                    <h5 className="text-primary">{t(tab.name)}</h5>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </section>
    )
}

const SvgChart = ({ tab, color }) => {
    const { t } = useTranslation()
    return (
        <>
            {
                [<svg key="Mini Account" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 383.723 214.5">
                    <defs>
                        <linearGradient id="linear-gradient-Mini" x1="0.5" y1="1.109" x2="0.5" gradientUnits="objectBoundingBox">
                            <stop offset="0" stopColor="#fff" stopOpacity="0" />
                            <stop offset="0.468" stopColor="#88a0cc" />
                            <stop offset="1" stopColor="#88a0cc" />
                        </linearGradient>
                    </defs>
                    <g id="mini" transform="translate(-434.473 -3480.5)">
                        <g id="Group_244" data-name="Group 244" transform="translate(860.609 3388.605)">
                            <path id="Path_862" data-name="Path 862" d="M-402.848,301.64s279.623-73.07,349.678-168.58V301.64Z" transform="translate(-7.601 -7.601)" opacity="0.695" fill="url(#linear-gradient-Mini)" />
                            <path id="Path_863" data-name="Path 863" d="M-396.914,301.64s279.623-73.07,349.678-168.58" transform="translate(-10.113 -7.601)" fill="none" stroke="#88a0cc" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
                            <circle id="Ellipse_36" data-name="Ellipse 36" cx="10.356" cy="10.356" r="10.356" transform="translate(-420.805 283.682)" fill="#fff" stroke="#88a0cc" strokeWidth="4" />
                            <circle id="Ellipse_37" data-name="Ellipse 37" cx="10.356" cy="10.356" r="10.356" transform="translate(-245.966 224.421)" fill="#fff" stroke="#88a0cc" strokeWidth="4" />
                            <circle id="Ellipse_38" data-name="Ellipse 38" cx="10.356" cy="10.356" r="10.356" transform="translate(-71.127 118.103)" fill="#fff" stroke="#88a0cc" strokeWidth="4" />
                        </g>
                        <g id="Upgrade" transform="translate(12 -2.793)">
                            <path id="Union_1" data-name="Union 1" d="M11654,38a19,19,0,1,1,0-38h84a19.008,19.008,0,0,1,18.209,13.561L11766,19l-9.791,5.44A19.007,19.007,0,0,1,11738,38Z" transform="translate(-11166 3608)" fill="#fd4343" />
                        </g>
                        <text id="Mini-2" data-name="Mini" transform="translate(434.473 3657.208)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Mini')}</tspan></text>
                        <text id="Standard" transform="translate(597.5 3596.854)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium," fontWeight="500"><tspan x="0" y="0">{t('Standard')}</tspan></text>
                        <text id="Senior" transform="translate(777.195 3494.5)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Senior')}</tspan></text>
                        <text id="Upgrade-2" data-name="Upgrade" transform="translate(506 3630.061)" fill="#fff" fontSize="18" fontFamily="Exo2-Bold" fontWeight="700"><tspan x="0" y="0">{t('Upgrade')}</tspan></text>
                    </g>
                </svg>,
                <svg key="Standard Account" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 384.1 214.5">
                    <defs>
                        <linearGradient id="linear-gradient-Standard" x1="0.5" y1="1.109" x2="0.5" gradientUnits="objectBoundingBox">
                            <stop offset="0" stopColor="#fff" stopOpacity="0" />
                            <stop offset="0.468" stopColor="#d19393" />
                            <stop offset="1" stopColor="#d19393" />
                            <stop offset="1" stopColor="#88a0cc" />
                        </linearGradient>
                    </defs>
                    <g id="standard" transform="translate(-434.139 -3480.5)">
                        <g id="Group_244" data-name="Group 244" transform="translate(860.609 3388.605)">
                            <path id="Path_862" data-name="Path 862" d="M-402.848,301.64s279.623-73.07,349.678-168.58V301.64Z" transform="translate(-7.601 -7.601)" opacity="0.695" fill="url(#linear-gradient-Standard)" />
                            <path id="Path_863" data-name="Path 863" d="M-396.914,301.64s279.623-73.07,349.678-168.58" transform="translate(-10.113 -7.601)" fill="none" stroke="#d19393" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
                            <circle id="Ellipse_36" data-name="Ellipse 36" cx="10.356" cy="10.356" r="10.356" transform="translate(-420.805 283.682)" fill="#fff" stroke="#d19393" strokeWidth="4" />
                            <circle id="Ellipse_37" data-name="Ellipse 37" cx="10.356" cy="10.356" r="10.356" transform="translate(-245.966 224.421)" fill="#fff" stroke="#d19393" strokeWidth="4" />
                            <circle id="Ellipse_38" data-name="Ellipse 38" cx="10.356" cy="10.356" r="10.356" transform="translate(-71.127 118.103)" fill="#fff" stroke="#d19393" strokeWidth="4" />
                        </g>
                        <g id="Upgrade" transform="translate(186 -108.793)">
                            <path id="Union_1" data-name="Union 1" d="M11654,38a19,19,0,1,1,0-38h84a19.008,19.008,0,0,1,18.209,13.561L11766,19l-9.791,5.44A19.007,19.007,0,0,1,11738,38Z" transform="translate(-11166 3608)" fill="#fd4343" />
                        </g>
                        <text id="Mini" transform="translate(434.139 3657.208)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Mini')}</tspan></text>
                        <text id="Standard-2" data-name="Standard" transform="translate(597.355 3596.854)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Standard')}</tspan></text>
                        <text id="Senior" transform="translate(777.238 3494.5)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Senior')}</tspan></text>
                        <text id="Upgrade-2" data-name="Upgrade" transform="translate(679.753 3522.708)" fill="#fff" fontSize="18" fontFamily="Exo2-Bold" fontWeight="700"><tspan x="0" y="0">{t('Upgrade')}</tspan></text>
                    </g>
                </svg>,
                <svg key="Senior Account" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 383 214.5">
                    <defs>
                        <linearGradient id="linear-gradient" x1="0.5" y1="1.109" x2="0.5" gradientUnits="objectBoundingBox">
                            <stop offset="0" stopColor="#fff" stopOpacity="0" />
                            <stop offset="0.468" stopColor="#83bf4b" />
                            <stop offset="1" stopColor="#83bf4b" />
                            <stop offset="1" stopColor="#88a0cc" />
                        </linearGradient>
                    </defs>
                    <g id="senior" transform="translate(-435.139 -3480.5)">
                        <g id="Group_244" data-name="Group 244" transform="translate(860.609 3388.605)">
                            <path id="Path_862" data-name="Path 862" d="M-402.848,301.64s279.623-73.07,349.678-168.58V301.64Z" transform="translate(-7.601 -7.601)" opacity="0.695" fill="url(#linear-gradient)" />
                            <path id="Path_863" data-name="Path 863" d="M-396.914,301.64s279.623-73.07,349.678-168.58" transform="translate(-10.113 -7.601)" fill="none" stroke="#83bf4b" strokeLinecap="round" strokeLinejoin="round" strokeWidth="7" />
                            <circle id="Ellipse_36" data-name="Ellipse 36" cx="10.356" cy="10.356" r="10.356" transform="translate(-420.805 283.682)" fill="#fff" stroke="#83bf4b" strokeWidth="4" />
                            <circle id="Ellipse_37" data-name="Ellipse 37" cx="10.356" cy="10.356" r="10.356" transform="translate(-245.966 224.421)" fill="#fff" stroke="#83bf4b" strokeWidth="4" />
                            <circle id="Ellipse_38" data-name="Ellipse 38" cx="10.356" cy="10.356" r="10.356" transform="translate(-71.127 118.103)" fill="#fff" stroke="#83bf4b" strokeWidth="4" />
                        </g>
                        <g id="Upgrade" transform="translate(12 -2.793)">
                            <path id="Union_1" data-name="Union 1" d="M11654,38a19,19,0,1,1,0-38h84a19.008,19.008,0,0,1,18.209,13.561L11766,19l-9.791,5.44A19.007,19.007,0,0,1,11738,38Z" transform="translate(-11166 3608)" fill="#fd4343" />
                        </g>
                        <text id="Mini" transform="translate(435.139 3657.208)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Mini')}</tspan></text>
                        <text id="Standard" transform="translate(597.803 3596.854)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Standard')}</tspan></text>
                        <text id="Senior-2" data-name="Senior" transform="translate(777.139 3494.5)" fill="#858585" fontSize="14" fontFamily="Exo2-Medium" fontWeight="500"><tspan x="0" y="0">{t('Senior')}</tspan></text>
                        <text id="Upgrade-2" data-name="Upgrade" transform="translate(506.5 3630.061)" fill="#fff" fontSize="18" fontFamily="Exo2-Bold" fontWeight="700"><tspan x="0" y="0">{t('Upgrade')}</tspan></text>
                    </g>
                </svg>].filter(t => t.key === tab)}
        </>
    )
}

const ReadyToTrade = () => {
    const { t } = useTranslation()
    return (
        <section className="container-fluid">
            <div className="container py-5">
                <div className="row justify-content-center align-items-center text-center">
                    <div className="col col-12 col-lg-6">
                        <h2 className="fw-bold text-dark text-center">{t("Ready to Trade?")}</h2>
                        <p className="card-text text-secondary">{t("Trade with Smaller amount, open account in less than ONE minute")}</p>
                        <div className="d-flex flex-wrap justify-content-center">
                            <button onClick={() => RedirectToDemoAccount()} className="btn btn-outline-warning m-2">{t('Open Demo Account')}</button>
                            <button onClick={() => RedirectToRealAccount()} className="btn btn-warning text-white m-2">{t('Open Real Account')}</button>
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
                subtitles={["Invest your wealth in a wide-range of trading product.", "Join the world leading HXFX Global today and trade the most popular products eith ultra-low spreads."]}
                buttons={[{ color: 'btn-warning', text: "Create Account", callback: RedirectToRealAccount }]} />

            <BannerOverlay />
            <WhyChoose />

            <AccountType />
            <AccountTabs />

            <ReadyToTrade />
        </>
    )
}

export default AccountTypes
