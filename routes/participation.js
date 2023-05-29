var express = require('express');
var router = express.Router();
const db = require("../model/helper");

// get events participation by user id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const results = await db(
            `SELECT event_id FROM participation WHERE user_id = ${id};`
        );
        res.send(results.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});


// POST (create) a new participation to the database
router.post("/:id", async (req, res) => {
    const { event_id } =
        req.body;
    try {
        await db(
            `INSERT INTO participation (user_id, event_id) VALUES ("${user_id}", "${event_id}");`
        );
        //here is not necesary to send back any data
        res
            .status(201)
            .send({ message: "Participation created successfully :)" });
    } catch (err) {
        res.status(500).send({ message: err });
    }
});


// DELETE participation of user in event by user id and event id
router.delete("/:id/:event_id", async (req, res) => {
    const { id, event_id } = req.params;
    try {
        const results = await db(
            `DELETE FROM participation WHERE user_id = ${id} AND event_id = ${event_id};`
        );
        res.send(results.data);
        console.log(id, event_id);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});



module.exports = router;
