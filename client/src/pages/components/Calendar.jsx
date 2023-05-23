import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

export default function UserCalendar() {
	const { id } = useParams();
	const [userEvents, setUserEvents] = useState([]);

	useEffect(() => {
		loadUser();
	}, []);

	async function loadUser() {
		const res = await fetch(`/api/events`);
		const data = await res.json();
		setUserEvents(data);
	}

  const localizer = dayjsLocalizer(dayjs);
  


	return (
		<div className="user-calendar">
			<h3>Your Calendar</h3>
			<div>
				<Calendar
					localizer={localizer}
					events={userEvents}
					startAccessor="start"
					endAccessor="end"
					style={{ height: 500 }}
				/>
			</div>
			<div className="events-list">
				{userEvents.map((event) => (
					<div className="event-card" key={event.id}>
						<h2>{event.eventTitle}</h2>
						<h3>{event.eventLocation}</h3>
						<h3>{(event.eventDate).split('T')[0]}</h3>
					</div>
				))}
			</div>
			<Outlet />
		</div>
	);
}
