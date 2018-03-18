import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import axios from 'axios';
import '../../css/input.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Book extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            books:[],
            press: this.props.press,
            Bname: '',
            Baddress:'',
            Pno: ''
        }
        this.getAllbook = this.getAllbook.bind(this);
        this.handlebooks = this.handlebooks.bind(this);
        this.gettabs = this.gettabs.bind(this);
        this.handleBname = this.handleBname.bind(this);
        this.handleBaddress = this.handleBaddress.bind(this);
        this.handlePno = this.handlePno.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    componentWillMount  () {
        this.getAllbook(); 
    }
    componentWillReceiveProps(nextProps) {
        this.setState({press: nextProps.press});
    }
    

    getAllbook () {
      let that = this;
      axios.get('./getAllBooks')
           .then(function({data}){
            data.result?that.handlebooks(data.message):alert(data.message);    
          }).catch(function(err){
            console.log(err);
        })
    }
    handlebooks (message) {
        message.map((item,value) => {
            item.key = item.Bno
        })
        this.setState({books:message})
    }

    handleBname (e) {
        this.setState({Bname: e.target.value})
    }
    handleBaddress (e) {
        this.setState({Baddress: e.target.value})
    }
    handlePno (value) {
        this.setState({Pno: value})
    }
    handleAdd(){      
      let that = this;
      axios.post('./admin/addBook',{
            Bname: that.state.Bname,
            Baddress: that.state.Baddress,
            Pno: that.state.Pno
        }).then(function({data}){
            if (data.result) {
                that.setState({
                    Bname: '',
                    Baddress: '',
                    Pno: ''
                })
                that.getAllbook();       
            } 
            alert('添加成功');    
          }).catch(function(err){
            console.log(err);
        })
    }

    gettabs(key){
        console.log(key);
    }


    render () {
        const columns = [{
            title: '编号',
            dataIndex: 'Bno',
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
          const options =[] 
          this.state.press.forEach((item,index) =>{
              options.push( <Option value={item.Pno}>{item.Pname}</Option>);
          })
          console.log(options)

        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="图书信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={this.state.books}
                        bordered
                        pagination={false}
                        />
                    </div>
                </TabPane>
                <TabPane tab="添加图书" key="2">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row justify="center" align="middle">
                            <Col span={1} offset={8}>
                              <label>书名</label>
                            </Col>
                            <Col span={6}>
                              <Input  onChange={this.handleBname}/>
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={1} offset={8}>
                              <label>位置</label>
                            </Col>
                            <Col span={6}>
                              <Input onChange={this.handleBaddress}/>
                            </Col>
                        </Row>
                        <Row justify="center" align="middle">
                            <Col span={1} offset={8}>
                              <label>出版社</label>
                            </Col>
                            <Col span={6}>
                              <Select style={{ width: 273,marginLeft: 0 }} 
                                      onChange= {this.handlePno}>
                                      {options}
                              </Select>
                            </Col>
                        </Row>
                        <Col span={2} offset={13}>
                           <Button type="primary" style={{ width: 90}} onClick={this.handleAdd}>添加</Button>
                        </Col>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}
