const express = require("express");
const router = express.Router();
const getInspection = require("../controllers/InspectionController");
const addInspection = require("../controllers/InspectionController");
const deleteReport = require("../controllers/InspectionController");

router.post("/addinspection", addInspection.addInspection);
router.get("/inspection", getInspection.getInspection);
router.delete("/deleteinspection/:id", deleteReport.deleteReport);

module.exports = router;
