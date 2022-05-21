/**
 * Authentication
 *      - If the token passed is valid or no
 * 
 * 1. If no token is passed in the request header - NOT allowed
 * 2. If token is passed : Authenticated
 *              if correct allow, else reject
 */

const jwt = require('jsonwebtoken');
const User = require('../Models/user.models')
const constants = require('../utils/constants');




verifyToken = (req,res,next) => {
    /**
     * Read the token from the header
     */

    const token = req.headers['token'];
    if(!token){
        return res.status(403).send({
            message: 'No token provided'
        })
    }

    //If token was provided , we need to verify it
    jwt.verify(token,process.env.SECRET , (e , decoded) => {
        if(e){
            return res.status(401).send({
                message: "Unauthorized"
            })
        }
        //I will try to read the userId  form the decoded token and store it in req object
        req.userId = decoded.id;
        next();
        
    })
}


isAdmin = async(req,res,next) => {
    /**
     * Fetch user from the DB using the userId
     */
    const user= await User.findOne({userId : req.userId});

    /**
     * Check what is the userType
     */

    if(user && user.userType == constants.userTypes.admin){
        next();
    }else{
        res.status(403).send({
            message: "Requires ADMIN role"
        })
    }

}


const authJwt = {
    verifyToken : verifyToken,
    isAdmin : isAdmin
};

module.exports = authJwt;