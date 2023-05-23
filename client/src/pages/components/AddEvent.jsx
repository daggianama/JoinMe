import { useState, } from "react";

export default function AddEvent() {
    // const { id } = useParams();
    const [newEvent, setNewEvent] = useState({
        eventTitle: '',
        eventLocation: '',
        eventDate: '',
        eventStartTime: ''
      });


    
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
        console.log(data);
    } catch (error) {
      console.error(error);
    }
    setNewEvent({ eventTitle: '', eventLocation: '', eventDate: '', eventStartTime: '' });

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='eventTitle'>Event Title:</label>
        <input type='text' id='eventTitle' name='eventTitle' value={newEvent.eventTitle} onChange={handleChange} />
        <label htmlFor='eventLocation'>Location:</label>
        <input type='text' id='eventLocation' name='eventLocation' value={newEvent.eventLocation} onChange={handleChange} />
        <label htmlFor='eventDate'>Date:</label>
        <input type='date' id='eventDate' name='eventDate' value={newEvent.eventDate} onChange={handleChange} />
        <label htmlFor='eventStartTime'>Starting Time:</label>
        <input type='time' id='eventStartTime' name='eventStartTime' value={newEvent.eventStartTime} onChange={handleChange} />
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}