require('dotenv').config();
const express = require("express");
const router = require('./routes/index.routes');
const db = require('./db');

const app = express();

//app settings
app.use(express.json());

//app routes
app.use('/api',router);

const PORT = process.env.PORT || 5000;


const start = async () =>{
    try {
        await db.authenticate()
        await db.sync({alter:true})
        app.listen(PORT, ()=> console.log(`server start on port = ${PORT}`))
    } catch (error) {
        console.error(error.message)
    }
    
}

start()