import express from 'express';
import connection from '../lib/mysqlconnect';
import {
    query,
    insert
} from '../models/index';

/* 登录
1. 是否有该账号
2. 有，账号密码是否正确
*/

const login = (res, req) => {
    const sql = `select * from reader where Rname= "${req.body.Rname}"`
    (async() => {
        const reader = await query(sql);
        if (!reader.length) {
            res.json({
                result: false,
                message: '该账户不存在'
            });
        } else if (req.body.password === reader[0].password) {
            req.session.userid = reader[0].Rno;
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

    })().catch((err) => {
            res.json({
                result: false,
                message: '连接错误'
            })
        })
}

/*
登出
*/
const logout = (req, res) => {
    req.session.user = null;
    res.json({
        result: true,
        message: '注销成功'
    });
}


/*借书
1. 该账号是否登录
2. 该书是否存在
3. 该书是否可借
*/


const borrow = (req, res) => {
    const seletBook = `select * from book where Bno = "${req.body.Bno}"`;
    const insertBorrow = 'insert into borrow set ?';
    const updateBook = 'update book set  Bstate = ? where Bno = ?';

    (async() => {
        let books = await query(seletBook);
        if (!books.length) {
            res.json({
                result: false,
                message: '该书不存在'
            })
        } else if (results[0].Bstate === '已借出') {
            res.json({
                result: false,
                message: '该书已借出'
            })
        } else {
            await insert(insertBorrow, Object.assign(req.body, {
                Rno: req.session.userid
            }, {
                Bdate: new Date()
            }));
            await insert(updateBook, ['已借出', req.body.Bno]).then((results) => {
                res.json({
                    result: true,
                    message: '借阅成功'
                })
            })
        }
    })
}


/*借阅情况
    */
const select = (req, res) => {
    const sql = `select Bono,Rname,Bname,Bdate
            from borrow,book,reader 
            where borrow.Rno= "${req.session.userid}"
            and borrow.Bno=book.Bno 
            and borrow.Rno=reader.Rno`
    query(sql)
        .then((results) => {
            res.json({
                result: true,
                message: results
            })
        }).catch((err) => {
            res.json({
                result: false,
                message: '连接错误'
            })
        })
}

export default {
    create, //注册
    login, //登录
    logout, //注销
    borrow, //借书
    select, //查找借书记录
}