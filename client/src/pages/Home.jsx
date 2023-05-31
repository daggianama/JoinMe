
import Map from "../components/Map";
import { Outlet, useParams } from "react-router-dom";
import Calendar from "../components/Calendar";
import JoinFriendsEvents from "../components/JoinFriendsEvents";

export default function Home({ events, updateEvents, addEvent, friends, selectCalendar, joinFriend }) {
	const params = useParams();
	const userId = params.userId;

	
	return (
		<div className="home-page">
			
			
			{ (selectCalendar && joinFriend === false) &&
				<Calendar events={events} updateEvents={updateEvents} />}
			

			<div className="map-view">
				{(selectCalendar === false && joinFriend === false) &&
					<Map
						events={events}
						updateEvents={updateEvents}
						addEvent={addEvent}
						userId={userId}
						friends={friends}
					/>}
			</div>
			{(selectCalendar === false && joinFriend) &&
				<JoinFriendsEvents
				friends={friends}
				userId={userId}
				/>}
				<Outlet />
		</div>
	);
}
