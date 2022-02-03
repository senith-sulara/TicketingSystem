const express = require('express');
const {addToken,
       getAllTokens,
       getToken,
       updateToken,
       deleteToken,
       getSumTokens,
       getSumPaid,
       getpaidcount,
       getAllRech
      } = require('../controllers/tokenController');

const router = express.Router();

router.post('/token', addToken);
router.get('/tokens', getAllTokens);
router.get('/token/:id', getToken);
router.put('/token/:id', updateToken);
router.delete('/token/:id', deleteToken);
router.get('/tokensum', getSumTokens);
router.get('/tokenpaidsum', getSumPaid);
router.get('/tokenpaidcount', getpaidcount);
router.get('/PaidAll', getAllRech);




module.exports = {
    routes: router
}