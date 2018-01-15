import connection from '../lib/mysqlconnect';

//增,先判断类型，长度press{Pname,Pphone,Paddresss}
let insert =  (press,callback) => {
    connection.query(
        'insert into press set ?',
        press,
        callback
    )
};

//删,出版社名称 {Pno}
let remove = (press) => {
    let select = `delete from press where Pno = "${press.Pno}"`
    connection.query(
        select,
        function (error, results, fields) {
            if (error) throw error;
        }
    )
};

//查找是否已存在出版社，添加的时候 {Pname}
let select =  (press,callback) => {
    let select = `select * from press where Pname = "${press.Pname}"`
    connection.query(
        select,
        callback
    )
};

//改  {Pname,Paddress,Pphone,Pno}
let update =  (press) => {
    connection.query(
        'update press set Pphone = ?,Paddress = ? where Pno = ?',
        press,
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            return results;
        })
};

export default{
    insert,
    select,
    remove,
    update
};