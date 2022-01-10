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
    const [tradingType, setTradingType] = React.useState('Product');
    const [depositType, setDepositType] = React.useState('Product');
    const [profitType, setProfitType] = React.useState('Product');
    const [interestType, setInterestType] = React.useState('Product');
    const [result, setResult] = React.useState(0)

    const getResult = (calculator) => {
        let arr, obj, openPrice, closingPrice, TradeVolume, DaysHolding, OpeningPositionDirection;
        switch (calculator) {
            case 'Swap Calculator':
                obj = json['Swap Calculator'].find(list => list['Product Type'] === document.getElementById('Swap-Product-Type').value)
                openPrice = document.getElementById('Swap-Open-Price').value
                TradeVolume = document.getElementById('Swap-Trade-Volume').value
                DaysHolding = document.getElementById('Swap-Day-s-Holding').value
                OpeningPositionDirection = document.getElementById('Swap-Opening-Position-Direction').value

                if (OpeningPositionDirection === 'Buy') {
                    // 交易手數 * 合約大小(每手) * 開倉價格 * 利息(買入) / 100 / 360 * 持有天數
                    return setResult((TradeVolume * obj['Order Size(Lot)'] * openPrice * obj['Interest(Buy)'] / 100 / 360 * DaysHolding).toFixed(2))
                } else {
                    // 交易手數 * 合約大小(每手) * 開倉價格 * 利息(賣出) / 100 / 360 * 持有天數
                    return setResult((TradeVolume * obj['Order Size(Lot)'] * openPrice * obj['Interest(Sell)'] / 100 / 360 * DaysHolding).toFixed(2))
                }

            case 'Profit Loss Calculator':
                obj = json['Profit Loss Calculator'].find(list => list['Product Type'] === document.getElementById('Profit-Product-Type').value)
                openPrice = document.getElementById('Profit-Open-Price').value
                closingPrice = document.getElementById('Profit-Closing-Price').value
                TradeVolume = document.getElementById('Profit-Trade-Volume').value
                OpeningPositionDirection = document.getElementById('Profit-Opening-Position-Direction').value

                if (OpeningPositionDirection === 'Buy') {
                    // (平倉價-開倉價)*交易手數*合約大小
                    return setResult(((closingPrice - openPrice) * TradeVolume * obj['Order Size(Lot)']).toFixed(2))
                } else {
                    // (開倉價-平倉價)*交易手數*合約大小
                    return setResult(((openPrice - closingPrice) * TradeVolume * obj['Order Size(Lot)']).toFixed(2))
                }

            case 'Margin Calculator':
                arr = json['Margin Calculator'].filter(list => list['Product Type'] === document.getElementById('Margin-Product-Type').value)
                TradeVolume = Number(document.getElementById('Margin-Trade-Volume').value)

                let Hierarchy = arr.filter(list => TradeVolume >= Number(list['Minimum Lot']) && TradeVolume <= Number(list['Maximum Lot']))[0]['Margin Hierarchy']

                switch (Hierarchy) {
                    case "Second Rank":
                        // 第一層手數上限 * 第一層初始保證金 + ( 交易手數 -  第一層手數上限 * 第二層初始保證金)
                        return setResult((arr[0]['Maximum Lot'] * arr[0]['Initial Margin']) + ((TradeVolume - arr[0]['Maximum Lot']) * arr[1]['Initial Margin']))
                    case "Third Rank":
                        // 第一層手數上限 * 第一層初始保證金 + ( ( 第二層手數上限 - 第一層手數上限 ) * 第二層初始保證金) + ( 交易手數 -  第二層手數上限 * 第三層初始保證金)
                        return setResult((arr[0]['Maximum Lot'] * arr[0]['Initial Margin']) + ((arr[1]['Maximum Lot'] - arr[0]['Maximum Lot']) * arr[1]['Initial Margin']) + ((TradeVolume - arr[1]['Maximum Lot']) * arr[2]['Initial Margin']))
                    case "Fourth Rank":
                        // 第一層手數上限 * 第一層初始保證金 + ( ( 第二層手數上限 - 第一層手數上限 ) * 第二層初始保證金) + ( ( 第三層手數上限 - 第二層手數上限 ) * 第三層初始保證金) + ( 交易手數 -  第三層手數上限 * 第四層初始保證金)
                        return setResult((arr[0]['Maximum Lot'] * arr[0]['Initial Margin']) + ((arr[1]['Maximum Lot'] - arr[0]['Maximum Lot']) * arr[1]['Initial Margin']) + ((arr[2]['Maximum Lot'] - arr[1]['Maximum Lot']) * arr[2]['Initial Margin']) + ((TradeVolume - arr[2]['Maximum Lot']) * arr[3]['Initial Margin']))

                    default:
                        // 交易手數 * 初始保證金
                        return setResult(TradeVolume * arr[0]['Initial Margin'])
                }

            default:
                obj = json['Pip Value Calculator'].find(list => list['Product Type'] === document.getElementById('Pip-Value-Trading-Product').value)
                TradeVolume = Number(document.getElementById('Pip-Value-Trading-Amount').value)

                // 合約大小(每手) * Point * pip/point * 交易手數
                if ((obj['Order Size(Lot)'] * obj['Point'] * obj['pip/point'] * TradeVolume) < 1) {
                    return setResult(1)
                } else return setResult(obj['Order Size(Lot)'] * obj['Point'] * obj['pip/point'] * TradeVolume)
        }
    }

    return (
        <>
            <TopBanner
                background={calculatetopbanner}
                titles={["Trading Calculator"]} />

            <div className="container col-12 col-lg-9 p-4">
                <div className={`${classes.calculateCard} card p-4`}>
                    <ul className="nav nav-fill">
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning active" id="Pip-Value-tab" onClick={() => setResult(0)} data-bs-toggle="tab" data-bs-target="#Pip-Value" type="button" role="tab" aria-controls="Pip-Value" aria-selected="true">{t('Pip Value')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Margin-tab" onClick={() => setResult(0)} data-bs-toggle="tab" data-bs-target="#Margin" type="button" role="tab" aria-controls="Margin" aria-selected="true">{t('Deposit')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Profit-tab" onClick={() => setResult(0)} data-bs-toggle="tab" data-bs-target="#Profit" type="button" role="tab" aria-controls="Profit" aria-selected="true">{t('Profit')}</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button className="nav-link btn btn-warning" id="Swap-Calculator-tab" onClick={() => setResult(0)} data-bs-toggle="tab" data-bs-target="#Swap-Calculator" type="button" role="tab" aria-controls="Swap-Calculator" aria-selected="true">{t('Interest')}</button>
                        </li>
                    </ul>

                    <div className="tab-content" id="myTabContent">
                        {/* Pip Value Calculator */}
                        <div className="tab-pane fade show active" id="Pip-Value" role="tabpanel" aria-labelledby="Pip-Value-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Pip-Value-Trading-Type">{t('Trading Type')}</label>
                                    <select className="form-select" aria-label="Pip-Value-Trading-Type" id="Pip-Value-Trading-Type" onChange={(e) => setTradingType(e.target.value)}>
                                        {Array.from(new Set(json['Pip Value Calculator'].map(list => list['Transaction Type']))).map(list =>
                                            <option key={list} value={list}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Pip-Value-Trading-Product">{t('Trading Product')}</label>
                                    <select className="form-select" aria-label="Pip-Value-Trading-Product" id="Pip-Value-Trading-Product">
                                        {json['Pip Value Calculator'].filter(list => list['Transaction Type'] === tradingType).map(list =>
                                            <option key={list['Product Type']} value={list['Product Type']}>{list['Product Type']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Pip-Value-Trading-Amount">{t('Trading Amount')}</label>
                                    <input type="number" id="Pip-Value-Trading-Amount" className="form-control" defaultValue="0.01" min="0.01" max="100"></input>
                                    <div className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult('Pip Value Calculator')}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Pip Value">{t('Pip Value')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Margin Calculator */}
                        <div className="tab-pane fade" id="Margin" role="tabpanel" aria-labelledby="Margin-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Margin-Transaction-Type">{t('Transaction Type')}</label>
                                    <select className="form-select" aria-label="Margin-Transaction-Type" id="Margin-Transaction-Type" onChange={(e) => setDepositType(e.target.value)}>
                                        {Array.from(new Set(json['Margin Calculator'].map(list => list['Transaction Type']))).map(list =>
                                            <option key={list} value={list}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Margin-Product-Type">{t('Product Type')}</label>
                                    <select className="form-select" aria-label="Product Type" id="Margin-Product-Type">
                                        {Array.from(new Set(json['Margin Calculator'].filter(list => list['Transaction Type'] === depositType).map(list => list['Product Type']))).map(list =>
                                            <option key={list} value={list}>{list}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Margin-Trade-Volume">{t('Trade Volume')}</label>
                                    <input type="number" id="Margin-Trade-Volume" className="form-control" defaultValue="0.01" min="0.01" max="100"></input>
                                    <div className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult('Margin Calculator')}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="Pip Value">{t('Margin Required')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Profit Loss Calculator */}
                        <div className="tab-pane fade" id="Profit" role="tabpanel" aria-labelledby="Profit-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Transaction Type">{t('Transaction Type')}</label>
                                    <select className="form-select" aria-label="Transaction Type" id="Transaction Type" onChange={(e) => setProfitType(e.target.value)}>
                                        {Array.from(new Set(json['Profit Loss Calculator'].map(list => list['Transaction Type']))).map(list =>
                                            <option key={list} value={list}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>


                                <div className="col">
                                    <label htmlFor="Profit-Product-Type">{t('Trading Product')}</label>
                                    <select className="form-select" aria-label="Profit-Product-Type" id="Profit-Product-Type">
                                        {json['Profit Loss Calculator'].filter(list => list['Transaction Type'] === profitType).map(list =>
                                            <option key={list['Product Type']} value={list['Product Type']}>{list['Product Type']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Profit-Opening-Position-Direction">{t('Opening Position Direction')}</label>
                                    <select className="form-select" aria-label="Profit-Opening-Position-Direction" id="Profit-Opening-Position-Direction">
                                        <option value={'Buy'}>{t('Buy')}</option>
                                        <option value={'Sell'}>{t('Sell')}</option>
                                    </select>
                                </div>
                            </div>

                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Profit-Open-Price">{t('Open Price')}</label>
                                    <input type="number" id="Profit-Open-Price" className="form-control" defaultValue="1"></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="Profit-Closing-Price">{t('Closing Price')}</label>
                                    <input type="number" id="Profit-Closing-Price" className="form-control" defaultValue="1"></input>
                                </div>
                                <div className="col">
                                    <label htmlFor="Profit-Trade-Volume">{t('Trading Volume')}</label>
                                    <input type="number" id="Profit-Trade-Volume" className="form-control" defaultValue="0.01" min="0.01" max="100"></input>
                                    <div className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>
                            </div>

                            <div className="row align-items-start my-4">
                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult('Profit Loss Calculator')}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label>{t('Profit Earned')}</label>
                                    <input className="form-control form-control-lg" type="number" value={result} readOnly style={{ backgroundColor: '#fff' }} />
                                </div>
                                <div className="col-3 mt-auto">
                                    <h4>{'USD'}</h4>
                                </div>
                            </div>
                        </div>

                        {/* Swap Calculator */}
                        <div className="tab-pane fade" id="Swap-Calculator" role="tabpanel" aria-labelledby="Swap-Calculator-tab">
                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Swap-Transaction-Type">{t('Transaction Type')}</label>
                                    <select className="form-select" aria-label="Swap-Transaction-Type" id="Swap-Transaction-Type" onChange={(e) => setInterestType(e.target.value)}>
                                        {Array.from(new Set(json['Swap Calculator'].map(list => list['Transaction Type']))).map(list =>
                                            <option key={list} value={list}>{t(list)}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Swap-Product-Type">{t('Product Type')}</label>
                                    <select className="form-select" aria-label="Product Type" id="Swap-Product-Type">
                                        {json['Swap Calculator'].filter(list => list['Transaction Type'] === interestType).map(list =>
                                            <option key={list['Product Type']} value={list['Product Type']}>{list['Product Type']}</option>
                                        )}
                                    </select>
                                </div>

                                <div className="col">
                                    <label htmlFor="Swap-Opening-Position-Direction">{t('Opening Position Direction')}</label>
                                    <select className="form-select" aria-label="Swap-Opening-Position-Direction" id="Swap-Opening-Position-Direction">
                                        <option value={'Buy'}>{t('Buy')}</option>
                                        <option value={'Sell'}>{t('Sell')}</option>
                                    </select>
                                </div>

                            </div>

                            <div className="row align-items-start my-4">
                                <div className="col">
                                    <label htmlFor="Swap-Open-Price">{t('Open Price')}</label>
                                    <input type="number" id="Swap-Open-Price" className="form-control" defaultValue="1"></input>
                                </div>

                                <div className="col">
                                    <label htmlFor="Swap-Trade-Volume">{t('Trade Volume')}</label>
                                    <input type="number" id="Swap-Trade-Volume" className="form-control" defaultValue="0.01" min="0.01" max="100"></input>
                                    <div className="form-text"><small>{t('Please enter 0.01 to 100 value')}</small></div>
                                </div>

                                <div className="col">
                                    <label htmlFor="Swap-Day-s-Holding">{t('Day(s) Holding')}</label>
                                    <input type="number" id="Swap-Day-s-Holding" className="form-control" defaultValue="1" min="1" max="360"></input>
                                    <div className="form-text"><small>{t('Please enter 1 to 360 value')}</small></div>
                                </div>

                            </div>

                            <div className="row align-items-start my-4">
                                <div className="col my-auto">
                                    <button className="btn btn-primary" onClick={() => getResult('Swap Calculator')}>{t('Calculate')}</button>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label>{t('Swap')}</label>
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
