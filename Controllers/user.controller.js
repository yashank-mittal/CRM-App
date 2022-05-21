/**
 * This file will have all the logic to manipulate the User resource
 */

const User = require('../Models/user.models');
const objectConvertor = require('../utils/objectConverter');


/**
 * Fetch the list of all Users
 *
 *   - only ADMIN is allowed to call this method
 *   -  ADMIN should be able to filter based on :
 *          1. Name
 *          2. UserType
 *          3. UserStatus
 * 
 */

exports.findAllUsers = async (req,res) => {
    try{
        const users = await User.find();
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


/**
 * Update the usee - status , userType
 *   - only ADMIN  should be allowed to do this
 */