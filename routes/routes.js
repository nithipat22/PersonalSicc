const express = require('express');
const router = express.Router();

const login = require('../controller/user/login');
const register = require('../controller/user/register');
const resetpassword = require('../controller/user/resetpassword');
const deleteUser = require('../controller/user/delete')


router.post('/login', login);
router.post('/register', register);
router.post('/resetpassword', resetpassword);
router.delete('/delete', deleteUser);


module.exports = router;
