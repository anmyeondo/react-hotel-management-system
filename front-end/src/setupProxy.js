const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/users", {
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/customers", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/staffs", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/reservations", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/image", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/modules", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rooms", {
      target: "http://localhost:5000/",
      changeOrigin: true,
    })
  );
};
