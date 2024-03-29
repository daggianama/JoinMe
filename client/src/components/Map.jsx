import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
	useMapEvents,

} from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import MapFilters from "./MapFilters";
import UserEvents from "./UserEvents";
const apiKey = import.meta.env.VITE_APP_THUNDERFOREST_API_KEY;


export default function Map({
	events,
	updateEvents,
	addEvent,
	userId,
	friends,
}) {
	const [center, setCenter] = useState([41.4091528, 2.1924869]);
	const [markers] = useState([]);
	const [selectedPosition, setSelectedPosition] = useState(["", ""]);
	const [hoveredMarker, setHoveredMarker] = useState(null);
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const [friendName, setFriendName] = useState(null);
	const navigate = useNavigate();
	const mapRef = useRef();
	const markerRefs = useRef({});
	const [friendEvents, setFriendEvents] = useState([]);
	const thunderForest = `https://{s}.tile.thunderforest.com/atlas/{z}/{x}/{y}.png?apikey=${apiKey}`;
	

	const handleMarkerHover = (markerId) => {
		setHoveredMarker(markerId);
		if (markerId) {
			markerRefs.current[markerId]?.openPopup();
		} else {
			// Cerrar todos los popups si no hay un ID de marcador válido
			Object.values(markerRefs.current).forEach((markerRef) => {
				markerRef?.closePopup();
			});
		}
	};

	// https://github.com/pointhi/leaflet-color-markers
	let greenMarker = new L.icon({
		iconUrl:
			"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconSize: [20, 36],
		iconAnchor: [12, 36],
		nameAnchor: [1, -34],
		shadowSize: [35, 36],
	});

	let greyMarker = new L.icon({
		iconUrl:
			"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-grey.png",
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconSize: [20, 34],
		iconAnchor: [12, 41],
		nameAnchor: [1, -34],
		shadowSize: [30, 34],
	});
	useEffect(() => {
	
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					setCenter([
						position.coords.latitude,
						position.coords.longitude,
					]);
				},
				(error) => {
					console.error(
						"Error al obtener la geolocalización:",
						error
					);
				}
			);
		} else {
			console.error(
				"La geolocalización no está soportada por tu navegador"
			);
		}
		console.log(addEvent)
	}, []); //iT MUST BE EMPTY SO IT ONLY RUNS ONCE WHEN THE COMPONENT IS MOUNTED
	
	useEffect(() => {
		if (markerRefs.current && markerRefs.current.leafletElement) {
			markerRefs.current.leafletElement.openPopup();
		}
	}, [selectedPosition]); // <- iT IS JUST TO MAKE SURE THE POPUP IS OPENED WHEN THE SELECTED POSITION CHANGES
	
	useEffect(() => {
		filterMarkersByDate();
	}, [selectedDate]); // <- IT RUNS WHEN THE SELECTED DATE CHANGES
	

	//CREATE MARKERS FROM USER CLICK ON MAP
	const OnClickMarkers = () => {
		useMapEvents({
			click(e) {
				const { lat, lng } = e.latlng;

				fetch(
					`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
				)
					.then((response) => response.json())
					.then((data) => {
						const address = data.display_name;
						navigate(
							`/${userId}/addEvent?lat=` +
								e.latlng.lat +
								"&lng=" +
								e.latlng.lng +
								"&address=" +
								address
						);
						addEvent(true);
					})
					.then(setSelectedPosition([e.latlng.lat, e.latlng.lng]))
					.catch((error) => {
						console.error("Address not found", error);
					});
			},
		});

		// show an grey marker where the user just clicked
		return selectedPosition ? (
			<Marker
				
				position={selectedPosition}
				icon={greyMarker}
			>
			(
					<Popup autoOpen>
						<h4>Event Location</h4>
					</Popup>
				)
			</Marker>
		) : null;
	};

	const handleEventDetails = (e) => {
		// showSelectedDetails(e); // Call the function to show the details
		console.log("click on marker: ", e);
		setSelectedEvent(e);

		if (e) {
			return selectedEvent;
		}
	};

	const handleAddeventButton = (e) => {
		e.preventDefault();
		navigate(`/${userId}/addEvent`);
		addEvent(true);
	};

	const handleFilterChange = (event) => {
		setSelectedDate(event.target.value);
		filterMarkersByDate(event.target.value); // Call the filter function to update the markers
	};

	const filterMarkersByDate = () => {
		if (!selectedDate) {
			return true; // If there is no date selected, show all markers
		}
		// const selectedDateTime = selectedDate.setHours(0, 0, 0, 0); // Remove the time from the date
		return selectedDate;
	};

	return (
		<div>
			<div className="map-options">
			
			
				<MapFilters
				selectedDate={selectedDate}
				filterChange={handleFilterChange}
				userId={userId}
				friends={friends}
				setFriendEvents={setFriendEvents}
				setFriendName={setFriendName}
				/>
				<button onClick={() => handleAddeventButton(event)}>
				<i className="fas fa-plus"></i>
				</button>
				</div>
			<div className="map">
				<MapContainer
					className="MarkerMap"
					center={center}
					zoom={15}
					style={{
						
						width: "100%",
						height: "70vh",
					}} // you MUST specify map height, else it will be 0!
					eventHandlers={{
						onClick: OnClickMarkers,
					}}
					ref={mapRef}
				>
					<OnClickMarkers />

					<TileLayer
						url={thunderForest}
					/>

					<Marker position={center} icon={greenMarker}>
						<Popup autoOpen>
							<h5>Here we are</h5>
						</Popup>
					</Marker>

					{markers.map((marker, index) => (
						<Marker
							key={index}
							position={[marker.lat, marker.lng]}
							icon={L.icon({
								iconUrl:
									"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
								shadowUrl:
									"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
								iconSize: [25, 41],
								iconAnchor: [12, 41],
								nameAnchor: [1, -34],
								shadowSize: [41, 41],
							})}
						>
							<Popup>
								<h4>Marker {index + 1}</h4>
								<p>Latitude: {marker.lat}</p>
								<p>Longitude: {marker.lng}</p>
							</Popup>
						</Marker>
					))}

					{!friendEvents.length &&
						events.map((e) =>
							!selectedDate || e.eventDate === selectedDate ? (
								<Marker
									key={e.id}
									position={[e.latitude, e.longitude]}
									eventHandlers={{
										mouseover: () => handleMarkerHover(e.id),
										mouseout: () => handleMarkerHover(null),
										click: () => handleEventDetails(e.id),
									}}
									ref={(ref) => (markerRefs.current[e.id] = ref)}
								>
									<Popup key={e.id} className="pop-event">
										<h5>{e.eventTitle}</h5>
										<p><span>Date  </span>{e.eventDate}</p>
										
									</Popup>
								</Marker>
							) : null
						)}

					{friendEvents.length &&
						friendEvents.map((e) => (
							<Marker
								key={e.id}
								position={[e.latitude, e.longitude]}
								eventHandlers={{
									mouseover: () => handleMarkerHover(e.id),
									mouseout: () => handleMarkerHover(null),
									click: () => handleEventDetails(e.id),
								}}
								ref={(ref) => (markerRefs.current[e.id] = ref)}
							>
								<Popup key={e.id} className="pop-event">
									<h5>{e.eventTitle}</h5>
									<p><span>Date  </span>{e.eventDate}</p>
										
								</Popup>
							</Marker>
						))}
				</MapContainer>
			</div>
			<UserEvents
				userId={userId}
				events={events}
				updateEvents={updateEvents}
				selectedEvent={selectedEvent}
				friendEvents={friendEvents}
				friendName={friendName}
		
			/>
		</div>
	);
}
