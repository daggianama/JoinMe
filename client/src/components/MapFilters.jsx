

export default function MapFilters({filterChange, selectedDate}) {


    return (
        <div>
            <div className="map">
                {/* Resto del código del mapa */}

                {/* Agrega el desplegable de filtro */}
                {/* <select value={selectedDate} onChange={filterChange}>
                    <option value="">Todos los eventos</option>
                    <option value="2023-06-01">1 de junio de 2023</option>
                    <option value="2023-06-02">2 de junio de 2023</option>
                    {/* Agrega más opciones de fecha según tus necesidades */}
                {/* </select> */} 
                <input
						type="date"
						id="eventDate"
						name="eventDate"
						value={selectedDate}
						onChange={filterChange}
					/>

                {/* Resto del código del mapa */}
            </div>
        </div>
    );
    
}