require("dotenv").config();
const jwt = require('jsonwebtoken');
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(authHeader)

  const secret = process.env.JWT_SECRETE;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token, "tokennnnnnnnn")

    jwt.verify(token, secret, (err, user) => {
      console.log(err, "errrrr_--------")
      if (err) {
        return res.json({ status: "failed", message: "Jwt Token expired", data: [] });
        //return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    return res.json({ status: "failed", message: "Jwt Token Must Be Provided", data: [] });
    //res.sendStatus(401);
  }
};

module.exports = authenticateJWT;