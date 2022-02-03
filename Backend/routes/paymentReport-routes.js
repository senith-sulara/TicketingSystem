const express = require("express");
const { getPayment } = require("../controllers/paymentReportController");

const router = express.Router();

router.get("/get", getPayment);

module.exports = {
  routes: router,
};
