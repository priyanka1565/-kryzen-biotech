const Product = require("../../model/product.model");
const mongoose = require('mongoose');

const addProduct = [
    async (req, res) => {
        try {
            const request = req?.body;
            let product_name = null;
            let product_image = null;
            let product_price = null;
            let product_type = null;
            let product_code = null;
            let product_slug = null;
            let product_user_code = null;
            if (Object.keys(request).length > 0) {
                product_name = request?.product_name;
                product_image = request?.product_image;
                product_price = request?.product_price;
                product_type = request?.product_type;
                product_code = request?.product_code;
                product_slug = request?.product_slug;
                product_user_code = req?.user?.db_data[0]?.user_code;
                let payload = {
                    product_name,
                    product_image,
                    product_price,
                    product_type,
                    product_code,
                    product_slug,
                }
                if (Object.keys(payload).length > 0) {
                    const add_product = await Product.create(payload);
                    if (add_product) {
                        return res.json({ status: "success", message: "Product added successfully", data: [] })
                    }
                    else {
                        return res.json({ status: "failed", message: "Unable to add product", data: [] })
                    }
                }
            }
        }
        catch (err) {
            return res.json({ status: "failed", message: "Unable to signup user", data: [] })
        }
    }
];

const getProductList = [
    async (req, res) => {
        try {
            let product_name = req?.body?.product_name ? req?.body?.product_name : null;
            let product_price = req?.body?.product_price ? req?.body?.product_price : null;
            let data = null;
            if (product_name !== null) {
                data = await Product.find({ product_name: product_name }).sort({ _id: -1 });
            }
            else if (product_price !== null) {
                data = await Product.find({ product_price: product_price }).sort({ _id: -1 });
            }
            else if (product_name !== null && product_price !== null) {
                data = await Product.find({ product_name: product_name, product_price: product_price }).sort({ _id: -1 });
            }
            else {
                data = await Product.find().sort({ _id: -1 });
            }

            if (data && data.length > 0) {
                return res.json({ status: "success", message: "Product get successfully", data: data })
            }
            else {
                return res.json({ status: "failed", message: "Unable to get product list", data: [] })
            }
        }
        catch (err) {
            console.log(err)
            return res.json({ status: "failed", message: "Unable to get product list", data: [] })
        }
    }
]

const editProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { product_name, product_image, product_price, product_type, product_code, product_slug } = req.body;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'failed', message: 'Invalid product ID' });
        }

        const payload = {
            product_name,
            product_image,
            product_price,
            product_type,
            product_code,
            product_slug
        };

        const updatedProduct = await Product.findByIdAndUpdate(id, payload, { new: true });

        if (updatedProduct) {
            return res.status(200).json({ message: "Product updated successfully.", data: updatedProduct });
        } else {
            return res.status(404).json({ message: "Product not found.", data: [] });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message, data: [] });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ status: 'failed', message: 'Invalid product ID' });
        }

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (deletedProduct) {
            return res.status(200).json({ status: "success", message: "Product deleted successfully", data: deletedProduct });
        } else {
            return res.status(404).json({ status: "failed", message: "Product not found", data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "failed", message: "Unable to delete product", data: [] });
    }
};



module.exports = {
    addProduct,
    getProductList,
    editProduct,
    deleteProduct
  
  
}