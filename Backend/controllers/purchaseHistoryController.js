"use strict";

const firebase = require("../db");
const PurchaseHistory = require("../models/purchaseHistory");
const firestore = firebase.firestore();

const addHistory = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("purchaseHistories").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  addHistory,
};
