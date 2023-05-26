import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function UserEvents({events, updateEvents}) {
	// const [events, setEvents] = useState([]);

	useEffect(() => {
		updateEvents();
	}, []);

	// async function loadUser() {
	// 	const res = await fetch(`/api/events`);
	// 	const data = await res.json();
	// 	data.map(
	// 		(event) => (event.eventDate = event.eventDate.split("T")[0])
	// 	);
	// 	setEvents(data);
	// }

	const handleDelete = (id) => {
		deleteEvent(id)
			.then(updateEvents());
	}

	const deleteEvent = async (id) => {
		fetch(`/api/events/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		})
			// // upon success, update tasks
			.then((res) => res.json())
			.then((data) => updateEvents(data))
			// upon failure, show error message
			.catch((error) => console.error(error));
	};
	

	return (
		<div>
			<h3>Your Events</h3>
			{events.map((event, i) => (
				<div key={i} className="event-card">
					<p>{event.eventTitle}</p>
					<p>{event.eventLocation}</p>
					<p>{event.eventDate}</p>
					<p>{event.eventStartTime}</p>
					<button
						className="delete"
						type="button"
						onClick={() => handleDelete(event.id)}
					>
						<i className="fa-solid fa-trash-can"></i>{" "}
					</button>
				</div>
			))}
			<Outlet />
		</div>
	);
}