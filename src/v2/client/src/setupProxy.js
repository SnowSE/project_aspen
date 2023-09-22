const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    ["/swagger", "/api/"],
    createProxyMiddleware({
      target: "http://localhost:5238",
    })
  )
}