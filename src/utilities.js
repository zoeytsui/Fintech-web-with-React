import i18next from "i18next";
// language-sensitive date and time formatting, e.g: 2020-10-01 00:00:00 to 01/10/2020
export const timeFormatter = (time) => {
    return new Intl.DateTimeFormat(i18next.language).format(new Date(time));
}

// Number formatting with thousand separator
export const thousandsSeparator = (value) => {
    if (value === 0) return value;
    if (!value) return '0';
    value = Number.parseFloat(value).toFixed(8);
    return new Intl.NumberFormat(i18next.language, { maximumSignificantDigits: 20 }).format(value)
}

// Turn an Object into Query String Parameters
export const objectToQueryString = (obj) => {
    return Object.keys(obj).map(key => key + '=' + obj[key]).join('&');
}

// allow user to scroll by dragging table
export const draggableTable = (eleId) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const ele = document.getElementById(eleId);

    ele.addEventListener('mousedown', (e) => {
        // Change the cursor and prevent user from selecting the text
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            // The current scroll
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        ele.addEventListener('mousemove', mouseMoveHandler);
        ele.addEventListener('mouseup', mouseUpHandler);
    })

    const mouseMoveHandler = function (e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };
    const mouseUpHandler = function () {
        ele.removeEventListener('mousemove', mouseMoveHandler);
        ele.removeEventListener('mouseup', mouseUpHandler);

        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };
}

const Utils = {
    timeFormatter,
    thousandsSeparator,
    objectToQueryString,
    draggableTable
}

export default Utils