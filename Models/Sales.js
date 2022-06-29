const mongoose = require('mongoose');

const sale_schema = new mongoose.Schema({
    amount : {
        type : Number
    } , 
    date : {
        type : String
    } , 
    paid : {
        type : mongoose.Schema.Types.Boolean , 
        default : true
    } , 
    admin_id : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true
    } , 
    customer_id : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true
    }  
});

const sales = mongoose.model('sale' , sale_schema);

module.exports = sales;