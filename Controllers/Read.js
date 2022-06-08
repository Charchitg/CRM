const { ObjectId } = require("mongodb");
const admin = require("../Models/Admin");


exports.GetCustomers = async (req,res,next) => {
    try {
        let admin_id = req.body.admin_id;
        admin_id = ObjectId(admin_id);
        const admin_data = await admin.findOne({_id:admin_id}).populate('customers');
        res.status(201).json({
            message : "data received" , 
            data : admin_data
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message:"bad request"
        });
    }    
}