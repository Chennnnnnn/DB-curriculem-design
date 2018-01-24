import express from 'express';
import connection from '../lib/mysqlconnect';
import {
    query,
    insert
} from '../models/index.js'

/*登录
 */
const login = (req, res) => {
    const select = `select * from admin where account = "${req.body.account}"`
    query(select)
    .then((results) => {
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
    })
}

/*登出
 */
const logout = (req, res) => {
    req.session.user = null;
    res.json({
        result: true,
        message: '注销成功'
    });
}

//添加图书

const addBook = (req, res) => {
    try{
        if(req.body.Bname == '')
          throw new Error('书名不能为空');
        if(req.body.Baddress == '')
          throw new Error('图书位置不能为空');  
    }catch(e){
        res.json({
            result: false,
            message: e.message
        })
    } 

    const create = 'insert into borrow set ?'
    insert(create,Object.assign(req.body, { Bstate: '可借出'}))
    .then((results) => {
        res.json({
            result: true,
            message: {
                Bno: results.insertId
            }
        })
    })
}

/*添加出版社
1. 是否存在该出版社
2. 无则添加
*/
const addPress = (req, res) => {

    (async () => {
        const select = `select * from press where Pname = "${req.body.Pname}"`;
        const create = 'insert into press set ?'
        const presses = query(select);
        if (!presses.length) {
            insert(create,Object.assign(req.body, { Bstate: '可借出'}))
            .then((results) => {
                res.json({
                    result: true,
                    message: {
                        Pno: results.insertId
                    }
                })
            })
        } else {
            res.json({
                result: false,
                messageL: '已存在该出版社'
            })
        } 
    })()    
}


// 查看出版社信息
const getPress = (req, res) => {

    const select = `select * from press`
    query(select)
    .then((results) => {
        res.json({
            result: true,
            message: results
        })
    })
} 

/*修改出版社信息
1. 查找是否有该出版社
2. 有则修改
*/


/*
查看所有借阅记录
*/
const getBorrows = (req, res) => {
    const select = `select Bono,borrow.Bno,borrow.Rno,Bdate,Bname,Rname
                  from borrow,book,reader
                  where borrow.Bno = book.Bno
                  and borrow.Rno =  reader.Rno`
    query(select)
    .then((results) => {
        res.json({
            result: true,
            message: results
        })
    }).catch((err => {
        console.log(err.message)
    })
}


/*还书，删除借阅记录
1. 是否存在该记录
2. 存在则删除
req.Bono
*/
const returnBook = (req, res) => {

    const removeBorrow = `deconste from borrow where Bono = "${req.body.Bono}"`;
    const updateBook =  'update book set  Bstate = ? where Bno = ?';
    (async() => {
        const borrows = await query(`select * from borrow where Bono = "${req.body.Bono}"`)
        // 删除借阅记录
        await query(removeBorrow);
        // 修改图书信息
        await insert(updateBook,['可借阅', results[0].Bno]).then((results) => {
            res.json({
                result: true,
                message: '还书成功'
            })
        })
    })().catch((err) => {
        console.log(err.messsage)
    })
        
}

//查看全部读者
const getReaders = (req, res) => {
    const select = `select Rno,Rname from reader`
    query(select)
    .then((results) => {
        res.json({
            result: true,
            message: results
        })
    })
}


/* 注册读者
1. 是否已存在该读者号
*/
const addReader = (req, res) => {
    const Rname = req.body.Rname;
    const password = req.body.password;

    try {
        if (!Rname.length)
            throw new Error('读者名不能为空');
        if (!password.length)
            throw new Error('密码不能为空');
    } catch (e) {
        res.json({
            result: false,
            message: e.message
        });
    }

    (async() => {
        const select = `select * from reader where Rname= "${Rname}"`
        const create = 'insert into reader set ?'
        const reader = await query(select);
        if (!reader.length) {
            res.json({
                result: false,
                message: '该账户已存在'
            });
        } else {
            insert(create, {Rname, password})
            .then(() => {
                res.json({
                    result: true,
                    message: '注册成功'
                });
            })
        }
    })()

}
export default {
    login,
    logout,
    addBook,
    addPress,
    getPress,
    getBorrows,
    returnBook,
    getReaders,
    addReader
}