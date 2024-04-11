import React from 'react';

const Header = ({ liveOrders, pendingOrders, totalOrders, onViewOrders }) => {
  return (
    <div className="flex justify-between items-center bg-gray-200 p-4">
      <div>
        <div>Live Orders ({liveOrders})</div>
        <div>Pending Orders ({pendingOrders})</div>
        <div>Total Orders ({totalOrders})</div>
      </div>
      <div>
        <button onClick={() => onViewOrders('pending')}>View Pending Orders</button>
        {/* Add similar buttons for other order statuses */}
      </div>
    </div>
  );
};

export default Header;
