import express from 'express';

export default function routers (app) {
    app.get('/',function(req,res){
        console.log('say hellow')
    })
}