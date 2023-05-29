/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./components/AddEvent";
import Profile from "./pages/Profile";
import Calendar from "./components/Calendar";
import Invitations from "./pages/Invitations";

function App() {
	const [selectAddEvent, setSelectAddEvent] = useState(false);
	const [selectCalendar, setSelectCalendar] = useState(false);
	const [userEvents, setUserEvents] = useState([]);
	const [userFriends, setUserFriends] = useState([]);
	const id = 1;

	useEffect(() => {
		(async () => {
			await loadUserEvents();
			await loadUserFriends();
		})();
	}, [id]);

	async function loadUserEvents() {
		try {
			const res = await fetch(`/api/participation/${id}`);
			const data = await res.json();
			if (data) {
				await loadEvents(data);
			} else {
				console.error("Data is undefined");
			}
		} catch (error) {
			console.error(error);
		}
	}

	const loadEvents = async (data) => {
		try {
			if (!data) {
				console.error("Data is undefined");
				return; }
			const eventPromises = await data.map(async (event) => {
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
			setUserFriends(data);
		} catch (error) {
			console.error(error);
		}
	}



	return (
		<div className="App">
			<nav>
				<ul>
					<div className="home-calendar">
						<li>
							<Link to={`/${id}`}>HOME</Link>
						</li>
						<li>
							<Link to={`/${id}/invitations`}>INVITATIONS</Link>
						</li>
					</div>
					<li>
						<Link to={`/${id}/profile`}>PROFILE</Link>
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
							selectCalendar={setSelectCalendar}
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
									userId={id}
								/>
							)
						}
					/>	

				</Route>
				<Route
					path={`/:userId/invitations`}
					element={<Invitations />}
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
