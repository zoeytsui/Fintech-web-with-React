const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    const topapi = createProxyMiddleware('/topapi', {
        target: process.env.REACT_APP_TOP_OPENAPI_HOST,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/topapi': '/'
        },
        toProxy: true
    })
    // const api = createProxyMiddleware(`/${process.env.REACT_APP_OPENAPI_HOST}`, {
    const api = createProxyMiddleware('/api', {
        target: process.env.REACT_APP_OPENAPI_HOST,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '/'
        },
        // toProxy: false
    })

    if (process.env.NODE_ENV !== 'production') {
        app.use(topapi)
        app.use(api)
    } else {
        console.log('production mode:', topapi);
    }

};