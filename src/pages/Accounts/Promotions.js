import { useState, useEffect } from 'react'
import i18n from 'i18next'
import { useTranslation } from "react-i18next";
import { timeFormatter } from 'utilities'

import Loading from 'components/Loading'
import TopBanner from 'components/TopBanner'
import OpenAccount from 'components/OpenAccount'
import AwardCarousel from 'components/AwardCarousel'

import promotionsTopbanner from 'assets/images/accounts/promotionsTopbanner.jpg'
import { TOP_OPENAPI } from 'api';

const PromoCard = () => {
    const { t } = useTranslation();
    const [cards, cardsSet] = useState([]);
    const [dataReady, setDataReady] = useState(false)

    const getActivity = async (lang) => {
        try {
            switch (lang) {
                case 'ch':
                    lang = 'cn'
                    break;
                case 'vn':
                    lang = 'vi'
                    break;
                case 'my':
                    lang = 'ms'
                    break;

                default:
                    lang = 'en'
                    break;
            }
            const params = {
                companyId: 23,
                terminal: 'wap_website',
                lang: lang // cn, tw, en, vi, ms
            }
            const result = await TOP_OPENAPI.get(`/hx/?service=ActivitySet.getActivity`, { params: { ...params } })
            if (result.data.ret !== 200) return console.error(result.data)
            cardsSet(result.data.data.list)
            setDataReady(true)
        } catch (error) {}
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            getActivity(i18n.language)
        }, 1000);
        return () => clearTimeout(timer);
    })

    const countdown = (endTime) => {
        let now = new Date().getTime(),
            countDownDate = new Date(endTime).getTime();

        let distance = countDownDate - now

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // If the count down is finished, clearInterval
        if (distance > 0) {
            return `${days}${t('Day')} ${hours}:${minutes}:${seconds}`
        } else {
            clearInterval();
            return `${t("EXPIRED")}`
        }
    }

    return (
        <div className="container-fluid py-5" style={{ background: '#F1F1F1' }}>
            <div className="d-flex flex-wrap justify-content-center">
                {dataReady
                    ? cards.map(card =>
                        <div className="feature-card card col-12 col-lg-3 m-3 p-3" key={card.id}>
                            <div className="d-flex flex-column align-items-start text-left" key={card.id}>
                                <img src={card.content.list_image} style={{ borderRadius: '10px' }} width="100%" alt={card.content.name} />
                                <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title m-2">{card.content.name}</h5>
                                <p className="text-secondary mx-2 my-0">{t('Event available period:')}</p>
                                <p className="text-secondary mx-2 my-0">{timeFormatter(card.start_time) + ' - ' + timeFormatter(card.end_time)}</p>
                                <p className="text-danger m-2">{t('Countdown') + countdown(card.end_time)}</p>
                            </div>
                            <a className="btn btn-warning text-white m-2" role="button" href={card.content.url}>{t('Join Promotion')}</a>
                        </div>)
                    : <Loading />
                }
            </div>
        </div>
    )
}

const Promotions = () => {
    return (
        <>
            <TopBanner
                background={promotionsTopbanner}
                titles={["Promotions"]}
                subtitles={["Keep up with market trends and grasp the latest promotion"]} />

            <PromoCard />
            <OpenAccount />
            <AwardCarousel />
        </>
    )
}

export default Promotions
