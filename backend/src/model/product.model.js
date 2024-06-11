const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_name:{
        type:String,
        required:true
    },
    product_image:{
        type:String,
        required:true
    },
    product_price:{
        type:Number,
        required:true
    },
    product_type:{
        type:String,
        required:true
    },
    product_code:{
        type:String,
        required:true,
    },
    product_slug:{
        type:String,
        required:true,
    }
})

const Product = mongoose.model("Product",productSchema);

module.exports = Product;