const { ObjectId } = require("mongodb");
const customer = require("../Models/Customer");

exports.UpdateCustomer = async(req,res,next) => {
    const customer_id = req.body.id;
    customer_id=ObjectId(customer_id);
    const existing = await customer.findOne({_id : customer_id});

    if(existing){
        const name = (req.body.name ? req.body.name : "");
        const contact_num = (req.body.contact_num ? req.body.contact_num : "");
        const email = req.body.email;
        const address = req.body.address;

        let errors = [];
        if(contact_num.length !== 10){
            errors.push("Invalid contact number ");
        }

        if(email.length !== 0){
            let ans = email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            exist = !ans;
            if (exist) {
                errors.push("Given email is invalid");
            }
        }
        if(errors.length === 0){
            const data = new customer(name,contact_num,email,address);
            
            const saved  = await data.save();

            console.log(saved);

            res.status(201).json({
                message : "customer updated" , 
                data : saved , 
                errors :[]
            })
        }
        else{
            res.status(401).json({
                message : "invalid informations" , 
                data : null , 
                errors : errors
            })
        }
    }
}