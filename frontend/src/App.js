import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.js'
import BecomeASeller from './components/BecomeASeller.js'
import PartnerWithFoodApp from './components/PartnerWithFoodApp.js';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/become-a-seller" element={<BecomeASeller />} />
        <Route path="/PartnerWithFoodApp" element={<PartnerWithFoodApp />} />

      </Routes>
    </Router>
  );
};

export default App;