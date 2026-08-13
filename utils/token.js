const isValidToken = (token) => {
  return token && token.startsWith("valid-");
};

module.exports = { isValidToken };
