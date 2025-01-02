import React, { useEffect } from 'react'; // Import useEffect
import './overview.css'
import L from 'leaflet'; // Import Leaflet

function Header (){
    useEffect(() =>{
        let vill =[];
        // Create the map
        var map = L.map('map-con').setView([32.22111, 35.25444], 7);

        // Add the tile layer
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);


        // Add markers for each village
        vill.forEach(village => {
            L.marker([village.latitude, village.longitude])
                .addTo(map)
                .bindPopup(`<b>${village.name}</b><br>${village.population}`);
        });

        // Cleanup function to remove the map instance on unmount
        return () => {
            map.remove();
        };
    });



    return (
    <div className="header-container">
        <h1 className="title">Overview</h1>
        <div className="map-container">
            <div id="map-con"></div>
        </div>
    </div>
    );
}

export default Header;