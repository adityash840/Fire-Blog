const { verifyToken } = require("../utils/auth");

function checkCookieAuth(Cookie) {
  return (req, res, next) => {
    const token = req.cookies[Cookie];
    if (!token) {
      return next();
    }

    try {
      const payload = verifyToken(token);
      req.user = payload;
    } catch (error) {}
    return next();
  };
}

module.exports = {
  checkCookieAuth,
};
