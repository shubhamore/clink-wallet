const express = require('express');
const router = express.Router();

const { transferMoney,getUserByUsername} = require('../controllers/userController');

router.post('/transfer', transferMoney);
router.get('/:username', getUserByUsername);

module.exports = router;