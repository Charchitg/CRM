const mongoose = require('mongoose');

const customer_schema = new mongoose.Schema({
    name : {
        required : true , 
        type : String
    } , 
    contact_num : {
        required : true , 
        type : String
    } , 
    email : { 
        type : String
    } , 
    address : { 
        type : String
    } , 
    admin_id : {
        type : mongoose.Schema.Types.ObjectId , 
        required:true
    } , 
    visit_cnt : {
        type : Number , 
        default : 0
    } , 
    amount_spend : {
        type : Number ,
        default : 0 
    } 
} , {
    timestamps : true
})

const customer = mongoose.model('customer' , customer_schema);

module.exports = customer;