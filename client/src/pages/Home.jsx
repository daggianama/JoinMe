import {
	MapContainer,
	TileLayer,
	Marker,

	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Home.css";
import { useEffect, useState } from "react";

export default function Home() {
	const [center, setCenter] = useState([41.4091528, 2.1924869]);


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
		}
	}, []);

	return (
		<div>
			Home
			<div className="map">
				<MapContainer
					center={center}
					zoom={13}
					style={{ height: "400px", width: "100%" }}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={center}>
						<Popup>
							<h4>Hello User!</h4>
							<p>Here we are</p>
						</Popup>
					</Marker>
				</MapContainer>
			</div>
			{/* <iframe width="700" height="400" src="https://opendata-ajuntament.barcelona.cat/data/es/dataset/culturailleure-cinemesteatresauditoris/resource/0f706441-b9d8-47c9-9e71-ced453810a72/view/6eb95987-fb1a-4b5a-ab81-f01f2ea0fc8a" frameBorder="0"></iframe> */}
		</div>
	);
}
