const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");
const customer = require("../Models/Customer");
const sales = require("../Models/Sales");


exports.GetCustomers = async (req,res,next) => {
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        const admin_data = await customer.find({admin_id:admin_id});
        res.status(201).json({
            message : "data received" , 
            data : admin_data
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }    
}

exports.GetAllSales = async (req,res,next) => {
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        const sales_data = await sales.find({admin_id : admin_id});
        res.status(201).json({
            message : "data received" , 
            data : sales_data
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }
}

exports.GetCustomerSales = async (req,res,next) => {
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        let customer_id = req.body.customer_id;
        customer_id = ObjectId(customer_id);
        const sales_data = await sales.find({
            $and :[
                {admin_id : admin_id}  , 
                {customer_id : customer_id }
            ]
        });
        res.status(201).json({
            message : "data received" , 
            data : sales_data
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }
}