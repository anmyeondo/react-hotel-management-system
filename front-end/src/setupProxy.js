const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/users", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/customers", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
