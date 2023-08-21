const express = require("express");
const db = require("../util/database");

const router = express.Router();

router.get("", (req, res, next) => {
  const sql = "SELECT * FROM OPPORTUNITIES;";

  db.query(sql)
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

  const sql = "SELECT * FROM  OPPORTUNITIES WHERE OpportunitiesID = ?;";
  db.query(sql, [id])
    .then((data) => res.json(data[0]))
    .catch((err) => {
      const message = {
        error: "There was an error",
      };
      res.json(message);
    });
});

router.post("", (req, res, next) => {
  const data = req.body;
  const title = data.Title;
  const description = data.Description;

  if (data.Edit) {
    const id = data.Id;

    const sql1 =
      "UPDATE Opportunities SET Title = ?, Description = ? WHERE OpportunitiesID = ?;";

    db.query(sql1, [title, description, id])
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  } else {
    const sql2 =
      "INSERT INTO Opportunities (Title, Description) VALUES (?, ?);";

    db.query(sql2, [title, description])
      .then((response) => res.json(response))
      .catch((err) => console.log(err));
  }
});

router.delete("/:id", (req, res, next) => {
  const sql = "DELETE FROM OPPORTUNITIES WHERE OpportunitiesID = ?;";

  const ID = req.params.id;

  db.query(sql, [ID])
    .then((response) => res.json(response))
    .catch((err) => {
      const message = {
        error: "Could not delete oppoutunities",
      };
      res.json(message);
    });
});

module.exports = router;
