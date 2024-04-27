import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    navigate('/restaurant-registration')
  }
  const handleLogin = (event) => {
    navigate('/restaurant-login')
  }

  return (
    <div>
      <div style={{
        backgroundImage: 'url(/bgi.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        position: 'relative',
      }}>
        <div className="flex items-center mt-5 justify-between gap-2 px-4 md:px-8 lg:px-72 w-full">
          <h1 className='text-2xl md:text-4xl font-bold text-center italic text-white'>Num-Num</h1>

          <nav>
            <ul className="flex flex-wrap items-center">
              <li className='rounded-md mx-2 my-1 border border-white py-1 px-2'>
                <a href="#advertise" className='text-white hover:text-gray-300 text-sm md:text-base'>Advertise</a>
              </li>
              <li className='rounded-md mx-2 my-1 border border-white py-1 px-2'>
                <Link to="/restaurant-login" className='text-white hover:text-gray-300 text-sm md:text-base'>Login</Link>
              </li>
              <li className='rounded-md mx-2 my-1 bg-blue-500 py-1 px-2'>
                <Link to="/restaurant-registration" className='text-white hover:text-gray-300 text-sm md:text-base'>Create Account</Link>
              </li>
            </ul>
          </nav>
        </div>


        <div className="px-4 md:px-8 lg:px-96 text-left mt-8 md:mt-16">
          <p className='text-xl md:text-2xl text-white'>Partner with Num-Num <br></br>
            at 0% commission for the 1st month!</p> <br />
          <p className='text-white text-sm md:text-base'>And get ads worth INR 1500. Valid for new restaurant partners in select cities.</p>
          <div>
            <div className="flex flex-col md:flex-row justify-between mt-8">
              <a className='rounded-md bg-blue-500 hover:bg-blue-600 text-center cursor-pointer justify-center content-center text-sm md:text-base py-2 px-4 mb-4 md:mb-0 md:w-auto w-full' onClick={handleSubmit}>Register Your Restaurant</a>
              <a className='bg-white rounded-md text-center justify-center ease-in-out hover:bg-gray-400 cursor-pointer content-center text-sm md:text-base py-2 px-4 md:w-auto w-full' onClick={handleLogin}>Login your Restaurant</a>
            </div>
            <p className='mt-4 text-white text-sm md:text-base'>Need help? Contact +91 97-16-16-16-16</p>
          </div>
        </div>



        <div className="container mt-2 mx-auto px-4 md:px-7 md:py-7 mt-8">
          <div className=" rounded-lg p-4 md:p-8 max-w-4xl mx-auto bg-white text-black">
            <h3 className="text-xl md:text-2xl font-bold mb-4">
              Get started with online ordering
            </h3>
            <p className="text-sm md:text-base mb-3">
              Please keep the documents ready for a smooth signup
            </p>
            <ul className="list-disc list-inside">
              <li className='text-sm md:text-base'>FSSAI license copy (apply now)</li>
              <li className='text-sm md:text-base'>PAN card copy</li>
              <li className='text-sm md:text-base'>Regular GSTIN (apply now)</li>
              <li className='text-sm md:text-base'>Bank account details</li>
              <li className='text-sm md:text-base'>Your restaurant menus</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};