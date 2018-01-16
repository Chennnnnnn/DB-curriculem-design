import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input} from 'antd';
import { Tabs, Table } from 'antd';
import $ from 'jquery';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class RborrowList extends React.Component {
    constructor () {
        super();
        this.state= {
            borrows:[],
        }
        this.getborrows = this.getborrows.bind(this);
        $.ajaxSetup({ xhrFields: { withCredentials: true }, crossDomain: true });
    }
    componentWillMount () {
        this.getborrows(); 
    }

    getborrows () {
      let baseUrl = 'http://localhost:3000/reader/';
      let that = this;
      $.ajax({
          url: baseUrl + 'getBorrowList',
          type: 'get',
          dataType:"json",
          success:function(data){
            data.result?that.setState({ borrows:data.message}):alert(data.message);   
          }
      });
    }

    render () {
        const columns = [{
            title: '借阅号',
            dataIndex: 'Bono',
            // render: text => <a href="#">{text}</a>,
          },{
            title: '书名',
            className: 'column-money',
            dataIndex: 'Bname',
          },{
            title: '借阅时间',
            dataIndex: 'Bdate',
          }];

        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                <Table
                columns={columns}
                dataSource={this.state.borrows}
                bordered
                pagination={false}
                />
            </div>
        )
    }
}
