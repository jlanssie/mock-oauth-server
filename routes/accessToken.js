const express = require("express");
const router = express.Router();
const { isValidToken } = require("../utils/_index");

const authConf = require("../config/auth.json");
const routesConf = require("../config/routes.json");

const handleAccessToken = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (isValidToken(token)) {
    res.json({
      access_token: authConf.ACCESS_TOKEN,
      scope: authConf.SCOPE,
      token_type: "Bearer",
      expires_in: authConf.EXPIRY_RANGE,
    });
  } else {
    res.status(401).json({
      error: "invalid_token",
      error_description: "The access token expired, revoked, or is malformed",
    });
  }
};

routesConf.ACCESS_TOKEN_URLS.forEach((endpoint) => {
  router.post(endpoint, handleAccessToken);
});

module.exports = router;
