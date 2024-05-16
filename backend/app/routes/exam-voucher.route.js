const express = require("express");
const examVouchers = require("../controllers/exam-voucher.controller");
const router = express.Router();

router.route("/")
    .post(examVouchers.create)
    .get(examVouchers.findAll)

module.exports = router;