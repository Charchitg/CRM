const customer = require("../Models/Customer");

exports.AddCustomer = async (req,res,next) => {
    try {
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

        let existing = await customer.findOne({
            $and : [
                {name : name} , {contact_num : contact_num}
            ]
        });
        if(existing){
            errors.push("user already exist");
        }
        if(errors.length === 0){
            const data = new customer(name,contact_num,email,address);
            
            const saved  = await data.save();

            console.log(saved);

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
        res.status(404).json({
            message : "Bad request"
        })
    }
}