import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import axios from 'axios';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Reader extends React.Component {
    constructor () {
        super();
        this.state= {
            readers :[],
            Rname: '',
            password:''
        }
        this.getReaders = this.getReaders.bind(this);
        this.handlebooks = this.handlebooks.bind(this);
        this.handleRname = this.handleRname.bind(this);
        this.handlepassword = this.handlepassword.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentWillMount () {
        this.getReaders(); 
    }

    getReaders () {

      let that = this;
      axios.get('./admin/getReaders')
           .then(function({data}){
            data.result?that.handlebooks(data.message):alert(data.message);    
          }).catch(function(err){
            console.log(err);
        })
    }

    handlebooks (message) {
        message.map((item,value) => {
            item.key = item.Rno
        })
        this.setState({readers:message})
    }
    handleRname (e) {
        this.setState({Rname: e.target.value});
    }
    handlepassword (e) {
        this.setState({password: e.target.value});
    }
    handleAdd () {
        let that = this;
        axios.post('./reader/register', {
            Rname:this.state.Rname,
            password: this.state.password
        }).then(function({data}){
            if (data.result) {
                that.setState({
                    Rname: '',
                    password: ''
                })
                that.getReaders();       
            } 
            alert(data.message);   
          }).catch(function(err){
            console.log(err);
        })
    }

    render () {
        const columns = [{
            title: '读者号',   
            dataIndex: 'Rno',
            render: text => <a href="#">{text}</a>,
          }, {
            title: '读者名',
            className: 'column-money',
            dataIndex: 'Rname',
          }];
          


        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="读者信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={this.state.readers}
                        bordered
                        pagination={false}
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
                              <Input onChange={this.handleRname} />
                            </Col>
                        </Row>
                        <Row >
                            <Col span={1} offset={8}>
                              <label>密码</label>
                            </Col>
                            <Col span={6}>
                              <Input onChange={this.handlepassword} />
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
