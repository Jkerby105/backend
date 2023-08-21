const express = require("express");
const db = require("../util/database");

const router = express.Router();

router.get("", (req, res, next) => {
  const sql = `
  SELECT
    V.VolunteerID,
    V.Fname,
    V.Lname,
    V.Approval_Status,
    E.EContactID,
    O.Title
  FROM
    VOULNTEER AS V
  INNER JOIN
    EMERGENCY_CONTACT_INFORMATION AS E
  ON
    V.VolunteerID = E.VOULNTEER_VolunteerID
  INNER JOIN
    OPPORTUNITIES AS O
  ON
    CAST(V.Preferred_Locations AS SIGNED) = O.OpportunitiesID;
`;

  db.query(sql)
    .then((data) => res.json(data[0]))
    .catch((err) => {
      const message = {
        error: "There was an error obtaining the data",
      };
      res.json(message);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const sql = "SELECT * FROM VOULNTEER WHERE VolunteerID = ?;";
  db.query(sql, [id])
    .then((data) => res.json(data[0]))
    .catch((err) => {
      const message = {
        error: "There was an error",
      };
      res.json(message);
    });
});

router.post("/create", (req, res, next) => {
  const data = req.body;

  const email = data.Email;
  const fname = data.Fname;
  const lname = data.Lname;
  const username = data.Username;
  const password = data.Password;
  const approval_status = data.ApprovalStatus;
  const address = data.Address;
  const education = data.Education;
  const skills = data.Skills;
  const phone = data.Phone;

  let location = data.Opportunity;
  location = parseInt(location);
  const licenses = data.Licenses;
  const availableTime = data.Time;

  const emergencyName = data.EmergencyFirstName;
  const emergencyLast = data.EmergencyLastName;
  const emergencyEmail = data.EmergencyEmail;
  const emergencyPhone = data.EmergencyPhone;
  const emergencyAddress = data.EmergencyAddress;

  const sql1 =
    "INSERT INTO VOULNTEER (Email, Fname, Lname, Username, Password, Approval_Status,Address, Education_Degree, Skills_Interests, Phone_Number, Preferred_Locations, Licenses, Availability_times) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

  db.query(sql1, [
    email,
    fname,
    lname,
    username,
    password,
    approval_status,
    address,
    education,
    skills,
    phone,
    location,
    licenses,
    availableTime,
  ])
    .then((response) => {
      const sql2 = "SELECT VolunteerID FROM VOULNTEER WHERE Email = ?;";

      return db
        .query(sql2, [email])
        .then((response) => {
          const volunteerID = response[0][0].VolunteerID;

          const sql3 =
            "INSERT INTO EMERGENCY_CONTACT_INFORMATION (Email, Fname, Lname, Address, Phone_Number, VOULNTEER_VolunteerID ) VALUES(?, ?, ?, ?, ?, ?);";

          db.query(sql3, [
            emergencyEmail,
            emergencyName,
            emergencyLast,
            emergencyAddress,
            emergencyPhone,
            volunteerID,
          ])
            .then((response) => {
              const sql4 =
                "INSERT INTO OPPORTUNITIES_has_VOULNTEER (OPPORTUNITIES_OpportunitiesID,VOULNTEER_VolunteerID ) VALUES(?, ?);";

              return db
                .query(sql4, [location, volunteerID])
                .then((datta) => res.json(datta))
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
});

router.post("/Edit", (req, res, next) => {
  const data = req.body;

  const volunteerIdToUpdate = data.ID;
  const email = data.Email;
  const fname = data.Fname;
  const lname = data.Lname;
  const username = data.Username;
  const password = data.Password;
  const approval_status = data.ApprovalStatus;
  const address = data.Address;
  const education = data.Education;
  const skills = data.Skills;
  const phone = data.Phone;
  let location = data.Opportunity;
  location = parseInt(location);
  const licenses = data.Licenses;
  const availableTime = data.Time;

  const sql = `
  UPDATE VOULNTEER
  SET Email = ?, Fname = ?, Lname = ?, Username = ?, Password = ?, Approval_Status = ?, Address = ?,Education_Degree = ?, Skills_Interests = ?, Phone_Number = ?,Preferred_Locations = ?, Licenses = ?,
  Availability_times = ? WHERE VolunteerID = ?;
`;

  db.query(sql, [
    email,
    fname,
    lname,
    username,
    password,
    approval_status,
    address,
    education,
    skills,
    phone,
    location,
    licenses,
    availableTime,
    volunteerIdToUpdate,
  ])
    .then((response) => {
      const sql2 =
        " UPDATE OPPORTUNITIES_has_VOULNTEER SET OPPORTUNITIES_OpportunitiesID = ? WHERE VolunteerID = ?";
      db.query(sql2, [location, volunteerId])
        .then((response1) => res.json(response1))
        .catch((err) => res.json(err));
    })
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res, next) => {
  const sql = "DELETE FROM VOULNTEER WHERE VolunteerID = ?;";
  console.log(req.params);

  const ID = req.params.id;
  console.log(ID);
  db.query(sql, [ID])
    .then((response) => res.json(response))
    .catch((err) => {
      const message = {
        error: "Could not delete volunteer",
      };
      res.json(message);
    });
});

module.exports = router;
