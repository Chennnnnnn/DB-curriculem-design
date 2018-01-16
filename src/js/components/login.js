import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import '../../css/login.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;


export default class Login extends React.Component {
    constructor(){
        super()
    }
    render () {
        return (
            <div id='login'>
              <div className="center">
              <Row>
              <Col span={8} offset={2}><label>账号</label></Col>
              <Col span={6} ><Input /></Col>
              </Row>
              <Row>
              <Col span={8} offset={2}><label>密码</label></Col>
              <Col span={6} ><Input /></Col>
              </Row>
              <Col span={2} offset={11}><Button>登录</Button></Col>
              </div>
            </div>
        )
    }
}