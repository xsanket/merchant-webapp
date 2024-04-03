import React, { useState } from 'react';
import { restaurantLogin } from '../apicalls/restaurantApiCall.js';
import { useNavigate } from 'react-router-dom';

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
      if (response.success) {
        localStorage.setItem('token', response.token);
        navigate('/restaurant-dashboard');
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError('Internal server error');
    }
  };

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
