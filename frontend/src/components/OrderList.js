import React from 'react';

const OrderList = ({ orders }) => {
  return (
    <div>
      {orders.map(order => (
        <div key={order._id}>
          <div>{order.dishName}</div>
          <div>{order.quantity}</div>
          <div>{order.totalPrice}</div>
          <div>{order.status}</div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
