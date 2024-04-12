import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tabs, Modal, Layout, Menu, Image, theme } from 'antd';
import { getRestaurant } from '../apicalls/restaurantApiCall.js';
import { useNavigate } from 'react-router-dom';
import LiveOrder from './orders/LiveOrder.js'
import Home from './orders/Home.js';
import { TbLogout2 } from "react-icons/tb";
import { LogoutOutlined } from '@ant-design/icons';


const { Header, Content, Sider } = Layout;
const { TabPane } = Tabs;

const IMAGE_URL = 'http://localhost:5000/uploads/';

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const RestProfile = () => {
  const [imagePath, setImagePath] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('1'); // State to track active tab
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const restaurantData = await getRestaurant();
        console.log('Restaurant Data:', restaurantData);
        if (restaurantData && restaurantData.data) {
          setImagePath(`${IMAGE_URL}${restaurantData.data.profilePicture}`);
          setRestaurant(restaurantData.data);
        } else {
          console.error('Invalid restaurant data:', restaurantData);
        }
      } catch (error) {
        console.error('Error fetching restaurant profile:', error);
        if (error.error === 'Failed to fetch restaurant profile') {
          console.error('Failed to fetch restaurant profile from the server');
        } else {
          console.error('Error:', error);
        }
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
  }

  return (
    <Layout>

      <Layout>
        <Header className="text-white" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div></div>
          <TbLogout2 className='' onClick={handleLogout} style={{ fontSize: '40px' }} />
        </Header>


      </Layout>


      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }} className="bg-gray-200 h-screen flex flex-col justify-between overflow-y-auto">
          {restaurant && (
            <div className="flex flex-col items-center">
              <div className="mt-0">
                <Image width={200} src={imagePath} />
              </div>
              <div className="mt-4">
                <span className="font-bold">{restaurant.name}</span>
              </div>
              <div className="mt-2">
                <span>{restaurant.location}</span>
              </div>
            </div>
          )}

        </Sider>


        <Content
          style={{
            padding: '0 24px',
            minHeight: 280,
          }}
        >
          <Tabs className="flex justify-center content-center" activeKey={activeTab} onChange={handleTabChange}>
            <>
              <TabPane tab="Home" key="1">
                <Home />
              </TabPane>
              <TabPane tab="Live Orders" key="2">
                <LiveOrder />
              </TabPane>
              <TabPane tab="Pending Orders" key="3"></TabPane>
              <TabPane tab="Completed Orders" key="4"></TabPane>
            </>
          </Tabs>

        </Content>


      </Layout>

    </Layout>
  );
};

export default RestProfile;