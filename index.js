const express = require('express');
const app = express();
const mysql = require("mysql")
app.use(express.json());




const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",
  password:"",
  database: "todolist"
});



app.put('/tasks/:id', (req, res) => {

    const { id, task } = req.body;
  
    
    if (!task) {
      res.status(400).json({ error: 'Missing required task message' });
      return;
    }
  
   
    pool.query('UPDATE tasklist SET task=? WHERE id=?', [task], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update task in database' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: `task with id ${id} not found` });
      } 
    });
  });

  


  
  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
  
    pool2.query('DELETE FROM tasklist WHERE id=?', [id], (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete task from database' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: `task with id ${id} not found` });
      } else {
        res.status(204).send();
      }
    });
  });
  
  app.listen(5000,(req,res)=>{
    console.log("port is runging on port 5000....")
  });
  
