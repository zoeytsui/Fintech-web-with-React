import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

import topbanner from 'assets/images/help/topbanner.png'
import pc_1 from 'assets/images/icons/pc_1.png'
import cs_1 from 'assets/images/icons/cs_1.png'
import twentyFour_1 from 'assets/images/icons/twentyFour_1.png'

const Help = () => {
    const { t } = useTranslation();
    const useStyles = {
        topBackground: {
            backgroundImage: `url(${topbanner})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            height: '638px'
        },
        searchBtn: {
            background: '#fff',
            border: '1px solid #ced4da',
            borderLeft: 0,
            // position: 'relative', left: '-63px', zIndex: '4'
        }
    }
    const features = [
        { icon: cs_1, title: 'Real time response from our elite customer service.' },
        { icon: twentyFour_1, title: '24/5 exclusive customer service, available anytime on trading days.' },
        { icon: pc_1, title: 'Professional team to help you succeed.' }
    ]
    return (
        <>
            <div className="d-flex align-items-center" style={useStyles.topBackground}>
                <div className="container text-white">
                    <h1 className="fw-bold text-white text-center mb-5">{t('How may we help?')}</h1>

                    <div className="input-group mx-auto" style={{ width: '60%' }}>
                        <input type="text" className="form-control" placeholder={t('Enter Your Question')} aria-label={t('Enter Your Question')} aria-describedby="button-addon2" />
                        <button style={useStyles.searchBtn} className="btn btn-primary" type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                                <g transform="translate(-1514 -1528)">
                                    <circle fill="#83bf4b" cx="13" cy="13" r="13" transform="translate(1514 1528)" />
                                    <path fill="#fff" d="M7.272,3a4.274,4.274,0,0,1,3.247,7.052l.177.177h.519L14.5,13.515l-.986.986-3.286-3.286V10.7l-.177-.177A4.273,4.273,0,1,1,7.272,3m0,1.314a2.957,2.957,0,1,0,2.957,2.957A2.945,2.945,0,0,0,7.272,4.314Z" transform="translate(1518.25 1532.25)" />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mx-auto flex-wrap justify-content-center py-5" style={{ background: "#F1F1F1" }}>
                {features.map(card =>
                    <div className="feature-card card d-flex align-items-center text-center col-6 col-lg-3 m-3 p-2" key={t(card.title)}>
                        <img src={card.icon} align="center" width="138px" alt={card.title} />
                        <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title text-dark mx-2">{`${t(card.title)}`}</h5>
                    </div>
                )}
            </div>

            <FAQ />
        </>
    )
}

const FAQ = () => {
    const { t } = useTranslation();
    const [QuestionType, setQuestionType] = React.useState([])
    const [QuestionList, setQuestionList] = React.useState([])
    const [QuestionDetail, setQuestionDetail] = React.useState({})
    const [QuestionID, setQuestionID] = React.useState()
    const answerRef = React.useRef(<div />)
    const styled = makeStyles({
        quesNav: {
            "& :hover,:focus,:target": {
                color: '#23383A'
            },
            "& button": {
                border: 0,
                textDecoration: 'none',
                textAlign: 'left',
                background: 'transparent'
            }
        }
    })()

    const toggleTabs = ({ id, question, answer }) => {
        answerRef.current.innerHTML = answer
        setQuestionDetail({ id: id, question: question, answer: answer })
    }

    React.useEffect(() => {
        try {
            const getQuestionType = async (params) => {
                const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getQuestionType`, { params: params })).data
                console.log((await TOP_OPENAPI.get(`/hx/?service=Question.getQuestionType`, { params: params })));
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setQuestionType(result.data)
                if (result.data[0] !== undefined) {
                    setQuestionID(result.data[0].id)
                }
            }
            switch (i18n.language) {
                case 'vi':
                    getQuestionType({
                        companyId: 23,
                        terminal: 'app',
                        url: 'help_vn'
                    })
                    break;
                case 'ms':
                    getQuestionType({
                        companyId: 23,
                        terminal: 'app',
                        url: 'help_my'
                    })
                    break;
                case 'cn':
                    getQuestionType({
                        companyId: 23,
                        terminal: 'app',
                        url: 'help_ch'
                    })
                    break;
                case 'en':
                    getQuestionType({
                        companyId: 23,
                        terminal: 'app',
                        url: 'help_' + i18n.language
                    })
                    break;

                default:
                    getQuestionType({
                        companyId: 23,
                        terminal: 'app',
                        url: 'help_' + i18n.language
                    })
                    break;
            }
        } catch (error) { }
        // eslint-disable-next-line
    }, [i18n.language])

    React.useEffect(() => {
        try {
            const getList = async (params) => {
                const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getList`, { params: params })).data
                if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
                setQuestionList(result.data.list)
                if (QuestionID !== undefined) {
                    let res = result.data.list.filter(q => q.type_id === QuestionID)[0]
                    console.log('result.data.list', result.data.list);
                    console.log('QuestionID', QuestionID);
                    console.log('res.id', res);
                    if (res !== undefined) {
                        setQuestionDetail({ id: res.id, question: res.question, answer: res.answer })
                        answerRef.current.innerHTML = res.answer
                    }
                }

            }
            getList({
                companyId: 23,
                terminal: 'app',
                appId: 'com.mt4.hwsc',
                pageSize: 100
            })

        } catch (error) { }
        // eslint-disable-next-line
    }, [QuestionID])

    return (
        <div className="container my-5">
            <h1 className="fw-bold text-dark text-center mb-5">{t('FAQ')}</h1>
            <div className="d-flex justify-content-center">

                <div className="accordion accordion-flush col-4" id="FAQList">
                    {QuestionType.map((list, index) =>
                        <div key={list.id} className="accordion-item">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id={list.id}>
                                    <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={'#' + (list.title).replaceAll(' ', '-')} aria-expanded="false" aria-controls={list.title.replaceAll(' ', '-')}>
                                        {list.title}
                                    </button>
                                </h2>
                                <div id={list.title.replaceAll(' ', '-')} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={list.id} data-bs-parent="#FAQList">
                                    <ul className="accordion-body list-unstyled" style={{ background: "#F5F5F5" }}>
                                        {QuestionList.filter(q => q.type_id === list.id).map(ques =>
                                            <li key={ques.id} className={`${styled.quesNav} my-3`}>
                                                <button onClick={() => toggleTabs({ id: ques.di, question: ques.question, answer: ques.answer })} className="link-secondary">
                                                    {ques.question}
                                                </button>
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="container col-7" id="FAQList">
                    <h4 className="text-dark">{QuestionDetail.question}</h4>
                    <div className="text-secondary" ref={answerRef} />
                </div>

            </div>
        </div>
    )
}

export default Help
