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
    } 
} , {
    timestamps : true
})

const customer = mongoose.model('customer' , customer_schema);

module.exports = customer;