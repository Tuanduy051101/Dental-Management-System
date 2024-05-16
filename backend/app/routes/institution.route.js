const express = require("express");
const institutions = require("../controllers/institution.controller");
const router = express.Router();

router.route("/")
    .post(institutions.create)
    .get(institutions.findAll)

router.route("/:id")
    .get(institutions.find)
    
module.exports = router;