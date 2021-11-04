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

//price
export const isPrice = (val1 = Number, val2 = Number) => {
    console.log('(val1)', val1);
    console.log('(val2)', val2);
    return val1 > val2 ? 'increase' : val1 === val2 ? '' : 'fall'
};

const Utils = {
    timeFormatter,
    thousandsSeparator,
    objectToQueryString
}

export default Utils