const admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

exports.getRegister = async(req,res,next) => {
    res.render('./Register',{
        page_title : "Register" , 
        path : "./register"
    });
}

exports.Register = async(req,res,next) => {
    try {
        //console.log(req.body);
        const name = (req.body.name ? req.body.name : "");
        const email = (req.body.email ? req.body.email  : "");
        const password = (req.body.password ? req.body.password : "");
        const confirm = (req.body.confirm ? req.body.confirm : "");
        //console.log(name , email , password , email);
        let errors=[];
        if(name.length < 5){
            errors.push("Too short name");
        }
        if(email.length !== 0){
            let ans = email.toLowerCase().match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
            if (ans===false) {
                errors.push("Given email is invalid");
            }
        }
        if(password.length < 8){
            errors.push("too short password , must be greater or equal to 8 character");
        }
        if(password !== confirm){
            errors.push("Confirm password does not match");
        }

        const email_exist = await admin.findOne({email : email});
        
        if(email_exist!== null){
            errors.push("user already exist with this email id");
        }

        if(errors.length === 0){
            
            console.log("no data error");
            let salt =await bcryptjs.genSalt(10);
            let hash = await bcryptjs.hash(password,salt);
            const newadmin = new admin({name,email,password : hash});

            // const token = await jwt.sign({
            //     id:newadmin._id 
            // } , process.env.ACCESS_TOKEN_SECRET , {
            //     expiresIn:"1d"
            // });
            // res.cookie("accesstoken", token, {
            //     expires: (new Date(Date.now() + 86400 * 1000)),
            //     httpOnly: true
            // });
            
            const saved = await newadmin.save();
            
            res.redirect('/login');
            // res.status(201).json({
            //     message:"admin login  successfully" , 
            //     data : saved ,
            //     errors : []
            // });
        }
        else{
            console.log(errors);
            res.render('./Register' , {
                page_title : "Register" , 
                path : "./register"
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