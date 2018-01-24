import config from '../config/default';
import mysql from 'mysql';


let connection = mysql.createConnection(config.mysql);

connection.connect(function (err) {
	if (err) {
		console.log('数据库连接错误')
	}
	console.log(err)

	console.log('数据库连接成功');
});


export default connection;