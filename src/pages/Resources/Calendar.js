import React from 'react';
import i18n from "i18next";
import { TOP_OPENAPI } from 'api';
import { makeStyles } from '@mui/styles';
import { useTranslation } from "react-i18next";

import { isWeekend, format } from 'date-fns';
import { vi, ms, zhCN, enGB } from 'date-fns/locale'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, CalendarPicker } from '@mui/lab';

import { Checkbox, FormGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';

import TopBanner from 'components/TopBanner'
import Loading from 'components/Loading'
import OpenAccountSimple from 'components/OpenAccountSimple'

import calendar_topbanner from 'assets/images/resources/calendar_topbanner.png'

const useStyles = makeStyles({
    filterList: {
        borderRadius: '40px',
        minWidth: '300px',
        "& .container": {
            display: 'flex',
            flexWrap: 'wrap',
            listStyle: 'none',
            paddingLeft: 0,
            "& li .active, li button:hover": {
                borderRadius: '20px'
            }
        }
    },
    customCalendar: {
        "& .MuiCalendarPicker-root": {
            width: '100%',
            "& .PrivatePickersFadeTransitionGroup-root": {
                "& div": {
                    "& div:first-child": {
                        justifyContent: "space-evenly"
                    },
                    "& .PrivatePickersSlideTransition-root": {
                        "& div": {
                            "& div": {
                                justifyContent: "space-evenly"
                            }

                        }
                    }
                }
            }
        }

    }
})

const Circle = ({ color }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" stroke="#23383A" fill={color} className="bi bi-circle-fill" viewBox="0 0 16 16">
            <circle cx="8" cy="8" r="7" />
        </svg>
    )
}

const Calendar = () => {
    const styled = useStyles();
    const { t } = useTranslation();
    const [locale, setLocale] = React.useState(enGB);
    const [date, setDate] = React.useState(new Date());
    const [dataReady, setDataReady] = React.useState(false)
    const release_time = new Intl.DateTimeFormat('zh', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(date).replaceAll('/', '-')

    const [impactList, setImpactList] = React.useState(['low', 'medium', 'high'])
    const [FinanceData, setFinanceData] = React.useState([])
    const [countryList, setCountryList] = React.useState([])

    const country_flag = {
        BR: ['巴西', 'Brazil'],
        CNY: ['中国', 'China'],
        CO: ['哥伦比亚', 'Colombia'],
        HKD: ['中国香港', 'Hong Kong'],
        TWD: ['中国台湾', 'Taiwan'],
        USD: ['美国', 'United States'],
        GBP: ['英国', 'United Kingdom'],
        FI: ['芬兰', 'Finland'],
        FRF: ['法国', 'France'],
        DEM: ['德国', 'Germany'],
        JPY: ['日本', 'Japan'],
        KRW: ['韩国', 'Korea'],
        CAD: ['加拿大', 'Canada'],
        AUD: ['澳大利亚', 'Australia'],
        NZD: ['新西兰', 'New Zealand'],
        CHF: ['瑞士', 'Switzerland'],
        ESP: ['西班牙', 'Spain'],
        ITL: ['意大利', 'Italy'],
        IL: ['以色列', 'Israel'],
        IE: ['爱尔兰', 'Ireland'],
        INR: ['印度', 'India'],
        EUR: ['欧洲', '欧元区', 'Euro Area', 'European Union'],
        SGD: ['新加坡', 'Singapore'],
        PTE: ['葡萄牙', 'Portugal'],
        ATS: ['奥地利', 'Austria'],
        LUF: ['卢森堡', 'Luxembourg'],
        NLG: ['荷兰', 'Netherlands'],
        SUR: ['俄罗斯', 'Russia'],
        VND: ['越南', 'Vietnam']
    }

    // for ch
    const getFinanceData = async (params) => {
        try {
            const result = await (await TOP_OPENAPI.get(`tools/?service=news.getFinanceData`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            // eslint-disable-next-line
            result.data.list.financeData.map(list => {
                switch (list.importanceLevel) {
                    case 1:
                        list.importanceLevel = '低'
                        break;
                    case 2:
                        list.importanceLevel = '中'
                        break;

                    default:
                        list.importanceLevel = '高'
                        break;
                }
                setCountryList(val => [...val, ...[list.country]])
            })
            setFinanceData(result.data.list.financeData)
            setDataReady(true)
        } catch (error) {}
    }

    // for en, vi
    const getMultFinanceData = async (params) => {
        try {
            const result = await (await TOP_OPENAPI.get(`tools/?service=news.getMultFinanceData`, { params: params })).data
            if (result.ret !== 200) return console.error(`${result.ret}: ${result.msg}`)
            setFinanceData(result.data.list.financeData)
            result.data.list.financeData.map(list => setCountryList(val => [...val, ...[list.country]]))
            setDataReady(true)
        } catch (error) {}
    }

    const combineApi = () => {
        switch (i18n.language) {
            case 'vn':
                setLocale(vi)
                setImpactList(['low', 'medium', 'high'])
                getMultFinanceData({
                    release_time: release_time,
                    language: 'vi'
                })
                break;
            case 'my':
                // no my data
                setLocale(ms)
                setImpactList(['low', 'medium', 'high'])
                getMultFinanceData({
                    release_time: release_time,
                    language: 'en'
                })
                break;
            case 'ch':
                setLocale(zhCN)
                setImpactList(['低', '中', '高'])
                getFinanceData({
                    release_time: release_time,
                    source: 'jin10'
                })
                break;

            default:
                setLocale(enGB)
                setImpactList(['low', 'medium', 'high'])
                getMultFinanceData({
                    release_time: release_time,
                    language: 'en'
                })
                break;
        }
    }

    const toggleSelection = (e) => {
        // eslint-disable-next-line
        Array.from(document.getElementById('CalendarTable').querySelectorAll(`tr`)).map(tr => {
            if (tr.innerText.includes(e.target.value)) {
                e.target.checked
                    ? tr.style.display = ''
                    : tr.style.display = 'none'
            }
        });
    }

    const toggleImpact = (e) => {
        // eslint-disable-next-line
        Array.from(document.getElementById('CalendarTable').querySelectorAll(`tr`)).map(tr => {
            switch (true) {
                case e.target.value === '低' || e.target.value === 'low':
                    // eslint-disable-next-line
                    Array.from(tr.querySelectorAll('svg')).filter(svg => svg.id === "lowSvg").map(td => {
                        if (td.parentElement.parentElement === tr) {
                            e.target.checked
                                ? tr.style.display = ''
                                : tr.style.display = 'none'
                        }
                    })
                    break;
                case e.target.value === '中' || e.target.value === 'medium':
                    // eslint-disable-next-line
                    Array.from(tr.querySelectorAll('svg')).filter(svg => svg.id === "mediumSvg").map(td => {
                        if (td.parentElement.parentElement === tr) {
                            e.target.checked
                                ? tr.style.display = ''
                                : tr.style.display = 'none'
                        }
                    })
                    break;
                case e.target.value === '高' || e.target.value === 'high':
                    // eslint-disable-next-line
                    Array.from(tr.querySelectorAll('svg')).filter(svg => svg.id === "highSvg").map(td => {
                        if (td.parentElement.parentElement === tr) {
                            e.target.checked
                                ? tr.style.display = ''
                                : tr.style.display = 'none'
                        }
                    })
                    break;

                default:
                    break;
            }
        });
    }

    const handleCountryFlagSrc = (country) => {
        let key = Object.keys(country_flag).find(i => country_flag[i].includes(country))
        return key !== undefined
            ? `/country_flag/${key}.png`
            : `/country_flag/normal.png`
    }

    React.useEffect(() => {
        combineApi()
        setCountryList([])
        // eslint-disable-next-line
    }, [i18n.language, date])
    return (
        <>
            <TopBanner
                background={calendar_topbanner}
                titles={["Financial Calendar"]}
                subtitles={["Update global economic data in real time, trace the past, and grasp the future."]} />

            <div className="card shadow col-12 col-lg-9 my-5 mx-auto border-0" style={{ borderRadius: '20px' }}>
                <div className={`card-body ${styled.customCalendar}`}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <CalendarPicker date={date} shouldDisableDate={isWeekend} onChange={(newDate) => setDate(newDate)} />
                    </LocalizationProvider>
                </div>
            </div>

            <div className="card shadow col-12 col-lg-9 my-5 mx-auto border-0" style={{ borderRadius: '20px' }}>
                <div className="card-body">
                    {/* header */}
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="hstack gap-3 p-3">
                            <div>
                                <h4>{format(date, 'MMM', { locale: locale })}</h4>
                                <h1>{format(date, 'do', { locale: locale })}</h1>
                            </div>
                            <div className="vr"></div>
                            <h1>{format(date, 'EEEE', { locale: locale })}</h1>
                        </div>
                        {/* Filter */}
                        <div className="dropdown">
                            <button className="btn link-primary dropdown-toggle" type="button" id="Filter" data-bs-toggle="dropdown" aria-expanded="false">
                                {t('Filter')}
                            </button>
                            <div className={`dropdown-menu dropdown-menu-end collapse shadow border-0 p-0 ${styled.filterList}`} aria-labelledby="Filter">
                                <div className="card border-0" style={{ borderRadius: '40px' }}>
                                    <FormControl component="fieldset">
                                        {/* Region */}
                                        <div className="card-body">
                                            <FormLabel component="legend" className="text-secondary"><small>{t('Region')}</small></FormLabel>
                                            <FormGroup id="filterList" sx={{ justifyContent: 'space-between' }} >
                                                {Array.from(new Set(countryList)).map(key =>
                                                    <FormControlLabel
                                                        key={key}
                                                        value={key}
                                                        control={<Checkbox
                                                            defaultChecked
                                                            icon={<Circle color="transparent" />}
                                                            checkedIcon={<Circle color="#83bf4b" />}
                                                        />}
                                                        onChange={(e) => toggleSelection(e)}
                                                        label={key}
                                                        labelPlacement="start"
                                                        sx={{ textAlign: 'right' }}
                                                    />
                                                )}
                                            </FormGroup>
                                        </div>

                                        {/* Impact */}
                                        <div className="card-header bg-light" style={{ borderRadius: '0 0 40px 40px' }}>
                                            <FormLabel component="legend" className="text-secondary"><small>{t('Impact')}</small></FormLabel>
                                            <FormGroup id="filterList" sx={{ justifyContent: 'space-between' }} >
                                                {impactList.map((key, index) =>
                                                    <FormControlLabel
                                                        key={key}
                                                        value={key}
                                                        control={<Checkbox
                                                            defaultChecked
                                                            icon={<Circle color="transparent" />}
                                                            checkedIcon={index === 0 ? <Circle color="#B3E585" /> : index === 1 ? <Circle color="#81C444" /> : <Circle color="#478E05" />}
                                                        />}
                                                        onChange={(e) => toggleImpact(e)}
                                                        label={key}
                                                        labelPlacement="start"
                                                    />
                                                )}
                                            </FormGroup>
                                        </div>

                                    </FormControl>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* body */}
                    {FinanceData.length > 0
                        ? <div className="table-responsive scrollbar">
                            <table id="CalendarTable" className="table table-borderless table-hover table-striped table-responsive">
                                <thead>
                                    <tr className="text-secondary">
                                        <th scope="col" className="fw-light"><small>{t('Time')}</small></th>
                                        <th scope="col" className="fw-light"><small>{t('Region')}</small></th>
                                        <th scope="col" className="fw-light"><small>{t('Content')}</small></th>
                                        <th scope="col" className="fw-light"><small>{t('Impact')}</small></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {FinanceData.map((list, index) =>
                                        <tr key={index}>
                                            <td>{list.time ? list.time : list.ctime.split(' ')[1]}</td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <img className="mx-1" src={handleCountryFlagSrc(list.country)} alt={list.country} />
                                                    <span>{list.country}</span>
                                                </div>
                                            </td>
                                            <td>{list.name}</td>
                                            <td>
                                                {list.star === 'low' || list.importanceLevel === '低'
                                                    ? <svg xmlns="http://www.w3.org/2000/svg" id="lowSvg" width="48" height="16" className="bi bi-circle-fill" viewBox="0 0 48 16">
                                                        <circle cx="8" cy="8" r="7" stroke="#23383A" fill={'#B3E585'} />
                                                        <circle cx="24" cy="8" r="7" stroke="#23383A" fill={'transparent'} />
                                                        <circle cx="40" cy="8" r="7" stroke="#23383A" fill={'transparent'} />
                                                    </svg>
                                                    : list.star === 'medium' || list.importanceLevel === '中'
                                                        ? <svg xmlns="http://www.w3.org/2000/svg" id="mediumSvg" width="48" height="16" className="bi bi-circle-fill" viewBox="0 0 48 16">
                                                            <circle cx="8" cy="8" r="7" stroke="#23383A" fill={'#B3E585'} />
                                                            <circle cx="24" cy="8" r="7" stroke="#23383A" fill={'#81C444'} />
                                                            <circle cx="40" cy="8" r="7" stroke="#23383A" fill={'transparent'} />
                                                        </svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" id="highSvg" width="48" height="16" className="bi bi-circle-fill" viewBox="0 0 48 16">
                                                            <circle cx="8" cy="8" r="7" stroke="#23383A" fill={'#B3E585'} />
                                                            <circle cx="24" cy="8" r="7" stroke="#23383A" fill={'#81C444'} />
                                                            <circle cx="40" cy="8" r="7" stroke="#23383A" fill={'#478E05'} />
                                                        </svg>
                                                }
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                        : dataReady
                            ? <h3 className="text-center">{t('No results')}</h3>
                            : <Loading />
                    }
                </div>
            </div>

            <OpenAccountSimple />
        </>
    )
}

export default Calendar
