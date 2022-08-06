const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");
const customer = require("../Models/Customer");
const sales = require("../Models/Sales");

exports.getHome = async(req,res,next) => {
    res.render('./Home' , {
        page_title : "MyCustomer" , 
        path : "/"
    });
}


exports.GetCustomers = async (req,res,next) => {
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        const admin_data = await customer.find({admin_id:admin_id});
      //  console.log(admin_data);
        res.render('./Dashboard' , {
            page_title : "Dashboard" , 
            path : "./dashboard" , 
            admin_data : admin_data
        });
        // res.status(201).json({
        //     message : "data received" , 
        //     data : admin_data
        // });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }    
}

exports.GetAllSales = async (req,res,next) => {
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        const sales_data = await sales.find({admin_id : admin_id});
        res.render("./Sales" , {
            data : sales_data , 
            page_title : "All Sales" , 
            path : "./sales"
        });
        // res.status(201).json({
        //     message : "data received" , 
        //     data : sales_data
        // });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }
}

exports.GetCustomerSales = async (req,res,next) => {
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        console.log(req.params);
        let customer_id = req.params.customer_id;
        const sales_data = await sales.find({
            $and :[
                {admin_id : admin_id}  , 
                {customer_id : customer_id }
            ]
        });
        res.render('./Sales' , {
            path : "/sales/customerSales" , 
            page_title : "Customer's Sales" , 
            data : sales_data
        })
        // res.status(201).json({
        //     message : "data received" , 
        //     data : sales_data
        // });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }
}