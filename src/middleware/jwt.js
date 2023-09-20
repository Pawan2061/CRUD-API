const jwt = require("jsonwebtoken");

const createtoken = (payload) => {
  return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "600s" });
};

module.exports = createtoken;
