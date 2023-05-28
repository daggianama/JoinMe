
import { useEffect } from "react";
import Map from "../components/Map";
import { Outlet, useParams } from "react-router-dom";

export default function Home({ events, updateEvents, mapClick, friends }) {
	const params = useParams();
	const userId = params.userId;

	useEffect(() => {}, [params.userId]);

	return (
		<div className="home-page">
			<div className="map-view">
				<Map
					events={events}
					updateEvents={updateEvents}
					mapClick={mapClick}
					userId={userId}
					friends={friends}
				/>
			</div>
			{/* <MarkerTable places={events} /> */}
			<div className="addevent-view" >
				<Outlet />
			</div>
		</div>
	);
}
