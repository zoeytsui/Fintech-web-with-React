import React from 'react'

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    overTopBtn: {
        zIndex: 10,
        position: 'fixed',
        right: 0,
        bottom: 0,
        "& svg": {
            transform: 'scale(.8)',
            "&:hover": {
                opacity: .9,
                transform: 'scale(.85)',
                transition: 'transform .1s linear'
            }
        }
    }
})

export const SideBtn = () => {
    const classes = useStyles()

    const rootElement = document.documentElement
    const [show, setShow] = React.useState('0')

    document.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            setShow('1')
        } else {
            setShow('0')
        }
    });

    const goTop = (e) => {
        rootElement.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <div
            data-aos="fade-up"
            data-aos-anchor-placement="center-bottom"
            data-aos-offset="300"
            className={`flex-column d-none d-lg-flex ${classes.overTopBtn}`}
            style={{ opacity: `${show}` }}
        >
            {/* cs button */}
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="81" viewBox="0 0 82 81">
                    <g transform="translate(0.296)">
                        <ellipse fill="#83bf4b" cx="41" cy="40.5" rx="41" ry="40.5" transform="translate(-0.296 0)" />
                        <path fill="#fff" d="M230.647,1746.106H215.075a10.776,10.776,0,0,0-10.776,10.775V1771.5a2.572,2.572,0,0,0,2.731,2.584h23.618a10.777,10.777,0,0,0,10.776-10.776v-6.422A10.776,10.776,0,0,0,230.647,1746.106Zm-5.24,20.041H212.144a1.826,1.826,0,1,1,0-3.653h13.262a1.826,1.826,0,1,1,0,3.653Zm8.24-8.454h-21.5a1.827,1.827,0,1,1,0-3.654h21.5a1.827,1.827,0,1,1,0,3.654Z" transform="translate(-182.157 -1719.389)" />
                    </g>
                </svg>
            </div>

            {/* go top button */}
            <div onClick={goTop}>
                <svg xmlns="http://www.w3.org/2000/svg" width="82" height="81" viewBox="0 0 82 81"><g transform="translate(0.296 -0.408)">
                    <ellipse fill="#959595" opacity="0.546" cx="41" cy="40.5" rx="41" ry="40.5" transform="translate(-0.296 0.408)" />
                    <g transform="translate(21.504 21.504)">
                        <path fill="#fff" d="M-383.473,1276.028c-.345,0-1.052.671-1.052.671s-10.767,11.8-10.767,12.4.722.566.722.566h3.729c1.384,0,1.113,2.508,1.113,2.508v16.669h13.114v-16.669s-.27-2.508,1.113-2.508h3.73s.722.035.722-.566-10.767-12.4-10.767-12.4-.707-.671-1.053-.671Z" transform="translate(402.371 -1270.437)" />
                        <rect fill="#fff" width="38" height="4" rx="2" transform="translate(0.2 -0.096)" />
                    </g>
                </g>
                </svg>
            </div>
        </div>
    )
}

export default SideBtn