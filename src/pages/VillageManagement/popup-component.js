import React from 'react';
import './village-management.css'

function Popup({ onClose, village }) {
    if(village==null) return null;
    return (
        <div className="popup-container" id="popup">
            <div className="popup-content">
                <button className="close-popup" id="close-popup" value="" onClick={()=>onClose()}></button>
                <h2>Village Details</h2>
                <p id="popup-details">
                    <strong>Village Name:</strong> {village.village_name} <br/>
                    <strong>Region/District:</strong> {village.region} <br/>
                    <strong>Land Area:</strong> {village.land_area} <br/>
                    <strong>Latitude:</strong> {village.latitude} <br/>
                    <strong>Longitude:</strong> {village.longitude} <br/>
                    <strong>Tages:</strong> {village.categories} <br/>
                    <a href={village.image} target="_blank" rel="noopener noreferrer">
                        <img src={village.image} alt="Village" style={{ maxWidth: "50px", height: "auto" }} />
                        Village Image
                    </a>                </p>
            </div>
        </div>
    );
}

export default Popup;
