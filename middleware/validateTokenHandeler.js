

const asyncHandler = require("express-async-handler");

const jwt =  require("jsonwebtoken");


    const validateToken = asyncHandler(async( req,res, next) => { 
        let token;
        let authHeader = req.headers.authorization ||   req.headers.Authorization;
         if (authHeader && authHeader.startsWith("Bearer") ) {
              token = authHeader.split(" ")[1];
              jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err,decode) => {
                 if(err){
                    res.status(401);
                    throw new Error("User is not authorized");
                 }

                  req.user = decode.user;
                  next();
                   console.log(decode);
              } );
               if (!token) {
                 res.status(401);
                   throw new Error("User is not authorized or token is missing");
               }            
         }



    } );


module.exports = validateToken;    