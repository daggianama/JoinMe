import { useEffect, useState } from "react";
import { handleMouseDown, handleMouseMove, handleMouseUp } from "../utils/interactions";

export default function UserEvents({events, updateEvents, selectedEvent}) {
		// STATE FOR DRAGGABLE FORM
		const [position, setPosition] = useState({ x: 900, y: 150 });
		const [isDragging, setIsDragging] = useState(false);
		const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	

	useEffect(() => {
		updateEvents();
	}, []);

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
			<h3></h3>
			{events.map((e, i) => (
				!selectedEvent || e.id === selectedEvent && (
					<div key={i} className="event-card"
					style={{
						position: "absolute",
						left: position.x,
						top: position.y,
						cursor: isDragging ? "grabbing" : "grab",}}
						onMouseDown={(event) =>
							handleMouseDown(event, setPosition, setIsDragging, setDragOffset, position)}
						onMouseMove={(event) =>
							handleMouseMove(event, isDragging, setPosition, dragOffset)
						}
						onMouseUp={() => handleMouseUp(setIsDragging)}>
					<p>{e.eventTitle}</p>
					<p>{e.eventLocation}</p>
					<p>{e.eventDate}</p>
					<p>{e.eventStartTime}</p>
					<button
						className="delete"
						type="button"
						onClick={() => handleDelete(e.id)}
					>
						<i className="fa-solid fa-trash-can"></i>{" "}
					</button>
					</div>
				)
			))}

		</div>
	);
}
