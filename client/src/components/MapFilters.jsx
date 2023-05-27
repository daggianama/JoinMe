import "./MapFilters.css";
import { useEffect } from "react";

export default function MapFilters({ filterChange, selectedDate, friends }) {
    
    
    useEffect(() => {
        console.log(friends);
    }, []);

	const defaultValue = (e) => {
		console.log(e.target.value);
	};

	return (
		<div className="map-filters">
			<div className="filter-markers">
				<h4>VIEW</h4>
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
				<div className="friends">
					<label htmlFor="eventDate">Friend events</label>
					<select value="User2" onChange={defaultValue}>
						<option value=""></option>
						{friends.map((f, i) => (
							<option key={i} value={f}>
								{f.firstName} {f.lastName}
							</option>
						))}
					</select>
				</div>
			</div>
		</div>
	);
}
