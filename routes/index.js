var express = require("express");
var router = express.Router();
const db = require("../model/helper");



async function sendListBack(req, res, next) {
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

// GET one event from the database by ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	try {
		const event = await db(`SELECT * FROM events WHERE id = ${id};`);
		res.send(event.data[0]);
	} catch (err) {}
});

// GET one event from the database by date
router.get("/date", async (req, res) => {
	const { date } = req.params;
	try {
		const event = await db(
			`SELECT * FROM events WHERE eventDate = ${date};`
		);
		res.send(event.data[0]);
	} catch (err) {}
});

// GET one event from the database by title
router.get("/title", async (req, res) => {
	const { title } = req.params;
	try {
		const event = await db(
			`SELECT * FROM events WHERE eventTitle LIKE '%' + ${title} + '%';`
		);
		res.send(event.data[0]);
	} catch (err) {}
});

// POST a new event to the database
router.post("/", async (req, res, next) => {
	const { eventTitle, eventDate, eventStartTime, eventLocation } =
		req.body;
	try {
		await db(
			`INSERT INTO events (eventTitle, eventDate, eventStartTime, eventLocation) VALUES ("${eventTitle}", "${eventDate}", "${eventStartTime}", "${eventLocation}");`
		);
		//here is not necesary to send back any data
		res
			.status(201)
			.send({ message: "Event created successfully :)" });
	} catch (err) {
		res.status(500).send({ message: err });
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
