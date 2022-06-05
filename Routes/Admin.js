const express = require('express');
const { AddCustomer } = require('../Controllers/Create');
const { DeleteCustomer } = require('../Controllers/Delete');
const { GetCustomers } = require('../Controllers/Read');
const { UpdateCustomer } = require('../Controllers/Update');
const router = express.Router();

// Admin signup/signin
app.post('/register')
app.post('/login')


// Admin powers
app.get('/dashboard' , GetCustomers);
app.post('/add' , AddCustomer);
app.post('/update' , UpdateCustomer);
app.post('/delete' , DeleteCustomer);


module.exports = router;