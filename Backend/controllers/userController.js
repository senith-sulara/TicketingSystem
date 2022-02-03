'use strict';

const firebase = require('../db');
const User = require('../models/user');
const firestore = firebase.firestore();

const addUser = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).send('No user record found');
        }else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().eid,
                    doc.data().name,
                    doc.data().email,
                    doc.data().address,
                    doc.data().contact,
                    doc.data().password
                );
                usersArray.push(user);
            });
            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await firestore.collection('users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await firestore.collection('users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUserpro = async (req, res, next) => {
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
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getUserpro
}