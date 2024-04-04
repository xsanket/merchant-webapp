import React, { useEffect, useState } from 'react';
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Image, theme } from 'antd';
import { getRestaurant } from '../apicalls/restaurantApiCall.js';

const { Header, Content, Sider } = Layout;
const items1 = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));
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
  const [restaurant, setRestaurant] = useState(null);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const fetchRestaurantProfile = async () => {
      try {
        const restaurantData = await getRestaurant();
        console.log('Restaurant Data:', restaurantData);

        // Check if the data object exists and contains profilePicture and name
        if (restaurantData && restaurantData.data) {
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
  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />

      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
            {restaurant && (
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                <Image
                  width={200}
                  src={restaurant.profilePicture}
                />
                <img src={restaurant.profilePicture} style={{ marginRight: 8 }} />
                <span>{restaurant.name}</span>
              </div>
            )}
            <div>

            </div>


          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default RestProfile;