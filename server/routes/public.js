import connection from '../lib/mysqlconnect';
import {query} from '../models/index'



const getAllBook = (req,res) => {
    const sql = `select Bno,Bname,Baddress,Bstate,book.Pno,Pname
                  from book,press
                  where book.Pno = press.Pno`;
    console.log(query)
    query(sql)
    .then((results) => {
        res.json({
            result : true,
            message: results
        })
    }).catch((err) => {
        res.json({
            result : false,
            message: '连接错误'
        })
    })
}

const selectBook = (req,res) => {
    console.log(req.body)
    const sql = `select book.Pno,Bname,Bstate,Baddress,Pname,Bno
               from book,press 
               where Bname like "%${req.body.Bname}%" and book.Pno = press.Pno`;
    query(sql)
    .then((results) => {
        res.json({
            result : true,
            message: results
        })
    }).catch((err) => {
        res.json({
            result : false,
            message: '连接错误'
        })
    })
}


export default {
    getAllBook,
    selectBook
}
