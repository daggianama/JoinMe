import { useEffect, useState } from "react";

export default function JoinFriendsEvents({ friends, userId, updateEvents }) {
    const [friendEvents, setFriendEvents] = useState([]);
    const friendsIds = friends.map((f) => f.id);

    useEffect(() => {
        loadFriendEvents();
       
    }, []);


    async function loadFriendEvents() {
        friendsIds.map(async (f) => { 
            try {
                const friendId = f;
                const res = await fetch(`/api/participation/${friendId}`);
                const data = await res.json();
                const result = data.map(async (event) => {
                    const res = await fetch(`/api/events/${event.event_id}`);
                    const eventData = await res.json();
                    eventData.eventDate = eventData.eventDate.split("T")[0];
                    return eventData;
                });
                const events = await Promise.all(result);
                setFriendEvents(events);
            } catch (error) {
                console.error(error);
            }
        })
    }
   
    



    const handleNewParticipation = async (id) => {
		await newParticipation(id);
		updateEvents();
	};
		
		const newParticipation = async (id) => {
			try {
				await fetch(`/api/participation/${userId}/${id}`, {
					method: "POST",
					headers: {
	
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ id: id }),
				})
					// // upon success, update tasks
					.then((res) => res.json())
					// upon failure, show error message
					.catch((error) => console.error(error));
			} catch (error) {
				console.error(error);
			}
			updateEvents();
	
		};

    
    
    

    return (
        <div className="join-friends-events">
            {friendEvents.map((e) => (
                <div className="event-card"
                key={e.id}>
                <button
                className="join"
                type="button"
                onClick={() => handleNewParticipation(e.id)}
                >
                Join Friend
                </button>
                <div className="event-text">
                <h4>{e.eventTitle}</h4>
                <p><span>Location </span>{e.eventLocation}</p>
                <p><span>Date </span> {e.eventDate}</p>
                <p><span>Time </span> {e.eventStartTime}</p>
                    </div>
                </div>
        ))}
        
        </div>
    )
            
}
        
