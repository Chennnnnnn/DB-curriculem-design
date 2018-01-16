import connection from '../lib/mysqlconnect';


//增,{Bname, Pno, Baddress}，callback获取Bno
let insert = (book, callback) => {
    book.Bstate = '可借阅'
    connection.query(
        'insert into book set ?',
        book,
        callback
    )
};
//删,书的编号(Bno)
let remove = function (book) {
    let select = `delete from book where Bno = "${book.Bno}"`
    connection.query(
        select,
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
        }
    )
};

//查,书名Bname {Bname:'书的名字'}
let selectbyname = (book, callback) => {
    let select = `select book.Pno,Bname,Bstate,Baddress,Pname,Bno
                  from book,press 
                  where Bname = "${book.Bname}" and book.Pno = press.Pno`
    connection.query(
        select,
        callback
    )
};

let selectbyno = (book, callback) => {
    let select = `select * from book where Bno = "${book.Bno}"`
    console.log(select)
    connection.query(
        select,
        callback
    )
};

//改 ['已借出','4'],借出归还，修改状态
let update = function (book,callback) {
    connection.query(
        'update book set  Bstate = ? where Bno = ?',
        book,
        callback);
};


export default {
    insert,
    selectbyname,
    selectbyno,
    remove,
    update,  //查询所有的图书
};