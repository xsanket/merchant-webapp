import React, { useEffect, useState } from 'react';
import { restaurantLogin } from '../apicalls/restaurantApiCall.js';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';

const RestLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await restaurantLogin({ email, password });
      console.log(response)
      if (response.success) {
        localStorage.setItem('token', response.token);
        message.success("Logged in successfully!");
        navigate('/restaurant-dashboard');
      }
      else if (response.error === 'User not found') {
        message.error("User not found");
      }
      else if (response.error === 'Invalid password') {
        message.error("Invalid email or password");
      }
      else {
        message.error(response.message || 'Login failed. Please try again.');
      }
    }
    catch (err) {
      setError('Internal server error');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      message.success("You are already logged in.");
      navigate("/restaurant-dashboard")
    }
  }, []);


  return (
    <div className="bg-black text-black min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold ">Login your Restaurant</h1>
          <span className="text-sm font-light">for business</span>
        </div>


        <form onSubmit={handleSubmit} className="bg-black/75 rounded-lg p-8 max-w-4xl mx-auto">
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2 ml-2 text-white">
              email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2 ml-2 text-white">
              password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-400 p-2 w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestLogin;
