import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [formData, setFormData] = useState({
        user_code: '',
        user_password: '',
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (formData.user_code === '' || formData.user_password === '') {
            toast.error('Please enter all details first!', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'error-toast', // Use this only if you have custom styling for error
            });
            return;
        }

        try {
            const response = await fetch('http://localhost:8000/api/v1/route/user/login_user', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
           
            const data = await response.json();
            console.log('Response Data:', data);
            localStorage.setItem('token', JSON.stringify(data.data) || []);

            if (response.ok) {
                if (data.status === 'success') {
                 
                    toast.success('Login Successfully!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                    setTimeout(() => {
                        navigate('/productf');
                    }, 2000);
                } else {
                    toast.error(data.message || 'Something went wrong!', {
                        position: toast.POSITION.TOP_RIGHT,
                        className: 'error-toast',
                    });
                }
            } else {
                toast.error(data.message || 'Something went wrong!', {
                    position: toast.POSITION.TOP_RIGHT,
                    className: 'error-toast',
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error.message);
            toast.error('Something went wrong!', {
                position: toast.POSITION.TOP_RIGHT,
                className: 'error-toast',
            });
        }
    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='md:w-1/2 flex items-center justify-center mx-auto'>
                <img
                    src='https://images.unsplash.com/photo-1529539795054-3c162aab037a?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bG9naW58ZW58MHx8MHx8fDA%3D'
                    alt='Login'
                />
            </div>
            <div className='md:w-1/2 container mx-auto p-4'>
                <form
                    onSubmit={handleSubmit}
                    className='max-w-md mx-auto bg-white p-8 rounded shadow-md'
                >
                    <input
                        type='text'
                        placeholder='Enter user code'
                        value={formData.user_code}
                        name='user_code'
                        onChange={handleChange}
                        className='w-full mb-4 p-2 border border-gray-300 rounded'
                    />
                    <input
                        type='password'
                        placeholder='Enter password'
                        value={formData.user_password}
                        name='user_password'
                        onChange={handleChange}
                        className='w-full mb-4 p-2 border border-gray-300 rounded'
                    />
                    <button
                        type='submit'
                        className='w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:border-blue-700 focus:ring focus:ring-blue-200'
                    >
                        Login
                    </button>
                </form>

            </div>
            <ToastContainer />
        </div>
    );
};

export default Login;
