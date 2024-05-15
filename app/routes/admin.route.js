const express = require("express");
const admins = require("../controllers/admin.controller");
const router = express.Router();

router.route("/")
    .get()
    .post(admins.create)
    .put()
    .delete();

router.route("/").get().post().put().delete();

router.route("/").get().post().put().delete();

module.exports = router;