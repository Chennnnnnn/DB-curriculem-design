import connection from '../lib/mysqlconnect';

let getAllBook = (req,res) => {
    let select = `select Bno,Bname,Badress,Bstate,book.Pno,Pname
                  from book,press`;
    connection.query(select,(error, results) => {
        if(error) throw error;
        res.json({
            result : true,
            message: results
        })
    })
}

export default {
    getAllBook
}
