const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/commentControl")
const { authenticateUser } = require("../middleware/auth");

router.post("/comment/:id", authenticateUser, commentCtrl.addComment );

module.exports = router;