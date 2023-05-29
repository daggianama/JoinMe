import { useEffect, useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { useSearchParams } from "react-router-dom";
import {
	handleMouseDown,
	handleMouseMove,
	handleMouseUp,
} from "../utils/interactions";

export default function AddEvent({
	updateEvents,
	closeForm,
	userId,
}) {
	const [searchParams] = useSearchParams();


	const [newEvent, setNewEvent] = useState({
		eventTitle: "",
		eventLocation: searchParams.get("address") || "",
		eventDate: "",
		eventStartTime: "",
		eventEndTime: "",
		latitude: searchParams.get("lat") || "",
		longitude: searchParams.get("lng") || "",
		public: false,
	});

	// STATE FOR DRAGGABLE FORM
	const [position, setPosition] = useState({ x: 880, y: 160 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					const { latitude, longitude } = position.coords;
					const location = `${latitude},${longitude}`;
					getSuggestionsByLocation(location);
				},
				(error) => {
					console.error("Error obtaining current location:", error);
				}
			);
		} else {
			console.error("Geolocation is not supported by your browser");
		}
	}, []);

	useEffect(() => {
		setNewEvent((state) => ({
			...state,
			eventLocation: searchParams.get("address") || "",
			latitude: searchParams.get("lat") || "",
			longitude: searchParams.get("lng") || "",
		}));
	}, [searchParams]);

	const getSuggestionsByLocation = async (latitude, longitude) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCKera2QzXqnNwAKgCPcexnVFwwt_WIXu8`
		);
		const data = await response.json();
		data.results.map((result) => result.formatted_address);
	};

	const handleChange = (event) => {
		const { value, name, checked } = event.target;
		setNewEvent((state) => ({
			...state,
			[name]: name === "public" ? checked : value,
		}));
	};

	const handlePlaceSelect = async (address) => {
		try {
			const results = await geocodeByAddress(address);
			const latLng = await getLatLng(results[0]);
			setNewEvent((state) => ({
				...state,
				eventLocation: address,
				latitude: latLng.lat,
				longitude: latLng.lng,
			}));
		} catch (error) {
			console.error("Error retrieving place details:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			await fetch(`/api/events/${userId}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEvent),
			});
		} catch (error) {
			console.error(error);
		}
		console.log(newEvent);
		setNewEvent({
			eventTitle: "",
			eventLocation: "",
			eventDate: "",
			eventStartTime: "",
			eventEndTime: "",
			latitude: null,
			longitude: null,
			public: false,
		});
		updateEvents();
		closeForm(false);
		console.log(newEvent);
	};

	const closeModal = () => {
		setNewEvent({
			eventTitle: "",
			eventLocation: "",
			eventDate: "",
			eventStartTime: "",
			eventEndTime: "",
			latitude: null,
			longitude: null,
			public: false,
		});
		closeForm(false);
	};

	return (
		<div>
			<form
				className="add-event"
				onSubmit={handleSubmit}
				style={{
					position: "absolute",
					left: position.x + "px",
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
					handleMouseMove(event, isDragging, setPosition, dragOffset)
				}
				onMouseUp={() => handleMouseUp(setIsDragging)}
			>
				<button className="close" onClick={closeModal}>
					X{" "}
				</button>
				<div className="content">
					<h4>Create event</h4>
					<div className="address">
						<label htmlFor="eventLocation">Address</label>
						<PlacesAutocomplete
							value={newEvent.eventLocation}
							onChange={(value) =>
								setNewEvent((state) => ({
									...state,
									eventLocation: value,
								}))
							}
							onSelect={handlePlaceSelect}
						>
							{({
								getInputProps,
								suggestions,
								getSuggestionItemProps,
								loading,
							}) => (
								<>
									<input
										{...getInputProps({
											placeholder: "Search Places ...",
											className: "location-search-input",
										})}
									/>
									<div className="autocomplete-dropdown-container">
										{loading && <div>Loading...</div>}
										{suggestions.map((suggestion, i) => {
											const className = suggestion.active
												? "suggestion-item--active"
												: "suggestion-item";
											// inline style for demonstration purpose
											const style = suggestion.active
												? {
														backgroundColor: "#fafafa",
														cursor: "pointer",
												  }
												: {
														backgroundColor: "#ffffff",
														cursor: "pointer",
												  };
											return (
												<div
													key={i}
													{...getSuggestionItemProps(suggestion, {
														className,
														style,
													})}
												>
													<span>{suggestion.description}</span>
												</div>
											);
										})}
									</div>
								</>
							)}
						</PlacesAutocomplete>
					</div>

					<div className="title">
						<label htmlFor="eventTitle">Title</label>
						<input
							type="text"
							id="eventTitle"
							name="eventTitle"
							value={newEvent.eventTitle}
							onChange={handleChange}
							required
						/>
					</div>

					<div className="category-date">
						<label htmlFor="eventDate">Date</label>
						<input
							type="date"
							id="eventDate"
							name="eventDate"
							value={newEvent.eventDate}
							onChange={handleChange}
							required
						/>
					
					</div>
					<div className="input-time">
						<label htmlFor="eventStartTime">Start:</label>
						<input
							type="time"
							id="eventStartTime"
							name="eventStartTime"
							value={newEvent.eventStartTime}
							onChange={handleChange}
							required
						/>
						<label htmlFor="eventEndTime">End:</label>
						<input
							type="time"
							id="eventEndTime"
							name="eventEndTime"
							value={newEvent.eventEndTime}
							onChange={handleChange}
						/>
					</div>
					<div className="public-option">
						<label htmlFor="isPublic">Friends can join</label>
						<input
							type="checkbox"
							name="public"
							value={newEvent.public}
							checked={newEvent.public === true}
							onChange={handleChange}
						/>
					</div>
				</div>
				<button className="submit-button" type="submit">
					SAVE{" "}
				</button>
			</form>
		</div>
	);
}
