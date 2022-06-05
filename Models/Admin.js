const mongoose = require('mongoose');

const admin_schema = new mongoose.Schema({
    name : {
        required : true , 
        type : String
    } , 
    email : {
        required : true , 
        type : String
    } , 
    password : {
        required : true , 
        type : String
    } , 
    customers : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'customer'
        } , 
    ]  
},{
    timestamps:true
});

const admin = mongoose.model('admin' , admin_schema);

module.exports = admin
