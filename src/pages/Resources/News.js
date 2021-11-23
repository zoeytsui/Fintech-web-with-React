import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import TopBanner from 'components/TopBanner'

import news_topbanner from 'assets/images/resources/news_topbanner.jpg'

const Index = () => {
    const { t } = useTranslation();
    const [adList, setAdList] = React.useState([])
    const params = React.useRef()

    React.useEffect(() => {
        try {
            switch (i18n.language) {
                case 'vi':
                    params.current = { companyId: "23", utmTerminal: 'app', url: "news-vn" }
                    break;
                // no ms data
                case 'ms':
                    params.current = { companyId: "23", utmTerminal: 'app', url: "news-en" }
                    break;
                case 'cn':
                    params.current = { companyId: "23", utmTerminal: 'app', url: "news-cn" }
                    break;
                case 'en':
                    params.current = { companyId: "23", utmTerminal: 'app', url: "news-en" }
                    break;

                default:
                    params.current = { companyId: "23", utmTerminal: 'app', url: "news-en" }
                    break;
            }
            const getList = async () => {
                const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.getList`, { params: { ...params.current } })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setAdList(result.data.list)
            }
            getList()
        } catch (error) { }
        // eslint-disable-next-line
    }, [i18n.language])
    return (
        <section className="container d-flex flex-wrap justify-content-center col-9 py-4">
            {adList.map((list, index) =>
                // index === 0
                //     ? <div className="card row mb-3 shadow-sm" style={{ borderRadius: '20px' }} key={list.title}>
                //         <div className="row g-0">
                //             <div className="col-md-4">
                //                 <img src={list.cover_img} className="img-fluid rounded" alt={list.title} />
                //             </div>
                //             <div className="col-md-8">
                //                 <div className="card-body">
                //                     <h5 className="card-title">{t(list.title)}</h5>
                //                     <p className="card-text">{t(list.remark)}</p>
                //                     <p className="card-text text-secondary"><small><i>{t(list.release_time)}</i></small></p>
                //                     <Link to={(location) => `${location.pathname}/${list.id}`} className="btn btn-link">{t('View detail')}</Link>
                //                 </div>
                //             </div>
                //         </div>
                //     </div>
                //     : 
                <div className="card col-12 col-lg-3 m-2 shadow-sm" style={{ borderRadius: '20px' }} key={list.title}>
                    <img src={list.cover_img} className="card-img-top" style={{ borderRadius: '20px 20px 0 0' }} alt={list.title} />
                    <div className="card-body">
                        <h5 className="card-title">{t(list.title)}</h5>
                        <p className="card-text">{t(list.remark)}</p>
                        <p className="card-text text-secondary"><small><i>{t(list.release_time)}</i></small></p>
                        {/* <div className="d-flex justify-content-center"> */}
                        <Link to={(location) => `${location.pathname}/${list.id}`} className="btn btn-link">{t('View detail')}</Link>
                        {/* </div> */}
                    </div>
                </div>
            )}
        </section>
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
                case 'vi':
                    params.current = { companyId: "23", languageName: '越南文', id: id }
                    break;
                case 'ms':
                    params.current = { companyId: "23", languageName: '马来文', id: id }
                    break;
                case 'cn':
                    params.current = { companyId: "23", languageName: '中文', id: id }
                    break;
                case 'en':
                    params.current = { companyId: "23", languageName: '英文', id: id }
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
        <section className="px-5 mx-auto col-9">
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
    const { t } = useTranslation();
    const now = new Intl.DateTimeFormat(i18n.language).format(new Date()).replaceAll('/', '-')
    const release_time = new Intl.DateTimeFormat('zh').format(new Date()).replaceAll('/', '-')
    // eslint-disable-next-line
    const [FinanceData, setFinanceData] = React.useState([])

    // for ch
    const getFinanceData = async (params) => {
        const result = await (await TOP_OPENAPI.get(`/tools/?service=news.getFinanceData`, { params: params })).data
        if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
        console.log('getFinanceData', result.data.list);
        // setFinanceData(result.data.list.financeEvent)
    }

    // for en, vi
    const getMultFinanceData = async (params) => {
        const result = await (await TOP_OPENAPI.get(`/tools/?service=news.getMultFinanceData`, { params: params })).data
        if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
        console.log('getMultFinanceData', result.data.list);
        // setFinanceData(result.data.list.financeEvent)
    }

    React.useEffect(() => {
        try {
            switch (i18n.language) {
                case 'vi':
                    getMultFinanceData({
                        release_time: release_time,
                        language: 'vi'
                    })
                    break;
                case 'ms':
                    // no ms data
                    getMultFinanceData({
                        release_time: release_time,
                        language: 'en'
                    })
                    break;
                case 'cn':
                    getFinanceData({
                        release_time: release_time,
                        source: 'jin10'
                    })
                    break;
                case 'en':
                    getMultFinanceData({
                        release_time: release_time,
                        language: 'en'
                    })
                    break;

                default:
                    getMultFinanceData({
                        release_time: release_time,
                        language: 'en'
                    })
                    break;
            }
        } catch (error) { }
        // eslint-disable-next-line
    }, [i18n.language])

    return (
        <section className="container p-3" style={{ background: '#F5F5F5' }}>
            <div className="d-flex align-items-center justify-content-between">
                <h3>{t('Event Calendar')}</h3>
                <p className="text-secondary"><small>{now}</small></p>
            </div>
            {FinanceData.map(list => (
                <div key={list.name}>
                    {list}
                </div>
            ))}
        </section>
    )
}

const News = () => {
    return (
        <>
            <TopBanner
                background={news_topbanner}
                titles={["Low Cost | High Reward"]}
                subtitles={["Start your trading journey"]} />

            <div className="d-flex col-11 my-4">
                <Router basename={'/Resources'}>
                    <Switch>
                        <Route exact path="/News">
                            <Index />
                        </Route>
                        <Route exact path="/News/:id">
                            <Detail />
                        </Route>
                    </Switch>
                </Router>

                {/* TODO: upated data */}
                <EventCalendar />
            </div>
        </>
    )
}

export default News
