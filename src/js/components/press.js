import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input,InputNumber } from 'antd';
import { Tabs, Table } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Press extends React.Component {
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
            dataIndex: 'Pno',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '出版社名称',
            className: 'column-money',
            dataIndex: 'Pname',
          }, {
            title: '电话',
            dataIndex: 'Phone',
          },{
            title: '地址',
            dataIndex: 'Baddress',
          }];
          
          const data = [{
            key: '1',
            Pno: 'John Brown',
            Pname: '￥300,000.00',
            Phone: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            Pno: 'Jim Green',
            Pname: '￥1,256,000.00',
            Phone: 'London No. 1 Lake Park',
          }, {
            key: '3',
            Pno: 'Joe Black',
            Pname: '￥120,000.00',
            Phone: 'Sidney No. 1 Lake Park',
          }];

        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="出版社信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={data}
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
                              <Input/>
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={2} offset={8}>
                              <label>电话</label>
                            </Col>
                            <Col span={6}>
                            <Input  />
                            </Col>
                            <Col span={6}>
                              
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={2} offset={8}>
                              <label>位置</label>
                            </Col>
                            <Col span={6}>
                              <Input  />
                            </Col>
                        </Row>
                        <Col span={4} offset={8}>
                           <Button type="primary">添加</Button>
                        </Col>
                    </div>
                </TabPane>
                <TabPane tab="Tab 3" key="3">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>Content</div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}
