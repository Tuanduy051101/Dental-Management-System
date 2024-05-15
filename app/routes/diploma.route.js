const express = require("express");
const diplomas = require("../controllers/diploma.controller");
const router = express.Router();

router.route("/")
    .post(diplomas.create)
    .get(diplomas.findAll)

router.route("/:id")
    .get(diplomas.find)
    .put(diplomas.update)

module.exports = router;