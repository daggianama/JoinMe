import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import AddEvent from "./components/AddEvent";
import Profile from "./pages/Profile";
import "tailwindcss/tailwind.css";

function App() {
	const [selectAddEvent, setSelectAddEvent] = useState(false);
	const [userEvents, setUserEvents] = useState([]);
	const [userFriends, setUserFriends] = useState([]);
	const id = 1;

	async function loadUserEvents() {
		try {
			const res = await fetch(`/api/participation/${id}`);
			const data = await res.json();
			loadEvents(data);
		} catch (error) {
			console.error(error);
		}
	}

	const loadEvents = async (data) => {
		try {
			const eventPromises = data.map(async (event) => {
				const res = await fetch(`/api/events/${event.event_id}`);
				const eventData = await res.json();
				eventData.eventDate = eventData.eventDate.split("T")[0];
				return eventData;
			});

			const userEventsData = await Promise.all(eventPromises);
			setUserEvents(userEventsData);
		} catch (error) {
			console.error(error);
		}
	};

	async function loadUserFriends() {
		try {
			const res = await fetch(`/api/friends/${id}`);
			const data = await res.json();
			console.log("this is your friends" + data);
			setUserFriends(data);
		} catch (error) {
			console.error(error);
		}
		
	}

	useEffect(() => {
		loadUserFriends();
	}, [id]);

	return (
		<div className="App">
			<nav>
				<ul>
					<li>
						<Link to={`/${id}`}>Home</Link>
					</li>
					<li>
						<Link to={`/${id}/calendar`}>Calendar</Link>
					</li>
					<li className="profile-icon">
						<Link to={`/${id}/profile`}>👤</Link>
					</li>
				
				</ul>
			</nav>

			<Routes>
				<Route
					path={`/:userId`}
					element={
						<Home
							events={userEvents}
							updateEvents={loadUserEvents}
							mapClick={setSelectAddEvent}
							friends={userFriends}
						/>
					}
				>
					<Route
						path={`/:userId/addEvent`}
						element={
							selectAddEvent && (
								<AddEvent
									updateEvents={loadUserEvents}
									closeForm={setSelectAddEvent}
								/>
							)
						}
					/>
				</Route>
				<Route
					path={`/:userId/calendar`}
					element={
						<CalendarPage
							events={userEvents}
							updateEvents={loadUserEvents}
						/>
					}
				/>
				<Route
					path={`/:userId/profile`}
					element={<Profile friends={userFriends} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
