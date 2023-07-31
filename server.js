const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/database');

const cors = require('cors');

const app = express();
app.use(cors());


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//    next();
//  });


//------------------ Get  -------------------\\


app.get('/voulnteer',(req, res, next) => {
  const sql = "SELECT * FROM VOULNTEER;";
  
    const data =  db.query(sql)
    .then(data => res.json(data[0]))
    .catch(err => {
      const message = {
        error: 'There was an error uptaning the data'
      }
      res.json(message);
    });
   
});


app.get('/opportunities', (req,res,next) => {
  const sql = "SELECT * FROM OPPORTUNITIES;";
  
  const data =  db.query(sql)
  .then(data => res.json(data[0]))
  .catch(err => {
    const message = {
      error: 'There was an error uptaning the data'
    }
    res.json(message);
  });

});

app.get('/emergency', (req,res,next) => {

  const sql = "SELECT * FROM EMERGENCY_CONTACT_INFORMATION;";
  
  const data =  db.query(sql)
  .then(data => res.json(data[0]))
  .catch(err => {
    const message = {
      error: 'There was an error uptaning the data'
    }
    res.json(message);
  });

});

//------------------ POST  -------------------\\

app.post('/voulnteer', (req,res,next) => {

  const data = req.body;
   

});

app.post('/opportunities', (req,res,next) => {

});

app.post('/emergency', (req,res,next) => {

});


//------------------ Put  -------------------\\

app.put('/voulnteer:id', (req,res,next) => {

});

app.put('/opportunities:id', (req,res,next) => {

});

app.put('/emergency:id', (req,res,next) => {

});


//------------------ Delete  -------------------\\

app.delete('/voulnteer:id', (req,res,next) => {
        const sql = "DELETE * FROM VOULNTEER WHERE VolunteerID = ?";

        const ID = req.params.id

        db.query(sql,[ID])
        .then(data => console.log(data))
        .catch(err => console.log(err));


});

app.delete('/opportunities:id', (req,res,next) => {

});

app.delete('/emergency:id', (req,res,next) => {

});






app.post('/login', (req,res,next) => {

  res.send('ok');
   
});


app.listen(3001);