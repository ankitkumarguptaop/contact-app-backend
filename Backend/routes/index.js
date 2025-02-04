const express = require("express");
const router = express.Router();
const { authUserMiddleware } = require("../middlewares");
const {jwtTokenValidation }=require("../middlewares/auth.middleware")
router.use(
  "/users",
  authUserMiddleware.jwtTokenValidation,
  require("./user.route")
);
router.use("/auth", require("./auth-user.route"));
router.use("/contacts",require("./contact.route"));
router.use("/relations", require("./relation.route"));
// router.use("/relations", require("./relation.route"));

module.exports = router;
