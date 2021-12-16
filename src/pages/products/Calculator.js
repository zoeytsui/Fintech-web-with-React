import React from 'react'
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';

import TopBanner from 'components/TopBanner'
import MightBeInterested from 'components/MightBeInterested'

import calculatetopbanner from 'assets/images/products/calculatetopbanner.jpg'

import json from 'assets/calculator.json'

const useStyles = makeStyles({
    calculateCard: {
        boxShadow: '0px 3px 6px #00000029',
        borderRadius: '20px',
        border: 0,
        // position: 'absolute',
        // top: '60%'
        "& ul": {
            "& .nav-link": {
                background: '#FADEC5',
                border: '1px solid #FADEC5',
                color: '#344538 !important'
            },
            "& .active": {
                background: '#FD841A',
                border: '1px solid #FD841A',
                color: '#fff !important'
            }
        }
    }
})


const Calculator = () => {
    const classes = useStyles();
    const { t } = useTranslation();
    const [tradingType, setTradingType] = React.useState('商品');
    const [depositType, setDepositType] = React.useState('XAUUSD');
    const [profitType, setProfitType] = React.useState('買入');
    const [interestType, setInterestType] = React.useState('商品');
    const [result, setResult] = React.useState(0)

    console.log(json);

    const getResult = () => {
        let obj = json['點值計算器'].find(list => list['交易產品'] === document.getElementById('Point-Value-Trading-Product').value)
        return setResult(obj['合約大小(每手)'] * obj['Point'] * obj['pip/point'])
    }

    return (
        <>
            <TopBanner
                background={calculatetopbanner}
                titles={["Trading Calculate"]} />

            <div className="container col-12 col-lg-9 p-4">
                <div className={`${classes.calculateCard} card p-4`}>
                    <ul className="nav nav-fill">
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning active" id="Point-Value-tab" data-bs-toggle="tab" data-bs-target="#Point-Value" type="button" role="tab" aria-controls="Point-Value" aria-selected="true">{t('Point Value')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Deposit-tab" data-bs-toggle="tab" data-bs-target="#Deposit" type="button" role="tab" aria-controls="Deposit" aria-selected="true">{t('Deposit')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Profit-tab" data-bs-toggle="tab" data-bs-target="#Profit" type="button" role="tab" aria-controls="Profit" aria-selected="true">{t('Profit')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Interest-tab" data-bs-toggle="tab" data-bs-target="#Interest" type="button" role="tab" aria-controls="Interest" aria-selected="true">{t('Interest')}</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">

                        {/* Point Value */}
                        <div className="tab-pane fade show active" id="Point-Value" role="tabpanel" aria-labelledby="Point-Value-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Point-Value-Trading-Type">{t('Trading Type')}</label>
                                    <select className="form-select" aria-label="Point-Value-Trading-Type" id="Point-Value-Trading-Type" onChange={(e) => setTradingType(e.target.value)}>
                                        {Array.from(new Set(json['點值計算器'].map(list => list['交易類別']))).map(list =>
                                            <option key={list} value={t(list)}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Point-Value-Trading-Product">{t('Trading Product')}</label>
                                    <select className="form-select" aria-label="Point-Value-Trading-Product" id="Point-Value-Trading-Product">
                                        {json['點值計算器'].filter(list => list['交易類別'] === tradingType).map(list =>
                                            <option key={list['交易產品']} value={t(list['交易產品'])}>{list['交易產品']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Point-Value-Trading-Amount">{t('Trading Amount')}</label>
                                    <input type="number" id="Point-Value-Trading-Amount" className="form-control" placeholder="0.01" min="0.01" max="100"></input>
                                    <div id="AmountHelp" className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult()}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Point Value">{t('Point Value')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Deposit */}
                        <div className="tab-pane fade" id="Deposit" role="tabpanel" aria-labelledby="Deposit-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="產品">{t('產品')}</label>
                                    <select className="form-select" aria-label="產品" id="產品" onChange={(e) => setDepositType(e.target.value)}>
                                        {Array.from(new Set(json['保證金計算器'].map(list => list['產品']))).map(list =>
                                            <option key={list} value={t(list)}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="層數">{t('層數')}</label>
                                    <select className="form-select" aria-label="層數" id="層數">
                                        {json['保證金計算器'].filter(list => list['產品'] === depositType).map(list =>
                                            <option key={list['層數']} value={t(list['層數'])}>{list['層數']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Trading Amount">{t('Trading Amount')}</label>
                                    <input type="number" id="Trading Amount" className="form-control" placeholder="0.01" min="0.01" max="100"></input>
                                    <div id="AmountHelp" className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult()}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Point Value">{t('所需保證金')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Profit */}
                        <div className="tab-pane fade" id="Profit" role="tabpanel" aria-labelledby="Profit-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="交易類別">{t('交易類別')}</label>
                                    <select className="form-select" aria-label="交易類別" id="交易類別" onChange={(e) => setProfitType(e.target.value)}>
                                        {Array.from(new Set(json['盈虧計算'].map(list => list['交易類別']))).map(list =>
                                            <option key={list} value={t(list)}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="交易方向">{t('交易方向')}</label>
                                    <select className="form-select" aria-label="交易方向" id="交易方向">
                                        {json['盈虧計算'].filter(list => list['產品'] === profitType).map(list =>
                                            <option key={list['層數']} value={t(list['層數'])}>{list['層數']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Trading Amount">{t('Trading Amount')}</label>
                                    <input type="number" id="Trading Amount" className="form-control" placeholder="0.01" min="0.01" max="100"></input>
                                    <div id="AmountHelp" className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult()}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Point Value">{t('Point Value')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Interest */}
                        <div className="tab-pane fade" id="Interest" role="tabpanel" aria-labelledby="Interest-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="交易類別">{t('交易類別')}</label>
                                    <select className="form-select" aria-label="交易類別" id="交易類別" onChange={(e) => setInterestType(e.target.value)}>
                                        {Array.from(new Set(json['過夜利息計算器'].map(list => list['交易類別']))).map(list =>
                                            <option key={list} value={t(list)}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="交易產品">{t('交易產品')}</label>
                                    <select className="form-select" aria-label="交易產品" id="交易產品">
                                        {json['過夜利息計算器'].filter(list => list['交易類別'] === interestType).map(list =>
                                            <option key={list['交易產品']} value={t(list['交易產品'])}>{list['交易產品']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Trading Amount">{t('Trading Amount')}</label>
                                    <input type="number" id="Trading Amount" className="form-control" placeholder="0.01" min="0.01" max="100"></input>
                                    <div id="AmountHelp" className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult()}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Point Value">{t('Point Value')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <MightBeInterested />
        </>
    )
}

export default Calculator
