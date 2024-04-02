import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js'
import BecomeASeller from './pages/BecomeASeller.js'
import PartnerWithFoodApp from './pages/PartnerWithFoodApp.js';
import RestLogin from './pages/RestLogin.js';
import RestDashboard from './pages/RestDashboard.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/become-a-seller" element={<BecomeASeller />} />
        <Route path="/PartnerWithFoodApp" element={<PartnerWithFoodApp />} />
        <Route path="/restaurant-login" element={<RestLogin />} />
        <Route path="/restaurant-dashboard" element={<RestDashboard />} />

      </Routes>
    </Router>
  );
};

export default App;