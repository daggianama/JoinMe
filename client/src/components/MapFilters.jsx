import { useEffect, useState } from "react";
import Select from "react-select";

export default function MapFilters({
	filterChange,
	selectedDate,
	friends,
	setFriendEvents,
	setFriendName,
}) {
	const [selectedFriend, setSelectedFriend] = useState("");

	useEffect(() => {
		console.log("friends", friends);
	}, []);

	

	const handleSelectFriend = async (selectedOption) => {
		if (!selectedOption) {
			// If the user clears the selection
			setFriendEvents([]);
			setSelectedFriend(null);
			return;
		}
		
		const selectedValue = selectedOption.value;
		friends.map((f) => { if (f.id === selectedValue) setFriendName(`${f.firstName}`) });
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

	const friendOptions = friends.map((f) => ({
		value: f.id,
		label: `${f.firstName} ${f.lastName}`,
	}));
	const CustomStyle = {
		control: (provided, state) => ({
			...provided,
			border: state.isFocused ? "2px solid rgba(71, 68, 238, 0.777)" : "2px solid rgba(120, 128, 247, 0.749)",
			borderRadius: "18px",
			height: "2px",
			fontSize: "12px",
			padding: "0px 0px 0px 10px",

		}),

		menu: (provided) => ({
			...provided,
			borderRadius: "16px",
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? "rgba(120, 128, 247, 0.749)" : "white",
			color: state.isFocused && "white",
			borderRadius: "10px",
		}),
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
						style={CustomStyle}
						value={selectedDate || ""}
						onChange={filterChange}
					/>
				</div>
				<div className="friends">
					<label htmlFor="friend-select">Friend events</label>
					<Select
						className="friend-select"
						
						onChange={handleSelectFriend}
						options={friendOptions}
						styles={CustomStyle}
						isClearable={true}
					/>
				</div>
			</div>
		</div>
	);
}
