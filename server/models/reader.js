import connection from '../lib/mysqlconnect';


//增,先判断类型，长度reader{Rname,password},callback获取Rno
let insert = (reader,callback) => {
    console.log(reader)
    connection.query(
        'insert into reader set ?',
        reader,
        callback
    )
};

//删,{Rno}
let remove = function (reader) {
    let select = `delete from reader where Rno = "${reader.Rno}"`
    connection.query(
        select,
        (error, results) => {
            if (error) throw error;
        }
    )
};

//登录的时候，查找账号和密码 {Rname}
let select = (reader, callback) => {
    let select = `select * from reader where Rname= "${reader.Rname}"`
    connection.query(
        select,
        callback
    )
};

//改  {Rno,Rname,password}
let update = (reader) => {
    connection.query(
        'update reader set Rname = ?,password = ? where Rno = ?',
        reader,
        (error, results) => {
            if (error) throw error;
        }
    )
};

export default {
    insert,
    select,
    remove,
    update
};