const express = require('express');
const mysql  = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
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

app.get('/', (req, res) => {
    sql = 'Select * FROM Projects';
    db.query(sql, (err, data) => {
        if(err){
            console.log('There was an error in getting data from the database');
            return res.status(500).json({ error: 'An error occurred while retrieving data from the database' });
        }
        res.json(data);
    });
});
app.get('/:id', (req, res) => {
    const projectId = req.params.id;
    sql = 'Select * FROM Projects WHERE id = ?';
    db.query(sql, [projectId],  (err, data) => {
        if(err){
            console.log('There was an error in getting data from the database');
            return res.status(500).json({ error: 'An error occurred while retrieving data from the database' });
        }
        res.json(data);
    });
});

app.post('/', (req, res) => {
    const sql = 'INSERT INTO Projects (`name`, `description`, `start_date`, `end_date`) VALUES (?, ?, ?, ?)';
    const values = [req.body.name, req.body.description, req.body.start_date, req.body.end_date];
    
    db.query(sql, values, (err, data) => {
        if(err){
            console.log('There was an error in inserting data into the database', err);
            return res.status(500).json({ error: 'An error occurred while inserting data into the database' });
        }
        console.log('Data inserted successfully');
        res.json(data);
    });
});

app.delete('/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'DELETE FROM Projects WHERE id = ?';
    console.log('Delete route has been used')
    db.query(sql, [bookId], (err, data) => {
        if(err) return res.send(err);
        console.log(data)
        return res.json(data)
    })
})

app.put('/:id', (req, res) => {
    const bookId = req.params.id;
    const sql = 'UPDATE Projects SET `name` = ? , `description` = ? , `start_date` = ? , `end_date` = ? WHERE id = ?';
    const endDateValue = req.body.end_date ? req.body.end_date : null;
    const startDateValue = req.body.start_date ? req.body.start_date : null;
    const values = [req.body.name, req.body.description, startDateValue, endDateValue, bookId]
    db.query(sql, values, (err, data) => {
        if(err) return res.send(err);
        return res.json(data)
    })
})


app.listen(8800, () => {
    console.log('Server is running on port 8800');
});
