import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tabs, Modal, Layout, Menu, Image, theme, message } from 'antd';
import { getRestaurant } from '../apicalls/restaurantApiCall.js';
import { useNavigate } from 'react-router-dom';
import LiveOrder from './orders/LiveOrder.js';
import Home from './orders/Home.js';
import { TbLogout2 } from "react-icons/tb";
import { LogoutOutlined } from '@ant-design/icons';
import { getOrder } from '../apicalls/orderApiCall.js';
import CompletedOrders from './orders/CompletedOrders.js';
import { FaLocationDot } from "react-icons/fa6";
import io from 'socket.io-client';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';




const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

const IMAGE_URL = 'http://localhost:5000/uploads/';


const RestProfile = () => {
  const [imagePath, setImagePath] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1');
  const [liveOrderCount, setLiveOrderCount] = useState(0);
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();





  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const restaurantData = await getRestaurant();
        console.log('Restaurant Data:', restaurantData);
        if (restaurantData && restaurantData.data) {
          setImagePath(`${IMAGE_URL}${restaurantData.data.profilePicture}`);
          setRestaurant(restaurantData.data);
          const response = await getOrder();
          setLiveOrderCount(response.data.length);
        } else {
          console.error('Invalid restaurant data:', restaurantData);
        }
      } catch (error) {
        console.error('Error fetching restaurant profile:', error);
      }
    };
    fetchRestaurantProfile();
  }, []);

  const handleViewOrders = (status) => {
    navigate(`/orders/${status}`);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const TbLogout2 = ({ className, onClick }) => (
    <div className={`flex  cursor-pointer ${className}`} onClick={onClick}>
      <LogoutOutlined />
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleOrderDelete = () => {
    setLiveOrderCount(liveOrderCount - 1);
  };


  const [orders, setOrders] = useState([]);
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


  const [socket, setSocket] = useState(null);



  const showNotification = (newOrder) => {
    const { dishName, totalPrice, quantity } = newOrder;
    NotificationManager.info(
      `Quantity: ${quantity} - ${dishName} - Total Price: ₹${totalPrice}`,
      'New Order Received',
      5000
    );

    setOrders([newOrder, ...orders]);
    setLiveOrderCount((prevCount) => prevCount + 1);
  };

  const handleOrderAccept = () => {
    setLiveOrderCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Connected to the server');
    });

    newSocket.on('new-order', (newOrder) => {
      showNotification(newOrder);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);







  return (

    <Layout>
      <NotificationContainer />
      <Header className="text-white" style={{ display: 'flex', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1 className='text-white text-4xl italic mx-auto mb-2 cursor-pointer'  onClick={() => navigate('/restaurant-dashboard')}>Num-Num</h1>
        </div>


        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <Tabs
            className="max-w6xl"
            activeKey={activeTab}
            style={{ width: '100%', color: 'white' }}
            onChange={handleTabChange}
            tabBarStyle={{ margin: 'auto', color: 'white' }}
            tabBarGutter={50}
          >
            <TabPane tab={<span style={{ color: 'white' }}>Home</span>} key="1" />
            <TabPane tab={<span style={{ color: 'white' }}>{`Live Orders (${liveOrderCount})`}</span>} key="2" />
            <TabPane tab={<span style={{ color: 'white' }}>Completed Orders</span>} key="3" />
          </Tabs>
        </div>

        <div>
          <TbLogout2 className='mt-6' onClick={handleLogout} style={{ fontSize: '40px' }} />
        </div>
      </Header>

      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }} className="bg-gray-200 h-screen flex flex-col justify-between overflow-y-auto">
          {restaurant && (
            <div className="flex flex-col items-center">
              <div className="mt-0">
                <Image width={200} height={300} src={imagePath} />
              </div>
              <div className="mt-4">
                <span className="font-bold text-xl">{restaurant.name.toUpperCase()}</span>
              </div>
              <div className="mt-2">

                <div className='flex'>
                  <FaLocationDot className='flex mr-2 mt-1 z-20 text-red-600' />
                  <span className=''>{restaurant.location.toUpperCase()}</span>

                </div>


              </div>
            </div>
          )}
        </Sider>

        <Content style={{ padding: '24px', minHeight: 280 }}>
          {activeTab === '1' && <Home />}
          {activeTab === '2' && (
            <LiveOrder
              onOrderDelete={handleOrderDelete}
              onOrderAccept={handleOrderAccept}
              showNotification={showNotification}
              liveOrderCount={liveOrderCount}
            />
          )}
          {/* {activeTab === '2' && <LiveOrder onOrderDelete={handleOrderDelete} />} */}
          {activeTab === '3' && <CompletedOrders />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default RestProfile;