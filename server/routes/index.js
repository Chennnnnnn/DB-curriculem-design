import express from 'express';
import reader from './reader';
import admin from './admin';
import public from './public';
import check from '../middlewares/check';



export default function routers(app) {
    //读者注册
    app.post('/reader/register', check.checkNotLogin,reader.create);
    //读者登录
    app.post('/reader/login',reader.login);
    //登出
    app.get('/reader/logout',reader.logout);
    //读者借书
    app.post('/reader/borrow',check.checkLogin,reader.borrow);
    //读者查看借书情况
    app.get('/reader/getBorrowList',check.checkLogin,reader.select);

    // 管理员登录
    app.post('/admin/login',admin.login);
    // 管理员登出
    app.get('/admin/logout',admin.logout);

    // 添加图书
    app.post('/admin/addBook',check.checkAdmin,admin.addBook);
    // 修改图书位置，出版社
    // app.post('/admin/updateBook',check.checkAdmin,admin.updateBook);

    // 添加出版社
    app.post('/admin/addPress',check.checkAdmin,admin.addPress);
    // 出版社信息
    app.get('/admin/getPresses',check.checkAdmin,admin.getPress);
    // 修改出版社信息
    // app.post('/admin/updatePresses',check.checkAdmin,admin.updatePresses);


    // 查看全部的借阅记录
    app.get('/admin/getBorrows',check.checkAdmin,admin.getBorrows);
    //修改图书状态，删除借阅记录，帮读者还书
    app.post('/admin/returnBook',check.checkAdmin,admin.returnBook);

    // 公共接口
    app.get('/getAllBooks',public.getAllBook)

}