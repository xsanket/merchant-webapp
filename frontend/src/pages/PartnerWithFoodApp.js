import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PartnerWithFoodApp = () => {

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    navigate('/restaurant-registration')
  }
  const handleLogin = (event) => {
    navigate('/restaurant-login')
  }



  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center relative"
      style={{
        backgroundImage: 'url(/bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center ">
          <h1 className="text-4xl font-bold ">Food app</h1>
          <span className="text-sm font-light">for business</span>
        </div>

        
        <div className="bg-black/75 rounded-lg p-8 max-w-4xl mx-auto">
          <h2 className="text-3xl text-white font-bold mt-0 mb-4">Partner with food app</h2>
          <p className="text-lg mb-1">
            At 0% commission for the 1st month!
          </p>
          <p className="text-md mb-8">
            And get ads worth INR 1500. Valid for new restaurant partners in
            select cities.
          </p>
          <div className="flex justify-center mb-8">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={handleSubmit}
            >
              Register your restaurant
            </button>
            <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded" 
             onClick={handleLogin}
             >
              Login to view your existing restaurants
            </button>
          </div>
          <p className="text-sm mb-4">Need help? Contact +91 9876543210</p>
          <div className="bg-white text-black rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              Get started with online ordering
            </h3>
            <p className="text-sm mb-4">
              Please keep the documents ready for a smooth signup
            </p>
            <ul className="list-disc list-inside">
              <li>FSSAI license copy (apply now)</li>
              <li>PAN card copy</li>
              <li>Regular GSTIN (apply now)</li>
              <li>Bank account details</li>
              <li>Your restaurant menu</li>
              <li>Dish images for top 5 items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerWithFoodApp;