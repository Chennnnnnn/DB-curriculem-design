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
    if (req.body.Rname === '') {
        res.json({
            result: false,
            message: '读者名不能为空'
        });
    }
    readerModel.select({
        Rname: req.body.Rname
    }, register);
}
/* 登录
1. 是否有该账号
2. 有，账号密码是否正确
*/
let login = (req, res) => {
    let login = (error, results) => {
        console.log(results)
        if (!results.length) {
            res.json({
                result: false,
                message: '该账户不存在'
            });
        } else {
            if (req.body.password === results[0].password) {
                // console.log(results[0].Rno,23423)
                req.session.userid = results[0].Rno;
                // console.log(req.session.userid,154554222)
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

    readerModel.select({
        Rname: req.body.Rname
    }, login);
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
    let borrow = async (error, results) => {
        if (error) throw error;
        await bookModel.update(['已借出',req.body.Bno]);
        res.json({
            result: true,
            message: '借阅成功'
        })
    }

    let book = async(error, results) => {
        if (error) throw error;
        if (!results.length) {
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
            await borrowModel.insert(
                Object.assign(req.body,{Rno:req.session.userid}, {
                    Bdate: new Date()
                }),
                borrow);
        }
    }

    bookModel.selectbyno(req.body, book);

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
            Rno: req.session.userid
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