"use strict";

const firebase = require("../db");
const ForeignPayment = require("../models/foreignPayment");
const firestore = firebase.firestore();

const addPayment = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("ForeignPayments").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addPayment,
};
