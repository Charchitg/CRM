const { ObjectId } = require('mongodb');
const sale = require('../Models/Sales');


exports.DeleteSale = async (req, res, next) => {
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        let sale_id = req.body.sale_id;
        let access = await sale.findOne({
            $and: [
                { admin_id: admin_id }, { _id: sale_id }
            ]
        });

        if (access === null) {
            // cannot delete this sale bcoz there is not sale data with given admin and sale id
            res.status(404).json({
                message: "Sale deletion unsuccessful , no such sale exist",
                errors: [],
                data: deletecnt
            });
        }
        else {
            let deletecnt = await sale.deleteOne({ _id: access._id });

            console.log("Delete Sale ----> deletecnt = ", deletecnt);

            if (deletecnt.acknowledged) {
                res.status(203).json({
                    message: "Sale deletion successful",
                    errors: [],
                    data: deletecnt
                });
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