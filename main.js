const express = require('express');
const app = express();
const mysql = require('mysql');
let pool= mysql.createPool({
    connectionLimit :10,
    host :"localhost",
    user:"root",
    database :"todolist"

});

app.use(express.json());//to access body in post
app.listen(5000, () => {
    console.log("server is on port 5000");
});

app.get("/tasks", (req, res) => {
    pool.query(
    "select * from tasklist",
    function (err,result,fields){
if (err) res.status(404).send("error")
res.send(result);
    });
    });

    app.post('/tasks', (req, res) => {
        pool.query(
            `insert into tasklist (task) VALUES ("${req.body.task}")`,
            function(err,results,fields){
                if (err) res.status(404).send(err)
                res.send(results);
            }
        )
    
    });