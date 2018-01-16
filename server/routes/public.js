import connection from '../lib/mysqlconnect';
import bookModel from '../models/book';

let getAllBook = (req,res) => {
    let select = `select Bno,Bname,Baddress,Bstate,book.Pno,Pname
                  from book,press
                  where book.Pno = press.Pno`;
    connection.query(select,(error, results) => {
        if(error) throw error;
        res.json({
            result : true,
            message: results
        })
    })
}

let selectBook = (req,res) => {
    let callback = (error, results) => {
        if(error) throw error;
        res.json({
            result : true,
            message: results
        })
    }
    bookModel.selectbyname(req.body,callback);
}


export default {
    getAllBook,
    selectBook
}
