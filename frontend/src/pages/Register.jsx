import React, { useState } from 'react';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        user_password: '',
        user_mobile: '',
        user_code: '',
    });
    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const { user_name, user_email, user_password, user_mobile, user_code } = formData;

        if (!user_name || !user_email || !user_password || !user_mobile || !user_code) {
            toast.error("Please enter all details first!", {
                position: toast.POSITION.TOP_RIGHT,
            });
            return;
        }

        try {
            const response = await axios.post("http://localhost:8000/api/v1/route/user/signup_user", formData, {
                headers: {
                    "Content-type": "application/json"
                }
            });

            if (response.data.status === "success") {
                toast.success("Registered Successfully!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                toast.error(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            toast.error("Something went wrong!.", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className="md:w-1/2 flex items-center justify-center mx-auto">
                <img src="https://media.istockphoto.com/id/1463013729/photo/online-registration-form-for-modish-form-filling.webp?b=1&s=170667a&w=0&k=20&c=iUOC7YLenExVDT9pfUtJyyIS-dlJvOPyJq1USG4lv5I=" alt="Registration" />
            </div>
            <div className="md:w-1/2 container mx-auto p-4">
                <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-md">
                    <input
                        type="text"
                        placeholder="Enter name"
                        value={formData.user_name}
                        name="user_name"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Enter email"
                        value={formData.user_email}
                        name="user_email"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Enter password"
                        value={formData.user_password}
                        name="user_password"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Enter mobile number"
                        value={formData.user_mobile}
                        name="user_mobile"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Enter user code"
                        value={formData.user_code}
                        name="user_code"
                        onChange={handleChange}
                        className="w-full mb-4 p-2 border border-gray-300 rounded"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200"
                    >
                        Signup
                    </button>
                    <ToastContainer />
                </form>
            </div>
        </div>
    );
};

export default Signup;
