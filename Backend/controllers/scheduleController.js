"use strict";

const firebase = require("../db");
const Schedule = require("../models/schedule");
const firestore = firebase.firestore();

const addSchedule = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("schedules").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getSchedule = async (req, res, next) => {
  try {
    const schedules = await firestore.collection("schedules");
    const data = await schedules.get();
    const schedulesArray = [];
    if (data.empty) {
      res.status(404).send("No schedule record found");
    } else {
      data.forEach((doc) => {
        const schedule = new Schedule(
          doc.id,
          doc.data().busNumber,
          doc.data().driver,
          doc.data().depature,
          doc.data().destination,
          doc.data().time
        );
        schedulesArray.push(schedule);
      });
      res.send(schedulesArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateSchedule = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const schedule = await firestore.collection("schedules").doc(id);
    await schedule.update(data);
    res.send(schedule);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteSchedule = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('schedules').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
  addSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
