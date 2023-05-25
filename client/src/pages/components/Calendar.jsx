import { useState, useEffect } from "react";
import { useParams, Outlet } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

export default function UserCalendar({events}) {
    // const { id } = useParams();
    const localizer = dayjsLocalizer(dayjs);
    // const [userEvents, setUserEvents] = useState([]);

    // useEffect(() => {
    //     loadUser();
    // }, []);

    // async function loadUser() {
    //     const res = await fetch(`/api/events`);
    //     const data = await res.json();
    //     data.map(event => event.eventDate = event.eventDate.split('T')[0]);
    //     setUserEvents(data);
    //     console.log(data);
    // }
  
    const eventsCalendar = events.map((event) => {
        return {
            id: event.id,
            title: event.eventTitle,
            start: new Date(event.eventDate),
            end: new Date(event.eventDate),
            allDay: false,
        };
    });

    return (
        <div className="user-calendar">
            <div>
                <Calendar
                    localizer={localizer}
                    events={eventsCalendar}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                />
            </div>
            <Outlet />
        </div>
    );
}
