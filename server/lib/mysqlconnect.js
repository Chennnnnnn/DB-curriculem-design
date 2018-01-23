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

// connection.query('选择 1 + 1 作为解决方案', function (error, results, fields) {
//     if (error) throw error;
//     console.log('解决方案是: ', results[0].solution);
// });

// connection.end();

export default connection;