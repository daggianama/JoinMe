import React from 'react';


function MarkerTable({places}) {
    return (
        <table className="MarkerTable table">
            <thead>
                <tr>
                    <th>Input Address</th>
                    <th>Formatted Address (from OpenCage)</th>
                    <th>Latitude/Longitude</th>
                </tr>
            </thead>
            <tbody>
            {
                places.map(p => (
                    <tr key={p.input_address}>
                        <td>{ p.input_address }</td>
                        <td>{ p.formatted_address }</td>
                        <td>{p.latLng.join('/')}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

export default MarkerTable;