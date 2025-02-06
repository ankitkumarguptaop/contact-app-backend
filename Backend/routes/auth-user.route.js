const express = require("express");
const { authUserControllers } = require("../controllers");
const { uploadPicture } = require("../middlewares/upload-picture.middleware");
const router = express.Router();

router.post("/signin", authUserControllers.signIn);
router.post(
  "/signup",
  uploadPicture().single("picture"),
  authUserControllers.signUp,
);
router.post("/google", authUserControllers.googleAuth);
module.exports = router;
