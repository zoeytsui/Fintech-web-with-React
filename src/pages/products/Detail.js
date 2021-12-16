import React from 'react'
import { useTranslation } from "react-i18next";
import Axios from 'axios';
import i18n from 'i18next'
import { makeStyles } from '@mui/styles';
import { draggableTable } from 'utilities'

import TopBanner from 'components/TopBanner'
import Loading from 'components/Loading'

import Stockindexitopbanner from 'assets/images/products/Stockindexitopbanner.jpg'

const ContractList = ({ product }) => {
    const { t } = useTranslation()
    const type = React.useRef('')
    const [ContractList, setContractList] = React.useState([])
    const [dataReady, setDataReady] = React.useState(false)


    const useStyle = makeStyles({
        root: {
            overflow: 'auto',
            borderRadius: '20px',
            // position: 'absolute',
            // top: '60%',
            // height: '700px',
            cursor: 'grab',
            '& table': {
                borderCollapse: 'collapse',
                '& thead': {
                    verticalAlign: 'middle',
                    '& tr ': {
                        background: '#CBC9C9',
                        '& th:nth-of-type(1)': {
                            position: 'sticky',
                            background: '#CBC9C9',
                            left: 0,
                        }
                    }
                },
                '& tbody': {
                    '& tr th': {
                        position: 'sticky',
                        left: 0,
                        background: '#fff'
                    }
                }
            },
            '&::-webkit-scrollbar': {
                width: '5px',
                height: '6px',
                borderRadius: '5px',
                display: 'none',
                '&-track': {
                    background: '#f1f1f1'
                },
                '&-thumb': {
                    background: '#000',
                    borderRadius: '5px'
                },
                '&-thumb:hover': {
                    background: '#555'
                },
            }
        }
    })()
    React.useEffect(() => {
        switch (product) {
            case 'Forex':
                type.current = 'exchange'
                break;
            case 'Commodities':
                type.current = 'metal'
                break;
            case 'Indices':
                type.current = 'index'
                break;
            default:
                type.current = 'exchange'
                break;
        }

        const params = {
            companyId: 23,
            type: type.current,
            lang: i18n.language
        }
        try {
            const getContractList = async () => {
                const result = await (await Axios.get(`${process.env.REACT_APP_TOP_OPENAPI_HOST}/hx/?service=Contract.getContractList`, { params: { ...params } })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setContractList(result.data)
                setDataReady(true)
                draggableTable('Trade Condition')
            }
            getContractList()
        } catch (error) { }
    }, [product])

    return (
        <div className={`container-fluid p-4`}>
            {dataReady
                ? <div className={`shadow-lg ${useStyle.root}`} id="Trade Condition">
                    <table className="table table-bordered text-center align-middle">
                        <thead>
                            <tr>
                                <th scope="col">{t('Product')}</th>
                                <th scope="col">{t('Median spread')}</th>
                                <th scope="col">{t('Buy overnight interest (%)')}</th>
                                <th scope="col">{t('Sell overnight interest (%)')}</th>
                                <th scope="col">{t('Contract size')}</th>
                                <th scope="col">{t('Level (lots)')}</th>
                                <th scope="col">{t('Initial margin (USD/ lot)')}</th>
                                <th scope="col">{t('Intraday margin(USD/ lot)')}</th>
                                <th scope="col">{t('Weekend/holiday margin (USD/ lot)')}</th>
                                <th scope="col">{t('Locked Margin Ratio')}</th>
                                <th scope="col">{t('Minimum lot size')}</th>
                                <th scope="col">{t('Interest calculation')}</th>
                                <th scope="col">{t('Three-day interest calculation')}</th>
                                <th scope="col">{t('Trade Time(GMT+8)')}</th>
                            </tr>
                            {/* <tr className="text-white">
                            <th scope="col" rowSpan="2"></th>
                            <th scope="col" rowSpan="2" style={{ background: '#89a163' }}>{t('SYMBOL')}</th>
                            <th scope="col" colSpan="2" style={{ background: '#b04022' }}>{t('Min. Per Click')}</th>
                            <th scope="col" colSpan="2" style={{ background: '#eb6133' }}>{t('Max. Per Click')}</th>
                            <th scope="col" colSpan="2" style={{ background: '#e08f36' }}>{t('Margin Requirement (USD)')}</th>
                            <th scope="col" colSpan="3" style={{ background: '#f19716' }}>{t('Comission-Round Trip (USD)')}</th>
                            <th scope="col" colSpan="2" style={{ background: '#a7b019' }}>{t('Margin Call Level')}</th>
                            <th scope="col" colSpan="2" style={{ background: '#70b92a' }}>{t('Blow Out Level')}</th>
                            <th scope="col" rowSpan="2" style={{ background: '#89a163' }}>{t('Trading hours (GMT+7) - summer')}</th>
                            <th scope="col" rowSpan="2" style={{ background: '#89a163' }}>{t('Trading hours (GMT+7) - winter')}</th>
                        </tr>
                        <tr className={`text-secondary ${useStyle.normaltTh}`}>
                            <th scope="col">{t('Mini')}</th>
                            <th scope="col">{t('Standard')}</th>
                            <th scope="col">{t('Mini')}</th>
                            <th scope="col">{t('Standard')}</th>
                            <th scope="col">{t('Mini')}</th>
                            <th scope="col">{t('Standard')}</th>
                            <th scope="col">{t('Min10')}</th>
                            <th scope="col">{t('Min5')}</th>
                            <th scope="col">{t('Min1')}</th>
                            <th scope="col">{t('Mini')}</th>
                            <th scope="col">{t('Standard')}</th>
                            <th scope="col">{t('Mini')}</th>
                            <th scope="col">{t('Standard')}</th>
                        </tr> */}
                        </thead>
                        <tbody>
                            {ContractList.map(list => {
                                if (list.bail_content.shoushucengji.length <= 3) {
                                    return (
                                        <React.Fragment key={list.id}>
                                            <tr>
                                                <th scope="row" rowSpan={list.bail_content.shoushucengji.length}>{list.englishname}</th>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.midspread}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.longinterest}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.shortinterest}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.unit}</td>

                                                <td>{list.bail_content.shoushucengji[0]}</td>
                                                <td>{list.bail_content.defbail[0]}</td>
                                                <td>{list.bail_content.daybail[0]}</td>
                                                <td>{list.bail_content.weekbail[0]}</td>
                                                <td>{list.bail_content.lockbail[0]}</td>

                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.singlelot}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.calculation}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.there_calculation}</td>
                                                <td rowSpan={list.bail_content.shoushucengji.length}>{list.trade_time}</td>
                                            </tr>
                                            <tr>
                                                <td>{list.bail_content.shoushucengji[1]}</td>
                                                <td>{list.bail_content.defbail[1]}</td>
                                                <td>{list.bail_content.daybail[1]}</td>
                                                <td>{list.bail_content.weekbail[1]}</td>
                                                <td>{list.bail_content.lockbail[1]}</td>
                                            </tr>
                                            <tr>
                                                <td>{list.bail_content.shoushucengji[2]}</td>
                                                <td>{list.bail_content.defbail[2]}</td>
                                                <td>{list.bail_content.daybail[2]}</td>
                                                <td>{list.bail_content.weekbail[2]}</td>
                                                <td>{list.bail_content.lockbail[2]}</td>
                                            </tr>
                                        </React.Fragment>)
                                } else {
                                    return (
                                        <React.Fragment key={list.id}>
                                            <tr>
                                                <th scope="row" rowSpan={list.bail_content.daybail.length}>{list.englishname}</th>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.midspread}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.longinterest}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.shortinterest}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.unit}</td>

                                                <td>{list.bail_content.shoushucengji[0]}</td>
                                                <td>{list.bail_content.defbail[0]}</td>
                                                <td>{list.bail_content.daybail[0]}</td>
                                                <td>{list.bail_content.weekbail[0]}</td>
                                                <td>{list.bail_content.lockbail[0]}</td>

                                                <td rowSpan={list.bail_content.daybail.length}>{list.singlelot}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.calculation}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.there_calculation}</td>
                                                <td rowSpan={list.bail_content.daybail.length}>{list.trade_time}</td>
                                            </tr>
                                            <tr>
                                                <td>{list.bail_content.shoushucengji[1]}</td>
                                                <td>{list.bail_content.defbail[1]}</td>
                                                <td>{list.bail_content.daybail[1]}</td>
                                                <td>{list.bail_content.weekbail[1]}</td>
                                                <td>{list.bail_content.lockbail[1]}</td>
                                            </tr>
                                            <tr>
                                                <td>{list.bail_content.shoushucengji[2]}</td>
                                                <td>{list.bail_content.defbail[2]}</td>
                                                <td>{list.bail_content.daybail[2]}</td>
                                                <td>{list.bail_content.weekbail[2]}</td>
                                                <td>{list.bail_content.lockbail[2]}</td>
                                            </tr>
                                            <tr>
                                                <td>{list.bail_content.shoushucengji[3]}</td>
                                                <td>{list.bail_content.defbail[3]}</td>
                                                <td>{list.bail_content.daybail[3]}</td>
                                                <td>{list.bail_content.weekbail[3]}</td>
                                                <td>{list.bail_content.lockbail[3]}</td>
                                            </tr>
                                        </React.Fragment>)
                                }
                            })
                            }
                        </tbody>
                    </table>

                </div>
                : <Loading />
            }
        </div>
    )
}

const detail = (props) => {
    return (
        <>
            <TopBanner
                background={Stockindexitopbanner}
                titles={["Trade Condition"]} />

            <ContractList product={props.match.params.id} />
        </>
    )
}

export default detail
