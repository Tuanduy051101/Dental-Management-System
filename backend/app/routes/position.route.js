const express = require("express");
const institutions = require("../controllers/position.controller");
const router = express.Router();

router.route("/")
    .get(institutions.findAll)
    .post(institutions.create)

module.exports = router;
