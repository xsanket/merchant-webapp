import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js'
import PartnerWithFoodApp from './pages/PartnerWithFoodApp.js';
import RestDashboard from './pages/RestDashboard.js';
import RestRegistration from './pages/RestRegistration.js';
import RestLogin from './pages/RestLogin.js';
import RestaurantDashboard from './pages/RestaurantDashboard .js';




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-a-seller" element={<RestRegistration />} />
        <Route path="/PartnerWithFoodApp" element={<PartnerWithFoodApp />} />
        <Route path="/restaurant-login" element={<RestLogin />} />
        <Route path="/restaurant-dashboard" element={<RestDashboard />} />
        <Route path="/RestaurantDashboard" element={<RestaurantDashboard />} />


      </Routes>
    </Router>
  );
};

export default App;