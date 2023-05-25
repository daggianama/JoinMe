import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
} from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";

export default function Map({ events, updateEvents }) {
	const [center, setCenter] = useState([41.4091528, 2.1924869]);
	const [markers, setMarkers] = useState([]);
	const mapRef = useRef();

	// By default Leaflet only comes with blue markers. We want green too!
	// https://github.com/pointhi/leaflet-color-markers
	let greenMarker = new L.icon({
		iconUrl:
			"https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
		shadowUrl:
			"https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		nameAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	useEffect(() => {
		// // Get the user's current location
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
		}
		// if (mapRef.current) {
		//     const map = mapRef.current.leafletElement;
		//     map.on("click", handleMapClick);
		//   }
		updateEvents();
		console.log(markers);
	}, [markers]);

	function breakAddr(addr) {
		let addrWithBrs = addr.replace(/, /g, "<br />");
		return (
			<span dangerouslySetInnerHTML={{ __html: addrWithBrs }}></span>
		);
	}

	const handlePopClick = () => {
		console.log("click");
	};

	const handleMapClick = (e) => {
		console.log(e);
		const { lat, lng } = e.latlng;
		const newMarker = { lat, lng };
		setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
	};

	return (
		<div>
			<div className="map">
				<MapContainer
					className="MarkerMap"
					center={center}
					zoom={14}
					style={{ height: "400px", width: "100%" }} // you MUST specify map height, else it will be 0!
					eventHandlers={{
						click: handleMapClick,
					}}
					ref={mapRef}
				>
					{/* Create the tile layer that shows the map */}
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={center} icon={greenMarker}>
						<Popup>
							<h4>Hello User!</h4>
							<p>Here we are</p>
						</Popup>
					</Marker>

					{markers.map((marker, index) => (
						<Marker key={index} position={marker} icon={greenMarker}>
							<Popup>
								<h4>Marker {index + 1}</h4>
								<p>Latitude: {marker.lat}</p>
								<p>Longitude: {marker.lng}</p>
							</Popup>
						</Marker>
					))}
					{events.map((e) => (
						<Marker key={e.id} position={[e.latitude, e.longitude]}>
							<Popup key={e.id} onClick={() => handlePopClick(e.id)}>
								<span className="eventName-pop">{e.eventTitle}</span>{" "}
								<br />
								{e.eventDate}
							</Popup>
						</Marker>
					))}
				</MapContainer>
			</div>
		</div>
	);
}
