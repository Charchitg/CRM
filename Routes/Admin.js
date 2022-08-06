const express = require('express');
const { AddSale, getAddSale } = require('../Controllers/AddSales');
const { AddCustomer, getAddCustomer } = require('../Controllers/Create');
const { DeleteCustomer } = require('../Controllers/Delete');
const { DeleteSale } = require('../Controllers/DeleteSales');
const { Login, getLogin } = require('../Controllers/Login');
const { GetCustomers, GetAllSales, GetCustomerSales, getHome } = require('../Controllers/Read');
const { Register, getRegister } = require('../Controllers/Register');
const { UpdateCustomer, getUpdateCustomer } = require('../Controllers/Update');
const { UpdateSale, getUpdateSale } = require('../Controllers/UpdateSales');
const { authorised, notAuthorized } = require('../Jwt/Authorisation');
const router = express.Router();

// Admin signup/signin

router.get('/' , notAuthorized , getHome);
router.get('/register' , notAuthorized , getRegister);
router.post('/register' , notAuthorized , Register);

router.get('/login' , notAuthorized ,  getLogin);
router.post('/login' , notAuthorized , Login);
router.post("/logout", authorised , async (req, res) => {
    await res.clearCookie("accesstoken");
    res.redirect('/login');
  });

// Admin powers
router.get('/dashboard' , authorised, GetCustomers);
router.get('/sales' , authorised ,  GetAllSales);
router.get('/sales/:customer_id([0-9a-fA-F]{24})'  , authorised , GetCustomerSales);

router.get('/add' , authorised , getAddCustomer);
router.post('/add' , authorised , AddCustomer);


router.get('/update/:customer_id([0-9a-fA-F]{24})'  , getUpdateCustomer);
router.post('/update/:customer_id([0-9a-fA-F]{24})' , authorised , UpdateCustomer);

router.get('/delete/:customer_id([0-9a-fA-F]{24})' , DeleteCustomer);


router.get("/add_sale" , authorised , getAddSale)
router.post('/add_sale' , authorised , AddSale)

router.get('/update_sale/:customer_id([0-9a-fA-F]{24})/:sale_id([0-9a-fA-F]{24})' , authorised , getUpdateSale);
router.post('/update_sale/:customer_id([0-9a-fA-F]{24})/:sale_id([0-9a-fA-F]{24})' , authorised , UpdateSale);


router.get('/delete_sale/:sale_id([0-9a-fA-F]{24})'  , authorised , DeleteSale);


module.exports = router;