import React from 'react';
import ReactDOM from 'react-dom';
import {Menu, Icon, Button} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios';

import Book from './book';
import Reader from './reader';
import Borrow from './borrow';
import Press from './press';
import Login from './login';

import 'antd/dist/antd.css';
import '../../css/index.css'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;


export default class Aroot extends React.Component {
    constructor(){
        super();
        this.state ={
            menukey:1,
            login: false,
            user:{
              account:'',
              password:''
            },
            press:[]
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handlePress = this.handlePress.bind(this);
        this.getPress = this.getPress.bind(this);
    }
    componentWillMount () {
        this.getPress(); 
        this.handlePress();
    }
    getPress () {
      let that = this;
      axios.get('./admin/getPresses')
          .then(function({data}){
             data.result?that.setState({press: data.message}):alert(data.message);    
          }).catch(function(err){
            console.log(err);
        })
    }
    handleLogin (user) {
      this.setState({user: user});
      
      let that = this;
      axios.post('./admin/login',user)
           .then(function({data}){
             data.result?that.setState({login: true}):alert(data.message);
          }).catch(function(err){
            console.log(err);
        })
    }

    handleMenu (item) {
      this.setState({menukey : item.key});
    }

    handlePress (press) {
      this.setState({press: press});
    }

	render() {
      
		return (
        <div>
            {!this.state.login?
            <Login login={this.handleLogin}/>:
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
                <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
                <Breadcrumb.Item>图书管理员</Breadcrumb.Item>
              </Breadcrumb>
              {(() => {
                if (this.state.menukey == 1)
                    return  <Book press={this.state.press}/>
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
            </Layout>}
        </div>
		);
	};
}