import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import OrderList from '../components/OrderList';
import OrderModal from '../components/OrderModal';
import { getOrderDashboard } from '../apicalls/restaurantApiCall.js'

const Dashboard = () => {
    const [orders, setOrders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const fetchOrders = async (status) => {
        try {
            //const response = await fetch(`/api/orders/${status}`);
            const response = await getOrderDashboard({status});
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchOrders('pending');
        // Fetch other order statuses as needed
    }, []);

    const handleViewOrders = (status) => {
        fetchOrders(status);
    };

    const handleModalOpen = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const handleModalClose = () => {
        setSelectedOrder(null);
        setModalVisible(false);
    };

    return (
        <div>
            <Header liveOrders={2} pendingOrders={orders.length} totalOrders={0} onViewOrders={handleViewOrders} />
            <OrderList orders={orders} onOrderClick={handleModalOpen} />
            <OrderModal visible={modalVisible} onCancel={handleModalClose} order={selectedOrder} />
        </div>
    );
};

export default Dashboard;
