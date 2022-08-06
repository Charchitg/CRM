const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");
const customer = require("../Models/Customer");
const sales = require("../Models/Sales");

exports.DeleteCustomer = async (req, res, next) => {
    try {
        let customer_id = req.params.customer_id;
        customer_id = ObjectId(customer_id);
        const existing = await customer.findOne({ _id: customer_id });
        if (existing) {
            // delete logic

            // let admin_id = req.body.admin_id;
            // admin_id = ObjectId(admin_id);
            // let user = await admin.findOne({ _id: admin_id });
            // const index = user.customers.find(element => element === customer_id);
            // user.customers.splice(index, 1);
            // const save_admin = await user.save();
            // console.log("admin after deletion ", save_admin);

            
            const sales_cnt = await sales.deleteMany({customer_id : customer_id});
            const deletecnt = await customer.deleteOne({ _id: customer_id });
            
            console.log("delete cnt =", deletecnt);
            console.log("sales_cnt" , sales_cnt);
            if (deletecnt.acknowledged && sales_cnt.acknowledged) {
                res.redirect('/dashboard');
                // res.status(201).json({
                //     message: "Customer and all sales related to it deleted successfully",
                //     errors: []
                // });
            }
            else {
                // user.customers.push(customer_id);
                // const save_admin = await user.save();
                // console.log("admin after unsuccessful deletion ", save_admin);
                console.log("problem in deletion");
                // res.status(400).json({
                //     message: "customer deletion unsuccessful",
                //     errors: []
                // });
            }

            //res.render('/Dashboard');
        }
        else {
            // error user does not exist
            console.log("no such customer exist");
            res.redirect('/dashboard');
            // res.status(404).json({
            //     message: "Customer data not found"
            // });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Bad request"
        })
    }
}