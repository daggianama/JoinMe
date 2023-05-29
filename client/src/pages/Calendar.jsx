
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserEvents from "../components/UserEvents";

export default function UserCalendar({events, updateEvents}) {
    const { userId } = useParams();
    const localizer = dayjsLocalizer(dayjs);
    const [selectedEvent, setSelectedEvent] = useState(null);


    useEffect(() => {
        console.log(userId)
    }, []);


    const handleEventSelect = (event) => {
        console.log("event", event.id);
        setSelectedEvent(event.id);
        // setSelectedEvent(event);
    };

  
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
                    onSelectEvent={handleEventSelect} 
                    events={eventsCalendar}
                    defaultView="week"
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: 600,
                        
                    }}
                />
            </div>
            {selectedEvent &&
                <UserEvents selectedEvent={selectedEvent} userId={userId}
				events={events}
				updateEvents={updateEvents}
				friendEvents={null}
				friendId={null}/>}
        </div>
    );
}
