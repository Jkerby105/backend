const Jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
    const token = req.headers.authorization;
     if (token === "null") {
            return res.json({Error: "Token does not exist"});
      } else {
            Jwt.verify(token,"Naruto",(err,decode) => {
                if(err){
                    return res.json({Error: "Token is not valid"});
                }
            })
      }
    next();
}


module.exports = checkAuth;
