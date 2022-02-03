"use strict";

const firebase = require("../db");
const Payment = require("../models/payment");
const firestore = firebase.firestore();

const addPayment = async (req, res, next) => {
  try {
    const data = req.body;
    await firestore.collection("payments").doc().set(data);
    res.send("Record saved successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getPayment = async (req, res, next) => {
  try {
    const payments = await firestore.collection("payments");
    const data = await payments.get();
    const paymentsArray = [];
    if (data.empty) {
      res.status(404).send("No payments found");
    } else {
      data.forEach((doc) => {
        const payment = new Payment(
          doc.id,
          doc.data().fromTo,
          doc.data().whereTo,
          doc.data().expireDate,
          doc.data().name,
          doc.data().amount,
          doc.data().amount,
          doc.data().amount
        );
        paymentsArray.push(payment);
        console.log(payment);
      });
      res.send(paymentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteRow = async (req, res, next) => {
  try {
    const id = req.params.id;
    await firestore.collection("payments").doc(id).delete();
    res.send("Record deleted successfuly");
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = {
  addPayment,
  getPayment,
  deleteRow,
};
