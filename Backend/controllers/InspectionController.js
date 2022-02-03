"use strict";

const firebase = require("../db");
const Inspection = require("../models/inspection");
const firestore = firebase.firestore();

const addInspection = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("inspectionReports").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getInspection = async (req, res, next) => {
  try {
    const inspectionReports = await firestore.collection("inspectionReports");
    const data = await inspectionReports.get();
    const inspectionArray = [];
    if (data.empty) {
      res.status(404).send("No inspectionReports found");
    } else {
      data.forEach((doc) => {
        const inspectionReport = new Inspection(
          doc.id,
          doc.data().busNo,
          doc.data().date,
          doc.data().bid,
          doc.data().passengerId,
          doc.data().btime
        );
        inspectionArray.push(inspectionReport);
      });
      res.send(inspectionArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteReport = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("inspectionReports").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addInspection,
  getInspection,
  deleteReport,
};
