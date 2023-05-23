import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Calendar from "./components/Calendar";


export default function UserPage() {
  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    const res = await fetch("/api/events");
    const data = await res.json();
    setUserEvents(data);
  }

  return (
    <div>
      <h2></h2>
      <div>
        <Outlet />
      </div>
      <div className="student-profile">
        <Calendar />
      </div>
    </div>
  );
}