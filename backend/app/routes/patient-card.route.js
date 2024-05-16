const express = require("express");
const patientCards = require("../controllers/patient-card.controller");
const router = express.Router();

router.route("/")
    .get(patientCards.findAll)
    .post(patientCards.create)

router.route("/:id")
    .delete(patientCards.delete)
    .get(patientCards.find)
    .put(patientCards.update)
module.exports = router;