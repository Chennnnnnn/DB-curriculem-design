export default  {
    port: 3000,
    mysql: {
        host: 'localhost',
        user:'root',
        password:'root',
        database:'book'
    },
    session: {                   
        secret: 'book', 
        key: 'book',
        maxAge: 10*60*1000
    }
};

