import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";

export default function UserEvents() {
    const { id } = useParams();
    const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    loadUser();
  }, [id]);
  async function loadUser() {
    const res = await fetch(`/api/events`);
    const data = await res.json();
    data.map(event => event.eventDate = event.eventDate.split('T')[0]);
    setUserEvents(data);

}

  return (
    <div>
      <h3>
        Your Events
          </h3>
          {userEvents.map((event) => <p>
              {event.eventTitle}
              {event.eventLocation}
              {event.eventDate}
              {event.eventStartTime}
            </p>)}
      <Outlet />
    </div>
  );
}