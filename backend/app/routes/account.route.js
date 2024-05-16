const express = require("express");
const accounts = require("../controllers/account.controller");
const router = express.Router();

router.route("/")
    .post(accounts.create)
    .get(accounts.findAll)

module.exports = router;