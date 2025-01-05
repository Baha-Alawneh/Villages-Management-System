
// UpdateDemographicForm.js
import React from 'react';
import './village-management.css'

function UpdateDemographicForm({onClose,village}) {
    return (
        <div className="update-demographic-container" id="update-demographic-container">
            <div id="update-village-demographic-container" className="update-village-demographic-container">
                <div className="close-update-demographic-container">
                    <button className="close-popup" id="close-update-demographic" value="" onClick={()=>onClose()}></button>
                </div>
                <h1 id="demographic-header"></h1>
                <label htmlFor="population-size">Population Size: </label>
                <input type="text" id="population-size" required />

                <label htmlFor="age-distribution">Age Distribution: </label>
                <input type="text" id="age-distribution" required />

                <label htmlFor="gender-ratios">Gender Ratios: </label>
                <input type="text" id="gender-ratios" required />

                <label htmlFor="population-growth-rate">Population Growth Rate: </label>
                <input type="text" id="population-growth-rate" required />

                <input
                    type="button"
                    id="update-demographic-btn"
                    className="update-demographic-btn"
                    value="Add Demographic Data"
                />
            </div>
        </div>
    );
}

export default UpdateDemographicForm;
