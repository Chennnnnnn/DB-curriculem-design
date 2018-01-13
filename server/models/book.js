import connection from '../lib/mysqlconnect';


//增,先判断类型，长度
let insert = function (book) {
    connection.query(
        'insert into book set ?',
        book,
        function (error, results, fields) {
            if (error) throw error
            console.log('插入成功');  
        }
    )
};
//删
let delete = function () [
    
]
//查,书名Bname {Bname:'书的名字'}

let select = function (book) {
    let select = `select * from book where Bname = ${book.Bname}`
    connection.query(
        select,
        function (error, results, fields) {
            if (error) throw error;
            // Neat!
        }
    )
};

//改 
let update = function (book) {
    connection.query(
        'update book set Bname = ?, Bnumber = ?,Baddress = ?, Bstate = ? ',
        book,
        function (error, results, fields) {
            if (error) throw error;
            // ...
        })
};

export default{
    insert,
    select,
    update
};