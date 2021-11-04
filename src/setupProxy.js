const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(
            '/topapi', {
            target: 'https://openapi.pubhx.com',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/topapi': ''
            },
        }))
    app.use(
        createProxyMiddleware(
            '/api', {
            target: 'https://openapi.hxfxglobal.com',
            changeOrigin: true,
            ws: true,
            pathRewrite: {
                '^/api': ''
            },
        },
        )
    )
};