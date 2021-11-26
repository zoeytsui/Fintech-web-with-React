import React from "react";
import { Link } from 'react-router-dom';
// import { Link, Switch, Route, Router } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import i18n from 'i18next'
// import cookies from 'js-cookie'
import { makeStyles } from '@mui/styles';

import hxfxglobal_logo from '../assets/images/hxfxglobal_logo.png';
import English_logo from '../assets/images/English.png';
import Malay_logo from '../assets/images/malay.png';
import china_icon from '../assets/images/china_icon.png';
import vn_logo from '../assets/images/VN.png';
// eslint-disable-next-line
import cn_logo from '../assets/images/CN.png';

import Account_Types_icon from '../assets/images/navbar/Account_Types_icon.png';
import Blog_icon from '../assets/images/navbar/Blog_icon.png';
import Calculate_icon from '../assets/images/navbar/Calculate_icon.png';
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
        code: 'ms',
        name: 'Malay',
        src: Malay_logo,
        country_code: 'my'
    },
    {
        code: 'vi',
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
        code: 'cn',
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
            { item: 'Calculate', link: '/Products/Calculate', src: Calculate_icon }
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
            { item: 'News', link: '/Resources/News', src: news_icon },
            { item: 'Blog', link: '/Resources/Blog', src: Blog_icon },
            { item: 'Strategy', link: '/Resources/Strategy', src: Strategy_icon },
        ]
    },
    { item: 'Help', link: '/Help' }
]

export default function NavBar() {
    const { t } = useTranslation();
    const classes = useStyles();


    const redirectLink = (lang) => {
        switch (lang) {
            case 'my':
                lang = 'ms'
                break;

            default:
                lang = 'vn'
                break;
        }
    }

    React.useEffect(() => {
        redirectLink(i18n.language)
        // eslint-disable-next-line
    }, [i18n.language])

    return (
        <React.Fragment>
            {/* <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} /> */}
            {/* <CssBaseline /> */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/">
                        <img className="navbar-brand" src={hxfxglobal_logo} alt="" />
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

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
                                        <Link className="nav-link text-primary" aria-current="page" to={li.link}>{t(li.item)}</Link>
                                    </li>
                            )}
                        </ul>

                        <div className="d-flex">
                            <a className="nav-link text-primary" href="/">{t('Log In')}</a>

                            <Link className="btn btn-warning" to='/' role="button">{t('Create Account')}</Link>
                        </div>

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
                                            {t(`${lang.name}`)}
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