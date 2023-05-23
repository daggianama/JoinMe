import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/components/Calendar';
import UserPage from './pages/UserPage';
// import Friends from './pages/Friends';
// import UserEvents from './pages/UserEvents';
import AddEvent from './pages/components/AddEvent';

function App() {
  const [events, setEvents] = useState([]);


  useEffect(() => {
    getEvents();
  }, []
  );
  
  const getEvents = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/events')
      const data = await response.json()
      setEvents(data);
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <>
      <div className='App'>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/user">My Events</Link>
            </li>
            <li>
            <Link to="/user/addevent">Add New Event</Link>
          </li>
        </ul>
      </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user"  element={<UserPage />} >
            <Route path="user/calendar" element={<Calendar />} />
            {/* <Route path="User:id/friends" element={<Friends />} />
            <Route path="User:id/events" element={<UserEvents />} /> */}
          </Route>
          <Route path="/user/addevent" element={<AddEvent />} />
        </Routes>

        
    
      </div>
    </>
  )
}

export default App
