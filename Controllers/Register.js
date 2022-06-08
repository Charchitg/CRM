const admin = require('../Models/Admin');
const bcryptjs = require('bcryptjs')

exports.Register = async(req,res,next) => {
    try {
        const name = (req.body.name ? req.body.name : "");
        const email = (req.body.email ? req.body.email  : "");
        const password = (req.body.password ? req.body.password : "");
        const confirm = (req.body.confirm ? req.body.confirm : "");

        let errors=[];
        if(name.length < 5){
            errors.push("Too short name");
        }
        if(email.length !== 0){
            let ans = email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            let exist = !ans;
            if (exist) {
                errors.push("Given email is invalid");
            }
        }
        if(password.length < 8){
            errors.push("too short password , must be greater or equal to 8 character");
        }
        if(password !== confirm){
            errors.push("Confirm password does not match");
        }

        if(errors.length === 0){
            console.log("no data error");
            let salt =await bcryptjs.genSalt(10);
            let hash = await bcryptjs.hash(password,salt);
            const newadmin = new admin({name,email,password : hash});
            const saved = await newadmin.save();

            res.status(201).json({
                message:"admin login  successfully" , 
                data : saved ,
                errors : []
            });
        }
        else{
            res.status(400).json({
                message : "Please resolve the errors and retry" , 
                data : null ,
                errors : errors
            });
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        })
    }
}