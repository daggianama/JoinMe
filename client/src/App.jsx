import { useState, useEffect } from "react";
import "./App.css";
import {
	Route,
	Routes,
	Link,
} from "react-router-dom";
import Home from "./pages/Home";
import CalendarPage from "./pages/CalendarPage";
import AddEvent from "./components/AddEvent";
import "tailwindcss/tailwind.css";

function App() {
	const [selectAddEvent, setSelectAddEvent] = useState(false);
	const [userEvents, setUserEvents] = useState([]);

	useEffect(() => {
		loadUser();
	}, []);

	async function loadUser() {
		const res = await fetch(`/api/events`);
		const data = await res.json();
		data.map(
			(event) => (event.eventDate = event.eventDate.split("T")[0])
		);
		setUserEvents(data);
		console.log(data);
	}

	return (
		<div className="App">
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/calendar">Calendar</Link>
					</li>
					{/* <li>
						<Link onClick={handleAddEventClick}>Add Event</Link>
					</li> */}
				</ul>
			</nav>
			{/* <div className="add-event-div">
				{selectAddEvent && <AddEvent updateEvents={loadUser} />}
			</div> */}

			<Routes >
				
				<Route
					path="/"
					element={
						<Home events={userEvents} updateEvents={loadUser} mapClick={setSelectAddEvent} />
					}
				>
					<Route path="/addEvent" element={selectAddEvent && <AddEvent updateEvents={loadUser} closeForm={setSelectAddEvent} />} />
				</Route>
				<Route
					path="/calendar"
					element={
						<CalendarPage events={userEvents} updateEvents={loadUser} />
					}
				>
			
					
					</Route>
			</Routes>
		</div>
	);
}

export default App;
