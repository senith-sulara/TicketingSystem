const express = require("express");
const {
  addSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
} = require("../controllers/scheduleController");

const router = express.Router();

router.post("/add", addSchedule);
router.get("/get", getSchedule);
router.put("/update/:id", updateSchedule);
router.delete("/delete/:id", deleteSchedule);

module.exports = {
  routes: router,
};
