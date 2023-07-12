const jwt = require('jsonwebtoken');

const secretKey = 'qpwoeiruty56473qpwoeu.$';


module.exports = {
    createJWT: id => {
        return jwt.sign({id},secretKey,{
            expiresIn:1000*60*60*24
        });
    },
    authenticateJWT: (req,res,next) => {
        const auth = req.cookies.jwt;
        if(auth){
            jwt.verify(auth,secretKey, (err,key) => {
                if(err) return res.json('Error in token');
                else next();
            })
        }
        else{
           return res.json({'Message':'go to login page no token present'});
        }
    }
}