
import {
	MapContainer,
	TileLayer,
	Marker,
	Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { breakAddr } from '../helpers/utils';

import { useEffect, useState } from "react";
const L = window.L;

export default function Map() {
	const [center, setCenter] = useState([41.4091528, 2.1924869]);
    const [places, setPlaces] = useState([]);
    
        // By default Leaflet only comes with blue markers. We want green too!
    // https://github.com/pointhi/leaflet-color-markers
    let greenMarker = new L.icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        nameAnchor: [1, -34],
        shadowSize: [41, 41]
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
		}
	}, []);


	return (
		<div>
			Home
			<div className="map">
                <MapContainer
                    className="MarkerMap" 
					center={center}
					zoom={13}
					style={{ height: "400px", width: "100%" }}// you MUST specify map height, else it will be 0!
                >
                    {/* Create the tile layer that shows the map */}
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={center} icon={greenMarker}>
						<Popup>
							<h4>Hello User!</h4>
							<p>Here we are</p>
						</Popup>
                    </Marker>
                    {/* {
                        props.places.map(p => (
                         <Marker key={p.input_address} position={p.latLng}>
                        <Popup>
                            { breakAddr( p.formatted_address ) }
                        </Popup>
                    </Marker>
                    ))
                    } */}
                    </MapContainer>
			</div>
		</div>
	);
}
