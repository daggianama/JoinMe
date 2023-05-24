import { useState, } from "react";

export default function AddEvent({addMarkerCb}) {
    // const { id } = useParams();
    const [newEvent, setNewEvent] = useState({
        eventTitle: '',
        eventLocation: '',
        eventDate: '',
        eventStartTime: ''
    });
    const [places, setPlaces] = useState([]);


    
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
    addMarkerCb(newEvent.eventLocation); //
    setNewEvent({ eventTitle: '', eventLocation: '', eventDate: '', eventStartTime: '' });
  }

  async function addMarkerForAddress(addr) {
    // Send a request to OpenCage to geocode 'addr'
    let myresponse = await geocode(addr);
    if (myresponse.ok) {
        if (myresponse.data.latLng) {
            // Create new 'place' obj
            let d = myresponse.data;
            let newPlace = { 
                latLng: d.latLng,
                input_address: addr,
                formatted_address: d.formatted_address
            };
            // Add it to 'places' state
            setPlaces(places => [...places, newPlace]);
        } else {
            console.log('addMarkerForAddress(): no results found');
        }
    } else {
        console.log('addMarkerForAddress(): response.error:', myresponse.error);
    }
}

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='eventTitle'>Event Title:</label>
        <input type='text' id='eventTitle' name='eventTitle' value={newEvent.eventTitle} onChange={handleChange} required/>
        <label htmlFor='eventLocation'>Location:</label>
        <input type='text' id='eventLocation' name='eventLocation' value={newEvent.eventLocation} onChange={handleChange} required/>
        <label htmlFor='eventDate'>Date:</label>
        <input type='date' id='eventDate' name='eventDate' value={newEvent.eventDate} onChange={handleChange} required/>
        <label htmlFor='eventStartTime'>Starting Time:</label>
        <input type='time' id='eventStartTime' name='eventStartTime' value={newEvent.eventStartTime} onChange={handleChange} required/>
        <button type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}