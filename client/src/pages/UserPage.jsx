import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Calendar from "./components/Calendar";
import UserEvents from "./components/UserEvents";


export default function UserPage() {
  // const [userEvents, setUserEvents] = useState([]);

  // useEffect(() => {
  //   loadEvents();
  // }, []);

  // async function loadEvents() {
  //   const res = await fetch("/api/events");
  //   const data = await res.json();
  //   setUserEvents(data);
  // }


  return (
    <div>
      <h2></h2>
      <Calendar />
      <UserEvents />
      <div>
        <Outlet />
      </div>

      
      
 
    </div>
  );
}