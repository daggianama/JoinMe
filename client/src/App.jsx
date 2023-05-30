/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import AddEvent from "./components/AddEvent";
import Profile from "./pages/Profile";
import Invitations from "./pages/Invitations";
import JOINmelogo from "./assets/logo.png";

function App() {
	const [selectAddEvent, setSelectAddEvent] = useState(false);
	const [userEvents, setUserEvents] = useState([]);
	const [userFriends, setUserFriends] = useState([]);
	const [userName, setUserName] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [selectCalendar, setSelectCalendar] = useState(false);
	const [selectHome, setSelectHome] = useState(false);
	const id = 1;

	useEffect(() => {
		loadUserEvents();
		loadUserFriends();
		loadUserName(id);
		console.log(userName);
	}, [isLogin]);

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

	async function loadUserName(id) {
		try {
			const res = await fetch(`/api/index/${id}`);
			const data = await res.json();
			
			setUserName(data.firstName);
		} catch (error) {
			console.error(error);
		}
	}


	return (
		<div className="App">
			<div className="logo" >
				<img src={JOINmelogo} alt="joinmelogo" />
				</div>
			<nav>
				<ul>
					<div className="home-calendar">
						<li>
							<Link to={`/${id}`} onMouseOver={() => setSelectHome(true)} onClick={() => setSelectHome(!selectHome)}>HOME</Link>
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
			{selectHome === true  &&
			<div className="calendar-map" onClick={() =>setSelectHome(false)}>
			
				<button onClick={() => setSelectCalendar(false)} className={!selectCalendar ? "selected" : null}>
					Map</button>
					<button onClick={() => setSelectCalendar(true)} className={selectCalendar ? "selected" : null} >
				Calendar</button>
			</div>}
			
			{/* {isLogin === false && 
			<div className="fake-login">
				fake login :) <br />
				<button className="login" onClick={() => setIsLogin(true)}>
					<Link to={`/${id}`}>LOG IN</Link>
				</button>
			</div>} */}

			<Routes>
				<Route
					path={`/:userId`}
					element={
						<Home
							events={userEvents}
							updateEvents={loadUserEvents}
							addEvent={setSelectAddEvent}
							friends={userFriends}
							selectCalendar={selectCalendar}
					
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
									addEvent={setSelectAddEvent}
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
					element={<Profile friends={userFriends} userName={userName} />}
				/>
			</Routes>
		</div>
	);
}

export default App;
