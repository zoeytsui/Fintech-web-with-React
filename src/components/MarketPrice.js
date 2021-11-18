import React from 'react'
import { OPENAPI } from 'api'
import PropTypes from 'prop-types'
import { useTranslation } from "react-i18next";

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper
} from '@mui/material';

import arrow_fall from 'assets/images/arrow_fall.svg'
import arrow_rise from 'assets/images/arrow_rise.svg'

const Row = ({ row }) => {
    const setIcon = (val) => {
        return val > 0
            ? <span style={{ verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }}><img src={arrow_rise} alt="" />{val + '%'}</span>
            : <span style={{ verticalAlign: 'middle', display: 'inline-flex', alignItems: 'center' }}><img src={arrow_fall} alt="" />{val + '%'}</span>
    }

    return (
        <React.Fragment>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell component="th" scope="row" className="fw-bold">{row.prd}</TableCell>
                <TableCell>{row.marketprice.ask}</TableCell>
                <TableCell>{row.marketprice.bid}</TableCell>
                <TableCell>{setIcon(row.marketprice.ratio)}</TableCell>
            </TableRow>
        </React.Fragment >
    );
}

const MarketPrice = ({ id = '' }) => {
    const { t } = useTranslation();
    const [queryList, setQueryList] = React.useState([])
    React.useEffect(() => {
        const params = {
            companyId: 23,
            waihui_zone: 'EURUSD,GBPUSD,USDJPY,USDCAD,AUDUSD,GBPUSD', // Forex
            futurespetroleum_zone: "XAUUSD,XAGUSD,USOil,UKOil,SOYBEAN", // Commodities
            futuresindex_zone: 'SP500,TECH100,DJ30,GER30,JPN225' // Indices
        }
        try {
            const marketprice = async () => {
                const result = await (await OPENAPI.post(`/tools/?service=MarketNew.marketprice`, { ...params })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                switch (id) {
                    case 'Forex':
                        setQueryList(result.data.waihui_zone)
                        break;
                    case 'Commodities':
                        setQueryList(result.data.futurespetroleum_zone)
                        break;
                    case 'Indices':
                        setQueryList(result.data.futuresindex_zone)
                        break;
                    default:
                        setQueryList(result.data.waihui_zone)
                        break;
                }
            }
            marketprice()
        } catch (error) { }
    }, [id])
    return (

        <TableContainer
            component={Paper}
            sx={{
                maxWidth: 'md', mx: 'auto',
                '& .MuiTableCell-root': {
                    fontFamily: 'Exo2-Medium',
                    textAlign: 'center'
                }
            }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>{t('Name')}</TableCell>
                        <TableCell>{t('Buy')}</TableCell>
                        <TableCell>{t('Sell')}</TableCell>
                        <TableCell>{t('Quote Change')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {queryList.map((row, index) => (
                        <Row key={index} row={row} />
                    ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )
}


MarketPrice.propTypes = {
    id: PropTypes.string,
}

export default MarketPrice
