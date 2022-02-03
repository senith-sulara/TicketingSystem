const express = require("express");
const router = express.Router();
const addPayment = require("../controllers/ForeignPaymentController");

router.post("/Foreignpayment", addPayment.addPayment);

module.exports = router;
