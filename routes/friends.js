var express = require('express');
var router = express.Router();

const db = require("../model/helper");



/* GET users freinds listing. */
router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const results = await db(
            `SELECT * FROM friends WHERE user_id = ${id};`
        );
        res.send(results.data);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});



module.exports = router;
