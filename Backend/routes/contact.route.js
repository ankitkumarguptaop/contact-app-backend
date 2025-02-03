const express = require("express");
const { contactControllers } = require("../controllers");
const router = express.Router();

router.get("/:user_id", contactControllers.listContact);
router.post("/", contactControllers.createContact);
router.patch("/:id", contactControllers.updateContact);
router.delete("/:id", contactControllers.deleteContact);

module.exports = router;
