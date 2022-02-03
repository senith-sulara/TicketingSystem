"use strict";

const firebase = require("../db");
const Admin = require("../models/admin");
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const getadmin = await firestore
      .collection("admin")
      .where("username", "==", username)
      .get()
      .then((doc) => {
        if (!doc.empty) {
          let admin = doc.docs[0].data();
          doc.forEach((doc) => (admin = doc.data()));
          return admin;
        }
      });
    if (!getadmin)
      return res.status(404).json({ message: "Account not found" });
    if (password != getadmin.password)
      return res.status(404).json({ message: "invalid Password" });
    if (getadmin) {
      const token = jwt.sign(
        {
          email: getadmin.username,
          id: getadmin.id,
        },
        "" + process.env.JWT_KEY,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        admin: getadmin,
        token: token,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getAdminLog = async (req, res, next) => {
  try {
    const id = req.params.id;
    const admin = await firestore
      .collection("admin")
      .where("username", "==", id)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let admin = doc.data();
          console.log(doc.id, doc.data());
          res.send(doc.data());
        });
      });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  Login,
  getAdminLog,
};
