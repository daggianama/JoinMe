
import "leaflet/dist/leaflet.css";
import "./Home.css";
import { useEffect, useState } from "react";
// import AddressForm from '../components/AddressForm';
// import MarkerTable from '../components/MarkerTable';
import Map from './components/Map';
import { getHome } from '../helpers/geoLocation';
import AddEvent from "./components/AddEvent";
import { geocode } from '../helpers/geo-opencage';


export default function Home() {
	const [home, setHome] = useState(null);  // center of map
	const [places, setPlaces] = useState([]);

    // Set "home" when the app loads
    useEffect(() => {
        getAndSetHome();
    }, []);

    async function getAndSetHome() {
        let latLng = await getHome();  // returns [lat, lng]
        setHome(latLng);
    }

	async function addMarkerForAddress(addr) {
        // Send a request to OpenCage to geocode 'addr'
        let myresponse = await geocode(addr);
        if (myresponse.ok) {
            if (myresponse.data.latLng) {
                // Create new 'place' obj
                let d = myresponse.data;
                let newPlace = { 
                    latLng: d.latLng,
                    input_address: addr,
                    formatted_address: d.formatted_address
                };
                // Add it to 'places' state
                setPlaces(places => [...places, newPlace]);
            } else {
                console.log('addMarkerForAddress(): no results found');
            }
        } else {
            console.log('addMarkerForAddress(): response.error:', myresponse.error);
        }
    }
	

	return (
		<div>
			<AddEvent addMarkerCb={addr => addMarkerForAddress(addr)} />
			<Map places={places} home={home} />
			
		</div>
	);
}
