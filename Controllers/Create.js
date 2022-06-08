const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");
const customer = require("../Models/Customer");

exports.AddCustomer = async (req,res,next) => {
    try {
        const name = (req.body.name ? req.body.name : "");
        const contact_num = (req.body.contact_num ? req.body.contact_num : "");
        const email = req.body.email || "";
        const address = req.body.address || "";

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
            const data = new customer({name,contact_num,email,address});
            
            const saved  = await data.save();
            
            console.log(saved);

            // add to admin customer list
            let admin_id = req.body.admin_id;
            admin_id = ObjectId(adminid);

            let user = await admin.findOne({_id : admin_id});
            user.customers.push(saved._id);
            const save_admin = await user.save();
            
            console.log(save_admin);
            
            res.status(201).json({
                message : "customer added" , 
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
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        })
    }
}