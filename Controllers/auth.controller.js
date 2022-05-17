const bycrypt = require('bcryptjs');
const constants = require('../utils/constants');
const User = require('../Models/user.models');
const jwt = require('jsonwebtoken');
/**
 * Controller for sign up and sign in
 * 
 */

 exports.signup = async (req,res) =>{
     var userStatus = req.body.userStatus;
     if(!req.body.userStatus){
         if(!req.body.userType || req.body.userType == constants.userTypes.customer ){
             userStatus = constants.userStatus.approved;
         }else{
             userStatus = constants.userStatus.pending;
         }
     }
    const userObjToBeStoredInDB = {
        name : req.body.name,
        userId : req.body.userId,
        password : bycrypt.hashSync(req.body.password,8),
        email : req.body.email,
        userType : req.body.userType,
        userStatus : userStatus
    }

    try{
        const userCreated = await User.create(userObjToBeStoredInDB);
        // console.log("User Created" , userCreated);
         
        /**Return the response */

        const userCreatedResp = {
            name : userCreated.name,
            userId : userCreated.userId,
            email : userCreated.email,
            userType : userCreated.userType,
            userStatus : userCreated.userStatus,
            createdAt : userCreated.createdAt,
            updatedAt : userCreated.updatedAt
        }
        res.status(201).send(userCreatedResp);
    }catch(e){
        console.log(e);
        res.status(500).send({
            message: "Something went wrong while inserting data"
        })
    }
    
 }

 exports.signin = async (req,res) => {
    //Search if the user is exists or not
    const user =await User.findOne({userId : req.body.userId});

    //If user is not registered
    if(user == null){
        return res.status(400).send({
            message: "Failed! UserId does not exists"
        })
    }

    /** Check Whether userStatus is Approved or not */
    if(user.userStatus != constants.userStatus.approved){
        return res.status(200).send({
            message : "User is still in the Pending Status"
        })
    }

    // User is existing so now we will do the password matching or decrypting
    const passwordValid = bycrypt.compareSync(req.body.password , user.password);
    if(!passwordValid){
        return res.status(401).send({
            message : "Password is not Matching"
        })
    }

    /** Successful login and need to generate the access token now */
    const token = jwt.sign({id: user.userId},process.env.SECRET,{
        expiresIn: 600
    });

    //Send the response
    res.status(200).send({
        name: user.name,
        userId: user.userId,
        email: user.email,
        userType : user.userType,
        userStatus : user.userStatus,
        accessToken : token
    })

 }