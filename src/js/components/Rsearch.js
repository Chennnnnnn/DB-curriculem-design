import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import axios from 'axios'
import '../../css/input.css'

const Search = Input.Search;

export default class Rsearch extends React.Component {
    constructor (props) {
        super(props);
        this.state= {
            books:[]
        }
        this.search = this.search.bind(this);
    }

    search (value) {
      let that = this;
       axios.post('./searchBook',{
            Bname: value
        }).then(function({data}){
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
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Col offset={18} style={{marginBottom:30}}>
                    <Search placeholder="请输入书名"
                            onSearch={this.search}
                            enterButton
                            />
                </Col>
                <Table  columns={columns}
                        dataSource={this.state.books}
                        bordered
                        pagination={false}
                        />
            </div>
        )
    }
}
