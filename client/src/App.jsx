import { useState, useEffect} from 'react'
import './App.css'
import { Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Calendar from './pages/components/Calendar';
import UserPage from './pages/UserPage';
// import Friends from './pages/Friends';
// import UserEvents from './pages/UserEvents';
import AddEvent from './pages/components/AddEvent';


function App() {
  const [selectAddEvent, setSelectAddEvent] = useState(false);
 

  const showAddEvent = () => setSelectAddEvent(prevState => !prevState);

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
            <Link onClick={showAddEvent}>Add Event</Link>
          </li>
        </ul>
        </nav>
        <div className='add-event-pop' >
          {selectAddEvent && <AddEvent />}
          </div>
        
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/user"  element={<UserPage />} >
            <Route path="user/calendar" element={<Calendar />} />
            {/* <Route path="User:id/friends" element={<Friends />} />
            <Route path="User:id/events" element={<UserEvents />} /> */}
          </Route>
          <Route path="/user/addEvent" element={<AddEvent />} />
        </Routes>
     
    
      </div>
    </>
  )
}

export default App
