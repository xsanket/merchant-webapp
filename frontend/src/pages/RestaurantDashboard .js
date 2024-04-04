import React, { useEffect, useState } from 'react';
import { Layout, Avatar, Menu, Card, Button, Drawer, List } from 'antd';
import axios from 'axios';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;

const RestaurantDashboard = () => {
    const [restaurantData, setRestaurantData] = useState(null);
    const [dishes, setDishes] = useState([]);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        fetchRestaurantData();
        fetchDishes();
    }, []);

    const fetchRestaurantData = async () => {
        try {
            const response = await axios.get('/api/restaurant-data', {
                withCredentials: true,
            });
            setRestaurantData(response.data.restaurant);
        } catch (error) {
            console.error('Error fetching restaurant data:', error);
        }
    };

    const fetchDishes = async () => {
        try {
            const response = await axios.get('/api/restaurant-dishes', {
                withCredentials: true,
            });
            setDishes(response.data.dishes);
        } catch (error) {
            console.error('Error fetching dishes:', error);
        }
    };

    const addDish = async (dishName, dishPrice, dishCategory) => {
        try {
            await axios.post(
                '/api/add-dish',
                { name: dishName, price: dishPrice, category: dishCategory },
                { withCredentials: true }
            );
            fetchDishes();
        } catch (error) {
            console.error('Error adding dish:', error);
        }
    };

    const deleteDish = async (dishId) => {
        try {
            await axios.delete(`/api/delete-dish/${dishId}`, {
                withCredentials: true,
            });
            fetchDishes();
        } catch (error) {
            console.error('Error deleting dish:', error);
        }
    };

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Layout className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(/bg.png)` }}>
            <Header className="header">
                <div className="logo" />
                <div className="user-info">
                    {restaurantData && (
                        <>
                            <Avatar src={restaurantData.profilePicture} alt="Profile" />
                            <span className="text-white ml-2">{restaurantData.name}</span>
                        </>
                    )}
                </div>
            </Header>
            <Layout>
                <Sider trigger={null} collapsible>
                    <div className="logo" />
                    <Button type="text" className="text-white" onClick={showDrawer}>
                        <LeftOutlined />
                    </Button>
                    <Drawer
                        title="Menu"
                        placement="left"
                        closable={false}
                        onClose={onClose}
                        visible={visible}
                        width={250}
                    >
                        <Button type="primary" onClick={() => addDish('New Dish', 0, 'New')} block>
                            Add Dish
                        </Button>
                        <List
                            dataSource={dishes}
                            renderItem={(dish) => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={dish.name}
                                        description={`$${dish.price} - ${dish.category}`}
                                    />
                                    <Button
                                        type="text"
                                        danger
                                        onClick={() => deleteDish(dish.id)}
                                        className="float-right"
                                    >
                                        Delete
                                    </Button>
                                </List.Item>
                            )}
                        />
                    </Drawer>
                </Sider>
                <Content className="site-layout-background p-4">
                    <div className="text-white">Content for restaurant dishes will be placed here.</div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default RestaurantDashboard;



// /api/restaurant-data - should return the restaurant data, including the name and profile picture.
// /api/restaurant-dishes - should return the list of dishes for the restaurant.
// /api/add-dish - should accept a POST request with dish data (name, price, category) and add it to the restaurant's dishes.
// /api/delete-dish/:id - should accept a DELETE request with the dish ID and remove the dish from the restaurant's dishes.