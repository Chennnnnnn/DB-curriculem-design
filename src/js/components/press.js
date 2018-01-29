import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input,InputNumber } from 'antd';
import { Tabs, Table } from 'antd';
import axios from  'axios';

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
    }
    componentWillMount () {
        this.getPress(); 
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
    handleAdd () {
      let that = this;
       axios.post('./admin/addPress',{
            Pname:this.state.Pname,
            Pphone:this.state.Pphone,
            Paddress: this.state.Paddress
        }).then(function({data}){
            if (data.result) {
                that.setState({
                    Pname: '',
                    Pphone: '',
                    Paddress: ''
                })
                that.getPress();       
            } 
            alert(data.messageL);     
        }).catch(function(err){
            console.log(err);
        })
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
            dataIndex: 'Pphone',
          },{
            title: '地址',
            dataIndex: 'Paddress',
          }];
          
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



