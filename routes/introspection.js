const express = require("express");
const router = express.Router();
const { isValidToken } = require("../utils/_index");

const authConf = require("../config/auth.json");
const userConf = require("../config/user.json");
const routesConf = require("../config/routes.json");

const handleIntrospection = (req, res) => {
  const token = req.body.token;

  if (isValidToken(token)) {
    res.json({
      active: true,
      scope: authConf.SCOPE,
      client_id: req.body.client_id || "client-id",
      sub: userConf.SUB,
      username: userConf.USERNAME,
      exp: Math.floor(Date.now() / 1000) + authConf.EXPIRY_RANGE,
    });
  } else {
    res.json({ active: false });
  }
};

routesConf.INTROSPECTION_URLS.forEach((endpoint) => {
  router.post(endpoint, handleIntrospection);
});

module.exports = router;
