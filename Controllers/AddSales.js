const { ObjectId } = require('mongodb');
const customer = require('../Models/Customer');
const sale = require('../Models/Sales');

exports.AddSale = async (req,res,next) =>{
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        let customer_email = req.body.customer_email;
        let existing  = await customer.findOne({$and : [
            {admin_id : admin_id} , {email : customer_email }
        ]});
        if(existing===null){
            res.status(400).json({
                message : "Customer does not existing or is notassociated to you"
            });
        }
        else{
            const amount = parseFloat(req.body.amount);
            const paid = req.body.paid;
            const sale_obj = {
                amount : amount , 
                date : new Date(Date.now()).toString() , 
                paid : paid , 
                admin_id : admin_id ,
                customer_id : existing._id 
            }
            const newSale = new sale(sale_obj);
            existing.visit_cnt = existing.visit_cnt + 1;
            existing.amount_spend = existing.amount_spend + amount;
            const saved_customer = await existing.save();
            const save_sale = await newSale.save();
            res.status(201).json({
                message : "Sale added successfully" , 
                saved_customer : saved_customer ,
                saved_sale : save_sale ,  
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