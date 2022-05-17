const mongoose = require('mongoose');

/***
 * We have to write all the user related schema here
 */

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    userId:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        lowercase: true,
        minlength: 10,
        unique: true
    },
    createdAt:{
        type: Date,
        immutable: true,
        default: ()=>{
            return Date.now();
        }
    },
    updatedAt:{
        type: Date,
        default: ()=>{
            return Date.now();
        }
    },
    userType:{
        type: String,
        required: true,
        default: "CUSTOMER"
    },
    userStatus:{
        type: String,
        required: true,
        default: "APPROVED"
    }
})

module.exports = mongoose.model("User",userSchema);