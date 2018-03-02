import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import axios from 'axios'
import '../../css/input.css'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Book extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            books:[]
        }
        this.getAllbook = this.getAllbook.bind(this);
    }
    componentDidMount  () {
        this.getAllbook(); 
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
        this.props.Books(message);
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
        return (
            <div>
                <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                    <Table
                    columns={columns}
                    dataSource={this.state.books}
                    bordered
                    pagination={false}
                    />
                </div>
            </div>
        )
    }
}
