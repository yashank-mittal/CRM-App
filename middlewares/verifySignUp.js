const User = require('../Models/user.models')

/**Creating middleware for signup */

validateSignUp = async (req,res,next)=>{
    //Validate if the userName is exisits or not
    if(!req.body.name){
        return res.status(400).send({
            message: "Failed! userName is missing"
        })
    }

    //Validate if the userId is exisits or not
    if(!req.body.userId){
        return res.status(400).send({
            message: "Failed! userId is missing"
        })
    }

    
    //Validate if the Email is exisits or not
    if(!req.body.email){
        return res.status(400).send({
            message: "Failed! Email is missing"
        })
    }

    //Validate if the Password is exisits or not
    if(!req.body.password){
        return res.status(400).send({
            message: "Failed! Password is missing"
        })
    }

    //Validate if userId is already exists
    const user = await User.findOne({userId : req.body.userId});

    if(user != null){
        return res.status(400).send({
            message: "Failed! userId is already exists"
        })
    }


    //Validate if email is already exists
    const useremail = await User.findOne({email : req.body.email});

    if(useremail != null){
        return res.status(400).send({
            message: "Failed! user Email is already exists"
        })
    }



    //Give the control to the controller

    next();
    
}

module.exports ={validateSignUp} 