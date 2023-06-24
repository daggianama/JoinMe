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
	const [isLogin] = useState(false);
	const [selectCalendar, setSelectCalendar] = useState(false);
	const [selectHome, setSelectHome] = useState(false);
	const [joinFriend, setJoinFriend] = useState(false);
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
				return;
			}
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
			const res = await fetch(`/api/users/${id}`);
			const data = await res.json();

			setUserName(data.firstName);
		} catch (error) {
			console.error(error);
		}
	}

	const handleJoinFriends = () => {
		setSelectCalendar(false);
		setJoinFriend(true);
		setSelectHome(false);
	};

	const handleSelectCalendar = () => {
		setSelectCalendar(true);
		setJoinFriend(false);
		setSelectHome(false);
	};

	const handleSelectMap = () => {
		setSelectCalendar(false);
		setJoinFriend(false);
		setSelectHome(false);
	};

	const handleSelectHome = () => {
		setSelectHome(true);
		setSelectCalendar(false);
		setJoinFriend(false);
	};

	return (
		<div className="App">
			<nav>
				<ul>
					<div className="home-calendar">
						<li>
							<Link
								to={`/${id}`}
								onMouseOver={() => setSelectHome(true)}
								onClick={handleSelectHome}
							>
								HOME
							</Link>
						</li>
						<li>
							<Link to={`/${id}/invitations`}>INVITATIONS</Link>
						</li>
					</div>
					<div className="logo">
						<img src={JOINmelogo} alt="joinmelogo" />
					</div>
					<li>
						<Link to={`/${id}/profile`}>PROFILE</Link>
					</li>
				</ul>
			</nav>
			{selectHome === true && (
				<div
					className="calendar-map"
					onClick={() => setSelectHome(false)}
				>
					<button
						onClick={handleSelectMap}
						className={
							!selectCalendar && !joinFriend ? "selected" : null
						}
					>
						Map
					</button>
					<button
						onClick={handleSelectCalendar}
						className={
							selectCalendar && !joinFriend ? "selected" : null
						}
					>
						Calendar
					</button>
					<button
						onClick={handleJoinFriends}
						className={
							!selectCalendar && joinFriend ? "selected" : null
						}
					>
						Join Friends
					</button>
				</div>
			)}

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
							joinFriend={joinFriend}
							selectHome={selectHome}
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
					element={
						<Profile
							friends={userFriends}
							userName={userName}
							events={userEvents}
						/>
					}
				/>
			</Routes>
		</div>
	);
}

export default App;
