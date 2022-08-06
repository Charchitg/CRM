const { ObjectId } = require("mongodb");
const customer = require("../Models/Customer");

exports.getUpdateCustomer = async (req,res,next) =>{
    try {
        console.log(req.params);
        console.log(req.query);
        let customer_id = req.params.customer_id;
        console.log(customer_id);
        customer_id=ObjectId(customer_id);
        let existing = await customer.findOne({_id : customer_id});
        console.log(existing);
        if(existing){
            res.render('./UpdateCustomer' , {
                page_title : "Update Customer" , 
                path : "./update" , 
                data : existing
            });
        }
        else{
            res.redirect('/dashboard');   
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        });
    }
}

exports.UpdateCustomer = async(req,res,next) => {
    try {
        let customer_id = req.params.customer_id;
        customer_id=ObjectId(customer_id);
        let existing = await customer.findOne({_id : customer_id});
    
        if(existing){
            const name = (req.body.name ? req.body.name : existing.name);
            const contact_num = (req.body.contact_num ? req.body.contact_num : existing.contact_num);
            const email = (req.body.email ? req.body.email : existing.email);
            const address = (req.body.address ? req.body.address : existing.address );
    
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
            if(errors.length === 0){
                // existing.name = name;
                // existing.contact_num=contact_num;
                // existing.address=address;
                // existing.email=email;
                const updated = {
                    name : name  , 
                    contact_num : contact_num , 
                    address : address , 
                    email : email
                }
                const saved  = await customer.findOneAndUpdate({_id : customer_id} , updated  , {new : true});
    
                console.log(saved);
                res.redirect('/dashboard');
                // res.status(201).json({
                //     message : "customer updated" , 
                //     data : saved , 
                //     errors :[]
                // })
            }
            else{
        
                res.status(401).json({
                    message : "invalid informations" , 
                    data : null , 
                    errors : errors
                })
            }
        }
        else{
            res.status(401).json({
                message: "customer not found" ,
                data : null , 
                errors : []
            });
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        });     
    }
}