const express = require('express')
const app = express()
const port = 3000
var cors = require('cors')
app.use(cors())

const mysql = require('mysql')
const con = mysql.createConnection({
host:"localhost",
user:"root",
password:"password",
database:"ipbx"
});
con.connect(function(err) {
    if (err) throw err;

    });




app.get('/get/:name/:id' ,(req,res) => {
      con.query("SELECT * FROM "+req.params.name+" WHERE id="+req.params.id, function (err, result, fields) {
          if (err) throw err;
          res.send(result);
        });
});

app.get('/get_all/:name/' ,(req,res) => {
  con.query("SELECT * FROM "+req.params.name, function (err, result, fields) {
      if (err) throw err;
      res.send(result);
    });
});




app.listen(port, () => {
    console.log(`IPBX SERVER IS RUNNING ON ${port}`);
});