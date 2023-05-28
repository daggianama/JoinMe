var express = require("express");
var router = express.Router();
const db = require("../model/helper");

async function sendListBack(req, res) {
	try {
		const results = await db(
			"SELECT * FROM events ORDER BY eventDate ASC;"
		);
		res.send(results.data);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
}

// GET all events from the database
router.get("/", sendListBack);

// GET EVENTS BY ID from the database
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const results = await db(
			`SELECT * FROM events WHERE id = ${id};`
		);
		res.send(results.data[0]);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});





// POST a new event to the database done by user
router.post("/:id", async (req, res) => {
	let { eventTitle, eventLocation, eventDate, eventStartTime, latitude, longitude, category, public } =
		req.body;
	try {
		await db(
			`INSERT INTO events (eventTitle, eventLocation, eventDate, eventStartTime, latitude, longitude, category ) VALUES ("${eventTitle}", "${eventLocation}", "${eventDate}", "${eventStartTime}", ${latitude}, ${longitude}, "${category}");`
		);
		// select last id created from  events table
		const data = await db(`SELECT * FROM events ORDER BY id DESC LIMIT 1;`);
		// post event to participation table with user id
		const { id } = req.params;
		const event_id = await data.data[0].id;
		public === true ? public = 1 : public = 0;
		try {
			await db(
				`INSERT INTO participation (user_id, event_id, public) VALUES ("${id}", "${event_id}", ${public});`
			);
			res
				.status(201)
				.send({ message: "Event participation created successfully :)" });
			} catch (err) {
				res.status(500).send({ message: err });
		}
		
	} catch (err) {
		res.status(500).send({ message: err });
	}
});

//UPDATE an event in the database by ID ++++NOT WORKING
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { eventTitle, eventDate, eventStartTime, eventLocation } =
		req.body;

	try {
		let updateQuery = "UPDATE events SET ";
		let updateValues = [];

		if (eventTitle !== undefined) {
			updateQuery += "eventTitle = ?, ";
			updateValues.push(eventTitle);
		}

		if (eventDate !== undefined) {
			updateQuery += "eventDate = ?, ";
			updateValues.push(eventDate);
		}

		if (eventStartTime !== undefined) {
			updateQuery += "eventStartTime = ?, ";
			updateValues.push(eventStartTime);
		}

		if (eventLocation !== undefined) {
			updateQuery += "eventLocation = ?, ";
			updateValues.push(eventLocation);
		}
		if (updateValues.length === 0) {
			// No parameters provided for update
			res
				.status(400)
				.send({ error: "No parameters provided for update" });
			return;
		}

		// Remove the trailing comma and add the WHERE clause
		updateQuery = updateQuery.slice(0, -2) + " WHERE id = ?";
		updateValues.push(id);

		try {
			const result = await db(updateQuery, updateValues);
			res.status(201).send({ message: "Event updated successfully" });
		  } catch (err) {
			console.error(err);
			res.status(500).send({ error: "An error occurred while updating the event" });
		  }
	} catch (err) {
		console.error(err);
		res.status(500).send({
			error: "An error occurred while updating the event",
		});
	}
});

// DELETE an event from the database by ID
router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		await db(`DELETE FROM events WHERE id = ${id};`);
		//here is not necessary to send back nothing
		res.status(201).send({ message: "Event deleted successfully" });
	} catch (err) {
		res.status(500).send({ message: err });
	}
});

module.exports = router;
