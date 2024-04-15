import React, { useState, useEffect } from 'react';
import { Table, message, Button, Modal } from 'antd';
import { deleteOrder, getOrder } from '../../apicalls/orderApiCall';
import moment from 'moment';
import io from 'socket.io-client';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

function LiveOrder({ onOrderDelete }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [isConfirmCancelModalVisible, setIsConfirmCancelModalVisible] = useState(false);
  const [socket, setSocket] = useState(null);

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
          <Button danger onClick={() => handleCancelOrder(record.orderId, record)} confirm={{
            title: 'Are you sure want to cancel order?',
            onOk: () => setIsConfirmCancelModalVisible(true),
          }}>
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
        const reversedOrders = response.data.reverse();
        setOrders(reversedOrders);
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

  };

  const calculateDeliveryCharges = (totalPrice) => {
    const charges = (totalPrice * 0.1).toFixed(2);
    setDeliveryCharges(charges);
  };


  // delete the order
  const handleCancelOrder = async (orderId, order) => {
    setCancelOrder(order);
    setIsConfirmCancelModalVisible(true);
  };

  const handleConfirmCancelOrder = async () => {
    setIsConfirmCancelModalVisible(false);
    try {
      await deleteOrder(cancelOrder.orderId);
      setOrders(orders.filter((order) => order.orderId !== cancelOrder.orderId));
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

  const handleCancelConfirmCancelOrder = () => {
    setIsConfirmCancelModalVisible(false);
    setCancelOrder(null);
  };


  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server');
      getOrders();
    });

    newSocket.on('new-order', (newOrder) => {
      // showNotification(newOrder);
      setOrders([...orders, newOrder]);
      getOrders();
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });
    getOrders();
    return () => {
      newSocket.disconnect();
    };
  }, []);

  const showNotification = (newOrder) => {
    const { dishName, totalPrice, quantity } = newOrder;
    NotificationManager.info(
      `Quantity: ${quantity} - ${dishName} - Total Price: ₹${totalPrice}  `,
      'New Order Received',
      5000
    );
    getOrders();
  }




  // useEffect(() => {
  //   getOrders();
  // }, []);

  return (
    <div>
      <NotificationContainer />
      <Table columns={columns} dataSource={orders} />

      <Modal
        title="Payment and Confirmation"
        open={isModalVisible}
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

      <Modal
        title="Are you sure want to cancel order?"
        open={isConfirmCancelModalVisible}
        onOk={handleConfirmCancelOrder}
        onCancel={handleCancelConfirmCancelOrder}
        className="cancel-order-modal"
        centered
      >
        {cancelOrder && (
          <>
            <p className='text-sm'>
              Order Id: {cancelOrder.orderId}
            </p>
            <p>
              Total Price: ₹{cancelOrder.totalPrice}
            </p>
          </>
        )}
      </Modal>

    </div>
  );
}

export default LiveOrder;
