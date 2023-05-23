import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

export default function Calendar() {
    const { id } = useParams();
    const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    const res = await fetch(`/api/events`);
    const data = await res.json();
    setUserEvents(data);
  }

  return (
    <div>
      <h3>
        Your Calendar
          </h3>
          <div className='events-list'>{userEvents.map(event => (
          <div className='event-card' key={event.id}>
            <h2>{event.eventTitle}</h2>
            <h3>{event.eventLocation}</h3>
            <h3>{event.eventDate}</h3>
            </div>

        ))}</div>
      <Outlet />
    </div>
  );
}