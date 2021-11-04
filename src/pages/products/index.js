import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';
import Axios from 'axios';

import { isPrice } from 'utilities'

import Calculate from './Calculate'
import TopBanner from 'components/TopBanner'
import MightBeInterested from 'components/MightBeInterested'
// import FeatureCard from 'components/FeatureCard'
import OpenAccount from 'components/OpenAccount'
import AwardCarousel from 'components/AwardCarousel'

import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Collapse,
    IconButton,
    Box,
    Paper
} from '@mui/material';

import arrow_down from 'assets/images/arrow_down.svg'
import arrow_up from 'assets/images/arrow_up.svg'

import Forextopbanner from 'assets/images/products/Forextopbanner.jpg'
import commodity_topbanner from 'assets/images/products/commodity_topbanner.jpg'
import Stockindexitopbanner from 'assets/images/products/Stockindexitopbanner.jpg'

import rate_decrease_1 from 'assets/images/icons/rate_decrease_1.png'
import coins_decrease_1 from 'assets/images/icons/coins_decrease_1.png'
import balance_1 from 'assets/images/icons/balance_1.png'
import certificate_1 from 'assets/images/icons/certificate_1.png'
import cs_1 from 'assets/images/icons/cs_1.png'


const FeatureCard = () => {
    const { t } = useTranslation();
    const useStyles = makeStyles({
        outlineBtn: {
            "& :hover": {
                color: '#fff'
            }
        }
    })

    return (
        <section className="container d-flex flex-wrap justify-content-center py-4" style={{ position: 'relative', top: '-10%' }}>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={rate_decrease_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Lowest Commission Up to USD 0')}</h5>
                    <button type="button" className="btn btn-outline-primary">Details</button>
                </div>
            </div>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={coins_decrease_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Low Spreads Starting from 1.4 pips')}</h5>
                    <button type="button" className="btn btn-outline-secondary">Open Demo Account</button>
                </div>
            </div>
            <div className="feature-card card col-12 col-lg-3 m-3">
                <div className="card-body">
                    <img src={balance_1} alt="" />
                    <h5 style={{ fontFamily: 'Exo2-ExtraBold' }}>{t('Small Capital Profit Leverage 1 :200')}</h5>
                    <button type="button" className={`${useStyles.outlineBtn} btn btn-outline-primary`}>Details</button>
                </div>
            </div>
        </section>
    )
}

// TODO: not finished
const CurrencyPair = ({ title }) => {
    const { t } = useTranslation();
    const [ForexList, setForexList] = React.useState([])
    const [CommoditiesList, setCommoditiesList] = React.useState([])
    const [IndicesList, setIndicesList] = React.useState([])
    React.useEffect(() => {
        const params = {
            companyId: 23,
            waihui_zone: 'EURUSD,GBPUSD,USDJPY,USDCAD,AUDUSD,GBPUSD', // Forex
            futurespetroleum_zone: "XAUUSD,XAGUSD,USOil,UKOil,SOYBEAN", // Commodities
            futuresindex_zone: 'SP500,TECH100,DJ30,GER30,JPN225' // Indices
        }
        const marketprice = async () => {
            // const result = await (await Axios.post('http://192.168.75.53:5101/tools/?service=MarketNew.marketprice', { ...params })).data
            const result = await (await Axios.post('/api/tools/?service=MarketNew.marketprice', { ...params })).data
            console.log(result.data);
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setForexList(result.data.waihui_zone);
            setCommoditiesList(result.data.futurespetroleum_zone);
            setIndicesList(result.data.futuresindex_zone);
        }
        marketprice()
    }, [])
    return (
        <section className="container-fluid text-center py-5" style={{ background: '#F1F1F1' }}>
            <h2 className="fw-bold text-dark mb-5">{t(title)}</h2>

            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <TableCell>{t('Name')}</TableCell>
                            <TableCell>{t('Buy')}</TableCell>
                            <TableCell>{t('Sell')}</TableCell>
                            <TableCell>{t('Quote Change')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {ForexList.map((row, index) => (
                            <Row key={index} row={row} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <button className="btn btn-primary text-white m-2">{t('Contract details')}</button>
        </section>
    )
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <img src={arrow_up} alt="" /> : <img src={arrow_down} alt="" />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.prd}
                </TableCell>
                <TableCell>{isPrice(row.marketprice.ask, row.marketprice.preclose) + '>' + row.marketprice.ask}</TableCell>
                <TableCell>{isPrice(row.marketprice.bid, row.marketprice.preclose) + '>' + row.marketprice.bid}</TableCell>
                <TableCell>{isPrice(row.marketprice.ask, 0) + '>' + row.marketprice.ratio + '%'}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Customer</TableCell>
                                        <TableCell>Amount</TableCell>
                                        <TableCell>Total price ($)</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {row.marketprice.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody> */}
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const WhyChoose = () => {
    const why_context = [
        { icon: certificate_1, title: 'Negative Balance Protection' },
        { icon: rate_decrease_1, title: '0% Commission' },
        { icon: balance_1, title: 'Competitive Spread' },
        { icon: cs_1, title: '5/24 Online Support' },
    ]
    const { t } = useTranslation();
    return (
        <section className="container text-center py-5">
            <h2 className="fw-bold text-dark text-center mb-5">{t('Why Choose HFXF')}</h2>

            <div className="container col-12 d-flex flex-wrap justify-content-evenly">
                {why_context.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-3 p-4 m-2" key={t(card.title)} style={{ width: '300px' }}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2">{`${t(card.title)}`}</h5>
                    </div>
                )}
            </div>
            <button className="btn btn-warning my-4 text-white">{t('Trade Now')}</button>
        </section>
    )
}

const Forex = () => {
    return (
        <>
            <TopBanner
                background={Forextopbanner}
                titles={["Forex Trading"]}
                subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
                buttons={[{ color: 'btn-warning', text: "Trade Now" }]} />
            <FeatureCard />
            <CurrencyPair title="Currency Pair" />
            <WhyChoose />
        </>
    )
}
const Commodities = () => {
    return (
        <>
            <TopBanner
                background={commodity_topbanner}
                titles={["Commodity Trading"]}
                subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
                buttons={[{ color: 'btn-warning', text: "Trade Now" }]} />
            <FeatureCard />
            <CurrencyPair title="Commodity" />
            <WhyChoose />
        </>
    )
}
const Indices = () => {
    return (
        <>
            <TopBanner
                background={Stockindexitopbanner}
                titles={["Stock Index"]}
                subtitles={["Explore the world’s hottest trading products and explore endless investment opportunities with HXFX GLOBAL."]}
                buttons={[{ color: 'btn-warning', text: "Trade Now" }]} />
            <FeatureCard />
            <CurrencyPair title="Index" />
            <WhyChoose />
        </>
    )
}

const Products = (props) => {
    // console.log(props);
    // console.log('props.match.params.id', props.match.params.id);
    return (
        <>
            <Router basename={'/Products'}>
                <Switch>
                    <Route exact path="/Forex">
                        <Forex />
                    </Route>
                    <Route exact path="/Commodities">
                        <Commodities />
                    </Route>
                    <Route exact path="/Indices">
                        <Indices />
                    </Route>
                    <Route exact path="/Calculate" component={Calculate} />
                </Switch>

                <MightBeInterested />
                <OpenAccount />
                <AwardCarousel />
            </Router>
        </>
    )
}

export default Products
