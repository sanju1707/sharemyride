import React from 'react';
import {  Button, Dropdown, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import carlogo from "../../assets/car black.png"
import "../../components/homepage/homenavbar.scss"



const menuItems = [
  {
    key: '1',
    label: 'Login',
  },
  {
    key: '2',
    label: 'Register',
  },
];

const Navbar = () => {
  return (
    <>
    <div className='logo'>
          <img
            src={carlogo}
            alt="Logo"
            
          />
          <p>Share my ride</p>
        </div>

       
        <Space size="large">
          <Button type="default">Rent a Ride</Button>
          <Button type="default">Pool a Ride</Button>
        </Space>

        
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Avatar
            size="large"
            icon={<UserOutlined />}
            style={{ cursor: 'pointer', marginLeft: '16px' }}
          />
        </Dropdown>
    </>
  );
};

export default Navbar;






