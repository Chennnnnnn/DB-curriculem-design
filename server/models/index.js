import connection from '../lib/mysqlconnect';


/*
关于Promise
1.var a = await query(sql); 
a的值就是查询结果results
2.query(sql).then((results) => { console.log(results)})
通过then方法,定义resolve函数，获取results

适用于查询，删除
*/
const query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

//适用于插入，更新
const insert = (insert, obj) => {
    return new Promise((resolve, reject) => {
        connection.query(insert, obj, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        })
    })
}

export default {
    query,
    insert
};