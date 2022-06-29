const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");
const customer = require("../Models/Customer");

exports.getAddCustomer = async(req,res,next) => {
    res.render('./AddCustomer');
}

exports.AddCustomer = async (req,res,next) => {
    try {
        console.log("in add customer ",req.user);
        const name = (req.body.name ? req.body.name : "");
        const contact_num = (req.body.contact_num ? req.body.contact_num : "");
        const email = req.body.email || "";
        const address = req.body.address || "";
        // const amount = ( req.body.amount ? parseFloat(req.body.amount) : 0 );
        // const paid = (req.body.paid ? req.body.paid : null);
        let errors = [];
        if(contact_num.length !== 10){
            errors.push("Invalid contact number ");
        }

        if(email.length !== 0){
            let ans = email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            let exist = !ans;
            if (exist) {
                errors.push("Given email is invalid");
            }
        }

        let existing = await customer.findOne({
            $or : [
                {name : name} , {contact_num : contact_num} , {email : email}
            ]
        });
        if(existing){
            errors.push("user already exist");
        }
        if(errors.length === 0){
            let customer_obj = {
                name
                ,contact_num
                ,email
                ,address , 
                admin_id : ObjectId(req.body.admin_id)
            }
            // if(amount !== 0 && paid !== null){
            //     const sale_obj = {
            //         amount : amount , 
            //         date : new Date(Date.now()).toString() , 
            //         paid : paid
            //     }
            //     customer_obj.sales.push(sale_obj);
            // }
            const data = new customer(customer_obj);
            
            const saved  = await data.save();
            
            console.log(saved);
            
            res.status(201).json({
                message : "customer added" , 
                data : saved , 
                errors :[]
            });
        }
        else{
            res.status(401).json({
                message : "invalid informations" , 
                data : null , 
                errors : errors
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        })
    }
}