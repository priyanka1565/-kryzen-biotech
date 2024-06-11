/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const ProductForm = ({ onAddProduct, onUpdateProduct, currentProduct }) => {
    const [product, setProduct] = useState({
        product_name: '',
        product_price: '',
        product_type: '',
        product_image: '',
        product_code: '',
        product_slug: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (currentProduct) {
            setProduct(currentProduct);
        } else {
            setProduct({
                product_name: '',
                product_price: '',
                product_type: '',
                product_image: '',
                product_code: '',
                product_slug: '',
            });
        }
    }, [currentProduct]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the token from localStorage
        const token = JSON.parse(localStorage.getItem('token'));

        try {
            const response = await fetch('http://localhost:8000/api/v1/route/product/add_product', {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token to the headers
                },
            });

            const data = await response.json();
            console.log('Response Data:', data);

            if (response.ok && data.status === 'success') {
                toast.success(data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
        


                // navigate('/productslist');
            } 
            
        } catch (error) {
            console.error('Error submitting form:', error.message);
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-4 w-full max-w-lg mx-auto border border-gray-300">
                <h2 className="text-2xl font-bold mb-6 text-center">{currentProduct ? 'Edit Product' : 'Add Product'}</h2>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="product_name"
                        value={product.product_name}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Price</label>
                    <input
                        type="number"
                        name="product_price"
                        value={product.product_price}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Type</label>
                    <input
                        type="text"
                        name="product_type"
                        value={product.product_type}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Image URL</label>
                    <input
                        type="text"
                        name="product_image"
                        value={product.product_image}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Product Code</label>
                    <input
                        type="text"
                        name="product_code"
                        value={product.product_code}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Product Slug</label>
                    <input
                        type="text"
                        name="product_slug"
                        value={product.product_slug}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>
                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">{currentProduct ? 'Update Product' : 'Add Product'}</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProductForm;
