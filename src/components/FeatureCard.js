import React from 'react'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    featureCard: {
        border: 0,
        background: '#F7F7F7',
        boxShadow: '0px 1px 3px #0000001A',
        '&:hover': {
            background: '#ffffff',
            boxShadow: '0px 4px 12px #00000033',
            transition: 'all .15s linear',
            transform: 'scale(1.05)',
            borderBottom: '4px solid #60A720'
        }
    },
})

const FeatureCard = ({ image = '', titles = [], subtiles = [], width = '' }) => {
    const classes = useStyles();
    const { t } = useTranslation();
    return (
        <>
            <div className={`${classes.featureCard} card d-flex align-items-center text-center col-3 p-4 m-2`} style={{ width: `${width}` }}>
                {/* <div className={`feature-card ${classes.featureCard} card d-flex align-items-center text-center col-3 p-4 m-2`} style={{ width: `${width}` }}> */}
                <img src={image} align="center" width="138px" alt="" />
                {titles.map(title =>
                    <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title mx-2" key={t(title)} >{t(title)}</h5>
                )}
                {subtiles.map(subtile =>
                    <p card-text text-secondary key={t(subtile)} >{t(subtile)}</p>
                )}
            </div>
        </>
    )
}

FeatureCard.propTypes = {
    image: PropTypes.string,
    titles: PropTypes.array,
    subtiles: PropTypes.array,
    width: PropTypes.string
}

export default FeatureCard
