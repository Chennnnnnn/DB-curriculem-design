import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, hashHistory} from 'react-router';
import {Menu, Icon, Button} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import $ from 'jquery';
import RBook from './components/Rbook';
import RborrowList from './components/RborrowList';
import Rsearch from './components/Rsearch';
import RLogin from './components/Rlogin';

import 'antd/dist/antd.css';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const { Header, Content, Footer } = Layout;

export default class Root extends React.Component {
    constructor(){
        super();
        this.state ={
            menukey:1,
            login: false,
            user:{
              Rno:'',
              Rname:'',
              password:''
            },
            press:[]
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    componentWillMount () {

    }

    handleLogin (user) {
      this.setState({user: user});
      $.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
      let baseUrl = 'http://localhost:3000/reader/';
      let that = this;
      $.ajax({
          url: baseUrl + 'login',
          type: 'post',
          data: user,
          dataType:"json",
          success:function(data){
            data.result?that.setState({login: true}):alert(data.message);    
          }
      });
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
            {this.state.login?
            <RLogin login={this.handleLogin}/>:
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
                <Menu.Item key="1">检索</Menu.Item>
                <Menu.Item key="2">图书</Menu.Item>
                <Menu.Item key="3">借阅</Menu.Item>
                <Menu.Item key="4">个人借阅信息</Menu.Item>
              </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>

              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>图书管理系统</Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.user.Rname}</Breadcrumb.Item>
              </Breadcrumb>
              {(() => {
                if (this.state.menukey == 1)
                    return <Rsearch />
                  else if (this.state.menukey == 2)
                    return  <RBook />
                    else if (this.state.menukey == 3) 
                    return  <RborrowList/>
                  else return  <RborrowList/>
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
ReactDOM.render(
	<Root/>, document.getElementById('root'));


