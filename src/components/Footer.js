import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";
import hxfxglobal_logo from '../assets/images/hxfxglobal_logo.png';

import applestore from 'assets/images/applestore.png'
import googleplay from 'assets/images/googleplay.png'
import email from 'assets/images/footer/email.svg'
import tel from 'assets/images/footer/tel.svg'
import qrcode_hxfx from 'assets/images/footer/qrcode_hxfx.png'
import qrcode_whatsapp from 'assets/images/footer/qrcode_whatsapp.png'

import FB from 'assets/images/footer/FB.png'
import IG from 'assets/images/footer/IG.png'
import twitter from 'assets/images/footer/twitter.png'
import youtube from 'assets/images/footer/youtube.png'

const useStyles = makeStyles({
    aLink: {
        color: '#858585',
        textDecoration: 'none',
        "&:hover": { color: '#83BE4B' },
    }
})

const navList = [
    { item: 'About Us', link: '/About-us' },
    { item: 'Platforms', link: '/Platforms' },
    {
        item: 'Products',
        link: [
            { item: 'Forex', link: '/Products/Forex' },
            { item: 'Commodities', link: '/Products/Commodities' },
            { item: 'Indices', link: '/Products/Indices' },
            { item: 'Calculator', link: '/Products/Calculator' }
        ]
    },
    {
        item: 'Accounts',
        link: [
            { item: 'Account Types', link: '/Accounts/Account-Types' },
            { item: 'Promotions', link: '/Accounts/Promotions' },
        ]
    },
    {
        item: 'Resources',
        link: [
            { item: 'Announcement', link: '/Resources/Announcement' },
            { item: 'News', link: '/Resources/News' },
            { item: 'Calendar', link: '/Resources/Calendar' },
            { item: 'Strategy', link: '/Resources/Strategy' },
        ]
    },
    { item: 'Help', link: '/Help' }
]

export default function Footer() {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <section id="footer" style={{ background: '#2E2E2E' }}>
            <div className="container text-secondary p-4">
                {/* nav list */}
                <div className="container row">
                    {navList.map(li =>
                        !Array.isArray(li.link)
                            ? <div className="col" key={li.item}>
                                <a className={classes.aLink} href={li.link} id={li.item}>{t(li.item)}</a>
                            </div>
                            : <div className="col" key={li.item}>
                                <a className={classes.aLink} href='/' id={li.item}>
                                    {t(li.item)}
                                </a>
                                <div className='row flex-column my-2' aria-labelledby={li.item}>
                                    {li.link.map(drop_li =>
                                        <div className="col" key={drop_li.item}>
                                            <small>
                                                <a className={classes.aLink} href={drop_li.link}>
                                                    {t(drop_li.item)}
                                                </a>
                                            </small>
                                        </div>
                                    )}
                                </div>
                            </div>
                    )}
                </div>

                <hr />

                {/* Contact Us */}
                <div className="container">
                    <h6 className="my-4">{t('Contact Us')}</h6>

                    <div className="d-flex align-items-center">
                        <img className="mx-2" src={email} width="20px" height="16px" alt=''></img>
                        <address className="m-0">{t('Email:cs@hxfxglobal.com')}</address>
                    </div>

                    <div className="row flex-wrap">
                        <div className="col col-12 col-lg-4 col-md-8 my-4">
                            <div className="d-flex align-items-center">
                                <img className="mx-2" src={tel} width="18px" height="18px" alt=''></img>
                                <p className="m-1">{t('Vietnam')}</p>
                            </div>
                            <ul className="m-1" style={{ listStyle: 'none' }}>
                                <li>120852310 (VNPT Network) </li>
                                <li>12280875 (Viettel network) (No need to add 0) </li>
                                <li>02844581687 (Vinaphone, Mobilephone, Viettel) </li>
                                <li>+84-2844582358 (Fees required)</li>
                            </ul>
                        </div>

                        <div className="col col-12 col-lg-2 col-md-4 my-4">
                            <p className="m-1">{t('Zalo')}</p>
                            <p className="m-1"><small>{`(${t('Vietnam')})`}</small></p>
                            <img className="mx-2" src={qrcode_hxfx} width="110px" height="110px" alt=''></img>
                        </div>

                        <div className="col col-12 col-lg-4 col-md-8 my-4">
                            <div className="d-flex align-items-center">
                                <img className="mx-2" src={tel} width="18px" height="18px" alt=''></img>
                                <p className="m-1">{t('Malaysia')}</p>
                            </div>
                            <ul className="m-1" style={{ listStyle: 'none' }}>
                                <li>1800819320</li>
                                <li>Phone position closing hotline</li>
                                <li>MA：+60-1800819625 (Fees required) </li>
                                <li>Whatsapp: 1800819320</li>
                            </ul>
                        </div>

                        <div className="col col-12 col-lg-2 col-md-4 my-4">
                            <p className="m-1">{t('Whatsapp')}</p>
                            <p className="m-1"><small>{`(${t('Malaysia')})`}</small></p>
                            <img className="mx-2" src={qrcode_whatsapp} width="110px" height="110px" alt=''></img>
                        </div>
                    </div>
                </div>

                <hr />

                {/* media */}
                <div className="container d-flex flex-wrap justify-content-between align-items-center">
                    <h6 className="my-2">{t('Download the FX Trade app')}</h6>
                    <div className="my-2">
                        <a className="qrcode-hxfx" href="https://soft.hxfxglobal.com/MT4/HXFXTrade.apk" target="_blank" rel="noreferrer">
                            <img className="m-1" src={googleplay} width="193px" alt='googleplay' />
                        </a>
                        <a className="qrcode-hxfx" href="https://apps.apple.com/vn/app/id1474767285" target="_blank" rel="noreferrer">
                            <img className="m-1" src={applestore} width="193px" alt='applestore' />
                        </a>
                    </div>
                    <div className="my-2">
                        <a href="https://www.facebook.com/HXFXGlobal/" target="_blank" rel="noreferrer">
                            <img className="mx-1" src={FB} width="36px" height="36px" alt='facebook' />
                        </a>
                        <a href="https://www.instagram.com/hxfx_global/" target="_blank" rel="noreferrer">
                            <img className="mx-1" src={IG} width="36px" height="36px" alt='instagram' />
                        </a>
                        <a href="https://twitter.com/HXFXGlobal" target="_blank" rel="noreferrer">
                            <img className="mx-1" src={twitter} width="36px" height="36px" alt='twitter' />
                        </a>
                        <a href="https://www.youtube.com/channel/UCCZWef37yrZH1piNGEWuMww?view_as=subscriber" target="_blank" rel="noreferrer">
                            <img className="mx-1" src={youtube} width="36px" height="36px" alt='youtube' />
                        </a>
                    </div>
                    <img className="my-2" src={hxfxglobal_logo} width="151px" height="32px" style={{ filter: 'contrast(0)' }} alt='www.hxfxglobal.com' />
                </div>

                <hr />

                {/* copyright */}
                <div className="container d-flex justify-content-between">
                    <p><small>{t('COPYRIGHT © 2020 www.hxfxglobal.com')}</small></p>
                </div>
            </div>
        </section>
    )
}