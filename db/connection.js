const mysql = require('mysql2');
require('dotenv').config;
//Connect to database
const db = mysql.createConnection({
    host: 'localhost',
    //sql username
    user: 'root',
    //sql password
    
    password: 'salesforce1',
    database: 'company'
},
    console.log('Connected to the company database')
);

//start server after db connection
db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

module.exports = db;