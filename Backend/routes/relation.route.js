const express = require("express");
const { relationControllers } = require("../controllers");
const router = express.Router();

router.get("/", relationControllers.listRelation);

module.exports = router;
