
import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';

const BecomeASeller = () => {

  const [formData, setFormData] = useState({
    profilePicture: '',
    name: '',
    phoneNumber: '',
    ownerName: '',
    category: 'veg',
    location: { lat: 0, lng: 0 },
    cuisine: '',
    openDays: [],
    fassaiCode: '',
    password: '',
  });

  const { profilePicture, name, phoneNumber, ownerName, category, location, cuisine, openDays, fassaiCode, password } = formData;





  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    let updatedOpenDays = [...formData.openDays];

    if (checked) {
      updatedOpenDays.push(value);
    } else {
      updatedOpenDays = updatedOpenDays.filter((day) => day !== value);
    }

    setFormData({ ...formData, openDays: updatedOpenDays });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/restaurants/register', formData);
      console.log(response.data);
      // Redirect to Owner Dashboard or show a success message
    } catch (err) {
      console.error(err);
      // Show an error message
    }
  };

  // const LocationMarker = () => {
  //   const map = useMapEvents({
  //     click(e) {
  //       setFormData({ ...formData, location: e.latlng });
  //     },
  //   });
  // const LocationMarker = () => {
  //   const map = useMapEvents({
  //     click: (e) => {
  //       setFormData({ ...formData, location: e.latlng });
  //     },
  //   });

  //   return (
  //     <Marker
  //       position={formData.location}
  //       eventHandlers={map}
  //     ></Marker>
  //   );
  // };

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
          <h1 className="text-4xl font-bold ">Register your Restaurant</h1>
          <span className="text-sm font-light">for business</span>
        </div>


        <div className="flex justify-center mb-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Register Restaurant
          </button>
          <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </div>
        <form onSubmit={handleSubmit} className="bg-black/75 rounded-lg p-8 max-w-4xl mx-auto">
          {/* Registration form fields */}





          <div className="flex">
            <button
              type="button"
              id="category"
              value="veg"
              //onClick={onChange}
              className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${category === "veg"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
                }`}
            >
              veg
            </button>
            <button
              type="button"
              id="category"
              value="non-veg"
              //onClick={onChange}
              className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${category === "non-veg"
                ? "bg-white text-black"
                : "bg-slate-600 text-white"
                }`}
            >
              non-veg
            </button>
          </div>

















          {/* profile picture */}
          <div className="mb-4">
            <label htmlFor="profilePicture" className="block font-bold mb-2 text-white">
              Hotel/Restaurant Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleInputChange}
              className="border border-gray-400 p-2 w-full"
            />
          </div>


          {/* Add the remaining form fields */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-bold mb-2 text-white">
              Hotel/Restaurant Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="border border-gray-400 p-2 w-full"
            />
          </div>
          {/* Location field (disabled for now) */}
          {/* <div className="mb-4">
        <label htmlFor="location" className="block font-bold mb-2 text-white">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          className="border border-gray-400 p-2 w-full"
        /> 
      </div> */}
          {/* Submit button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Register
          </button>
        </form>
      </div>
    </div>


  );
};

export default BecomeASeller;