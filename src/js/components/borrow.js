import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import axios from 'axios'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Borrow extends React.Component {
    constructor () {
        super();
        this.state= {
            borrows:[],
            Bnon:''
        }
        this.getAllborrows = this.getAllborrows.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.haneleDelete = this.haneleDelete.bind(this);
    }
    componentDidMount  () {
        this.getAllborrows(); 
    }

    getAllborrows () {
      let that = this;
       axios.get('./admin/getBorrows')
           .then(function({data}){
            data.result?that.setState({ borrows:data.message}):alert(data.message);   
          }).catch(function(err){
            console.log(err);
        })
    }

    handleChangeSelect (value) {
        this.setState({Bono : value});
    }

    haneleDelete () {
        let that = this;
        axios.post('./admin/returnBook',this.state)
           .then(function({data}){
              that.getAllborrows(); 
              alert(data.message); 
          }).catch(function(err){
            console.log(err);
        })
    }
    render () {
        const columns = [{
            title: '借阅号',
            dataIndex: 'Bono',
            // render: text => <a href="#">{text}</a>,
          }, {
            title: '书名',
            className: 'column-money',
            dataIndex: 'Bname',
          }, {
            title: '借阅者',
            dataIndex: 'Rname',
          },{
            title: '借阅时间',
            dataIndex: 'Bdate',
          }];
        const options =[] 
        this.state.borrows.forEach((item,index) =>{
            options.push( <Option value={item.Bono}>{item.Bono}</Option>);
        })
        console.log(options)


        return (
            <div>
            <Tabs defaultActiveKey="1" onChange={this.callback}>
                <TabPane tab="借阅信息" key="1">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Table
                        columns={columns}
                        dataSource={this.state.borrows}
                        bordered
                        pagination={false}
                        />
                    </div>
                </TabPane>
                <TabPane tab="归还图书" key="2">
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Row justify="center" align="middle">
                            <Col span={8} offset={8}>
                              <label>借阅号</label>
                              <Select style={{ width: 200,marginLeft: 0 }} 
                                      onChange= {this.handleChangeSelect}>
                                   {options}
                              </Select>
                            </Col>
                        </Row>
                        <Col span={4} offset={8}>
                           <Button type="primary" onClick={this.haneleDelete}>删除</Button>
                        </Col>
                    </div>
                </TabPane>
            </Tabs>
            </div>
        )
    }
}