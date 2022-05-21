const express = require('express');
const app = express();
const serverConfig = require('./Configs/server.config');
const mongoose = require('mongoose');
const DB_Config = require('./Configs/db.config');
const bodyParser = require('body-parser');
const authRoute = require('./Routes/auth.routes');
const userRoutes = require('./Routes/user.routes');
const User = require('./Models/user.models')
const bcrypt = require('bcryptjs')
/**
 * Mongoose Connection
 */

mongoose.connect(DB_Config.DB_URL,()=>{
    console.log("DB Connected");
    //Initialization
    init();
})

async function init(){
    //Create the admin user
    var user = await User.findOne({userId : "admin"});
    if(user){
        console.log("Admin user already exists");
        return;
    }else{
        const user = await User.create({
            name: "Yash",
            userId : "admin",
            email : "Adminyash1@gmail.com",
            userType : "ADMIN",
            password : bcrypt.hashSync(process.env.ADMINPASS,8)
        })
        console.log("admin user is created")
    }
    
}


// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//Auth Routes
app.use('/crm/api/v1/auth',authRoute);

//UserRoutes
app.use('/crm/api/v1',userRoutes);



app.listen(serverConfig.PORT , ()=>{
    console.log("Server is Running on PORT ",serverConfig.PORT)
})