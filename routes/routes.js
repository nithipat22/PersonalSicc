const express = require('express');
const router = express.Router();

const login = require('../controller/user/login');
const register = require('../controller/user/register');
const resetpassword = require('../controller/user/resetpassword');
const deleteUser = require('../controller/user/delete');
const getallUsers = require('../controller/user/getalluse');
const getUser = require('../controller/user/getUser');
const updateUser = require('../controller/user/update');


router.post('/login', login);
router.post('/register', register);
router.post('/resetpassword', resetpassword);
router.delete('/delete', deleteUser);
router.get('/getallusers', getallUsers);
router.get('/getuser', getUser);
router.put('/user/:id', updateUser);


module.exports = router;
