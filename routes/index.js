var express = require('express');
var router = express.Router();
const db = require("../model/helper");



async function sendListBack(req, res) {
	try {
		const results = await db(
			"SELECT * FROM users;"
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
}

/* GET users listing. */
  router.get("/", sendListBack);

  // GET one user by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const event = await db(`SELECT * FROM users WHERE id = ${id};`);
		res.send(event.data[0]);
	} catch (err) {}
});



//get events in where user friend id is participating
router.get("/:id/friends/participation/:id2", async (req, res) => {
	const { id, id2 } = req.params;
	try {
		const results = await db(
			`SELECT event_id FROM participation WHERE user_id IN (SELECT user2_id FROM friends WHERE user1_id = ${id} AND user2_id = ${id2});`
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});


// POST (create) a new user to the database
router.post("/", async (req, res) => {
	const { firstName, lastName} =
		req.body;
	try {
		await db(
			`INSERT INTO events (firstName, lastName) VALUES ("${firstName}", "${lastName}");`
		);
		//here is not necesary to send back any data
		res
			.status(201)
			.send({ message: "User created successfully :)" });
	} catch (err) {
		res.status(500).send({ message: err });
	}
});


// PUT (update) a user in the database
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { firstName, lastName} =
		req.body;
	try {
    const updateQuery = `UPDATE users SET firstName = ?, lastName = ? WHERE id = ?;`;
    const result = await db(updateQuery, [firstName, lastName, id]);
    res.status(201).send({ message: "User updated successfully" });
	} catch (err) {
		console.error(err);
		res.status(500).send({
			error: "An error occurred while updating the user",
		});
	}
});


// DELETE a user from the database
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await db(`DELETE FROM users WHERE id = ${id};`);
		//here is not necessary to send back nothing
		res.status(201).send({ message: "User deleted successfully" });
	} catch (err) {
		res.status(500).send({ message: err });
	}
});


module.exports = router;
