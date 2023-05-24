import { useEffect, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

export default function AddEvent({ addMarkerCb, place}) {
	const [newEvent, setNewEvent] = useState({
		eventTitle: "",
		eventLocation: "",
		eventDate: "",
		eventStartTime: "",
	});
	const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = `${latitude},${longitude}`;
          getSuggestionsByLocation(location);
        },
        (error) => {
          console.error("Error obtaining current location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser");
    }
  }, []);

  const getSuggestionsByLocation = async (latitude, longitude) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCKera2QzXqnNwAKgCPcexnVFwwt_WIXu8`
    );
    const data = await response.json();
    data.results.map((result) => result.formatted_address);
    // Aquí puedes hacer lo que necesites con las sugerencias obtenidas
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setNewEvent((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const handlePlaceSelect = (address) => {
    setNewEvent((state) => ({
      ...state,
      eventLocation: address,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addMarkerCb(newEvent.eventLocation);
    console.log(place);
    setNewEvent((state) => ({
      ...state,
      eventLocation: place,
    }));
    console.log(newEvent);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }

    setNewEvent({
      eventTitle: "",
      eventLocation: "",
      eventDate: "",
      eventStartTime: "",
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="eventTitle">Event Title:</label>
        <input
          type="text"
          id="eventTitle"
          name="eventTitle"
          value={newEvent.eventTitle}
          onChange={handleChange}
          required
        />

        <label htmlFor="eventLocation">Address:</label>
        <PlacesAutocomplete
          value={newEvent.eventLocation}
          onChange={(value) =>
            setNewEvent((state) => ({
              ...state,
              eventLocation: value,
            }))
          }
          onSelect={handlePlaceSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Search Places ...',
                  className: 'location-search-input',
                })}
              />
                         <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div key={i}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );  
              })}
              </div>
                  </div>
                  )}
        </PlacesAutocomplete>
              
				<label htmlFor="eventDate">Date:</label>
				<input
					type="date"
					id="eventDate"
					name="eventDate"
					value={newEvent.eventDate}
					onChange={handleChange}
					required
          />
				<label htmlFor="eventStartTime">Starting Time:</label>
				<input
					type="time"
					id="eventStartTime"
					name="eventStartTime"
					value={newEvent.eventStartTime}
					onChange={handleChange}
					required
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}
