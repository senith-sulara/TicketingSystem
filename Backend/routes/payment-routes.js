const express = require("express");
const router = express.Router();
const addPayment = require("../controllers/paymentController");
const getPayment = require("../controllers/paymentController");
const deleteRow = require("../controllers/paymentController");

router.post("/payment", addPayment.addPayment);
router.get("/getpayment", getPayment.getPayment);
router.delete("/deleterow/:id", deleteRow.deleteRow);

module.exports = router;
