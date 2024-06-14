/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        // Get the token from localStorage
        const token = JSON.parse(localStorage.getItem('token'));
        if (!token) {
            toast.error('Token not found. Please log in again.', {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/route/product/get_product', {
                method: 'POST',
                body: JSON.stringify({}),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the token to the headers
                },
            });

            const data = await response.json();
            if (response.status === 200 && data.status === 'success') {
                setProducts(data.data);
            } else {
                toast.error(data.message || 'Unable to get product list', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Error fetching product list:', error.response || error.message);
            toast.error('Unable to get product list', {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    const handleEditProduct = (productId) => {
        navigate(`/edit-product`); // Navigate to the edit page for the selected product
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-4xl mx-auto border border-gray-300">
            <h2 className="text-2xl font-bold mb-6 text-center">Product List</h2>
            {products.length === 0 ? (
                <p className="text-center text-gray-600">No products available</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                            <img src={product.product_image} alt={product.product_name} className="w-full h-48 object-cover mb-4 rounded-lg" />
                            <h3 className="text-lg font-bold mb-2">{product.product_name}</h3>
                            <p className="text-gray-700 mb-2">Price: ${product.product_price}</p>
                            <p className="text-gray-700 mb-2">Type: {product.product_type}</p>
                            <p className="text-gray-700 mb-2">Code: {product.product_code}</p>
                            <p className="text-gray-700 mb-2">Slug: {product.product_slug}</p>
                            <button
                                onClick={() => handleEditProduct(product._id)} // Pass product id to handleEditProduct
                                className="mt-2 w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                            >
                                Edit
                            </button>
                        </div>
                    ))}
                </div>
            )}
            <ToastContainer />
        </div>
    );
};

export default ProductList;
