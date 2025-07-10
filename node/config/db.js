const mysql2=require('mysql2')
const pool=mysql2.createPool({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'record',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0 
})
const promisePool=pool.promise();
module.exports=promisePool