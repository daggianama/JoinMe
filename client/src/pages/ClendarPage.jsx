
import { Outlet } from "react-router-dom";
import Calendar from "../components/Calendar";
import UserEvents from "../components/UserEvents";



export default function CalendarPage({events, updateEvents}) {

  return (
    <div>
      <Outlet />
      <Calendar events={events} />
      <UserEvents events={events} updateEvents={updateEvents} />
      <div>
        
      </div>
 
    </div>
  );
}