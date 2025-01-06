// UpdateVillageForm.js
import React from 'react';
import './village-management.css'

function UpdateVillageForm({onClose, village}) {
    return (
        <div className="update-container" id="update-container">
            <div id="update-village-container" className="update-village-container">
                <div className="close-update-container">
                    <button className="close-popup" id="close-update" value="" onClick={()=>onClose()}></button>
                </div>
                <h1>Update Village</h1>
                <label htmlFor="village-name">Village Name: </label>
                <input type="text" id="village-name" required />

                <label htmlFor="region">Region/District </label>
                <input type="text" id="region" required />

                <label htmlFor="land-area">Land Area: </label>
                <input type="text" id="land-area" required />

                <label htmlFor="latitude">Latitude: </label>
                <input type="text" id="latitude" required />

                <label htmlFor="longitude">Longitude: </label>
                <input type="text" id="longitude" required />

                <label htmlFor="upload-file">Upload Image: </label>
                <input type="file" id="upload-file" />

                <label htmlFor="categories">Categories/Tags </label>
                <input
                    type="text"
                    id="categories"
                    required
                    placeholder="e.g., rural, urban"
                />

                <input
                    type="button"
                    id="update-village-btn"
                    className="update-village-btn"
                    value="Update Village"
                />
            </div>
        </div>
    );
}

export default UpdateVillageForm;
