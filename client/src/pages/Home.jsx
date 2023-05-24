

import "./Home.css";
import { useEffect, useState } from "react";

import MarkerTable from './components/MarkerTable';
import Map from './components/Map';
import AddEvent from "./components/AddEvent";


export default function Home() {
    const [userEvents, setUserEvents] = useState([]);

    useEffect(() => {
        loadUser();
    }, []);

    async function loadUser() {
        const res = await fetch(`/api/events`);
        const data = await res.json();
        data.map(event => event.eventDate = event.eventDate.split('T')[0]);
        setUserEvents(data);
    }

    // Set "home" when the app loads
    // useEffect(() => {
    //     // getAndSetHome();
    // }, []);

    // async function getAndSetHome() {
    //     let latLng = await getHome();  // returns [lat, lng]
    //     setHome(latLng);
    // }

	// async function addMarkerForAddress(addr) {
    //     // Send a request to OpenCage to geocode 'addr'
    //     let myresponse = await Geocode(addr);
    //     if (myresponse.ok) {
    //         if (myresponse.data.latLng) {
    //             // Create new 'place' obj
    //             let d = myresponse.data;
    //             let newPlace = { 
    //                 latLng: d.latLng,
    //                 input_address: addr,
    //                 formatted_address: d.formatted_address
    //             };
    //             // Add it to 'places' state
	// 			setPlace(newPlace.formatted_address);

    //         } else {
    //             console.log('addMarkerForAddress(): no results found');
    //         }
    //     } else {
    //         console.log('addMarkerForAddress(): response.error:', myresponse.error);
    //     }
    // }
	

	return (
		<div>
			<AddEvent />
            <Map/>
            <MarkerTable places={userEvents} />
		</div>
	);
}
