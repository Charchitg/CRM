const bcryptjs = require('bcryptjs');
const admin = require('../Models/Admin');
const jwt = require('jsonwebtoken')

exports.getLogin = async (req , res, next) => {
    res.render('./Login' , {
        page_title : "Login" , 
        path : "./login"
    });
}


exports.Login = async(req,res,next) => {
    try {
        const email = (req.body.email ? req.body.email  : "");
        const password = (req.body.password ? req.body.password : "");
        //console.log(req.body);
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
        if(existing===null){
            errors.push("no admin exist with this email address");
        }
        if(errors.length === 0){
            //console.log("no data error");
            let hash = existing.password;
            const result = await bcryptjs.compare(password,hash);
            if(result){
                const token = await jwt.sign({
                    id:existing._id 
                } , process.env.ACCESS_TOKEN_SECRET , {
                    expiresIn:"1d"
                });
                res.cookie("accesstoken", token, {
                    expires: (new Date(Date.now() + 86400 * 1000)),
                    httpOnly: true
                });
                res.redirect('/dashboard');
                // res.status(201).json({
                //     message : "Admin logged in" 
                // })
            }
            else{
                console.log("invalid password");
                res.render('./Login' , {
                    page_title : "Login" , 
                    path : "./login"
                });
                // res.status(401).json({
                //     message : "wrong email id or password"
                // });
            }
        }
        else{
            console.log(errors);
            res.render('./Login' , {
                page_title : "Login" , 
                path : "./login"
            });
            // res.status(400).json({
            //     message : "Please resolve the errors and retry" , 
            //     data : null ,
            //     errors : errors
            // });
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({
            message : "Bad request"
        })
    }
}