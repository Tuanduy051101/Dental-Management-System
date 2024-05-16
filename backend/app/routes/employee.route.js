const express = require("express");
const employees = require("../controllers/employee.controller");
const router = express.Router();

router.route("/")
    .post(employees.create)
    .get(employees.findAll)
    .put(employees.update)

router.route("/:id")
    .delete(employees.delete)
    .get(employees.find)

module.exports = router;