const bcryptjs = require('bcryptjs');
const admin = require('../Models/Admin');

exports.Login = async(req,res,next) => {
    try {
        const email = (req.body.email ? req.body.email  : "");
        const password = (req.body.password ? req.body.password : "");

        let errors=[];
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
        let existing = await admin.findOne({email : email});
        if(existing==null){
            errors.push("no admin exist with this email address");
        }
        if(errors.length === 0){
            console.log("no data error");
            let hash = existing.password;
            const result = await bcryptjs.compare(password,hash);
            if(result){
                req.user = existing;
                console.log(req.user);
                res.status(201).json({
                    message : "Admin logged in" 
                })
            }
            else{
                res.status(401).json({
                    message : "wrong email id or password"
                });
            }
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