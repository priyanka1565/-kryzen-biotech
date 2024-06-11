const mongoose = require("mongoose");

const useSchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    user_mobile:{
        type:String,
        required:true
    },
    user_email:{
        type:String,
        required:true
    },
    user_password:{
        type:String,
        required:true
    },
    user_code:{
        type:String,
        required:true,
    }
})

const User = mongoose.model("User",useSchema);

module.exports = User;