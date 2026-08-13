const defaultRoute = require("./default");
const accessTokenRouter = require("./accessToken");
const introspectionRouter = require("./introspection");
const userInfoRouter = require("./userInfo");

const initRoutes = (app) => {
  app.use(accessTokenRouter);
  app.use(introspectionRouter);
  app.use(userInfoRouter);

  app.use(defaultRoute);
};

module.exports = { initRoutes };
