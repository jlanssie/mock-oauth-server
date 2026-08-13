const express = require("express");
const router = express.Router();
const { isValidToken } = require("../utils/_index");

const userConf = require("../config/user.json");
const routesConf = require("../config/routes.json");

const handleUserInfo = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (isValidToken(token)) {
    res.json({
      sub: userConf.SUB,
      name: userConf.NAME,
      email: userConf.EMAIL,
      preferred_username: userConf.USERNAME,
    });
  } else {
    res.status(401).json({
      error: "invalid_token",
      error_description: "The access token expired, revoked, or is malformed",
    });
  }
};

routesConf.USER_INFO_URLS.forEach((endpoint) => {
  router.post(endpoint, handleUserInfo);
});

module.exports = router;
