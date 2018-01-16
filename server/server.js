import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from './config/default';
import routes from './routes/index';


const app = express();

// 静态文件路径
// app.use(express.static(__dirname + '../src'));
app.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
  res.header("Access-Control-Allow-Origin",null);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1');
  res.header("Content-Type", "application/json;charset=utf-8");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// 设置跨域


//修改请求体大小限制 
app.use(bodyParser.urlencoded({ extended: false })); 
//cookie,session
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: true,
  name: config.session.name,
  secret: config.session.secret,
  cookie: {
      maxAge: config.session.maxAge
  }
}));


//设置路由
routes(app);
//启动服务
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


//测试数据
import booktable from './models/book'
import presstable from './models/press'

// booktable.insert({Bno:'005',
//     Bname:'JavaScript设计模式',
//     Pname:'人民邮电出版社',
//     Baddress:'4排5架',
//     Bstate:'可借出'
// })
// booktable.remove({Bno:'005'});
// booktable.selectbyname({Bname:'图解HTTP'});
// booktable.selectbyno({Bno:'001'});
// booktable.update(['数据库','清华大学出版社','3排6加','可借出','001']);

// presstable.insert({Pname:'科学出版社',Pphone:'45656',Paddress:'北京'});
// presstable.remove({Pname:"科学出版社"});
// presstable.select({Pname:"清华大学出版社"});
// presstable.update(['234234','nnewyy','清华大学出版社']);


import readertabel from './models/reader'

// readertabel.insert({Rno:'r003',Rname:'周杰',password:'123456'});
// readertabel.remove({Rno:"r003"});
// readertabel.select({Rno:"r002"});
// readertabel.update(['新名字','123456','r002']);

import borrowtable from './models/borrow'

// borrowtable.insert({Bono:'002',Rno:'r002',Bno:'001',Bdate: new Date()});
// borrowtable.remove({Bono:"002"});
// borrowtable.selectbyreader({Rno:"r002"});
// borrowtable.selectbybook({Bno:"002"});
// borrowtable.update(['002','r002','2017-12-03','001']);


