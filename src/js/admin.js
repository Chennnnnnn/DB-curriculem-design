import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, hashHistory} from 'react-router';
import {Menu, Icon, Button} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import Book from './components/book';
import Reader from './components/reader';
import Borrow from './components/borrow';
import Press from './components/press';
import Login from './components/login'

import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

export default class Root extends React.Component {
    constructor(){
        super();
        this.state ={
            menukey:1,
            login: false
        }
        this.handleMenu = this.handleMenu.bind(this);
    }


    handleMenu (item) {
        this.setState({menukey : item.key});
    }

	render() {
        

		return (
        <div>
        {(()=>{
            if(!this.state.login)
              return  <Login />
            else 
              return 
            <Layout className="layout">
            <Header>
              <div className="logo" />
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={['1']}
                style={{ lineHeight: '64px' }}
                onClick={this.handleMenu}
              > 
                <Menu.Item key="1">图书</Menu.Item>
                <Menu.Item key="2">读者</Menu.Item>
                <Menu.Item key="3">借阅</Menu.Item>
                <Menu.Item key="4">出版社</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>

              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb>
              {(() => {
                if (this.state.menukey == 1)
                    return  <Book />
                 else if (this.state.menukey == 2)
                    return <Reader />
                 else if (this.state.menukey == 3)
                    return <Borrow />
                 else 
                    return <Press />
              })()}
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              BookSystem ©2017 Created by Chennnnnn
            </Footer>
          </Layout>
      })()}
        </div>
		);
	};
}
ReactDOM.render(
	<Root/>, document.getElementById('root'));

