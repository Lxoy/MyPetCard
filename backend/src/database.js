import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mypetscard',
    database: 'mypetcard'
});

export default db;
