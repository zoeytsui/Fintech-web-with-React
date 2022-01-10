import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

import topbanner from 'assets/images/help/topbanner.png'
import pc_1 from 'assets/images/icons/pc_1.png'
import cs_1 from 'assets/images/icons/cs_1.png'
import twentyFour_1 from 'assets/images/icons/twentyFour_1.png'

const useStyle = makeStyles({
    topBackground: {
        backgroundImage: `url(${topbanner})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        height: '638px'
    },
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
    },
    SearchBar: {
        position: 'absolute',
        left: '12.5%'
    },
    searchBtn: {
        background: '#fff',
        border: '1px solid #ced4da',
        borderLeft: 0,
        // position: 'relative', left: '-63px', zIndex: '4'
    },
    filterList: {
        background: '#fff',
        maxHeight: '300px',
        overflow: 'auto',
        "& li": {
            "& a": {
                textAlign: 'left',
                color: '#858585',
                border: '0 !important',
                "&:hover,:focus,:target": {
                    color: '#83bf4b',
                    border: '0 !important'
                },
            }
        }
    }
})

const Help = () => {
    const styled = useStyle()
    const { t } = useTranslation();

    // response from Question.getList
    const [QuestionType, setQuestionType] = React.useState([])
    const [QuestionList, setQuestionList] = React.useState([])
    // set active tabs
    const [QuestionDetail, setQuestionDetail] = React.useState({})
    // string to html element
    const answerRef = React.useRef(<div />)

    const [disabled, setDisabled] = React.useState(true)

    const searchInput = React.useRef(null);

    const [filterList, setFilterList] = React.useState([])


    const toggleTabs = ({ id, question, answer }) => {
        answerRef.current.innerHTML = answer
        setQuestionDetail({ id: id, question: question, answer: answer })
    }

    // 获取问题分类
    const getQuestionType = async (lang) => {
        try {
            const params = {
                companyId: 23,
                terminal: 'app',
                url: 'help_' + lang
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getQuestionType`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            if (result.data[0] !== undefined) {
                setQuestionType(result.data)

                await result.data.map(item =>
                    getList(item.id, (data) => {
                        if (item.id === data.list[0].type_id) {
                            item.list = data.list
                        }
                    }))

                await new Promise(res => {
                    let checkInterval = setInterval(() => {
                        if (result.data.every(item => item.list !== undefined)) {
                            res(clearInterval(checkInterval))
                        }
                    }, 100);
                })

                toggleTabs({
                    id: result.data[0].id,
                    question: result.data[0].list[0].question,
                    answer: result.data[0].list[0].answer
                })
                setQuestionList(result.data)

            }
        } catch (error) { console.error(error) }
    }

    // 获取问题列表
    const getList = async (id, callback) => {
        try {
            const params = {
                companyId: 23,
                terminal: 'app',
                appId: 'com.mt4.hwsc',
                typeId: id,
                pageSize: 100
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getList`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            callback(result.data)
        } catch (error) { console.error(error) }
    }

    // 获取TOP问题列表
    const getTopList = async (lang) => {
        try {
            const params = {
                companyId: 23,
                terminal: 'app',
                appId: 'com.mt4.hwsc',
                url: 'help_' + lang
            }

            const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getTopList`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setFilterList(result.data)
        } catch (error) {}
    }

    // 常见问题搜索
    const getSearchList = async (lang) => {
        try {
            if (searchInput.current.value === '') return;
            switch (lang) {
                case 'vn':
                    lang = '越南文'
                    break;
                case 'my':
                    lang = '马来文'
                    break;
                case 'ch':
                    lang = '中文'
                    break;

                default:
                    lang = '英文'
                    break;
            }
            const params = {
                companyId: 23,
                terminal: 'app',
                appId: 'com.mt4.hwsc',
                question: searchInput.current.value,
                languageName: lang
            }
            const result = await (await TOP_OPENAPI.get(`/hx/?service=Question.getSearchList`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setFilterList(result.data.list)
            toggleSearchField()
        } catch (error) {}
    }

    const toggleSearchField = () => {
        let element = document.getElementById('filterList');
        element.className.includes('show') ? element.classList.remove('show') : element.classList.add('show')
    };

    // TODO: not finished for filter in letter by letter
    const searchItems = (searchValue) => {
        // const FAQList = document.getElementById('FAQList')
        // const questionList = FAQList.getElementsByTagName('li')

        // console.log('searchValue', searchValue);

        // Array.from(questionList).filter(item => {
        //     const element = item.children[0]
        //     let txtValue = element.textContent || element.innerHTML
        //     // if (txtValue.toUpperCase().indexOf(searchValue.toUpperCase()) > -1) {
        //     //     return setFilterList(element)
        //     // }
        //     return txtValue.toUpperCase().indexOf(searchValue.toUpperCase()) > -1 ? setFilterList(element) : ''
        //     // return Object.values(item).join('').toLowerCase().includes(searchInput.current.toLowerCase())
        // })
    }

    React.useEffect(() => {
        getQuestionType(i18n.language)
        // eslint-disable-next-line
    }, [i18n.language])

    React.useEffect(() => {
        // Enable input when FAQuestions and DOM are ready
        QuestionList.length > 0 && filterList.length > 0 ? setDisabled(false) : setDisabled(true)
        getTopList(i18n.language)
        // eslint-disable-next-line
    }, [QuestionList, i18n.language])

    return (
        <>
            <div className={`d-flex align-items-center ${styled.topBackground}`}>
                <div className="container text-white">
                    <h1 className="fw-bold text-white text-center mb-5">{t('How may we help?')}</h1>

                    {/* Search bar */}
                    <div className={`container col-9 ${styled.SearchBar}`}>
                        <div className="input-group">
                            <input autoFocus type="text" className="form-control" ref={searchInput} onClick={toggleSearchField} onChange={(e) => searchItems(e.target.value)} disabled={disabled} placeholder={t('Enter Your Question')} aria-label={t('Enter Your Question')} aria-describedby="button-search" />
                            <button className={`btn btn-primary ${styled.searchBtn}`} type="button" onClick={() => getSearchList(i18n.language)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26">
                                    <g transform="translate(-1514 -1528)">
                                        <circle fill="#83bf4b" cx="13" cy="13" r="13" transform="translate(1514 1528)" />
                                        <path fill="#fff" d="M7.272,3a4.274,4.274,0,0,1,3.247,7.052l.177.177h.519L14.5,13.515l-.986.986-3.286-3.286V10.7l-.177-.177A4.273,4.273,0,1,1,7.272,3m0,1.314a2.957,2.957,0,1,0,2.957,2.957A2.945,2.945,0,0,0,7.272,4.314Z" transform="translate(1518.25 1532.25)" />
                                    </g>
                                </svg>
                            </button>
                        </div>

                        <div className="d-flex justify-content-between mt-5">
                            {QuestionType.map((x, i) =>
                                <button key={i}
                                    className='btn link-light text-white'
                                    onClick={() => document.getElementById('FAQ').scrollIntoView()}>
                                    {x.title}
                                </button>
                            )}
                            <button
                                className='btn link-light text-white'
                                onClick={() => document.getElementById('Video Tutorials').scrollIntoView()}>
                                {t('Video Tutorials')}
                            </button>
                        </div>

                        <ul id="filterList" className={`${styled.filterList} collapse bg-white list-unstyled p-3 rounded dropdown-menu scrollbar`}>
                            {searchInput.current !== null && searchInput.current.value !== ''
                                ? <h6 className="text-dark">{filterList.length + ` ${t("results found for")} ` + searchInput.current.value}</h6>
                                : <h6 className="text-dark">{t("Everyone's asking:")}</h6>}

                            <li><hr className="dropdown-divider" /></li>
                            {filterList.map(list =>
                                <li key={list.id}>
                                    <button
                                        className="btn link-dark"
                                        onClick={() => {
                                            toggleTabs({ id: list.id, question: list.question, answer: list.answer });
                                            document.getElementById('FAQ').scrollIntoView()
                                        }} >{list.question}</button>
                                </li>
                            )}
                        </ul>
                    </div >
                </div>
            </div>

            <FeatureCard />

            {/* FAQ */}
            <div className="container my-5" id="FAQ">
                <h1 className="fw-bold text-dark text-center mb-5">{t('FAQ')}</h1>
                <div className="d-flex justify-content-center">
                    <div className="accordion accordion-flush col-4" id="FAQList">
                        {QuestionList.map((list, index) =>
                            <div key={list.id} className="accordion-item">
                                <div className="accordion-item">
                                    <h2 className="accordion-header" id={list.title}>
                                        <button className={`accordion-button ${index === 0 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={'#' + (list.title).replaceAll(' ', '-')} aria-expanded="false" aria-controls={list.title.replaceAll(' ', '-')}>
                                            {list.title}
                                        </button>
                                    </h2>
                                    <div id={list.title.replaceAll(' ', '-')} className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`} aria-labelledby={list.id} data-bs-parent="#FAQList">
                                        <ul className="accordion-body list-unstyled" style={{ background: "#F5F5F5" }}>
                                            {list.list
                                                ? list.list.map(ques =>
                                                    <li key={ques.id} className={`${styled.quesNav} my-3`}>
                                                        <button
                                                            className="link-secondary"
                                                            onClick={() => toggleTabs({ id: ques.id, question: ques.question, answer: ques.answer })}>
                                                            {ques.question}
                                                        </button>
                                                    </li>
                                                )
                                                : console.warn('no list', list)
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="container col-7">
                        <h4 className="text-dark">{QuestionDetail.question}</h4>
                        <div className="text-secondary" ref={answerRef} />
                    </div>

                </div>
            </div>

            <VideoTutorial />
        </>
    )
}

const FeatureCard = () => {
    const { t } = useTranslation();
    const features = [
        { icon: cs_1, title: 'Real time response from our elite customer service.' },
        { icon: twentyFour_1, title: '24/5 exclusive customer service, available anytime on trading days.' },
        { icon: pc_1, title: 'Professional team to help you succeed.' }
    ]
    return (
        <div className="row mx-auto flex-wrap justify-content-center py-5" style={{ background: "#F1F1F1" }}>
            {features.map(card =>
                <div className="feature-card card d-flex align-items-center text-center col-6 col-lg-3 m-3 p-2" key={t(card.title)}>
                    <img src={card.icon} align="center" width="138px" alt={card.title} />
                    <h5 style={{ fontFamily: "Exo2-ExtraBold" }} className="card-title text-dark mx-2">{t(card.title)}</h5>
                </div>
            )}
        </div>
    )
}

const VideoTutorial = () => {
    const { t } = useTranslation();
    const [videoSrc, setVideoSrc] = React.useState(null)

    const videoList = [{
        post_url: 'https://images.hxfxglobal.com/public/www/help/open_account_' + i18n.language + '.png',
        video_url: `https://images.hxfxglobal.com/video/open_account_${i18n.language === 'ch' ? 'cn' : i18n.language}.mp4`,
        des: 'Tìm hiểu về đầu tư forex trong 1 phút'
    }, {
        post_url: 'https://images.hxfxglobal.com/public/www/help/deposit_' + i18n.language + '.png',
        video_url: `https://images.hxfxglobal.com/video/deposit_${i18n.language === 'ch' ? 'cn' : i18n.language}.mp4`,
        des: 'Hướng dẫn nạp tiền nhanh chóng'
    }, {
        post_url: 'https://images.hxfxglobal.com/public/www/help/how_order_' + i18n.language + '.png',
        video_url: 'https://comfile.osboyo.com/2020-05-22/Trade_' + i18n.language + '.mp4',
        des: 'Làm sao xuống lệnh giao dịch ?'
    }, {
        post_url: 'https://images.hxfxglobal.com/public/www/help/account_leave_' + i18n.language + '.jpg',
        video_url: `https://images.hxfxglobal.com/video/account_type_${i18n.language === 'ch' ? 'cn' : i18n.language}.mp4`,
        des: 'Các loại tại khoản tại HXFX?Cách chọn tài khoản phù hợp cho bạn?'
    }, {
        post_url: 'https://images.hxfxglobal.com/public/www/help/withdraw_' + i18n.language + '.png',
        video_url: 'https://comfile.osboyo.com/2020-04-30/Withdraw_' + i18n.language + '.mp4',
        des: 'Hướng dẫn cách rút tiền dễ dàng từ tài khoản'
    }]

    return (
        <div id="Video Tutorials" className="row mx-auto flex-wrap justify-content-center text-center py-5" style={{ background: "#F1F1F1" }}>
            <h2 className="fw-bold text-dark">{t('Video Tutorials')}</h2>
            <p className="card-text text-secondary">{t('How to open a HXFX Global account?')}</p>

            {/* video list */}
            {videoList.map(list =>
                <React.Fragment key={t(list.des)}>
                    <button className="btn col-12 col-md-6 col-lg-3 m-3" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setVideoSrc(list.video_url)}>
                        <img className="img-fluid" src={list.post_url} width="100%" alt={list.des} />
                    </button>
                </React.Fragment>
            )}

            {/* video modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content ratio ratio-16x9">
                        <video src={videoSrc} controls="controls"></video>
                    </div>
                </div>
            </div>

        </div>
    )
}


export default Help
