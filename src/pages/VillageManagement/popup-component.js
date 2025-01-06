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
                    <a href={village.image_url} target="_blank" rel="noopener noreferrer" className="imageViewContainer">
                        <img src={village.image_url} alt="Village" style={{ maxWidth: "200px", maxHeight: "150px", margin:'auto' }} />   
                    </a> 
                </p>
            </div>
        </div>
    );
}

export default Popup;
