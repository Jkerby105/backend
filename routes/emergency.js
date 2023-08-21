const express = require("express");
const db = require("../util/database");
const router = express.Router();

router.get("", (req, res, next) => {
  const sql = "SELECT * FROM EMERGENCY_CONTACT_INFORMATION;";

  const data = db
    .query(sql)
    .then((data) => res.json(data[0]))
    .catch((err) => {
      const message = {
        error: "There was an error uptaning the data",
      };
      res.json(message);
    });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;

  const sql =
    "SELECT * FROM EMERGENCY_CONTACT_INFORMATION WHERE EContactID = ?;";

  db.query(sql, [id])
    .then((data) => res.json(data))
    .catch((err) => {
      const message = {
        error: "There was an error",
      };
      res.json(message);
    });
});

router.post("/Edit", (req, res, next) => {
  const data = req.body;
  console.log(data);

  const emergencyID = data.ID;
  const emergencyName = data.EmergencyFirstName;
  const emergencyLast = data.EmergencyLastName;
  const emergencyEmail = data.EmergencyEmail;
  const emergencyPhone = data.EmergencyPhone;
  const emergencyAddress = data.EmergencyAddress;

  const sql1 =
    "UPDATE EMERGENCY_CONTACT_INFORMATION SET Email = ?, Fname = ?, Lname = ?, Address = ?, Phone_Number = ? WHERE EContactID = ?;";

  db.query(sql1, [
    emergencyEmail,
    emergencyName,
    emergencyLast,
    emergencyAddress,
    emergencyPhone,
    emergencyID,
  ])
    .then((response) => res.json(response))
    .catch((err) => console.log(err));
});

router.delete("/:id", (req, res, next) => {
  const sql = "DELETE FROM EMERGENCY_CONTACT_INFORMATION WHERE EContactID = ?;";

  const ID = req.params.id;

  db.query(sql, [ID])
    .then((response) => console.log(response))
    .catch((err) => {
      const message = {
        error: "Could not delete Emergency Contact Information",
      };
      res.json(message);
    });
});

module.exports = router;
