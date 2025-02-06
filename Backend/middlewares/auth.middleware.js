const jwt = require("jsonwebtoken");
const { userModel } = require("../models");
const users = userModel.User;

exports.jwtTokenValidation = async (req, res, next) => {
  let token;
  try {
    token = req?.cookies?.jwt;
    token = console.log(token);
    if (token) {
      console.log("token", token);
      const authenticatedUser = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await users
        .findById(authenticatedUser._id)
        .select("-password");
      next();
    } else {
      res.status(401).json({ error: "Not authorized no Token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Not authorized" });
  }
};
