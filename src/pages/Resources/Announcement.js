import React from 'react'
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { useTranslation } from "react-i18next";
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Pagination, Stack } from '@mui/material';

import Loading from 'components/Loading'
import TopBanner from 'components/TopBanner'
import OpenAccountSimple from 'components/OpenAccountSimple'
import AwardCarousel from 'components/AwardCarousel'

import Announcement_topbanner from 'assets/images/resources/Announcement_topbanner.png'

const webNoticeList = async (params, callback) => {
    try {
        params = {
            ...params,
            company_id: 23,
            pagesize: 10,
            page: params.page !== undefined ? params.page : 1
        }
        // 	lang_zh_CN（中文）、lang_zh_TW（繁体中文）、lang_en（英语）、lang_vi（越南）、lang_ms（马来西亚）
        switch (i18n.language) {
            case 'ch':
                params.language = 'lang_zh_TW'
                // params.language = 'lang_zh_CN' // 400: 非法请求：暂无数据
                break;
            case 'vn':
                params.language = 'lang_vi'
                break;
            case 'my':
                params.language = 'lang_ms'
                break;

            default:
                params.language = 'lang_en'
                break;
        }
        const result = await (await TOP_OPENAPI.get(`tools/?service=Pushsystem.webNoticeList`, { params: params })).data
        if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
        callback(result.data)
    } catch (error) {}
}

const Announcement = () => {
    const { t } = useTranslation()
    const [dataReady, setDataReady] = React.useState(false)
    const [pagination, setPagination] = React.useState(null)
    const [dataList, setDataList] = React.useState([])
    const contentRef = React.useRef(<div />)
    const [activeList, setActiveList] = React.useState({})

    React.useEffect(() => {
        webNoticeList({}, function (data) {
            setPagination(data.count)
            setDataList(data.list)
            setDataReady(true)
        })
        // eslint-disable-next-line
    }, [i18n.language])
    return (
        <>
            <div className="card shadow col-9 my-5 mx-auto border-0" style={{ borderRadius: '20px' }}>
                <div className="card-body">
                    <h3 className="text-center">{t('Announcement center')}</h3>

                    <div className="d-grid gap-1">
                        {dataReady
                            ? dataList.map(list =>
                                <button key={list.id} type="button"
                                    data-bs-target="#exampleModal" data-bs-toggle="modal"
                                    className="p-2 border-0 bg-light d-flex justify-content-between"
                                    style={{
                                        "&:hover": {
                                            background: '#83bf4b'
                                        }
                                    }}
                                    onClick={() => { contentRef.current.innerHTML = list.content; setActiveList(list) }}>

                                    {list.title}

                                    <span>{list.ctime.split(' ')[0]}</span>
                                </button>
                            ) : <Loading />
                        }
                    </div>

                    {/* Pagination */}
                    <Stack alignItems="center">
                        <Pagination count={parseInt(Number(pagination) / 10)} size="small" defaultPage={1} shape="rounded"
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    "&:hover,:target,:active": {
                                        backgroundColor: 'transparent',
                                        color: '#83bf4b'
                                    },
                                },
                                "& .Mui-selected": {
                                    backgroundColor: 'transparent !important',
                                    color: '#83bf4b'
                                }
                            }}
                            onChange={(e, page) => webNoticeList({ page: page }, (data) => setDataList(data.list))} />
                    </Stack>

                    {/* Modal */}
                    <div className="modal fade scrollbar" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-xl">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">{activeList.title}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body ref-img" ref={contentRef}></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}


const Index = () => (
    <>
        <TopBanner
            background={Announcement_topbanner}
            titles={["Announcement"]}
            subtitles={["It is closely related to your transaction,such as trading time adjustments, contract expiration reminders,etc."]} />

        <Router basename={'/Resources'}>
            <Switch>
                <Route exact path="/Announcement" component={Announcement} />
            </Switch>
        </Router>

        <OpenAccountSimple />
        <AwardCarousel />
    </>
)

export default Index
