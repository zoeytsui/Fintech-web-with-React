import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { makeStyles } from '@mui/styles';
import { BrowserRouter as Router, Route, Switch, Link, useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import TopBanner from 'components/TopBanner'

import strategy_topbanner from 'assets/images/resources/strategy_topbanner.png'

const useStyles = makeStyles({
    detailContent: {
        "& img": {
            width: '100%'
        }
    },
    filterList_product: {
        "& ul": {
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            paddingLeft: 0,
            "& li .active, li button:hover": {
                borderRadius: '20px'
            }
        }
    },
    filterList_general: {
        "& li .active, li button:hover": {
            borderRadius: '20px'
        }
    }
})

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
    const styled = useStyles()
    const { t } = useTranslation();
    const [adList, setAdList] = React.useState([])
    const [pagination, setPagination] = React.useState(null)
    const [products, setProducts] = React.useState([])

    const toggleButton = (id) => {
        let element = document.getElementById(id)
        element.className.includes('show') ? element.classList.remove('show') : element.classList.add('show')
    }

    const updateProducts = (e, product) => {
        if (products.includes(product)) return;
        e.target.classList.add('active')
        setProducts([...products, ...[product]])
    }

    const clearFilters = () => {
        setProducts([])
        Array.from(document.getElementById('Product').getElementsByClassName('active')).map(ele => ele.classList.remove('active'));
    }

    const filterList = {
        productList: [{
            Forex:
                ['AUDCAD', 'AUDJPY', 'AUDUSD', 'AUDCHF', 'AUDNZD', 'CADCHF', 'CADJPY', 'EURAUD', 'EURCAD', 'EURCHF', 'EURGBL', 'EURJPY', 'EURNZD', 'EURUSD', 'GBPAUD', 'GBPCAD', 'GBPCHF', 'GBPJPY', 'GBPNZD', 'GBPUSD', 'NZDCAD', 'NZDCHF', 'NZDJPY', 'NZDUSD', 'USDCAD', 'USDCHF', 'USDJPY'],
            Index:
                ['CHINA300', 'DJ30', 'FRA40', 'GER30', 'HK50', 'JPN225', 'SP500', 'TECH100', 'UK100', 'USDINDEX'],
            Commodity:
                ['NGAS', 'UKOil', 'USOil', 'XAGUSD', 'XAUUSD'],
            Reference:
                ['CLWTI', 'USDCNH', 'USDHKD'],
        }]
    }

    const getList = async (params) => {
        try {
            params = {
                ...params,
                companyId: '23',
                utmTerminal: 'all',
                page: params !== undefined ? params.page : 1,
                pageSize: 9
            }
            switch (i18n.language) {
                case 'vn':
                    params = { ...params, languageName: '越南文', url: "tips-vn" }
                    break;
                case 'my':
                    params = { ...params, languageName: '马来文', url: "tips-my" }
                    break;
                case 'ch':
                    params = { ...params, languageName: '中文', url: "tips-cn" }
                    break;

                default:
                    params = { ...params, languageName: '英文', url: "tips-en" }
                    break;
            }
            const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.getList`, { params: { ...params } })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setPagination(result.data.count)
            setAdList(result.data.list)
        } catch (error) { }
    }

    React.useEffect(() => {
        getList()
        // eslint-disable-next-line
    }, [i18n.language])
    return (
        <React.Fragment>
            <TopBanner
                background={strategy_topbanner}
                titles={["Strategy"]}
                subtitles={["Get first-hand information about the global market"]} />

            {/* Filter Navigation */}
            <ul className="nav justify-content-evenly py-2">

                {/* Product */}
                <li className="nav-item">
                    <button className="btn btn-lg link-secondary dropdown-toggle" type="button" onClick={() => toggleButton('Product')}>
                        {t('Product')}
                    </button>
                    <div className="dropdown-menu collapse col-12 col-md-8 col-lg-6 p-0 shadow" aria-labelledby="Product" id="Product">
                        <div className={`p-3 ${styled.filterList_product}`}>
                            {filterList.productList.map((list, index) =>
                                <React.Fragment key={index}>
                                    <p className="text-secondary my-1"><small>{t('Forex')}</small></p>
                                    <ul>
                                        {list.Forex.map(product =>
                                            <li key={product}><button className="dropdown-item" type="button" onClick={(e) => updateProducts(e, product)}>{product}</button></li>
                                        )}
                                    </ul>

                                    <p className="text-secondary my-1"><small>{t('Index')}</small></p>
                                    <ul>
                                        {list.Index.map(product =>
                                            <li key={product}><button className="dropdown-item" type="button" onClick={(e) => updateProducts(e, product)}>{product}</button></li>
                                        )}
                                    </ul>

                                    <p className="text-secondary my-1"><small>{t('Commodity')}</small></p>
                                    <ul>
                                        {list.Commodity.map(product =>
                                            <li key={product}><button className="dropdown-item" type="button" onClick={(e) => updateProducts(e, product)}>{product}</button></li>
                                        )}
                                    </ul>

                                    <p className="text-secondary my-1"><small>{t('Reference')}</small></p>
                                    <ul>
                                        {list.Reference.map(product =>
                                            <li key={product}><button className="dropdown-item" type="button" onClick={(e) => updateProducts(e, product)}>{product}</button></li>
                                        )}
                                    </ul>
                                </React.Fragment>
                            )}
                        </div>

                        <div className="d-flex flex-wrap justify-content-between align-items-center p-4" style={{ background: '#F1F1F1' }}>
                            <div className="text-dark">{t('Selected')} : {products.length}</div>
                            <div>
                                <button className="btn btn-outline-warning mx-3" onClick={() => clearFilters()}>{t('Clear All Filters')}</button>
                                <button className="btn btn-warning" onClick={() => { getList({ product: products.join() }); toggleButton('Product') }}>{t('Apply')}</button>
                            </div>
                        </div>

                    </div>
                </li>

                {/* Direction */}
                <li className={`nav-item ${styled.filterList_general}`}>
                    <button className="btn btn-lg link-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Direction">{t('Direction')}</button>
                    <ul className="dropdown-menu text-center" aria-labelledby="Direction">
                        <li><button className="dropdown-item" onClick={() => getList({ direct: '3' })}>{t('Bullish')}</button></li>
                        <li><button className="dropdown-item" onClick={() => getList({ direct: '2' })}>{t('Bearish')}</button></li>
                        <li><button className="dropdown-item" onClick={() => getList({ direct: '1' })}> {t('No direction')}</button></li>
                    </ul>
                </li >

                {/* Time */}
                <li className={`nav-item ${styled.filterList_general}`}>
                    <button className="btn btn-lg link-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" id="Time">{t('Time')}</button>
                    <ul className="dropdown-menu text-center" aria-labelledby="Time">
                        <li><button className="dropdown-item" onClick={() => getList({ ordertype: 'desc' })}>{t('desc')}</button></li>
                        <li><button className="dropdown-item" onClick={() => getList({ ordertype: 'asc' })}>{t('asc')}</button></li>
                    </ul>
                </li>

                {/* Read */}
                <li className="nav-item">
                    <button className="btn btn-lg link-secondary" onClick={() => getList({ order: 'pviews' })}>{t('Read')}</button>
                </li>
            </ul >

            {/* Strategy List */}
            <section className="container-fluid" style={{ backgroundColor: '#F1F1F1' }}>
                <div className="d-flex flex-wrap justify-content-center">
                    {adList.length > 0
                        ? adList.map(list =>
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
                                            <small>{t(list.pviews)}</small>
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <Link to={(location) => `${location.pathname}/${list.id}`} className="btn btn-outline-primary">{t('Details')}</Link>
                                    </div>
                                </div>
                            </div>
                        )
                        : <h3 className="my-5">{t('No results')}</h3>}
                </div>

                {/* Pagination */}
                <div className="d-flex justify-content-center py-4">
                    <select aria-labelledby="Pagination" name="pagination" id="pagination" onChange={(e) => getList({ page: e.target.value })}>
                        {[...Array(parseInt(pagination / 9))].map((page, index) =>
                            <option key={index} className="pagination-list" value={index + 1}>
                                {index + 1}
                            </option>
                        )}
                    </select>
                    <label className="mx-1" htmlFor="pagination">{t('of ') + parseInt(pagination / 9) + t(' pages')}</label>
                </div>

            </section>
        </React.Fragment >
    )
}

const StrategyDetail = () => {
    let { product } = useParams();
    const styled = useStyles()
    const { t } = useTranslation();
    const contentRef = React.useRef(<div />)
    const [adDetails, setAdDetails] = React.useState([])

    const getDetails = async () => {
        try {
            const params = { companyId: "23", languageName: '英文', id: product, tax: 'related' }

            switch (i18n.language) {
                case 'vn':
                    params.languageName = '越南文'
                    break;
                case 'my':
                    params.languageName = '马来文'
                    break;
                case 'ch':
                    params.languageName = '中文'
                    break;

                default:
                    params.languageName = '英文'
                    break;
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Advisory.details`, { params: { ...params } })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setAdDetails(result.data.detail)
            contentRef.current.innerHTML = result.data.detail.content
        } catch (error) { }
    }

    React.useEffect(() => {
        getDetails()
        // eslint-disable-next-line
    }, [])
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

            <div ref={contentRef} className={styled.detailContent} />
        </section>
    )
}

const Index = () => (
    <Router basename={'/Resources'}>
        <Switch>
            <Route exact path="/Strategy">
                <Strategy />
            </Route>
            <Route exact path="/Strategy/:product">
                <StrategyDetail />
            </Route>
        </Switch>
    </Router>
)

export default Index