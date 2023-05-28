
import { Outlet } from "react-router-dom";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";

export default function UserCalendar({events}) {
    // const { id } = useParams();
    const localizer = dayjsLocalizer(dayjs);
    // const [userEvents, setUserEvents] = useState([]);

  
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
