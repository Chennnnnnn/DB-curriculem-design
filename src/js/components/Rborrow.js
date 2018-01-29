import React from 'react';
import {Row, Col} from 'antd';
import {Select,Button,Input,InputNumber } from 'antd';
import { Tabs, Table } from 'antd';
import axois from 'axios'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

export default class Rborrow extends React.Component {
    constructor (props) {
        super(props);
        let Bnos = [];
        this.props.books.forEach((item) => {
            Bnos.push(item.Bno);
        })
        this.state= {
            Bnos:Bnos,
            Bno:''
        }
        this.handleBorrow = this.handleBorrow.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        let Bnos = [];
        nextProps.books.forEach((item) => {
            Bnos.push(item.Bno);
        })
        console.log(Bnos)
        this.setState({Bnos: Bnos});
    }

    handleChangeSelect (value) {
        this.setState({Bno: value});
    }

    handleBorrow () {
        let that = this
         axios.post('./reader/borrow',{
            Bno: that.state.Bno,
            Rno: that.state.Rno
          }).then(function({data}){
             alert(data.message);    
          }).catch(function(err){
            console.log(err);
        })
    }
    render () {

        const options =[] 
        this.state.Bnos.forEach((item,index) =>{
            options.push( <Option value={item}>{item}</Option>);
        })

        return (
            <div style={{ background: '#fff', padding: 24, minHeight: 300 }}>

                    <Row >
                        <Col span={2} offset={6}>
                            <label>图书号</label>
                        </Col>
                        <Col span={6}>
                            <Select style={{ width: 200,marginLeft: 0 }} 
                                    onChange= {this.handleChangeSelect}>
                                {options}
                            </Select>
                        </Col>
                        <Col span={2}>
                          <Button onClick={this.handleBorrow}>借阅</Button>
                        </Col>
                    </Row>

            </div>
        )
    }
}



