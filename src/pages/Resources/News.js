import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { makeStyles } from '@mui/styles';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import TopBanner from 'components/TopBanner'
import Loading from 'components/Loading'

import news_topbanner from 'assets/images/resources/news_topbanner.jpg'

const useStyles = makeStyles({
    calendarList: {
        "& li:nth-of-type(3n+1) .tag": {
            width: '8px',
            background: '#FEC390'
        },
        "& li:nth-of-type(3n+2) .tag": {
            width: '8px',
            background: '#189efc'
        },
        "& li:nth-of-type(3n+3) .tag": {
            width: '8px',
            background: '#83bf4b'
        }
    }
})

const News = () => {
    const { t } = useTranslation();
    const [newsList, setNewsList] = React.useState([])
    const [pageReducer, setPageReducer] = React.useState(1)
    const [disabled, setDisabled] = React.useState(true)
    const [dataReady, setDataReady] = React.useState(false)

    const getList = async (lang, page) => {
        try {
            const params = {
                companyId: "23",
                utmTerminal: 'app',
                url: "news-en",
                page: page,
                pageSize: 9,
            }

            switch (lang) {
                case 'vn':
                    params.url = "news-vn"
                    break;
                case 'ch':
                    params.url = "news-cn"
                    break;

                default:
                    params.url = "news-en" // no my data
                    break;
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.getList`, { params: { ...params } })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)

            setNewsList(list => [...list, ...result.data.list])
            setDataReady(true)
        }
        catch (error) { }
    }
    React.useEffect(() => {
        getList(i18n.language, pageReducer)
        // eslint-disable-next-line
    }, [i18n.language, pageReducer])

    // clear cache
    React.useEffect(() => {
        setNewsList([])
        // eslint-disable-next-line
    }, [i18n.language])

    // prevent frequent click event
    React.useEffect(() => {
        setDisabled(true)
        setTimeout(() => {
            setDisabled(false)
        }, 2000);
    }, [newsList, pageReducer])

    return (
        <section>
            <div className="container-fluid d-flex flex-wrap justify-content-center align-items-start my-4">
                <div className="col-12 col-lg-9 d-flex flex-column">
                    <div className="d-flex flex-wrap justify-content-center">
                        {dataReady
                            ? newsList.map((list, index) =>
                                <div className="card col-12 col-lg-3 m-2 shadow-sm" style={{ borderRadius: '20px', minWidth: '320px' }} key={list.title}>
                                    <img src={list.cover_img} className="card-img-top" style={{ borderRadius: '20px 20px 0 0' }} alt={list.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{t(list.title)}</h5>
                                        {/* <p className="card-text">{t(list.remark)}</p> */}
                                        <p className="card-text text-secondary"><small><i>{t(list.release_time)}</i></small></p>
                                        <Link to={(location) => `${location.pathname}/${list.id}`} className="btn btn-link">{t('View detail')}</Link>
                                    </div>
                                </div>
                            ) : <Loading />
                        }
                    </div>
                    <button className="btn btn-primary mx-auto my-4" onClick={() => setPageReducer(page => page += 1)} disabled={disabled}> {t('Load More')}</button>

                </div >

                <EventCalendar />
            </div >
        </section >
    )
}

const Detail = () => {
    let { id } = useParams();
    const { t } = useTranslation();
    const params = React.useRef()
    const contentRef = React.useRef(<div />)
    const [adDetails, setAdDetails] = React.useState([])

    React.useEffect(() => {
        try {
            switch (i18n.language) {
                case 'vn':
                    params.current = { companyId: "23", languageName: '越南文', id: id }
                    break;
                case 'my':
                    params.current = { companyId: "23", languageName: '马来文', id: id }
                    break;
                case 'ch':
                    params.current = { companyId: "23", languageName: '中文', id: id }
                    break;
                default:
                    params.current = { companyId: "23", languageName: '英文', id: id }
                    break;
            }

            const details = async () => {
                const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.details`, { params: params.current })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setAdDetails(result.data.detail)
                contentRef.current.innerHTML = result.data.detail.content
            }
            details()


        } catch (error) { }
        // eslint-disable-next-line
    }, [id, i18n.language])
    return (
        <section className="container mx-auto col-12 col-lg-9 ref-img">
            <div className="my-4">
                <Link to='/News' className="link-secondary">
                    <i className="bi bi-chevron-left mx-2" />
                    {t('Back')}
                </Link>
            </div>

            <img src={adDetails.cover_img} alt={adDetails.title} />

            <h2>{adDetails.title}</h2>

            <div className="d-flex mt-4">
                <p className="card-subtitle mb-3 text-secondary">
                    <i className="bi-clock mx-2" style={{ color: '#B2B2B2' }} />
                    <small>{adDetails.release_time}</small>
                </p>
                <p className="card-subtitle mx-2 mb-3 text-secondary">
                    <i className="bi-eye mx-2" style={{ color: '#B2B2B2' }} />
                    <small>{adDetails.pviews_base}</small>
                </p>
            </div>

            <div className="text-secondary" ref={contentRef} />
        </section>
    )
}

const EventCalendar = () => {
    const styled = useStyles();
    const { t } = useTranslation();
    const now = new Intl.DateTimeFormat(i18n.language, { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date()).replaceAll('/', '-')
    const release_time = new Intl.DateTimeFormat('zh', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(new Date()).replaceAll('/', '-')

    const [FinanceData, setFinanceData] = React.useState([])

    // for ch
    const getFinanceData = async (params) => {
        try {
            const result = await (await TOP_OPENAPI.get(`tools/?service=news.getFinanceData`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setFinanceData(result.data.list.financeData)
        } catch (error) { }
    }

    // for en, vi
    const getMultFinanceData = async (params) => {
        try {
            const result = await (await TOP_OPENAPI.get(`tools/?service=news.getMultFinanceData`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setFinanceData(result.data.list.financeData)
        } catch (error) { }
    }

    React.useEffect(() => {
        switch (i18n.language) {
            case 'vn':
                getMultFinanceData({
                    release_time: release_time,
                    language: 'vi'
                })
                break;
            case 'ch':
                getFinanceData({
                    release_time: release_time,
                    source: 'jin10'
                })
                break;

            default:
                // no my data
                getMultFinanceData({
                    release_time: release_time,
                    language: 'en'
                })
                break;
        }
        // eslint-disable-next-line
    }, [i18n.language])

    return (
        <section className="container col-12 col-lg-3 rounded" style={{ background: '#F5F5F5' }}>
            <div className="d-flex flex-column align-items-start justify-content-between">
                <h3>{t('Event Calendar')}</h3>
                <p className="text-secondary"><small>{now}</small></p>
            </div>
            <ul className={`list-unstyled d-flex flex-column ${styled.calendarList}`}>
                {FinanceData.slice(0, 5).map((list, index) =>
                    <li key={index} className="d-flex my-2">
                        <div className="tag"></div>
                        <div className="py-2 w-100 bg-white d-flex align-items-center">
                            <div className="mx-1">
                                {list.time ? list.time : list.ctime.split(' ')[1]}
                            </div>
                            <div className="vr"></div>
                            <div className="mx-1">
                                <h6>{list.name}</h6>
                                <small><i className="text-secondary">{list.country}</i></small>
                            </div>
                        </div>
                    </li>
                )}
            </ul>
            <a href="Calendar" className="btn btn-primary my-4">{t('View detail')}</a>
        </section>
    )
}

const Index = () => {
    return (
        <>
            <TopBanner
                background={news_topbanner}
                titles={["Low Cost | High Reward"]}
                subtitles={["Start your trading journey"]} />

            <Router basename={'/Resources'}>
                <Switch>
                    <Route exact path="/News">
                        <News />
                    </Route>
                    <Route exact path="/News/:id">
                        <Detail />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default Index
