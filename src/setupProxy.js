const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
    const TOP_OPENAPI = createProxyMiddleware('/topapi', {
        // target: 'http://192.168.75.53:3032' || 'https://restful.pubhx.com:3032' || 'https://openapi.topopenapi.com' || process.env.REACT_APP_TOP_OPENAPI_HOST,
        target: process.env.REACT_APP_TOP_OPENAPI_HOST || 'https://restful.pubhx.com:3032' || 'https://openapi.topopenapi.com' || 'http://192.168.75.53:3032',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/topapi': '/'
        },
        toProxy: true
    })
    const OPENAPI = createProxyMiddleware('/api', {
        target: process.env.REACT_APP_OPENAPI_HOST,
        changeOrigin: true,
        ws: true,
        pathRewrite: {
            '^/api': '/'
        },
    })

    app.use(TOP_OPENAPI)
    app.use(OPENAPI)
};

