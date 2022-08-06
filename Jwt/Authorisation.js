const { VerifyToken } = require("./VerifyToken");


exports.authorised = async (req, res, next) => {
    let token;
    //console.log(req.cookies);
    if (req.cookies.accesstoken) {
        token = req.cookies.accesstoken;
    }
    else if (req.headers["authorization"]) {
        token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
        res.redirect('/login');
        // return res.status(403).json({
        //     message: "Please Login Again "
        // });
    }
    else{
        try {
            const check = await VerifyToken(token);
            if (check.auth === false) {
                res.redirect('/login');
                // res.status(401).json({
                //     message: check.info
                // });
            }
            else {
                req.user = check.info.id;
                next();
            }
    
    
    
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error
            })
        }
    }
    
}


exports.notAuthorized = async (req, res, next) => {
    let token;
    if (req.cookies.accesstoken) {
        token = req.cookies.accesstoken;
    }
    else if (req.headers["authorization"]) {
        token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
        next();
    }
    else {
        try {
            const check = await VerifyToken(token);
            if (check.auth === false) {
                next();
                // res.status(401).json({
                //     message : check.info 
                // });
            }
            else {
                res.redirect('/dashboard');
                // res.json(401).json({
                //     message: "You are already registered"
                // });
                // req.user = check.info.user._id;
                // next();
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: error
            })
        }
    }

}