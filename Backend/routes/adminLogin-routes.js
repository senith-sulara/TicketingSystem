const express = require("express");
const { Login, getAdminLog } = require("../controllers/adminLoginController");

const router = express.Router();

router.post("/adminLog", Login);
router.get("/adminlog/:id", getAdminLog);

module.exports = {
  routes: router,
};
