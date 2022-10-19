var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemysql"
});

connection.connect(function (err) {
    if (err) throw err
    console.log("You are now connected!!");
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

var server = app.listen(3000, "127.0.0.1", () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("http://%s:%s", host, port);
});

app.get('/students', (req, res) => {
    connection.query('select * from student', (error, results, fields) => {
        if (error) throw error
        res.end(JSON.stringify(results));
    });
});

app.post('/students', (req, res) => {
    var postData = req.body;
    connection.query('insert into student set ?', postData, (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    })
})

app.get('/students/:id', (req,res) => {
    connection.query('select * from student where id=?', [req.params.id], (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    });
});

app.put('/students', (req,res) => {
    connection.query('update `student` set `name` = ?, `fees` = ?, `age` = ? where id = ?', [req.body.name, req.body.fees, req.body.age, req.body.id], (error, results, fields) => {
        if (error) throw error;
        res.end(JSON.stringify(results));
    })
})

app.delete('/students', (req,res) => {
    console.log(req.body)
    connection.query('delete from `student` where `id`= ?', [req.body.id], (error, results, fields) => {
        if(error) throw error
        res.end("Data successfully deleted!")
    });
});