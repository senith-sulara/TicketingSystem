const express = require("express");
const router = express.Router();
const PurchaseHistory = require("../controllers/purchaseHistoryController");

router.post("/purchaseHistory", PurchaseHistory.addHistory);

module.exports = router;
