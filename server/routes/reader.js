import express from 'express';
import connection from '../lib/mysqlconnect';
import readerModel from '../models/reader';
import borrowModel from '../models/borrow';
import bookModel from '../models/book';

/* 注册 {}
1. 是否已存在该读者号
*/
let create = (req, res) => {
    let register = async(error, results, fields) => {
        if (!results.length) {
            await readerModel.insert(req.body);
            res.json({
                result: true,
                message: '注册成功'
            });
        } else {
            res.json({
                result: false,
                message: '该账户已存在'
            });
        }
    }
    if (req.body.Rno === '') {
        res.json({
            result: false,
            message: '读者号不能为空'
        });
    }
    readerModel.select(req.body, register);
}
/* 登录
1. 是否有该账号
2. 有，账号密码是否正确
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
                req.session.user = results[0];
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
    readerModel.select(req.body, login);
}
let logout = (req, res) => {
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
let borrow = (req, res) => {
    let book = (error, results) => {
        if (error) throw error;
        if (!result.length) {
            res.json({
                result: false,
                message: '该书不存在'
            })
        } else if (results[0].Bstate === '已借出') {
            res.json({
                result: false,
                message: '该书已借出'
            })
        }
    }

    (async() => {
        await bookModel.selectbyno(req.body, book);
        await borrowModel.insert(Object.assign(req.body, req.session.user));
        res.json({
            result: true,
            message: '借阅成功'
        })
    })().catch((err) => {
        throw err
    })
}
/*借阅情况
 */
let select = (req, res) => {
    let seletB = (error, results) => {
        if (error) throw error;
        res.json({
            result: true,
            message: results
        })
    }
    (async() => {
        await borrowModel.selectbyreader({
            Rno: req.session.user.Rid
        }, seletB);
    })().catch((err) => {
        throw err
    })
}

export default {
    create, //注册
    login, //登录
    logout, //注销
    borrow, //借书
    select //查找借书记录
}