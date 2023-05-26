import "./MapFilters.css"

export default function MapFilters({filterChange, selectedDate}) {


    return (
        <div>
            
            <div className="filter-markers">
            <h4>Events Filters</h4>
                    <div className="date">
                        <label htmlFor="eventDate">By date</label>
                        <input
                            type="date"
                            id="eventDate"
                            name="eventDate"
                            value={selectedDate || ""}
                            onChange={filterChange}
                        />      
                </div>
                <div className="users">
                        <label htmlFor="eventDate">By friends</label>
                        <select value="User2" onChange={`defaultValue`}>
                        <option value="">Your friends</option>
                        <option value="user2">Joan</option>
                        <option value="user3">Moni</option>
                        </select>
                    </div>
            </div>
        </div>
    );
    
}