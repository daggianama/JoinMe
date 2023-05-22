var express = require('express');
var router = express.Router();
const db = require("../model/helper");

/* GET home page. */
router.get('/', sendListBack);

async function sendListBack(req, res, next) {
  try {
    const results = await db("SELECT * FROM events ORDER BY eventDate ASC;"); 
    res.send(results.data);
  } catch (err) {
    res.status(500).send({ error: err.message });

  }
};

router.get("/", (req, res) => {
  // Send back the full list of items
  db("SELECT * FROM items ORDER BY id ASC;")
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/", async (req, res, next) => {
  const { eventTitle, eventDate, eventStartTime, eventLocation } = req.body;
  try {
    await db(
      `INSERT INTO students (firstname, lastname) VALUES ("${firstname}", "${lastname}");`
    );
    // if I reach here, it means the insertion was OK.
    //here is not necesary to send back the list of students
    sendListBack(req, res);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});


// DELETE an event from the database
router.delete("/:id", async (req, res) => {
  //your code here
  const { id } = req.params;
  try {
    await db(`DELETE FROM students WHERE id = ${id};`);
    // If I reach here it means the query was OK.
     //here is not necessary to send back the list of students
    // sendListBack(req, res);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});


module.exports = router;
