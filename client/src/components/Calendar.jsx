
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import UserEvents from "./UserEvents";

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

  
    let formats = {
        timeGutterFormat: 'HH:mm',
    }
    

    const eventsCalendar = events.map((event) => {
      
        console.log(event);
        return {
            id: event.id,
            title: event.eventTitle,
            start: mergeStringDateTime(event.eventDate, event.eventStartTime),
            end: mergeStringDateTime(event.eventDate, event.eventEndTime),
            allDay: false,
        };
    });

    function mergeStringDateTime(date = '', time = '') {
        if (!date) return time ? dayjs(time).toDate() : undefined;
        return time ? dayjs(`${date} ${time}`).toDate() : dayjs(date).toDate();
      }

    return (
        <div className="user-calendar">
            <div>
                <Calendar
                    localizer={localizer}
                    formats={formats}
                    onSelectEvent={handleEventSelect} 
                    events={eventsCalendar}
                    defaultView="week"
                    startAccessor="start"
                    endAccessor="end"
                    style={{
                        height: 520,
                        backgroundColor: "white",
                        
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
