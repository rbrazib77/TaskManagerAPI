const jwt = require("jsonwebtoken");

module.exports= async(req,res,next)=>{
    const Token = req.headers["token-key"];
    jwt.verify(Token,"SecretKey123456",function(err, decoded){
        if (err) {
            res.status("401").json({ status: "Unauthorzied" });
          } else {
            const email = decoded["data"];
            req.headers.email = email;
            next();
          }
      });

}