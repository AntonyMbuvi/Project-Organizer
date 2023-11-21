const mysql  = require('mysql');


const db = mysql.createConnection({
    host : 'localhost',
    user : 'Tony',
    password : '--',
    database : 'Projects_Database'
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the Projects_Database');
});

sql = ` CREATE TABLE IF NOT EXISTS Projects_Database.Projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    start_date DATE,
    end_date DATE
);`

db.query(sql, (err, data) => {
    if (err) {
        console.log('not able to make the table');
        return 'ERROR IN MAKING THE TABLE';
    }
    console.log('table made!!')
    return 'Successfully made the table';
})
const nsql = 'Select * FROM Projects WHERE id = ?;'
const values = 9;
db.query(nsql, [values], (err, data) => {
    if (err) {
        console.log('Chenking the column names');
        return 'ERROR IN Showing all data in  THE TABLE';
    }
    console.log(data);
    return 'Successfully made the table';
})


