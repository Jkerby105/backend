const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'mydb4',
    password: '105Kerby@sql'
});




module.exports = pool.promise();