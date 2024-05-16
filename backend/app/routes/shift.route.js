const express = require("express");
const shifts = require("../controllers/shift.controller");
const router = express.Router();

router.route("/")
    .post(shifts.create)
    .get(shifts.findAll)

module.exports = router;