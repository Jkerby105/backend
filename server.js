const express = require('express');
const bodyParser = require('body-parser');

const db = require('./util/database');

const cors = require('cors');
const Jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// app.use(cors());
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}));


// app.use((req, res, next) => {
//    res.setHeader('Access-Control-Allow-Origin', '*');
//    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,PUT');
//    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
//    next();
//  });


//------------------ Get  -------------------\\


app.get('/volunteer',(req, res, next) => {
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

app.post('/vol', (req,res,next) => {

  const data = req.body;

  const email = data.Email;
  const fname = data.Fname;
  const lname = data.Lname;
  const usrname = data.Username;
  const password = data.Password;
  const approval_status = data.Approval_Status;
  const address_street = data.Address_Street;
  const address_state = data.Address_State;
  const address_zipcode = data.Address_ZipCode;
  const education = data.Education_Degree;
  const skills = data.Skills;
  const phone = data.Phone;
  const location = data.Location;
  const licenses = data.Licenses;
  const time = data.Time;
 

  if(data.edit){
    const id = data.id;
     
     const sql1 = 'UPDATE VOULNTEER SET Email = ?, Fname = ?, Lname = ?, Username = ?, Password = ?, Approval_Status = ?, Address_Street = ?, Address_State = ?, Address_ZipCode = ?, Education_Degree = ?, Skills_Interests = ?, Phone_Number = ?, Preferred_Locations = ?, Licenses = ?, Availability_times = ? WHERE VolunteerID = ?;'

     db.query(sql1,[email,fname,lname,usrname,password,approval_status,address_street,address_state,address_zipcode,education,skills,phone,location,licenses,time,id])
     .then(response => console.log(response))
     .catch(err => console.log(err));

  }else{

        const sql2 = 'INSERT INTO VOULNTEER (Email, Fname, Lname, Username, Password, Approval_Status,Address_Street, Address_State, Address_ZipCode, Education_Degree, Skills_Interests, Phone_Number, Preferred_Locations, Licenses, Availability_times) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) ;'

        db.query(sql2,[email,fname,lname,usrname,password,approval_status,address_street,address_state,address_zipcode,education,skills,phone,location,licenses,time])
        .then(response => console.log(response))
        .catch(err => console.log(err));
  }
   

});

app.post('/opportunities', (req,res,next) => {
  const data = req.body;
  const title = data.Title;
  const description = data.Description;

  if(data.edit){
    const id = data.id;
     
    const sql1 = 'UPDATE Opportunities SET Title = ?, Description = ? WHERE OpportunitiesID = ?;'
   
    db.query(sql1, [title,description,id])
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }else{

    const sql2  = 'INSERT INTO Opportunities (Title, Description) VALUES (?, ?);'
    
    db.query(sql2, [title,description])
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }

});

app.post('/emergency', (req,res,next) => {
  const data = req.body;

  const email = data.Email;
  const fname = data.Fname;
  const lname = data.Lname;
  const address_street = data.Address_Street;
  const address_State = data.Address_State;
  const address_zipcode = data.Address_ZipCode;
  const phone = data.Phone;

  if(data.edit){
     
    const id = data.id;

    const sql1 = 'UPDATE EMERGENCY_CONTACT_INFORMATION SET Email = ?, Fname = ?, Lname = ?, Address_Street = ?, Address_State = ?, Address_ZipCode = ?, Phone_Number = ? WHERE EContactID = ?;'

    db.query(sql1, [email,fname,lname,address_street,address_State,address_zipcode,phone,id])
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }else{

    const sql2 = 'INSERT INTO EMERGENCY_CONTACT_INFORMATION (Email, Fname, Lname, Address_Street, Address_State,Address_ZipCode, Phone_Number) VALUES(?, ?, ?, ?, ?, ?, ?);'
    
    db.query(sql2,[email,fname,lname,address_street,address_State,address_zipcode,phone])
    .then(response => console.log(response))
    .catch(err => console.log(err));

  }

});


//------------------ Get specific  -------------------\\

app.get('/voulnteer/edit/:id', (req,res,next) => {
           const id = req.params.id;

            const sql = 'SELECT * FROM VOULNTEER WHERE VolunteerID = ?;';
            db.query(sql,[id])
            .then(data => res.json(data[0]))
            .catch(err => {
              const message = {
                error: 'There was an error'
              }
              res.json(message);
            });

});

app.get('/opportunities/edit/:id', (req,res,next) => {
           const id = req.params.id;

           const sql = 'SELECT * FROM  OPPORTUNITIES WHERE OpportunitiesID = ?;';
           db.query(sql,[id])
           .then(data => res.json(data[0]))
           .catch(err => {
            const message = {
              error: 'There was an error'
            }
            res.json(message);
           });

});

app.get('/emergency/edit/:id', (req,res,next) => {
          const id = req.params.id;


          const sql = 'SELECT EContactID,Email,Fname,Lname,Address_Street,Address_state,Address_ZipCode,Phone_Number FROM EMERGENCY_CONTACT_INFORMATION WHERE EContactID = ?;';
       
          db.query(sql,[id])
          .then(data => res.json(data[0]))
          .catch(err => {
            const message = {
              error: 'There was an error'
            }
            res.json(message);
          });

});


//------------------ Delete  -------------------\\

app.delete('/voulnteer/:id', (req,res,next) => {
        const sql = "DELETE FROM VOULNTEER WHERE VolunteerID = ?;";

        const ID = req.params.id; 

        db.query(sql,[ID])
        .then(response => console.log(response))
        .catch(err => {
          const message = {
            error: 'Could not delete volunteer'
          }
          res.json(message);
        });

});

app.delete('/opportunities/:id', (req,res,next) => {

  const sql = "DELETE FROM OPPORTUNITIES WHERE OpportunitiesID = ?;";

  const ID = req.params.id; 

  db.query(sql,[ID])
  .then(response => console.log(response))
  .catch(err => {
    const message = {
      error: 'Could not delete oppoutunities'
    }
    res.json(message);
  });

});

app.delete('/emergency/:id', (req,res,next) => {

  const sql = "DELETE FROM EMERGENCY_CONTACT_INFORMATION WHERE EContactID = ?;";

  const ID = req.params.id; 

  db.query(sql,[ID])
  .then(response => console.log(response))
  .catch(err => {
    const message = {
      error: 'Could not delete Emergency Contact Information'
    }
    res.json(message);
  });


});

//------------------ Login  -------------------\\

app.post('/login', (req,res,next) => {

    console.log("Hello");

  const login = req.body;
  console.log(login);

  const sql = 'SELECT * FROM ADMIN WHERE Username = ? AND Password = ?;'
  db.query(sql,[login.user,login.password])
  .then(data => {
         if(data.length > 0){
                const name = data[0].user;
               const token = Jwt.sign({name}, "Naruto", {expiresIn: '1d'});
               res.cookie('token',token);
              return res.json({Status: "Success"});

         }else{
            return res.json({message: "No Records existed"});
         }
  })
  .catch(err => {
     return res.json({Message: "Server Side Error"});
  });


  // if(data.length > 0){
  //   console.log("in");
  //   //  const name = data[0].user;
  //   //  console.log(name);
  //   //  const token = Jwt.sign({name}, "Naruto", {expiresIn: '1d'});
  //   //  res.cookie('token',token);
  //    return res.json({Status: "Success"});
  // }else{
  //   return res.json({message: "No Records existed"});
  // }



});

//------------------ Logout -------------------\\
// app.post('/logout', (req,res,next) => {

// });


//------------------ Register  -------------------\\

// app.post('/login/create', (req,res,next) => {

// });



app.listen(3001);