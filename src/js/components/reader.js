import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import jq from 'jquery';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Reader extends React.Component {
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
            title: '读者号',
            dataIndex: 'name',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '读者名',
            className: 'column-money',
            dataIndex: 'Bname',
          },{
            title: '操作',
            dataIndex: 'address',
          }];
          
          const data = [{
            key: '1',
            name: 'John Brown',
            Bname: '￥300,000.00',
            address: '删除',
          }, {
            key: '2',
            name: 'Jim Green',
            Bname: '￥1,256,000.00',
            address: '删除',
          }, {
            key: '3',
            name: 'Joe Black',
            Bname: '￥120,000.00',
            address: '删除',
          }];

        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="读者信息" key="1">
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
                <TabPane tab="新增读者" key="2">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row>
                            <Col span={1} offset={8}>
                              <label>账号</label>
                            </Col>
                            <Col span={6}>
                              <Input placeholder="default size" />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={1} offset={8}>
                              <label>密码</label>
                            </Col>
                            <Col span={6}>
                              <Input placeholder="default size" />
                            </Col>
                        </Row>
                        <Col span={4} offset={8}>
                           <Button type="primary">添加</Button>
                        </Col>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}
