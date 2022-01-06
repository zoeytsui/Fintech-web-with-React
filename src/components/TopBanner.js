import React from 'react'
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types'

const TopBanner = ({ background = '', titles = [], subtitles = [], buttons = [], styled = {} }) => {
    const { t } = useTranslation();
    const useStyles = makeStyles({
        root: {
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '638px',
            ...styled
        }
    })()

    return (
        <div className={`d-flex align-items-center ${useStyles.root}`}>
            <div className="container text-white">
                {titles.map(title =>
                    <h1 className="fw-bold text-white" key={title}>{t(title)}</h1>
                )}

                {subtitles.map(subtitle =>
                    <p className="col-md-8 fs-4" key={subtitle}>{t(subtitle)}</p>
                )}

                <div className="d-flex flex-wrap">
                    {buttons.map(button =>
                        <button className={`btn btn-lg ${button.color} m-1`} onClick={() => button.callback()} key={button.text}>{t(button.text)}</button>
                    )}
                </div>

            </div>
        </div>
    )
}

TopBanner.propTypes = {
    background: PropTypes.string,
    titles: PropTypes.array,
    subtitles: PropTypes.array,
    buttons: PropTypes.array
}

export default TopBanner
