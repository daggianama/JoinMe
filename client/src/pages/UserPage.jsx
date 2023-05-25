
import { Outlet } from "react-router-dom";
import Calendar from "./components/Calendar";
import UserEvents from "./components/UserEvents";


export default function UserPage({events, updateEvents}) {

  return (
    <div>
      <Calendar events={events} />
      <UserEvents events={events} updateEvents={updateEvents} />
      <div>
        <Outlet />
      </div>
 
    </div>
  );
}