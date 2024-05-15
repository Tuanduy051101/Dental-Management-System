const express = require("express");
const institutions = require("../controllers/institution.controller");
const router = express.Router();

router.route("/")
    .post(institutions.create)

router.route("/:id")
    .put(institutions.update)

module.exports = router;