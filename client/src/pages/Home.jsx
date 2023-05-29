
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { Outlet, useParams } from "react-router-dom";
import Calendar from "../components/Calendar";

export default function Home({ events, updateEvents, addEvent, friends }) {
	const params = useParams();
	const userId = params.userId;
	const [selectCalendar, setSelectCalendar] = useState(false);



	return (
		<div className="home-page">
			<div className="calendar-map">
			
			<button onClick={() => setSelectCalendar(false)} className={!selectCalendar ? "selected" : null}>
					Map</button>
					<button onClick={() => setSelectCalendar(true)} className={selectCalendar ? "selected" : null} >
				Calendar</button>
			</div>
			
			{ selectCalendar &&
				<Calendar events={events} updateEvents={updateEvents} />}
			

			<div className="map-view">
				{selectCalendar === false &&
					<Map
						events={events}
						updateEvents={updateEvents}
						addEvent={addEvent}
						userId={userId}
						friends={friends}
					/>}
			</div>
				<Outlet />
		</div>
	);
}
