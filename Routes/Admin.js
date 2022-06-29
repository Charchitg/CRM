const express = require('express');
const { AddSale } = require('../Controllers/AddSales');
const { AddCustomer, getAddCustomer } = require('../Controllers/Create');
const { DeleteCustomer } = require('../Controllers/Delete');
const { DeleteSale } = require('../Controllers/DeleteSales');
const { Login, getLogin } = require('../Controllers/Login');
const { GetCustomers, GetAllSales, GetCustomerSales } = require('../Controllers/Read');
const { Register, getRegister } = require('../Controllers/Register');
const { UpdateCustomer } = require('../Controllers/Update');
const { UpdateSale } = require('../Controllers/UpdateSales');
const { authorised } = require('../Jwt/Authorisation');
const router = express.Router();

// Admin signup/signin
router.get('/register' , getRegister);
router.post('/register' , Register);

router.get('/login' ,getLogin);
router.post('/login' , Login);
router.post("/logout", authorised , async (req, res) => {
    await res.clearCookie("accesstoken");
    res.redirect('/login');
  });

// Admin powers
router.get('/dashboard' , GetCustomers);
router.get('/sales' , GetAllSales);
router.get('/sales/:customer_email' , GetCustomerSales);

router.get('/add' , authorised , getAddCustomer);
router.post('/add' , authorised , AddCustomer);
router.post('/update' , authorised , UpdateCustomer);
router.post('/delete' , DeleteCustomer);
router.post('/add_sale' , AddSale)
router.post('/update_sale' , UpdateSale);
router.post('/delete_sale' , DeleteSale);


module.exports = router;