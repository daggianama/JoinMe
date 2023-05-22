import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    eventTitle: '',
    eventLocation: '',
    eventDate: '',
    eventStartTime: ''
  });

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

  const handleChange = event => {
    const { value, name } = event.target;
    setNewEvent(state => ({
      ...state,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEvent)
      });
      const data = await response.json();
      setEvents([...events, data]);
    } catch (error) {
      console.error(error);
    }
    setNewEvent({ eventTitle: '', eventLocation: '', eventDate: '', eventStartTime: '' });

  }


  return (
    <>
      <div>
        <form onSubmit={handleSubmit} >
          <label htmlFor='name'>Event Title:</label>
          <input type='text' id='name' name='name' />
          <label htmlFor='location'>Location:</label>
          <input type='text' id='location' name='location' />
          <label htmlFor='date'>Date:</label>
          <input type='date' id='date' name='date' />
          <label htmlFor='time'>Starting Time:</label>
          <input type='time' id='time' name='time' />
          <button>
            Submit
          </button>
        </form>
        <div className='events-list'>{events.map(event => (
          <div className='event-card' key={event.id}>
            <h2>{event.eventTitle}</h2>
            <h3>{event.eventLocation}</h3>
            <h3>{event.eventDate}</h3>
            </div>

        ))}</div>
      </div>
    </>
  )
}

export default App
