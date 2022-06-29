const { ObjectId } = require('mongodb');
const customer = require('../Models/Customer');


exports.UpdateSale = async (req,res,next) =>{
    try {
        const admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        const customer_id = req.body.customer_id;
        customer_id = ObjectId(customer_id);
        let existing  = await customer.findOne({$and : [
            {admin_id : admin_id} , {customer_id : customer_id }
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
                paid : paid
            }
            existing.sales.push(sale_obj);
            existing.visit_cnt = existing.visit_cnt + 1;
            existing.amount_spend = existing.amount_spend + amount;
            const saved_customer = await existing.save();
            res.status(201).json({
                message : "Sale added successfully" , 
                saved : saved_customer , 
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