const express = require("express");
const diplomas = require("../controllers/diploma.controller");
const router = express.Router();

router.route("/")
    .post(diplomas.create)
    .get(diplomas.findAll)

module.exports = router;