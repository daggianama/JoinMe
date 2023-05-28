import { useEffect, useState } from "react";

export default function MapFilters({
	filterChange,
	selectedDate,
	friends,
	setFriendEvents,
}) {
	const [selectedFriend, setSelectedFriend] = useState("");
	useEffect(() => {
		
	}, []);

	const handleSelectFriend = async (e) => {
		const selectedValue = e.target.value;

		if (selectedValue === selectedFriend) {
			return;
		}

		if (selectedValue === "") {
			// non seleccion or empty selection choosen
			setFriendEvents([]);
			setSelectedFriend("");
		} else {
			// When a friend is selected
			try {
				const friendId = selectedValue;
				const res = await fetch(`/api/participation/${friendId}`);
				const data = await res.json();
				const result = data.map(async (event) => {
					const res = await fetch(`/api/events/${event.event_id}`);
					const eventData = await res.json();
					eventData.eventDate = eventData.eventDate.split("T")[0];
					return eventData;
				});
				const events = await Promise.all(result);
				setSelectedFriend(friendId);
				setFriendEvents(events);
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<div className="map-filters">
			<div className="filter-markers">
				<div className="date">
					<label htmlFor="eventDate">By date</label>
					<input
						type="date"
						id="eventDate"
						name="eventDate"
						value={selectedDate || ""}
						onChange={filterChange}
					/>
				</div>
				<div className="friends">
					<label htmlFor="friend-select">Friend events</label>
					<select
						value={selectedFriend}
						onChange={handleSelectFriend}
					>
						<option value=""></option>
						{friends.map((f, i) => (
							<option key={i} value={f.id}>
								{f.firstName} {f.lastName}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
