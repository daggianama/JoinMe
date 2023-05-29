
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { Outlet, useParams } from "react-router-dom";
import Calendar from "../components/Calendar";

export default function Home({ events, updateEvents, mapClick, friends }) {
	const params = useParams();
	const userId = params.userId;
	const [selectCalendar, setSelectCalendar] = useState(false);

	useEffect(() => {
		updateEvents();
		console.log(selectCalendar);
	}, [
	]);




	return (
		<div className="home-page">
			<button onClick={() => setSelectCalendar(true)}>
				Calendar</button>
			<button onClick={() => setSelectCalendar(false)}>
				Map</button>
			
			{ selectCalendar &&
				<Calendar events={events} updateEvents={updateEvents} />}
			

			<div className="map-view">
				{selectCalendar === false &&
					<Map
						events={events}
						updateEvents={updateEvents}
						mapClick={mapClick}
						userId={userId}
						friends={friends}
					/>}
			</div>
				<Outlet />
		</div>
	);
}
