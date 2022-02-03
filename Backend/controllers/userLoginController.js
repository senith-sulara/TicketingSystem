'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();
const jwt = require("jsonwebtoken");

const Login = async (req, res, next) => {
    const { eid, password } = req.body;

    try {
        // const data = firestore.collection('users');

        const getuser = await firestore.collection('users').where('eid' , '==', eid).get().then(doc => {
            if(!doc.empty) {
              let user = doc.docs[0].data();
              doc.forEach(doc => user = doc.data())
                return user
            }
          })
        if (!getuser) return res.status(404).json({ message: "Account not found" });
        if(password != getuser.password)
            return res.status(404).json({message:"invalid Password"})
            if (getuser) {
                const token = jwt.sign(
                  {
                    email: getuser.eid,
                    userId: getuser._id,
                  },
                  "" + process.env.JWT_KEY,
                  {
                    expiresIn: "1h",
                  }
                );
          
                return res.status(200).json({
                  message: "Login successful",
                  user: getuser,
                  token: token,
                });
            }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getUserLog = async (req, res, next) => {
    try {
        const id = req.params.id;
        // const user = await firestore.collection('users').doc(id);
        // const data = await user.get();

        const user = await firestore.collection('users').where('eid' , '==', id).get().then
          ((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              let user = doc.data();
            // doc.forEach(doc => user = doc.data())
            console.log(doc.id, doc.data());
              res.send(doc.data())
             
            })
          })
          //  {
            // let user = querySnapshot.docs[0].data();
            //  doc.forEach(doc => user = doc.data())
            //   return user
          // }
        
        // console.log(id);
        // if(!user == null) {
        //     res.status(404).send('User with the given ID not found');
        // }else {
        //     res.send(user);
        // }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    Login,
    getUserLog
}