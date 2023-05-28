var express = require('express');
var router = express.Router();

const db = require("../model/helper");



/* GET users freinds listing. */
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {

        const results = await db(
            //select all friends of user and send back the users freinds first name & last name
            `SELECT * FROM users WHERE id IN (SELECT user2_id FROM friends WHERE user1_id = ${id});`
        );

        res.send(results.data.map((item) => { 
            return item = {firstName: item.firstName, lastName: item.lastName, id: item.id};
            }));
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});




module.exports = router;
