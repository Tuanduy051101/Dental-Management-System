const express = require("express");
const medicines = require("../controllers/medicine.controller");
const router = express.Router();

router.route("/")
    .get(medicines.findAll)
    .post(medicines.create)

module.exports = router;