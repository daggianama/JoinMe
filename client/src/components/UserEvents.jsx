import { useEffect, useState } from "react";
import {
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
} from "../utils/interactions";

export default function UserEvents({
	userId,
	events,
	updateEvents,
	selectedEvent,
	friendEvents,
	closeModal,
	friendId
}) {
	// STATE FOR DRAGGABLE FORM
	const [position, setPosition] = useState({ x: 100, y: 290 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
	const userEventIds = events.map((e) => e.id);

	useEffect(() => {
		(async () => {
			await updateEvents();
		})();


	}, [userId]);


	const handleClose = () => {
		closeModal(false);
	};

	const handleDelete = async (id) => {

		await deleteEvent(id);
		updateEvents();
	};

	const handleNewParticipation = async (id) => {
		await newParticipation(id);
		updateEvents();
	};
		
		const newParticipation = async (id) => {
			try {
				await fetch(`/api/participation/${userId}/${id}`, {
					method: "POST",
					headers: {
	
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: id }),
				})
					// // upon success, update tasks
					.then((res) => res.json())
					// upon failure, show error message
					.catch((error) => console.error(error));
			} catch (error) {
				console.error(error);
			}
			updateEvents();
			handleClose();
		};
	





	const deleteEvent = async (id) => {
		try {
		await fetch(`/api/participation/${userId}/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: id }),
		})
			// // upon success, update tasks
			.then((res) => res.json())
			// upon failure, show error message
			.catch((error) => console.error(error));
		} catch (error) {
			console.error(error);
		}
		

	};



	return (
		<div>
			<h3></h3>
			
			{userEventIds.includes(selectedEvent) && events.map(
				(e, i) =>
					!selectedEvent ||
					(e.id === selectedEvent && (
						<form
							key={i}
							className="event-card"
							style={{
								position: "absolute",
								left: position.x,
								top: position.y,
								cursor: isDragging ? "grabbing" : "grab",
							}}
							onMouseDown={(event) =>
								handleMouseDown(
									event,
									setPosition,
									setIsDragging,
									setDragOffset,
									position
								)
							}
							onMouseMove={(event) =>
								handleMouseMove(
									event,
									isDragging,
									setPosition,
									dragOffset
								)
							}
							onMouseUp={() => handleMouseUp(setIsDragging)}
						>
							<button className="close" onClick={handleClose}>
								{" "}
								X{" "}
							</button>
							<button
								className="delete"
								type="button"
								onClick={() => handleDelete(e.id)}
							><i className="fa fa-face-frown"></i>
								<p></p>Not going 
							</button>
							<div className="event-text">
								<h4>{e.eventTitle}</h4>
								<p><span>Location </span>{e.eventLocation}</p>
								<p><span>Date </span> {e.eventDate}</p>
								<p><span>Time </span> {e.eventStartTime}</p>
							</div>
						
						</form>
					))
			)}


			{/* For Friends Events Event Cards */}
			{!userEventIds.includes(selectedEvent) ? Array.isArray(friendEvents) && friendEvents.map(
				(e, i) =>
					!selectedEvent ||
					
					(e.id === selectedEvent && (
						<form
							key={i}
							className="event-card"
							style={{
								position: "absolute",
								left: position.x,
								top: position.y,
								cursor: isDragging ? "grabbing" : "grab",
							}}
							onMouseDown={(event) =>
								handleMouseDown(
									event,
									setPosition,
									setIsDragging,
									setDragOffset,
									position
								)
							}
							onMouseMove={(event) =>
								handleMouseMove(
									event,
									isDragging,
									setPosition,
									dragOffset
								)
							}
							onMouseUp={() => handleMouseUp(setIsDragging)}
						>
							<button className="close" onClick={close}>
								{" "}
								X{" "}
							</button>
							<button
								className="join"
								type="button"
								onClick={() => handleNewParticipation(e.id)}
							>
								Join Friend
							</button>
							<div className="event-text">
								<h4>{e.eventTitle}</h4>
								<p><span>Location </span>{e.eventLocation}</p>
								<p><span>Date </span> {e.eventDate}</p>
								<p><span>Time </span> {e.eventStartTime}</p>
							</div>
						</form>
					))
			)
			: null}
		</div>
	);
}
