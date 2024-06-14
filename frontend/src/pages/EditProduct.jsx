// frontend/src/components/EditProduct.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProduct = ({ match }) => {
    const [product, setProduct] = useState({
        product_name: '',
        product_image: '',
        product_price: '',
        product_type: '',
        product_code: '',
        product_slug: '',
    });

    const [token, setToken] = useState('');

    useEffect(() => {
        // Fetch token from localStorage or wherever it's stored upon component mount
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/v1/route/product/get_product/${match.params.id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { status, data } = response.data;
            if (status === 'success') {
                setProduct(data);
            } else {
                toast.error('Unable to fetch product details', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Error fetching product details:', error.response || error.message);
            toast.error('Unable to fetch product details', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/api/v1/route/product/edit/${match.params.id}`, product, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const { status, message } = response.data;
            if (status === 'success') {
                toast.success(message);
                // Optionally, redirect to product list or do something else upon successful update
            } else {
                toast.error(message || 'Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error.response || error.message);
            toast.error('Error updating product');
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Product</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit" className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">Update Product</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default EditProduct;
