import React from 'react'
import Axios from 'axios';
import i18n from "i18next";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';

import TopBanner from 'components/TopBanner'

import strategy_topbanner from 'assets/images/resources/strategy_topbanner.png'

const Strategy = () => {
    const { t } = useTranslation();
    const [adList, setAdList] = React.useState([])
    const params = React.useRef({})

    const styled = {
        card: {
            borderRadius: '20px'
        }
    }
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
                // const result = await (await Axios.get(`/topapi/hx/?service=Advisory.getList`, { params: { ...params.current } })).data
                // const result = await (await Axios.post(`${process.env.REACT_APP_TOP_OPENAPI_HOST}/hx/?service=Advisory.getList`, { ...params })).data
                const result = await fetch(`/topapi/hx/?service=Advisory.getList&companyId=23&languageName=英文&utmTerminal=all&url=tips-en`, {
                    // const result = await fetch(`/${process.env.REACT_APP_TOP_OPENAPI_HOST}/hx/?service=Advisory.getList&companyId=23&languageName=英文&utmTerminal=all&url=tips-en`, {
                    method: 'GET',
                    headers: {
                        'Content-type': 'application/json',
                    },
                    mode: 'cors',
                })
                const data = (await result.json()).data.list
                console.log(data);
                // if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                // setAdList(result.data.list)
            }
            getList()
        } catch (error) { }
        // eslint-disable-next-line
    }, [i18n.language])
    return (
        <>
            <TopBanner
                background={strategy_topbanner}
                titles={["Strategy"]}
                subtitles={["Get first-hand information about the global market"]} />

            <section className="container-fluid" style={{ backgroundColor: '#F1F1F1' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    {adList.map(list =>
                        <div className={`card border-0 shadow m-4 p-3 col-12 col-lg-3 col-md-5`} style={styled.card} key={list.adv_id}>
                            <div className="card-body py-0">
                                <h5 className="card-title text-dark">{t(list.product)}</h5>
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
                                    <Link to={(location) => `${location.pathname}/${list.adv_id}`} className="btn btn-outline-primary">{t('Details')}</Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

const StrategyDetails = (props) => {
    console.log('product', props);
    return (
        <h1>StrategyDetails</h1>
    )
}

const Resources = (props) => {
    console.log('props', props);
    return (
        <>
            <Router basename={'/Resources'}>
                <Switch>
                    <Route exact path="/News">
                        {/* <News /> */}
                    </Route>
                    <Route exact path="/Blog">
                        {/* <Blog /> */}
                    </Route>
                    <Route exact path="/Strategy">
                        <Strategy />
                    </Route>
                    <Route exact path="/Strategy/:product">
                        <StrategyDetails props={props} />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default Resources
