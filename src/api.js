const { default: Axios } = require("axios");

export const OPENAPI = Axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? '/api' : process.env.REACT_APP_OPENAPI_HOST
})
export const TOP_OPENAPI = Axios.create({
    baseURL: process.env.NODE_ENV !== 'production' ? '/topapi' : process.env.REACT_APP_TOP_OPENAPI_HOST
})