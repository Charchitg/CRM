const { ObjectId } = require('mongodb');
const customer = require('../Models/Customer');
const sale = require('../Models/Sales');


exports.DeleteSale = async (req, res, next) => {
    try {
        let admin_id = req.user;
        admin_id = ObjectId(admin_id);
        let sale_id = req.params.sale_id;
        let access = await sale.findOne({
            $and: [
                { admin_id: admin_id }, { _id: sale_id }
            ]
        });

        if (access === null) {
            // cannot delete this sale bcoz there is not sale data with given admin and sale id
            console.log("deletion failed");
            res.redirect('/sales');

            // res.status(404).json({
            //     message: "Sale deletion unsuccessful , no such sale exist",
            //     errors: [],
            //     data: deletecnt
            // });
        }
        else {
            let customer_id = access.customer_id;
            customer_id = ObjectId(customer_id);
            let existing = await customer.findOne({_id : customer_id});

            existing.amount_spend = parseFloat(existing.amount_spend) - parseFloat(access.amount);
            existing.visit_cnt = parseFloat(existing.visit_cnt)-1;
            let customer_update = await existing.save();
            let deletecnt = await sale.deleteOne({ _id: access._id });

            console.log("Delete Sale ----> deletecnt = ", deletecnt);

            if (deletecnt.acknowledged) {
                res.redirect('/sales');
                // res.status(203).json({
                //     message: "Sale deletion successful",
                //     errors: [],
                //     data: deletecnt
                // });
            }
            else {
                res.status(201).json({
                    message: "Sale deletion unsuccessful",
                    errors: [],
                    data: deletecnt
                });
            }
        }

        


    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Bad request"
        });
    }
}