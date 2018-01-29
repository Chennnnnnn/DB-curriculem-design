import React from 'react';
import ReactDOM from 'react-dom';
import {Menu, Icon, Button} from 'antd';
import { Layout, Breadcrumb } from 'antd';
import axios from 'axios'
import RBook from './components/Rbook';
import RborrowList from './components/RborrowList';
import Rsearch from './components/Rsearch';
import RLogin from './components/Rlogin';
import Rborrow from './components/Rborrow';

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
            books:[]
        }
        this.handleMenu = this.handleMenu.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleBooks = this.handleBooks.bind(this);

    }

    handleLogin (user) {
      this.setState({user: user});
      let that = this;
       axios.post('./reader/login',user)
           .then(function({data}){
            data.result?that.setState({login: true}):alert(data.message);      
          }).catch(function(err){
            console.log(err);
        })
    }

    handleMenu (item) {
      this.setState({menukey : item.key});
    }

    handleBooks (books) {
      this.setState({books: books});
    }

	render() {
      
		return (
        <div>
            {!this.state.login?
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
                    return  <RBook Books={this.handleBooks}/>
                    else if (this.state.menukey == 3) 
                    return  <Rborrow books={this.state.books}/>
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


