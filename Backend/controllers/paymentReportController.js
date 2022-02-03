"use strict";

const firebase = require("../db");
const Payment = require("../models/payment");
const firestore = firebase.firestore();

const getPayment = async (req, res, next) => {
  try {
    const payments = await firestore.collection("payments");
    const data = await payments.get();
    const paymentsArray = [];
    if (data.empty) {
      res.status(404).send("No payment record found");
    } else {
      data.forEach((doc) => {
        const payment = new Payment(
          doc.id,
          doc.data().fromTo,
          doc.data().whereTo,
          doc.data().expireDate,
          doc.data().name,
          doc.data().amount,
        );
        paymentsArray.push(payment);
      });
      res.send(paymentsArray);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getPayment,
};
