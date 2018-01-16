import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import $ from 'jquery';

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
        $.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
    }
    componentWillMount () {
        this.getReaders(); 
    }

    getReaders () {
      let baseUrl = 'http://localhost:3000/';
      let that = this;
      $.ajax({
          url: baseUrl + 'admin/getReaders',
          type: 'get',
          dataType:"json",
          success:function(data){
            data.result?that.handlebooks(data.message):alert(data.message);    
          }
      });
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
        console.log('sdfsdfsd')
        let that = this;
        $.ajax({
            url: 'http://localhost:3000/reader/register',
            type: 'post',
            data: {
                Rname:this.state.Rname,
                password: this.state.password
            },
            dataType:"json",
            success:function(data){
                if (data.result) {
                    that.setState({
                        Rname: '',
                        password: ''
                    })
                    that.getReaders();       
                } 
                alert(data.message);   
            }
        });
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
// const data = [{
//     key: '1',
//     name: 'John Brown',
//     Bname: '￥300,000.00',
//     address: '删除',
//   }, {
//     key: '2',
//     name: 'Jim Green',
//     Bname: '￥1,256,000.00',
//     address: '删除',
//   }, {
//     key: '3',
//     name: 'Joe Black',
//     Bname: '￥120,000.00',
//     address: '删除',
//   }];