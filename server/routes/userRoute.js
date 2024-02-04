const express = require('express');
const router = express.Router();

const { transferMoney,getUserByUsername,getUserTransactions} = require('../controllers/userController');
const verifyToken  = require('../middleware/verifyToken');

router.post('/transfer',verifyToken, transferMoney);
router.get('/:username',verifyToken, getUserByUsername);
router.get('/transactions/:username',verifyToken, getUserTransactions);
module.exports = router;