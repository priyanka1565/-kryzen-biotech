const express = require("express");
const cors = require("cors");
const app = express();
const connection = require("./src/connection/db.connection");
const apiRoute = require("./src/routes/api");
require("dotenv").config();

app.use(express.json({limit:"10mb"}));
app.use(cors({
    origin: '*',
}));
app.use("/api/v1/route",apiRoute);

const PORT = process.env.PORT || 7000;

app.listen(PORT,async()=>{
    try{
        await connection.connectDb();
        console.log(`app is running on http://localhost:${PORT}`)
    }
    catch(err){
        console.log(err)
    }
})