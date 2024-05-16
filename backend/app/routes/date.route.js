const express = require("express");
const dates = require("../controllers/date.controller");
const router = express.Router();

router.route("/")
    .post(dates.create)
    .get(dates.findAll)

module.exports = router;