import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Borrow extends React.Component {
    constructor () {
        super();
        this.state= {
            books:{}
        }
        this.gettabs = this.gettabs.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    gettabs(key){
        console.log(key);
    }
    handleChangeSelect(){

    }

    render () {
        const columns = [{
            title: '编号',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '书名',
            className: 'column-money',
            dataIndex: 'Bname',
          }, {
            title: '出版社',
            dataIndex: 'Pname',
          },{
            title: '位置',
            dataIndex: 'Baddress',
          },{
            title: '状态',
            dataIndex: 'Bstate',
          }];
          
          const data = [{
            key: '1',
            name: 'John Brown',
            money: '￥300,000.00',
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            name: 'Jim Green',
            money: '￥1,256,000.00',
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            name: 'Joe Black',
            money: '￥120,000.00',
            address: 'Sidney No. 1 Lake Park',
          }];

        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="借阅信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={data}
                        bordered
                        pagination={false}
                        title={() => 'Header'}
                        />
                    </div>
                </TabPane>
                <TabPane tab="归还图书" key="2">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row justify="center" align="middle">
                            <Col span={8} offset={8}>
                              <label>借阅号</label>
                              <Select defaultValue="0" 
                                      style={{ width: 200,marginLeft: 0 }} 
                                      onChange= {this.handleChangeSelect}>
                                      <Option value="0">0</Option>
                                      <Option value="1">1</Option>
                                      <Option value="2">2</Option>
                              </Select>
                            </Col>
                        </Row>
                        <Col span={4} offset={8}>
                           <Button type="primary">删除</Button>
                        </Col>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}
