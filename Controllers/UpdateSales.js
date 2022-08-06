const { ObjectId } = require('mongodb');
const customer = require('../Models/Customer');
const sales = require('../Models/Sales');

exports.getUpdateSale = async(req,res,next) => {
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        let customer_id = req.params.customer_id;
        customer_id=ObjectId(customer_id);
        let sale_id = req.params.sale_id;
        sale_id = ObjectId(sale_id);
        console.log(customer_id , sale_id);
        let existing  = await customer.findOne({$and : [
            {admin_id : admin_id} , { _id : customer_id }
        ]});
        if(existing===null){
            res.status(400).json({
                message : "Customer does not existing or is notassociated to you"
            });
        }
        else{
            const existing_sale = await sales.findOne({_id : sale_id});
            res.render('./UpdateSales' , {
                page_title : "Update Sale" , 
                path : "/update_sale" , 
                data : existing_sale , 
                customer_email : existing.email , 
                sale_id : sale_id
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.UpdateSale = async (req,res,next) =>{
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        let customer_id = req.params.customer_id;
        customer_id=ObjectId(customer_id);
        let sale_id = req.params.sale_id;
        sale_id = ObjectId(sale_id);
        let existing  = await customer.findOne({$and : [
            {admin_id : admin_id} , { _id : customer_id }
        ]});
        if(existing===null){
            res.status(400).json({
                message : "Customer does not existing or is notassociated to you"
            });
        }
        else{
            const existing_sale = await sales.findOne({_id : sale_id});
            existing.amount_spend = existing.amount_spend - parseFloat(existing_sale.amount);

            const amount = parseFloat(req.body.amount);
            let paid = req.body.paid.toString().toLowerCase();
            if(paid==="yes"){
                paid=true;
            }
            else{
                paid=false;
            }
            const sale_obj = {
                amount : amount , 
                date : new Date(Date.now()).toString() , 
                paid : paid , 
                admin_id : existing_sale.admin_id , 
                customer_id : existing_sale.customer_id , 
                name : existing_sale.name , 
                contact_num : existing_sale.contact_num
            }
            //existing.sales.push(sale_obj);
            //existing.visit_cnt = existing.visit_cnt + 1;
            existing.amount_spend = existing.amount_spend + amount;
            const updated_sale = await sales.findOneAndUpdate({_id : sale_id} , sale_obj , {new:true});
            const saved_customer = await existing.save();
            res.redirect('/sales');
            // res.status(201).json({
            //     message : "Sale updated successfully" , 
            //     saved : saved_customer , 
            //     errors : []
            // });
        }

    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        });
    }
}