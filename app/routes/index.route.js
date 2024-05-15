const express = require("express");
const admins = require("../utils/admin.util");
const router = express.Router();

router.route("/")
    .post(admins.create)

module.exports = router;