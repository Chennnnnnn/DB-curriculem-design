import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input,InputNumber } from 'antd';
import { Tabs, Table } from 'antd';
import $ from 'jquery';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Press extends React.Component {
    constructor () {
        super();
        this.state= {
            press:[],
            Pname:'',
            Pphone:'',
            Paddress:''
        }
        this.getPress = this.getPress.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
        $.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
    }
    componentWillMount () {
        this.getPress(); 
    }
    getPress () {
      
      let baseUrl = 'http://localhost:3000/admin/';
      let that = this;
      $.ajax({
          url: baseUrl + 'getPresses',
          type: 'get',
          dataType:"json",
          success:function(data){
            data.result?that.setState({press: data.message}):alert(data.message);    
          }
      });
    }

    render () {
          
        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="出版社信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={this.state.press}
                        bordered
                        pagination={false}
                        />
                    </div>
                </TabPane>
                <TabPane tab="添加出版社" key="2">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row justify="center" align="middle">
                            <Col span={2} offset={8}>
                              <label>出版社名称</label>
                            </Col>
                            <Col span={6}>
                              <Input onChange={(e)=>{this.setState({Pname: e.target.value})}}/>
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={2} offset={8}>
                              <label>电话</label>
                            </Col>
                            <Col span={6}>
                            <Input onChange={(e)=>{this.setState({Pphone: e.target.value})}} />
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={2} offset={8}>
                              <label>位置</label>
                            </Col>
                            <Col span={6}>
                              <Input onChange={(e)=>{this.setState({Paddress: e.target.value})}}/>
                            </Col>
                        </Row>
                        <Col span={4} offset={8}>
                           <Button type="primary" onClick={this.handleAdd}>添加</Button>
                        </Col>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}



