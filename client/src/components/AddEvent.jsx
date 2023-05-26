import { useEffect, useState } from "react";
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-places-autocomplete";
import { useFetcher, useSearchParams } from "react-router-dom";
import "./AddEvent.css";

export default function AddEvent({ updateEvents, closeForm }) {
	const [searchParams, setSearchParams] = useSearchParams();
	const [selectedOption, setSelectedOption] = useState("");
	const [newEvent, setNewEvent] = useState({
		eventTitle: "",
		eventLocation: searchParams.get("address") || "",
		eventDate: "",
		eventStartTime: "",
		eventEndTime: "",
		latitude: searchParams.get("lat") || "",
		longitude: searchParams.get("lng") || "",
		category: "",
	});

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

	const handleOptionChange = (option) => {
		setSelectedOption(option);
		console.log(option);
	};

	const getSuggestionsByLocation = async (latitude, longitude) => {
		const response = await fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCKera2QzXqnNwAKgCPcexnVFwwt_WIXu8`
		);
		const data = await response.json();
		data.results.map((result) => result.formatted_address);
		// Aquí puedes hacer lo que necesites con las sugerencias obtenidas
	};

	const handleChange = (event) => {
		const { value, name } = event.target;
		setNewEvent((state) => ({
			...state,
			[name]: value,
			category: selectedOption,
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
			const response = await fetch("/api/events", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newEvent),
			});
			const data = await response.json();
			console.log(data);
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
			category: null,
		});
		updateEvents();
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
			category: null,
		});
		closeForm(false);
	};

	return (
		<div className="add-event">
			<form onSubmit={handleSubmit}>
				<button className="close-form" onClick={closeModal}>
					{" "}
					X{" "}
				</button>
				<div className="address-input">
					<label htmlFor="eventLocation">Address:</label>
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

				<div className="input-title-tag">
					<label htmlFor="eventTitle">Title:</label>
					<input
						type="text"
						id="eventTitle"
						name="eventTitle"
						value={newEvent.eventTitle}
						onChange={handleChange}
						required
					/>

						<div className="event-category">
							<label htmlFor="eventCategory" />
							<select
								value={selectedOption}
								onChange={(e) => handleOptionChange(e.target.value)}
							>
								<option value="">Category</option>
								<option value="relax">Relax</option>
								<option value="family">Family</option>
								<option value="sports">Sports</option>
								<option value="nightlife">Nightlife</option>
								<option value="educative">Educative</option>
								<option value="work">Work</option>
							</select>
						</div>
					
				</div>

				<div className="input-time">
					<label htmlFor="eventDate">Date:</label>
					<input
						type="date"
						id="eventDate"
						name="eventDate"
						value={newEvent.eventDate}
						onChange={handleChange}
						required
					/>
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
				<button className="submit-button" type="submit">
					Save{" "}
				</button>
			</form>
		</div>
	);
}
