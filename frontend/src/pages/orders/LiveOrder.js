import React, { useState, useEffect } from 'react';
import { Table, message, Button, Modal } from 'antd';
import { deleteOrder, getOrder } from '../../apicalls/orderApiCall';
import moment from 'moment';

function LiveOrder({ onOrderDelete }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
    },
    {
      title: "Dish Name",
      dataIndex: "dishName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Shipping Address",
      dataIndex: "shippingAddress",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      render: (text) => "₹ " + text
    },
    {
      title: "Order Time",
      dataIndex: "createdAt",
      render: (text) => {
        const formattedDate = moment(text).format("hh:mm");
        return formattedDate;
      }
    },
    {
      title: "Order Status",
      render: (text, record) => (
        <div className='space-x-1'>
          <Button type="primary" onClick={() => handleAcceptOrder(record.orderId)}>
            Accept
          </Button>
          <Button danger onClick={() => handleCancelOrder(record.orderId)}>
            Cancel
          </Button>
        </div>
      ),
    },
  ];

  const getOrders = async () => {
    try {
      const response = await getOrder();
      if (response.success) {
        setOrders(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const handleAcceptOrder = (orderId) => {
    const order = orders.find((order) => order.orderId === orderId);
    setSelectedOrder(order);
    setIsModalVisible(true);
    calculateDeliveryCharges(order.totalPrice);
  };

  const handleCancelButton = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setDeliveryCharges(0);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
    setDeliveryCharges(0);
    // Additional logic for accepting and paying delivery charges
  };

  const calculateDeliveryCharges = (totalPrice) => {
    const charges = (totalPrice * 0.1).toFixed(2);
    setDeliveryCharges(charges);
  };


  // delete the order
  const handleCancelOrder = async (orderId) => {
    try {
      await deleteOrder(orderId);
      setOrders(orders.filter((order) => order.orderId !== orderId));
      onOrderDelete();
      message.success('Order canceled successfully');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        message.error('Order not found');
      } else {
        message.error('Failed to cancel order');
      }
    }
  };


  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={orders} />

      <Modal
        title="Payment and Confirmation"
        visible={isModalVisible}
        onCancel={handleCancelButton}
        onOk={handleModalOk}
        okText={`Pay ₹ ${deliveryCharges}`}
        cancelText="Cancel"
        centered
      >
        {selectedOrder && (
          <>
            <p className='text-sm'>Shipping Address: {selectedOrder.shippingAddress}</p>
            <p>Total Price: ₹{selectedOrder.totalPrice}</p>
            <p>GST and Delivery Charges (10% of Total Price): ₹{deliveryCharges}</p>
          </>
        )}
      </Modal>
    </div>
  );
}

export default LiveOrder;
