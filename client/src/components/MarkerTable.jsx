
function MarkerTable({places}) {
    return (
        <table className="MarkerTable table">
            <thead>
                <tr>
                    <th>Formatted Address</th>
                    <th>Latitude/Longitude</th>
                </tr>
            </thead>
            <tbody>
            {
                places.map((p, i) => (
                    <tr key={i}>
                        <td>{ p.eventLocation }</td>
                        <td>{p.latitude+'/'+p.longitude}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default MarkerTable;