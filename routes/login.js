const express = require("express");
const db = require("../util/database");

const Jwt = require("jsonwebtoken");

const router = express.Router();

router.post("", (req, res, next) => {
  const login = req.body;

  const sql = "SELECT * FROM ADMIN WHERE Username = ? AND Password = ?;";
  db.query(sql, [login.user, login.password])
    .then((data) => {
      if (data[0].length > 0) {
        const name = data[0][0].Username;
        const token = Jwt.sign({ name }, "Naruto", { expiresIn: "1d" });
        return res.json({ Status: "Success", authToken: token });
      } else {
        return res.json({ Message: "No Record Found" });
      }
    })
    .catch((err) => {
      return res.json({ Message: "Server Side Error" });
    });
});

module.exports = router;
