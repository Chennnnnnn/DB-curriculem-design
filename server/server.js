import express from 'express';
import config from './config/default';
import routes from './routes/index'


const app = express()

//设置路由
routes(app);
//启动服务
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

// import booktable from './models/book'

// console.log(booktable);
// booktable.insert({Bno:3,Bname:'数据库',Bnumber:3,Baddress: '3排6加',Bstate:'可供插入'})


