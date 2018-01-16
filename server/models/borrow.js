import connection from '../lib/mysqlconnect';

//增,先判断类型，长度borrow{Bno,Rno,Bdate},callback{Bono}
let insert = (borrow, callback) => {
    console.log(borrow);
    connection.query(
        'insert into borrow set ?',
        borrow,
        callback
    )
};
//删,借书记录 {Bono}
let remove = (borrow,callback) => {
    let select = `delete from borrow where Bono = "${borrow.Bono}"`;
    console.log(select);
    connection.query(
        select,
        callback
    )
};

// {Rno}
let selectbyreader = (borrow, callback) => {
    let select = `select Bono,Rname,Bname,Bdate
                  from borrow,book,reader 
                  where borrow.Rno= "${borrow.Rno}"
                  and borrow.Bno=book.Bno 
                  and borrow.Rno=reader.Rno`
    console.log(select)
    connection.query(
        select,
        callback
    )
};

let selectbybook = (borrow, callback) => {
    let select = `select * from borrow where Bno= "${borrow.Bno}"`
    console.log(select)
    connection.query(
        select,
        callback
    )
};

//改  {Bno,Rno,Bdate,Bono}
let update = (borrow) => {
    connection.query(
        'update borrow set Bno = ?,Rno = ?,Bdate = ? where Bono = ?',
        borrow,
        function (error, results, fields) {
            if (error) throw error;
            console.log(results);
            return results;
        })
};

export default {
    insert,
    selectbyreader,
    selectbybook,
    remove,
    update
};