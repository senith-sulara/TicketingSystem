'use strict';

const firebase = require('../db');
const Token = require('../models/token');
const firestore = firebase.firestore();


const addToken = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('tokens').doc().set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTokens = async (req, res, next) => {
    try {
        const tokens = await firestore.collection('tokens');
        const data = await tokens.get();
        const tokensArray = [];
        if(data.empty) {
            res.status(404).send('No token record found');
        }else {
            data.forEach(doc => {
                const token = new Token(
                    doc.id,
                    doc.data().amount,
                    doc.data().cardNumber,
                    doc.data().cvv,
                    doc.data().expireDate,
                    doc.data().status
                );
                tokensArray.push(token);
            });
            res.send(tokensArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getToken = async (req, res, next) => {
    try {
        const id = req.params.id;
        const token = await firestore.collection('tokens').doc(id);
        const data = await token.get();
        if(!data.exists) {
            res.status(404).send('Token with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateToken = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const token =  await firestore.collection('tokens').doc(id);
        await token.update(data);
        res.send('Token record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteToken = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('tokens').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const getSumTokens = async (req, res, next) => {
    try {
        const tokens = await firestore.collection('tokens');
        const data = await tokens.get();
        if(data.empty) {
            res.status(404).send('No token record found');
        }else {
            var tot=0;
            data.forEach(doc => {
                if(doc.data().status == "recharge"){
                var total =  doc.data().amount;
                var t = parseInt(total);
                tot += t;
                }
                else if(doc.data().status == "paid"){
                    var tt = doc.data().amount;
                    var ttt = parseInt(tt);
                    tot -=ttt;
                }
            });
            res.status(200).send(tot + ".00 LKR");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getSumPaid = async (req, res, next) => {
    try {
        const tokens = await firestore.collection('tokens');
        const data = await tokens.get();
        if(data.empty) {
            res.status(404).send('No token record found');
        }else {
            var tot=0;
            data.forEach(doc => {
                if(doc.data().status == "paid"){
                var total =  doc.data().amount;
                var t = parseInt(total);
                tot += t;
                }
            });
            res.status(200).send(tot + ".00 LKR");
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getpaidcount = async (req, res, next) => {
    try {
        const tokens = await firestore.collection('tokens').where('status', '==', 'paid');
        const data = await tokens.get();
        if(data.empty) {
            res.status(404).send('No token record found');
        }else {
           const count = data.docs.length;
            res.status(200).send("" + count);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllRech = async (req, res, next) => {
    try {
        const tokens = await firestore.collection('tokens').where('status', '==', 'recharge');
        const data = await tokens.get();
        const tokensArray = [];
        if(data.empty) {
            res.status(404).send('No token record found');
        }else {
            data.forEach(doc => {
                const token = new Token(
                    doc.id,
                    doc.data().amount,
                    doc.data().cardNumber,
                    doc.data().cvv,
                    doc.data().expireDate,
                    doc.data().status
                );
                tokensArray.push(token);
            });
            res.send(tokensArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addToken,
    getAllTokens,
    getToken,
    updateToken,
    deleteToken,
    getSumTokens,
    getSumPaid,
    getpaidcount,
    getAllRech
}