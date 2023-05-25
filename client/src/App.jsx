import { useState, useEffect} from 'react'
import './App.css'
import { Route, Routes, Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import UserPage from './pages/UserPage';
// import Friends from './pages/Friends';
// import UserEvents from './pages/UserEvents';
import AddEvent from './pages/components/AddEvent';
import 'tailwindcss/tailwind.css';

function App() {
  const [selectAddEvent, setSelectAddEvent] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
      loadUser();
  }, []);

  async function loadUser() {
      const res = await fetch(`/api/events`);
      const data = await res.json();
      data.map(event => event.eventDate = event.eventDate.split('T')[0]);
      setUserEvents(data);
      console.log(data);
  }


  const handleAddEventClick = () => {
    setSelectAddEvent(prevState => !prevState);
    navigate(`${location.pathname}/addEvent`, { replace: true });
  };


  return (
		<div className="App">
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/user">My Events</Link>
					</li>
					<li>
						<Link onClick={handleAddEventClick}>Add Event</Link>
					</li>
				</ul>
			</nav>
			<div className="add-event-pop">
				{selectAddEvent && (
					<div className="add-event-container">
						<AddEvent updateEvents={loadUser} />
					</div>
				)}
			</div>

			<Routes location={location}>
				<Route
					path="/"
					element={
						<Home events={userEvents} updateEvents={loadUser} />
					}
				>
					<Route path="/addEvent" element={<AddEvent />} />
				</Route>
				<Route
					path="/user"
					element={
						<UserPage events={userEvents} updateEvents={loadUser} />
					}
				>
					<Route path="/user/addEvent" element={<AddEvent />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App
