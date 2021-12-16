import React from "react";
import i18n from 'i18next'
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";
import { RedirectToUcenter, RedirectToRealAccount } from 'utilities'

import hxfxglobal_logo from '../assets/images/hxfxglobal_logo.png';
import English_logo from '../assets/images/English.png';
import Malay_logo from '../assets/images/malay.png';
import china_icon from '../assets/images/china_icon.png';
import vn_logo from '../assets/images/VN.png';
// eslint-disable-next-line
import cn_logo from '../assets/images/CN.png';

import Calendar_icon from '../assets/images/navbar/Calendar_icon.png';
import Announcement_icon from '../assets/images/navbar/Announcement_icon.png';
import Calculate_icon from '../assets/images/navbar/Calculate_icon.png';
import Account_Types_icon from '../assets/images/navbar/Account_Types_icon.png';
import Commodities_icon from '../assets/images/navbar/Commodities_icon.png';
import Forex_icon from '../assets/images/navbar/Forex_icon.png';
import Indices_icon from '../assets/images/navbar/Indices_icon.png';
import news_icon from '../assets/images/navbar/news_icon.png';
import Promotions_icon from '../assets/images/navbar/Promotions_icon.png';
import Strategy_icon from '../assets/images/navbar/Strategy_icon.png';

const useStyles = makeStyles({
    langList: {
        "&:focus": { boxShadow: 'none' },
    },
    dropdownList: {
        "& .dropdown-item": {
            "&:hover": { color: '#83BE4B', '& img': { filter: 'none' } },
        }
    },
    dropdownListImg: {
        filter: 'grayscale(1)'
    },
})

const langList = [
    {
        code: 'en',
        name: 'English',
        src: English_logo,
        country_code: 'gb'
    },
    {
        code: 'my',
        name: 'Malay',
        src: Malay_logo,
        country_code: 'my'
    },
    {
        code: 'vn',
        name: 'Tiếng Việt',
        src: vn_logo,
        country_code: 'vn'
    },
    // {
    //     code: 'tw',
    //     name: '繁體中文',
    //     src: tw_logo,
    // country_code: 'tw'
    // },
    {
        code: 'ch',
        name: '简体中文',
        src: china_icon,
        country_code: 'cn'
    },
];

const navList = [
    { item: 'About Us', link: '/About-us' },
    { item: 'Platforms', link: '/Platforms' },
    {
        item: 'Products',
        link: [
            { item: 'Forex', link: '/Products/Forex', src: Forex_icon },
            { item: 'Commodities', link: '/Products/Commodities', src: Commodities_icon },
            { item: 'Indices', link: '/Products/Indices', src: Indices_icon },
            // TODO: not finished
            { item: 'Calculator', link: '/Products/Calculator', src: Calculate_icon }
        ]
    },
    {
        item: 'Accounts',
        link: [
            { item: 'Account Types', link: '/Accounts/Account-Types', src: Account_Types_icon },
            { item: 'Promotions', link: '/Accounts/Promotions', src: Promotions_icon },
        ]
    },
    {
        item: 'Resources',
        link: [
            { item: 'Announcement', link: '/Resources/Announcement', src: Announcement_icon },
            { item: 'News', link: '/Resources/News', src: news_icon },
            { item: 'Calendar', link: '/Resources/Calendar', src: Calendar_icon },
            { item: 'Strategy', link: '/Resources/Strategy', src: Strategy_icon },
        ]
    },
    { item: 'Help', link: '/Help' }
]

export default function NavBar() {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <React.Fragment>
            {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} /> */}
            {/* <CssBaseline /> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a href="/">
                        <img className="navbar-brand" src={hxfxglobal_logo} alt="" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {/* navigation */}
                        <ul className={`navbar-nav me-auto mb-2 mb-lg-0`}>
                            {navList.map(li =>
                                Array.isArray(li.link)
                                    ? <li className={` nav-item dropdown`} key={li.item}>
                                        <a className="nav-link dropdown-toggle text-primary" href="/" id={li.item} data-bs-toggle="dropdown" aria-expanded="false">
                                            {t(li.item)}
                                        </a>
                                        <ul className={`dropdown-menu ${classes.dropdownList}`} aria-labelledby={li.item}>
                                            {li.link.map(drop_li =>
                                                <li key={drop_li.item}>
                                                    <a className="dropdown-item" href={drop_li.link}>
                                                        <img className={`navbar-brand ${classes.dropdownListImg}`} src={drop_li.src} alt={drop_li.item} />
                                                        {t(drop_li.item)}
                                                    </a>
                                                </li>
                                            )}
                                        </ul>
                                    </li>
                                    : <li className={` nav-item`} key={li.item}>
                                        <a className="nav-link text-primary" aria-current="page" href={li.link}>{t(li.item)}</a>
                                    </li>
                            )}
                        </ul>

                        {/* ucenter and new account */}
                        <div className="d-flex">
                            <button className="btn text-primary" onClick={() => RedirectToUcenter()}>{t('Log In')}</button>
                            <button className="btn btn-warning bg-gradient" onClick={() => RedirectToRealAccount()}>{t('Create Account')}</button>
                        </div>

                        {/* switch language */}
                        <div className="dropdown">
                            <button className={`btn dropdown-toggle ${classes.langList}`} id="langList" data-bs-toggle="dropdown" aria-expanded="false">
                                <img className="navbar-brand" src={langList.find(cur => cur.code === i18n.language).src} alt="" />
                                {t(`${langList.find(cur => cur.code === i18n.language).name}`)}
                            </button>

                            <ul className={`dropdown-menu dropdown-menu-lg-end ${classes.dropdownList}`} aria-labelledby="langList">
                                {langList.map((lang) =>
                                    <li key={lang.code}>
                                        <button className="dropdown-item" onClick={() => i18n.changeLanguage(lang.code)}>
                                            <img className="navbar-brand" src={lang.src} alt="" />
                                            {t(lang.name)}
                                        </button>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}