/**
 * This file will have all the logic to manipulate the User resource
 */

const User = require('../Models/user.models');
const objectConvertor = require('../utils/objectConverter');


/**
 * Fetch the list of all Users
 *
 *   - only ADMIN is allowed to call this method - DONE
 *   -  ADMIN should be able to filter based on :
 *          1. Name
 *          2. UserType
 *          3. UserStatus
 * 
 */

exports.findAllUsers = async (req,res) => {

    /**
     * Read the data from the query param
     */

    const nameReq = req.query.name;
    const userStatusReq = req.query.userStatus;
    const userTypeReq = req.query.userType;

    const mongoObj = {};
    if(nameReq && userStatusReq && userTypeReq){
        mongoObj.name = nameReq;
        mongoObj.userStatus = userStatusReq;
        mongoObj.userType = userTypeReq;
    }else if(userStatusReq && userTypeReq){
        mongoObj.userStatus = userStatusReq;
        mongoObj.userType = userTypeReq;
    }else if(nameReq && userStatusReq){
        mongoObj.name = nameReq;
        mongoObj.userStatus = userStatusReq;
    }else if(nameReq && userTypeReq){
        mongoObj.name = nameReq;
        mongoObj.userType = userTypeReq;
    }else if(nameReq){
        mongoObj.name = nameReq;
    }else if(userStatusReq){
        mongoObj.userStatus = userStatusReq;
    }else if(userTypeReq){
        mongoObj.userType = userTypeReq;
    }


    try{
        const users = await User.find(mongoObj);
        return res.status(200).send(objectConvertor.userResponse(users));
    }
    catch(e){
        console.log(e);
        res.status(500).send({
            message: "Internal error while fetching all users"
        })
    }
       
}



/**
 * Fetch the User based on the userId 
 * 
 */


exports.findUserById = async (req,res) => {
    const userIdReq = req.params.userId; //Reading from the request parameter
    const user = await User.find({userId : userIdReq});
    if(user){
        res.status(200).send(objectConvertor.userResponse(user));
    }else{
        res.status(404).send({
            message: "User with id" + userIdReq + "doesn't exists"
        })
    }
}


/**
 * Update the user - status , userType
 *   - only ADMIN  should be allowed to do this
 * 
 *    ADMIN  - name , userStatus , userType 
 */

exports.updateUser = async (req,res) => {
    /**
     * One of the ways of updating
     */

    try{
        const userIdReq = req.params.userId;
        const user = User.findOneAndUpdate({
            userId : userIdReq
        },{
            name : req.body.name,
            userStatus : req.body.userStatus,
            userType : req.body.userType
        }).exec();

        res.status(200).send({
            message: "User record successfully updated"
        })
    }catch(e){
        console.log(e.message);
        res.status(500).send({           
            message: "Internal server error while updating"
        })
    }
}

