const express = require('express');
const { AddCustomer } = require('../Controllers/Create');
const { DeleteCustomer } = require('../Controllers/Delete');
const { Login } = require('../Controllers/Login');
const { GetCustomers } = require('../Controllers/Read');
const { Register } = require('../Controllers/Register');
const { UpdateCustomer } = require('../Controllers/Update');
const router = express.Router();

// Admin signup/signin
router.post('/register' , Register)
router.post('/login' , Login)


// Admin powers
router.get('/dashboard' , GetCustomers);
router.post('/add' , AddCustomer);
router.post('/update' , UpdateCustomer);
router.post('/delete' , DeleteCustomer);


module.exports = router;