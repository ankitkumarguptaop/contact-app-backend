const express = require("express");
const { autUserControllers } = require("../controllers");
const { uploadPicture } = require("../middlewares/upload-picture.middleware");
const router = express.Router();

router.post("/signin", autUserControllers.signIn);

router.post(
  "/signup",
  uploadPicture().single("picture"),
  autUserControllers.signUp
);
router.post("/google", autUserControllers.googleAuth);

module.exports = router;
