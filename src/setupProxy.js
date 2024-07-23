const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/MainBoard",
    createProxyMiddleware({
      target: "http://192.168.219.111:5000",
      changeOrigin: true,
    })
  );
}