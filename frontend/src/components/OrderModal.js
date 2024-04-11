import React from 'react';
import { Modal } from 'antd';

const OrderModal = ({ visible, onCancel, order }) => {

  if (!order) {
    return null; 
  }


  return (
    <Modal title="Order Details" visible={visible} onCancel={onCancel}>
      <div>{order.dishName}</div>
      <div>{order.quantity}</div>
      <div>{order.totalPrice}</div>
      <div>{order.status}</div>
    </Modal>
  );
};

export default OrderModal;
