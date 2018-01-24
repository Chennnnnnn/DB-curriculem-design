import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import config from './config/default';
import routes from './routes/index';


const app = express();

// 静态文件路径
app.use(express.static(__dirname + './../src'));
// app.all('*', function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", 'http://localhost:8080');
  // res.header("Access-Control-Allow-Origin",null);
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");
  // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  // res.header("X-Powered-By",' 3.2.1');
  // res.header("Content-Type", "application/json;charset=utf-8");
  // res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

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

