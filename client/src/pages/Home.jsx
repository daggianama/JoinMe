
import { useEffect, useState } from "react";
import Map from "../components/Map";
import { Outlet, useParams } from "react-router-dom";
import Calendar from "../components/Calendar";

export default function Home({ events, updateEvents, addEvent, friends, selectCalendar }) {
	const params = useParams();
	const userId = params.userId;



	return (
		<div className="home-page">
			
			
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
