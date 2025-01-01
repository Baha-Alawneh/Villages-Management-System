import React from 'react';
import './village-management.css'

function Popup({ onClose }) {
    return (
        <div className="popup-container" id="popup">
            <div className="popup-content">
                <button className="close-popup" id="close-popup" value="" onClick={onClose}></button>
                <h2>Village Details</h2>
                <p id="popup-details"></p>
            </div>
        </div>
    );
}

export default Popup;
