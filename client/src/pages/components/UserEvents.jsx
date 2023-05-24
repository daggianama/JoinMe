import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

export default function UserEvents() {
	const { id } = useParams();
	const [userEvents, setUserEvents] = useState([]);

	useEffect(() => {
		loadUser();
	}, [id]);
	async function loadUser() {
		const res = await fetch(`/api/events`);
		const data = await res.json();
		data.map(
			(event) => (event.eventDate = event.eventDate.split("T")[0])
		);
		setUserEvents(data);
	}

	return (
		<div>
			<h3>Your Events</h3>
			{userEvents.map((event, i) => (
                <div key={i}  className="event-card">
					<p>{event.eventTitle}</p>
					<p>{event.eventLocation}</p>
					<p>{event.eventDate}</p>
					<p>{event.eventStartTime}</p>
				</div>
			))}
			<Outlet />
		</div>
	);
}
