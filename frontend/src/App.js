import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js'
import PartnerWithFoodApp from './pages/PartnerWithFoodApp.js';
import RestDashboard from './pages/RestDashboard.js';
import RestRegistration from './pages/RestRegistration.js';
import RestLogin from './pages/RestLogin.js';
import ProtectedPages from './components/ProtectedPages.js';

import Dashboard from './pages/orderDashboard.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant-registration" element={<RestRegistration />} />
        <Route path="/PartnerWithFoodApp" element={<PartnerWithFoodApp />} />
        <Route path="/restaurant-login" element={<RestLogin />} />
        <Route path="/order-dashboard" element={<Dashboard />} />
        <Route path="/restaurant-dashboard" element={<ProtectedPages><RestDashboard /></ProtectedPages>} />

      </Routes>
    </Router>
  );
};

export default App;