import React from 'react';
import {  Layout} from 'antd';
import Navbar from './homenavbar';
const { Header } = Layout;
import "../homepage/homepage.scss"
import { Content, Footer } from 'antd/es/layout/layout';
import HomeContent from './homecontent';

const Homepage = () => {
  return (
    <>
      <Layout  >
        <Header className='header'>
            <Navbar/>
        </Header>
        <Content>
          <HomeContent/>
        </Content>
        <Footer>
          
        </Footer>
      </Layout>
    </>
  );
};
export default Homepage
