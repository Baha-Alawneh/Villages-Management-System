import React from 'react';
import './village-management.css'

function AddVillageForm({setShowPopup}) {

    return (
        <div className="add-container" id="add-container">
            <div id="add-new-village-container" className="add-new-village-container">
                <div className="close-add-container">
                    <button className="close-popup" id="close-add" value="" onClick={()=>setShowPopup(false)}></button>
                </div>
                <h1>Add New Village</h1>
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
                    id="add-village"
                    className="add-village"
                    value="Add Village"
                />
            </div>
        </div>
    );
}

export default AddVillageForm;