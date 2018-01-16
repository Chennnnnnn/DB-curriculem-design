import express from 'express';
import connection from '../lib/mysqlconnect';

import bookModel from '../models/book';
import borrowModel from '../models/borrow';
import pressModel from '../models/press';
import {
    fail
} from 'assert';
import {
    error
} from 'util';
import {
    connect
} from 'net';

/*登录
 */
let login = (req, res) => {
    let login = (error, results) => {
        if (!results.length) {
            res.json({
                result: false,
                message: '该账户不存在'
            });
        } else {
            if (req.body.password === results[0].password) {
                req.session.userid = 'admin';
                res.json({
                    result: true,
                    message: '登录成功'
                })
            } else {
                res.json({
                    result: false,
                    message: '账号或密码不正确'
                })
            }
        }
    }
    let select = `select * from admin where account = "${req.body.account}"`
    connection.query(select, login);
}

/*登出
 */
let logout = (req, res) => {
    req.session.user = null;
    res.json({
        result: true,
        message: '注销成功'
    });
}

//添加图书

let addBook = (req, res) => {
    console.log(req.body);
    let addBook = (error, results) => {
        if (error) throw error;
        res.json({
            result: true,
            message: {
                Bno: results.insertId
            }
        })
    }
    if (req.body.Bname == '') {
        res.json({
            result: false,
            message: '书名不能为空'
        })
    } else if (req.body.Baddress == '') {
        res.json({
            result: false,
            message: '图书位置不能为空'
        })
    } else {
        bookModel.insert(Object.assign(req.body, {
            Bstate: '可借出'
        }),addBook);
    }
}

/*添加出版社
1. 是否存在该出版社
2. 无则添加
*/
let addPress = (req, res) => {
    let add = (error, results) => {
        if (error) throw error;
        if (!results.length) {
            pressModel.insert(req.body, (error, results) => {
                if (error) throw error;
                res.json({
                    result: true,
                    messageL: results[0].Pno
                })
            })
        } else {
            res.json({
                result: true,
                messageL: '已存在该出版社'
            })
        }
    }
    pressModel.select(req.body, add);
}


// 查看出版社信息
let getPress = (req, res) => {
    let get = (error, results) => {
        if (error) throw error;
        res.json({
            result: true,
            message: results
        })
    }

    let select = `select * from press`
    connection.query(select, get);
}

/*修改出版社信息
1. 查找是否有该出版社
2. 有则修改
*/


/*
查看所有借阅记录
*/
let getBorrows = (req, res) => {
    let getBorrows = (error, results) => {
        if (error) throw error;
        res.json({
            result: true,
            message: results
        })
    }
    let select = `select Bono,borrow.Bno,borrow.Rno,Bdate,Bname,Rname
                  from borrow,book,reader
                  where borrow.Bno = book.Bno
                  and borrow.Rno =  reader.Rno`
    connection.query(select, getBorrows);
}


/*还书，删除借阅记录
1. 是否存在该记录
2. 存在则删除
req.Bono
*/
let returnBook = (req, res) => {
    let update = (error, results) => {
        if (error) throw error;
        res.json({
            result: true,
            message: '还书成功'
        })
    }
    let remove = (error, results) => {
        if (error) throw error;
    }
    connection.query(`select * from borrow where Bono = "${req.body.Bono}"`,
        async (error, results) => {
            await borrowModel.remove(req.body, remove);
            await bookModel.update(['可借阅', results[0].Bno], update);
        })   
}

//查看全部读者
let getReaders = (req,res) => {
    let getReader = (error, results) => {
        if(error) throw error;
        res.json({
            result: true,
            message: results                             
        })
    }
    let select = `select Rno,Rname from reader`
    connection.query(select, getReader); 
}

export default {
    login,
    logout,
    addBook,
    addPress,
    getPress,
    getBorrows,
    returnBook,
    getReaders
}