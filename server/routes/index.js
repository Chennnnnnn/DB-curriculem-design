import express from 'express';
import reader from './reader';
import admin from './admin';
import check from '../middlewares/check';



export default function routers(app) {
    //读者注册
    app.post('/register', check.checkNotLogin,reader.create);
    //读者登录
    app.post('/login',reader.login);
    //登出
    app.post('/logout',reader.logout);

}