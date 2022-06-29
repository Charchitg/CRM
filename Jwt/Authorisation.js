const { VerifyToken } = require("./VerifyToken");


exports.authorised = async (req,res,next) => {
    let token;
    //console.log(req.cookies);
    if(req.cookies.accesstoken){
        token = req.cookies.accesstoken;
    }
    // else
    //  if(req.headers["authorization"]){
    //     token = req.headers["authorization"].split(" ")[1];
    // }
    if(!token){
        //res.redirect('/user/login');
        return res.status(403).json({
            message : "Please Login Again "
        });
    }

    try {
        const check = await VerifyToken(token);
        if(check.auth === false){
            res.status(401).json({
                message : check.info 
            });
        }
        else{
            req.user = check.info.id;
            next();
        }
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : error
        })
    }
}


exports.notAuthorized = async(req,res,next) => {
    let token;
    if(req.cookies.accesstoken){
        token = req.cookies.accesstoken;
    }
    
    if(!token){
        return res.status(403).json({
            message : "Please Login Again "
        });
    }

    try {
        const check = await VerifyToken(token);
        if(check.auth === false){
            res.status(401).json({
                message : check.info 
            });
        }
        else{
            req.user = check.info.user._id;
            next();
        }
        

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message : error
        })
    }
}