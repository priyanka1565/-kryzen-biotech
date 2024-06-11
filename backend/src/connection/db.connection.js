const mongoose = require("mongoose");

const connectDb = async()=>{
   try{    
      const url = process.env.MONGOURL;    
      const connection = await mongoose.connect(url).then(()=>{
         console.log("Database connected successfully");
      }).catch((err)=>{
        console.log(err)
        console.log("Unable to connect with database");
      })
      return connection;
   }
   catch(err){
     return false;
   }
}

module.exports = {
    connectDb
}