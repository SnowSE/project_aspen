const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/swagger", "/api/"],
    createProxyMiddleware({
      target: "http://aspen_api:5238",
    })
  )
}