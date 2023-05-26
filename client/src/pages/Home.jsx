import "./Home.css";
import { useEffect } from "react";
import Map from "../components/Map";
import { Outlet } from "react-router-dom";

export default function Home({ events, updateEvents, mapClick }) {
	useEffect(() => {
		updateEvents();
	}, []);


	return (
        <div className="home-page">
            <div className="map-view">
			<Map events={events} updateEvents={updateEvents} mapClick={mapClick} />
			</div>
			{/* <MarkerTable places={events} /> */}
			<div className="addevent-view">
			<Outlet />
			</div>
		</div>
	);
}
