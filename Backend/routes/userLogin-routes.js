const express = require('express');
const {Login,
    getUserLog
      } = require('../controllers/userLoginController');

const router = express.Router();

router.post('/userLog', Login);
router.get('/userlog/:id', getUserLog);



module.exports = {
    routes: router
}