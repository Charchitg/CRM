const jwt = require('jsonwebtoken');

exports.VerifyToken = async ( token ) => {
    try {
        const decoded = await jwt.verify( token , process.env.ACCESS_TOKEN_SECRET);
        //console.log(decoded);
        if(decoded){
            return {
                auth : true , 
                info : decoded
            };
        }
        else{
            return {
                auth : false , 
                info : decoded
            };
        }
    } catch (error) {
        console.log(error);
        return {
            auth : false , 
            info : error
        };
    }
    
}