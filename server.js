const express = require('express');
const app = express();
const serverConfig = require('./Configs/server.config');
const mongoose = require('mongoose');
const DB_Config = require('./Configs/db.config');
const bodyParser = require('body-parser');
const authRoute = require('./Routes/auth.routes');
/**
 * Mongoose Connection
 */

mongoose.connect(DB_Config.DB_URL,()=>{
    console.log("DB Connected");
})

// Body-Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



//Auth Routes
app.use('/crm/api/v1/auth',authRoute);



app.listen(serverConfig.PORT , ()=>{
    console.log("Server is Running on PORT ",serverConfig.PORT)
})