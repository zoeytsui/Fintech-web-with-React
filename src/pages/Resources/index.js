import React from 'react'
import { TOP_OPENAPI } from 'api';
import i18n from "i18next";
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import TopBanner from 'components/TopBanner'

import News from './News'

import strategy_topbanner from 'assets/images/resources/strategy_topbanner.png'
// import news_topbanner from 'assets/images/resources/news_topbanner.jpg'

const SetDirect = ({ val }) => {
    const { t } = useTranslation();
    switch (val) {
        case '1':
            return <span className="badge rounded-pill bg-dark">{t('No direction')}</span>
        case '2':
            return <span className="badge rounded-pill" style={{ background: '#F25222' }}>{t('Bearish')}</span>
        case '3':
            return <span className="badge rounded-pill" style={{ background: '#5999E3' }}>{t('Bullish')}</span>
        default:
            return <span className="badge rounded-pill bg-dark">{t('No direction')}</span>
    }
}

const Strategy = () => {
    const { t } = useTranslation();
    const [adList, setAdList] = React.useState([])
    const params = React.useRef()

    React.useEffect(() => {
        try {
            switch (i18n.language) {
                case 'vi':
                    params.current = { companyId: "23", languageName: '越南文', utmTerminal: 'all', url: "tips-vn" }
                    break;
                case 'ms':
                    params.current = { companyId: "23", languageName: '马来文', utmTerminal: 'all', url: "tips-my" }
                    break;
                case 'cn':
                    params.current = { companyId: "23", languageName: '中文', utmTerminal: 'all', url: "tips-cn" }
                    break;
                case 'en':
                    params.current = { companyId: "23", languageName: '英文', utmTerminal: 'all', url: "tips-en" }
                    break;

                default:
                    params.current = { companyId: "23", languageName: '英文', utmTerminal: 'all', url: "tips-en" }
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
        <React.Fragment>
            <TopBanner
                background={strategy_topbanner}
                titles={["Strategy"]}
                subtitles={["Get first-hand information about the global market"]} />

            <section className="container-fluid" style={{ backgroundColor: '#F1F1F1' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    {adList.map(list =>
                        <div className={`card border-0 shadow m-4 p-3 col-12 col-lg-3 col-md-5`} style={{ borderRadius: '20px' }} key={list.adv_id}>
                            <div className="card-body py-0">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h5 className="card-title text-dark">{t(list.product)}</h5>
                                    <SetDirect val={list.direct} />
                                </div>
                                <p className="card-title text-secondary">{t(list.title)}</p>
                                <hr />
                                <div className="d-flex">
                                    <p className="card-subtitle mb-3 text-secondary">
                                        <i className="bi-clock mx-2" style={{ color: '#B2B2B2' }} />
                                        <small>{t(list.release_time)}</small>
                                    </p>
                                    <p className="card-subtitle mx-2 mb-3 text-secondary">
                                        <i className="bi-eye mx-2" style={{ color: '#B2B2B2' }} />
                                        <small>{t(list.pviews_base)}</small>
                                    </p>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <Link to={(location) => `${location.pathname}/${list.id}`} className="btn btn-outline-primary">{t('Details')}</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </React.Fragment>
    )
}

const StrategyDetail = () => {
    let { product } = useParams();
    const { t } = useTranslation();
    const params = React.useRef()
    const contentRef = React.useRef(<div />)
    const [adDetails, setAdDetails] = React.useState([])

    React.useEffect(() => {
        try {
            switch (i18n.language) {
                case 'vi':
                    params.current = { companyId: "23", languageName: '越南文', id: product, tax: 'related' }
                    break;
                case 'ms':
                    params.current = { companyId: "23", languageName: '马来文', id: product, tax: 'related' }
                    break;
                case 'cn':
                    params.current = { companyId: "23", languageName: '中文', id: product, tax: 'related' }
                    break;
                case 'en':
                    params.current = { companyId: "23", languageName: '英文', id: product, tax: 'related' }
                    break;

                default:
                    params.current = { companyId: "23", languageName: '英文', id: product, tax: 'related' }
                    break;
            }
            const details = async () => {
                const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.details`, { params: { ...params.current } })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setAdDetails(result.data.detail)
                contentRef.current.innerHTML = result.data.detail.content
            }
            details()


        } catch (error) { }
        // eslint-disable-next-line
    }, [product, i18n.language])
    return (
        <section className="mx-auto col-9">
            <div className="my-4">
                <Link to='/Strategy' className="link-secondary">
                    <i className="bi bi-chevron-left mx-2" />
                    {t('Back')}
                </Link>
            </div>

            <h2>{adDetails.title}</h2>

            <div className="d-flex align-items-center badge rounded-pill bg-light">
                <h5 className="m-2 card-title text-dark">{adDetails.product}</h5>
                <SetDirect val={adDetails.direct} />
            </div>

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

            <button className="btn btn-warning mb-4">{t('Trade Now')}</button>

            <div ref={contentRef} />
        </section>
    )
}


const Resources = () => {
    return (
        <>
            <Router basename={'/Resources'}>
                <Switch>
                    <Route exact path="/News" component={News} />
                    <Route exact path="/Blog">
                        {/* <Blog /> */}
                    </Route>
                    <Route exact path="/Strategy">
                        <Strategy />
                    </Route>
                    <Route exact path="/Strategy/:product">
                        <StrategyDetail />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default Resources
